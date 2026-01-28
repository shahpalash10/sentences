import type { EmotionSentence } from "@/data/emotionSentences";
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
   micPermission: string;
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
  micPermission,
}: SentenceDisplayProps) => {
  const seconds = Math.max(0, elapsedMs) / 1000;
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white via-[#f9fbff] to-white px-4">
      <ProgressIndicator current={progressCurrent} total={progressTotal} />

      <div className="text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#e4e8f1] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7b8394] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#7f8fff] shadow-[0_0_0_6px_rgba(127,143,255,0.18)]" />
          {emotionLabel}
        </div>
        <h2 className="sentence-text mx-auto mt-6 text-slate-900 transition-opacity duration-500">
          {sentence.text}
        </h2>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-[0_8px_24px_-16px_rgba(46,64,96,0.35)]">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0ea5e9]/60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#0ea5e9]" />
          </span>
          {micPermission === "denied" ? "Microphone blocked" : "Recording"}
          <span className="font-semibold text-slate-800">{seconds.toFixed(1)}s</span>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <button
          onClick={onContinue}
          className={[
            "continue-button inline-flex items-center gap-2 rounded-full px-14 py-4 text-base font-semibold transition-all duration-300",
            isButtonEnabled ? "opacity-100 translate-y-0" : "opacity-60",
          ].join(" ")}
          style={{
            boxShadow: `0 18px 38px -20px ${accentColor}`,
          }}
        >
          Continue →
        </button>
        <p className="text-xs text-[#9aa3b5]">Press Enter to continue</p>
      </div>
    </div>
  );
};
