import { uiCopy, type Language } from "@/data/i18n";

interface PracticeCompleteProps {
  onBegin: () => void;
  language: Language;
}

export const PracticeComplete = ({ onBegin, language }: PracticeCompleteProps) => {
  const copy = uiCopy[language];
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f8f9fb] px-6 text-center">
      <div className="max-w-xl rounded-3xl border border-white/80 bg-white/90 p-10 shadow-2xl shadow-slate-200">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
          {copy.practiceTag}
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900">
          {copy.practiceCompleteTitle}
        </h2>
        <p className="mt-4 text-base text-slate-600">{copy.practiceCompleteBody}</p>
        <button
          onClick={onBegin}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-4 text-base font-medium text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5"
        >
          {copy.practiceCompleteAction}
        </button>
      </div>
    </div>
  );
};
