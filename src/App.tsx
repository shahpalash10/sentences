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

type Stage = "prompt" | "emotionIntro" | "sentence" | "complete";

export const App = () => {
  const [stage, setStage] = useState<Stage>("prompt");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [logs, setLogs] = useState<SessionLog[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const [sentenceStartedAt, setSentenceStartedAt] = useState<number | null>(null);

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

  // Handle start of each sentence: record start time and enable immediate advance
  useEffect(() => {
    if (stage !== "sentence" || !currentSentence) {
      return;
    }

    setSentenceStartedAt(Date.now());
    setCanContinue(true);
  }, [stage, currentSentence, categoryIndex, sentenceIndex]);

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

  const startProtocol = () => {
    setStage("emotionIntro");
    setCategoryIndex(0);
    setSentenceIndex(0);
    setLogs([]);
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

  const handleContinue = useCallback(() => {
    if (!canContinue || stage !== "sentence" || !currentCategory || !currentSentence) {
      return;
    }

    setLogs((prev) => [
      ...prev,
      {
        emotionId: currentCategory.id,
        emotionLabel: currentCategory.label,
        sentenceId: currentSentence.id,
        sentence: currentSentence.text,
        startedAt: sentenceStartedAt ? new Date(sentenceStartedAt).toISOString() : new Date().toISOString(),
        continueClickedAt: new Date().toISOString(),
      },
    ]);

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
      />
    );
  }

  return <CompletionScreen logs={logs} />;
};
