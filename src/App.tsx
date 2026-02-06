import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getEmotionSequence,
  totalSentences,
  type EmotionCategory,
  type SessionLog,
} from "@/data/emotionSentences";
import { uiCopy, type Language } from "@/data/i18n";
import { PromptScreen } from "@/components/PromptScreen";
import { EmotionIntro } from "@/components/EmotionIntro";
import { SentenceDisplay } from "@/components/SentenceDisplay";
import { CompletionScreen } from "@/components/CompletionScreen";
import { LanguageToggle } from "@/components/LanguageToggle";
import { PreviewSlide } from "@/components/PreviewSlide";
import { PracticeComplete } from "@/components/PracticeComplete";

type Stage = "preview" | "practice" | "practiceComplete" | "prompt" | "emotionIntro" | "sentence" | "complete";

export const App = () => {
  const [stage, setStage] = useState<Stage>("preview");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [logs, setLogs] = useState<SessionLog[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const [sentenceStartedAt, setSentenceStartedAt] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [sessionStartedAtMs, setSessionStartedAtMs] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [participantName, setParticipantName] = useState("");
  const [language, setLanguage] = useState<Language>("en");

  const emotionSequence = useMemo(() => getEmotionSequence(language), [language]);
  const currentCategory: EmotionCategory | undefined = emotionSequence[categoryIndex];
  const currentSentence = currentCategory?.sentences[sentenceIndex];
  const copy = uiCopy[language];
  const practiceCategory = emotionSequence[0];
  const practiceSentences = useMemo(
    () => practiceCategory?.sentences.slice(0, 2) ?? [],
    [practiceCategory],
  );
  const practiceSentence = practiceSentences[practiceIndex];

  const overallProgress = useMemo(() => {
    const completedBeforeCurrentCategory = emotionSequence
      .slice(0, categoryIndex)
      .reduce((total, category) => total + category.sentences.length, 0);

    return {
      current: completedBeforeCurrentCategory + (stage === "sentence" && currentSentence ? sentenceIndex + 1 : 0),
      total: totalSentences,
    };
  }, [categoryIndex, currentSentence, sentenceIndex, stage, emotionSequence]);

  useEffect(() => {
    const activeSentence =
      stage === "sentence" ? currentSentence : stage === "practice" ? practiceSentence : undefined;

    if (!activeSentence) {
      return;
    }

    setSentenceStartedAt(Date.now());
    setElapsedMs(0);
    setCanContinue(true);
  }, [stage, currentSentence, practiceSentence, categoryIndex, sentenceIndex, practiceIndex]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        canContinue &&
        (stage === "sentence" || stage === "practice")
      ) {
        event.preventDefault();
        if (stage === "practice") {
          handlePracticeContinue();
        } else {
          handleContinue();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canContinue, stage, sentenceIndex, categoryIndex, practiceIndex]);

  useEffect(() => {
    if (!sentenceStartedAt || (stage !== "sentence" && stage !== "practice")) return;

    const interval = window.setInterval(() => {
      setElapsedMs(Date.now() - sentenceStartedAt);
    }, 200);

    return () => clearInterval(interval);
  }, [sentenceStartedAt, stage]);

  const formatLocalTimestamp = useCallback((ms: number) => {
    const date = new Date(ms);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }, []);

  const startProtocol = (name: string) => {
    const nowMs = Date.now();
    setStage("emotionIntro");
    setCategoryIndex(0);
    setSentenceIndex(0);
    setLogs([]);
    setSessionId(crypto.randomUUID());
    setSessionStartedAtMs(nowMs);
    setParticipantName(name);
  };

  const startPractice = () => {
    setPracticeIndex(0);
    setStage("practice");
  };

  const handlePracticeContinue = useCallback(() => {
    if (!canContinue || stage !== "practice" || !practiceSentence) {
      return;
    }

    setCanContinue(false);

    const hasMorePractice = practiceIndex < practiceSentences.length - 1;
    if (hasMorePractice) {
      setPracticeIndex((prev) => prev + 1);
    } else {
      setStage("practiceComplete");
    }
  }, [canContinue, practiceIndex, practiceSentence, practiceSentences.length, stage]);

  const beginRealSession = () => {
    setStage("prompt");
  };

  const handleBeginEmotion = () => {
    setStage("sentence");
  };

  const advanceToNextCategory = useCallback(() => {
    if (categoryIndex < emotionSequence.length - 1) {
      setCategoryIndex((prev) => prev + 1);
      setSentenceIndex(0);
      setStage("emotionIntro");
    } else {
      setStage("complete");
    }
  }, [categoryIndex, emotionSequence.length]);

  const handleContinue = useCallback(async () => {
    if (!canContinue || stage !== "sentence" || !currentCategory || !currentSentence) {
      return;
    }

    setCanContinue(false);

    const pressedAtMs = Date.now();
    const sentenceShownAtMs = sentenceStartedAt ?? pressedAtMs;
    const sessionStartMs = sessionStartedAtMs ?? pressedAtMs;
    const durationMs = sentenceStartedAt ? pressedAtMs - sentenceStartedAt : 0;

    const logEntry: SessionLog = {
      emotionId: currentCategory.id,
      emotionLabel: currentCategory.label,
      sentenceId: currentSentence.id,
      sentence: currentSentence.text,
      sessionId,
      sessionStartedAtMs: sessionStartMs,
      sessionStartedAtLocal: formatLocalTimestamp(sessionStartMs),
      sentenceShownAtMs,
      sentenceShownAtLocal: formatLocalTimestamp(sentenceShownAtMs),
      continuePressedAtMs: pressedAtMs,
      continuePressedAtLocal: formatLocalTimestamp(pressedAtMs),
      durationMs,
      participantName,
    };

    setLogs((prev) => [...prev, logEntry]);

    const hasMoreSentences = sentenceIndex < currentCategory.sentences.length - 1;

    if (hasMoreSentences) {
      setSentenceIndex((prev) => prev + 1);
    } else {
      advanceToNextCategory();
    }
  }, [
    advanceToNextCategory,
    canContinue,
    currentCategory,
    currentSentence,
    sentenceIndex,
    stage,
    sentenceStartedAt,
    sessionId,
    participantName,
    sessionStartedAtMs,
    formatLocalTimestamp,
  ]);

  if (stage === "preview") {
    return (
      <>
        <LanguageToggle language={language} onChange={setLanguage} />
        <PreviewSlide language={language} onStartPractice={startPractice} />
      </>
    );
  }

  if (stage === "practice") {
    return (
      <>
        <LanguageToggle language={language} onChange={setLanguage} />
        <SentenceDisplay
          key={practiceSentence?.id}
          emotionLabel={practiceCategory?.label ?? ""}
          sentence={practiceSentence ?? { id: 0, text: "" }}
          progressCurrent={practiceIndex + 1}
          progressTotal={practiceSentences.length}
          onContinue={handlePracticeContinue}
          isButtonEnabled={canContinue}
          accentColor={practiceCategory?.palette.accent ?? "#e0e5ef"}
          elapsedMs={elapsedMs}
          language={language}
        />
        <div className="fixed inset-x-0 top-5 z-10 flex flex-col items-center gap-2 px-4 text-center">
          <div className="rounded-full border border-white/70 bg-white/90 px-5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {copy.practiceTag}
          </div>
          <p className="max-w-2xl text-xs text-slate-500">{copy.practiceSubtitle}</p>
        </div>
      </>
    );
  }

  if (stage === "practiceComplete") {
    return (
      <>
        <LanguageToggle language={language} onChange={setLanguage} />
        <PracticeComplete language={language} onBegin={beginRealSession} />
      </>
    );
  }

  if (stage === "prompt") {
    return (
      <>
        <LanguageToggle language={language} onChange={setLanguage} />
        <PromptScreen onStart={startProtocol} language={language} />
      </>
    );
  }

  if (stage === "emotionIntro" && currentCategory) {
    return (
      <>
        <LanguageToggle language={language} onChange={setLanguage} />
        <EmotionIntro
          label={currentCategory.label}
          description={currentCategory.description}
          positionText={copy.blockLabel(categoryIndex + 1, emotionSequence.length)}
          onBegin={handleBeginEmotion}
          language={language}
        />
      </>
    );
  }

  if (stage === "sentence" && currentCategory && currentSentence) {
    return (
      <>
        <LanguageToggle language={language} onChange={setLanguage} />
        <SentenceDisplay
          key={currentSentence.id}
          emotionLabel={currentCategory.label}
          sentence={currentSentence}
          progressCurrent={overallProgress.current}
          progressTotal={overallProgress.total}
          onContinue={handleContinue}
          isButtonEnabled={canContinue}
          accentColor={currentCategory.palette.accent}
          elapsedMs={elapsedMs}
          language={language}
        />
      </>
    );
  }

  return (
    <>
      <LanguageToggle language={language} onChange={setLanguage} />
      <CompletionScreen logs={logs} language={language} />
    </>
  );
};
