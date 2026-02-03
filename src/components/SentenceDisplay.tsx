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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white via-[#f9fbff] to-white px-4">
      <ProgressIndicator current={progressCurrent} total={progressTotal} language={language} />

      <div className="text-center">
        <div
          className="inline-flex items-center gap-3 rounded-full border bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7b8394] shadow-sm"
          style={{ borderColor: `${accentColor}55` }}
        >
          <span
            className="h-2 w-2 rounded-full shadow-[0_0_0_6px_rgba(127,143,255,0.18)]"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 0 6px ${accentColor}22`,
            }}
          />
          {emotionLabel}
        </div>
        <h2 className="sentence-text mx-auto mt-6 text-slate-900 transition-opacity duration-500">
          {sentence.text}
        </h2>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-[0_8px_24px_-16px_rgba(46,64,96,0.35)]">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full"
              style={{ backgroundColor: `${accentColor}66` }}
            />
            <span
              className="relative inline-flex h-3 w-3 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </span>
          {copy.timerLabel}
          <span className="font-semibold text-slate-800">{seconds.toFixed(1)}s</span>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <button
          onClick={onContinue}
          disabled={!isButtonEnabled}
          className={[
            "continue-button inline-flex items-center gap-2 rounded-full px-14 py-4 text-base font-semibold transition-all duration-300",
            isButtonEnabled ? "opacity-100 translate-y-0" : "opacity-60 cursor-not-allowed",
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
