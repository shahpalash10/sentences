import type { EmotionSentence } from "@/data/emotionSentences";
import { uiCopy, type Language } from "@/data/i18n";
import { ProgressIndicator } from "./ProgressIndicator";

interface SentenceDisplayProps {
  emotionLabel: string;
  sentence: EmotionSentence;
  progressCurrent: number;
  progressTotal: number;
  onContinue: () => void;
  isButtonEnabled: boolean;
  accentColor: string;
  elapsedMs: number;
  language: Language;
}

export const SentenceDisplay = ({
  emotionLabel,
  sentence,
  progressCurrent,
  progressTotal,
  onContinue,
  isButtonEnabled,
  accentColor,
  elapsedMs,
  language,
}: SentenceDisplayProps) => {
  const seconds = Math.max(0, elapsedMs) / 1000;
  const copy = uiCopy[language];
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f4f6fa] px-4">
      <ProgressIndicator current={progressCurrent} total={progressTotal} language={language} />

      {/* Main card — clear bordered container */}
      <div
        className="relative w-full max-w-2xl rounded-3xl border bg-white p-10 pt-14 text-center shadow-2xl shadow-slate-200/60 mt-6"
        style={{ borderColor: `${accentColor}55` }}
      >
        {/* Timer — fixed to top-right corner of the card */}
        <div className="absolute top-5 right-5 inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 shadow-sm">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: `${accentColor}` }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </span>
          {copy.timerLabel}
          <span className="font-semibold tabular-nums text-slate-700">{seconds.toFixed(1)}s</span>
        </div>

        {/* Emotion pill — sized up, prominent */}
        <div
          className="inline-flex items-center gap-3 rounded-full border-2 bg-white px-7 py-3 text-sm font-bold uppercase tracking-[0.2em] shadow-sm"
          style={{ borderColor: `${accentColor}`, color: "#444" }}
        >
          <span
            className="h-3.5 w-3.5 rounded-full"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 0 5px ${accentColor}33`,
            }}
          />
          {emotionLabel}
        </div>

        {/* Sentence */}
        <h2 className="sentence-text mx-auto mt-10 mb-10 text-slate-900 transition-opacity duration-500">
          {sentence.text}
        </h2>
      </div>

      {/* Continue button below the card */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={onContinue}
          disabled={!isButtonEnabled}
          className={[
            "continue-button inline-flex items-center gap-2 rounded-full px-14 py-4 text-base font-semibold transition-all duration-300",
            isButtonEnabled ? "opacity-100 translate-y-0" : "opacity-50 cursor-not-allowed",
          ].join(" ")}
          style={{
            boxShadow: `0 18px 38px -20px ${accentColor}`,
          }}
        >
          {copy.continue}
        </button>
        <p className="text-xs text-[#9aa3b5]">{copy.pressEnter}</p>
      </div>
    </div>
  );
};
