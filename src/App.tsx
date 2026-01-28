import { useCallback, useEffect, useMemo, useState } from "react";
import {
  emotionSequence,
  totalSentences,
  type EmotionCategory,
  type SessionLog,
} from "@/data/emotionSentences";
import { PromptScreen } from "@/components/PromptScreen";
import { EmotionIntro } from "@/components/EmotionIntro";
import { SentenceDisplay } from "@/components/SentenceDisplay";
import { CompletionScreen } from "@/components/CompletionScreen";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { uploadSentenceLog } from "@/lib/sessionUploader";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

type Stage = "prompt" | "emotionIntro" | "sentence" | "complete";

export const App = () => {
  const [stage, setStage] = useState<Stage>("prompt");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [logs, setLogs] = useState<SessionLog[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const [sentenceStartedAt, setSentenceStartedAt] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [elapsedMs, setElapsedMs] = useState(0);
  const [participantName, setParticipantName] = useState("");
  const { startRecording, stopRecording, permission, dispose } = useVoiceRecorder();

  const currentCategory: EmotionCategory | undefined = emotionSequence[categoryIndex];
  const currentSentence = currentCategory?.sentences[sentenceIndex];

  const overallProgress = useMemo(() => {
    const completedBeforeCurrentCategory = emotionSequence
      .slice(0, categoryIndex)
      .reduce((total, category) => total + category.sentences.length, 0);

    return {
      current: completedBeforeCurrentCategory + (stage === "sentence" && currentSentence ? sentenceIndex + 1 : 0),
      total: totalSentences,
    };
  }, [categoryIndex, currentSentence, sentenceIndex, stage]);

  useEffect(() => {
    if (stage !== "sentence" || !currentSentence) {
      return;
    }

    setSentenceStartedAt(Date.now());
    setElapsedMs(0);
    setCanContinue(true);

    // start fresh recording per sentence
    startRecording().catch((error) => {
      console.error("Unable to start recording", error);
      setCanContinue(true);
    });
  }, [stage, currentSentence, categoryIndex, sentenceIndex, startRecording]);

  // Keyboard support for Enter key once continue is enabled
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" && canContinue && stage === "sentence") {
        event.preventDefault();
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canContinue, stage, sentenceIndex, categoryIndex]);

  // Live timer for UI feedback
  useEffect(() => {
    if (!sentenceStartedAt || stage !== "sentence") return;

    const interval = window.setInterval(() => {
      setElapsedMs(Date.now() - sentenceStartedAt);
    }, 200);

    return () => clearInterval(interval);
  }, [sentenceStartedAt, stage]);

  useEffect(() => () => dispose(), [dispose]);

  const startProtocol = (name: string) => {
    setStage("emotionIntro");
    setCategoryIndex(0);
    setSentenceIndex(0);
    setLogs([]);
    setSessionId(crypto.randomUUID());
    setParticipantName(name);
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
  }, [categoryIndex]);

  const handleContinue = useCallback(async () => {
    if (!canContinue || stage !== "sentence" || !currentCategory || !currentSentence) {
      return;
    }

    setCanContinue(false);

    const recording = await stopRecording();
    const now = new Date();
    const startedAtIso = recording?.startedAt
      ? recording.startedAt
      : sentenceStartedAt
        ? new Date(sentenceStartedAt).toISOString()
        : now.toISOString();
    const endedAtIso = recording?.endedAt ?? now.toISOString();
    const durationMs = recording?.durationMs ?? (sentenceStartedAt ? now.getTime() - sentenceStartedAt : 0);

    const logEntry: SessionLog = {
      emotionId: currentCategory.id,
      emotionLabel: currentCategory.label,
      sentenceId: currentSentence.id,
      sentence: currentSentence.text,
      startedAt: startedAtIso,
      endedAt: endedAtIso,
      durationMs,
      localAudioUrl: recording?.blob ? URL.createObjectURL(recording.blob) : undefined,
      participantName,
    };

    setLogs((prev) => [...prev, logEntry]);

    if (recording?.blob && isSupabaseConfigured) {
      try {
        const { audioUrl } = await uploadSentenceLog({
          sessionId,
          log: logEntry,
          participantId: participantName,
          audioBlob: recording.blob,
        });

        if (audioUrl) {
          setLogs((prev) => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], audioUrl };
            return next;
          });
        }
      } catch (error) {
        console.error("Failed to sync with Supabase", error);
      }
    } else if (!isSupabaseConfigured) {
      console.warn("Supabase not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable uploads.");
    }

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
    stopRecording,
    sessionId,
    participantName,
  ]);

  if (stage === "prompt") {
    return <PromptScreen onStart={startProtocol} />;
  }

  if (stage === "emotionIntro" && currentCategory) {
    return (
      <EmotionIntro
        label={currentCategory.label}
        description={currentCategory.description}
        positionText={`Block ${categoryIndex + 1} of ${emotionSequence.length}`}
        onBegin={handleBeginEmotion}
      />
    );
  }

  if (stage === "sentence" && currentCategory && currentSentence) {
    return (
      <SentenceDisplay
        emotionLabel={currentCategory.label}
        sentence={currentSentence}
        progressCurrent={overallProgress.current}
        progressTotal={overallProgress.total}
        onContinue={handleContinue}
        isButtonEnabled={canContinue}
        accentColor={currentCategory.palette.accent}
        elapsedMs={elapsedMs}
        micPermission={permission}
      />
    );
  }

  return <CompletionScreen logs={logs} />;
};
