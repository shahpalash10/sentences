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
}

export const SentenceDisplay = ({
  emotionLabel,
  sentence,
  progressCurrent,
  progressTotal,
  onContinue,
  isButtonEnabled,
  accentColor,
}: SentenceDisplayProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white px-4">
      <ProgressIndicator current={progressCurrent} total={progressTotal} />
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#7b8394]">{emotionLabel}</p>
        <h2 className="mt-6 text-4xl md:text-6xl font-medium leading-tight text-slate-900 transition-opacity duration-500">
          {sentence.text}
        </h2>
      </div>
      <div className="mt-16 flex flex-col items-center gap-4">
        <button
          onClick={onContinue}
          className={[
            "inline-flex items-center gap-2 rounded-full px-12 py-4 text-base font-medium transition-all duration-300",
            "shadow-xl shadow-slate-900/12 bg-[#111827] text-white",
            isButtonEnabled ? "opacity-100 translate-y-0" : "opacity-70",
          ].join(" ")}
          style={{
            boxShadow: `0 18px 38px -24px ${accentColor}`,
          }}
        >
          Continue →
        </button>
        <p className="text-xs text-[#9aa3b5]">Press Enter to continue</p>
      </div>
    </div>
  );
};
