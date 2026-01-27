interface EmotionIntroProps {
  label: string;
  description: string;
  positionText: string;
  onBegin: () => void;
}

export const EmotionIntro = ({ label, description, positionText, onBegin }: EmotionIntroProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fdfdfd] px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Next Emotion</p>
      <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-900">{label}</h2>
      <p className="mt-4 max-w-xl text-base text-slate-600">{description}</p>
      <p className="mt-6 text-sm tracking-[0.3em] text-slate-400">{positionText}</p>
      <button
        onClick={onBegin}
        className="mt-12 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5"
      >
        Begin Sentences →
      </button>
    </div>
  );
};
