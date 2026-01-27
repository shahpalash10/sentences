interface PromptScreenProps {
  onStart: () => void;
}

export const PromptScreen = ({ onStart }: PromptScreenProps) => {
  const checklist = [
    "You'll see sentences grouped by emotional categories",
    "Each sentence remains on screen for five seconds",
    "Read naturally, as if speaking the emotion aloud",
    "Progress is linear — stay with the present prompt",
  ];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f8f9fb] text-center px-6">
      <div className="max-w-2xl">
        <div className="mx-auto mb-10 h-20 w-20 rounded-3xl bg-gradient-to-b from-[#e8edf7] to-white shadow-inner" />
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Emotion Voice Study</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-900">Research-grade data collection for emotion-conditioned voice analysis</h1>
        <div className="mt-10 rounded-3xl border border-white/80 bg-white/90 p-8 shadow-2xl shadow-slate-200">
          <p className="text-sm font-medium tracking-[0.25em] text-slate-400 mb-6">HOW IT WORKS</p>
          <ol className="space-y-4 text-left text-slate-600">
            {checklist.map((item, index) => (
              <li key={item} className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
                  {index + 1}
                </span>
                <p className="text-base leading-relaxed text-slate-600">{item}</p>
              </li>
            ))}
          </ol>
          <button
            onClick={onStart}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-4 text-base font-medium text-white shadow-lg shadow-slate-900/20 transition hover:translate-y-0.5"
          >
            Begin Session →
          </button>
          <p className="mt-4 text-xs text-slate-400">Estimated duration: 15–20 minutes</p>
        </div>
      </div>
    </div>
  );
};
