interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => {
  const segments = Math.min(10, Math.max(3, Math.round(total / 3)));
  const active = Math.max(0, Math.min(segments, Math.round((current / total) * segments)));
  return (
    <div className="mx-auto mb-10 flex w-full max-w-xl flex-col items-center gap-3 text-slate-400">
      <p className="text-xs font-medium tracking-[0.35em] uppercase text-[#7b8394]">
        Sentence {current} of {total}
      </p>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: segments }).map((_, idx) => {
          const filled = idx < active;
          return (
            <span
              // segments are purely decorative and not interactive
              key={idx}
              className={[
                "h-[3px] w-10 rounded-full transition-all duration-300",
                filled ? "bg-[#7b8598]" : "bg-[#d9dde6]",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
};
