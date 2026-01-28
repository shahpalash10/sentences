interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export const ProgressIndicator = ({ current, total }: ProgressIndicatorProps) => {
  const percent = total === 0 ? 0 : Math.min(1, current / total);
  return (
    <div className="mx-auto mb-10 flex w-full max-w-3xl flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.28em] text-[#7b8394]">
        <span>Sentence {current}</span>
        <span>
          {Math.round(percent * 100)}% • {total} total
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#e7ebf3]">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#7f8fff] via-[#6ee7ff] to-[#8be7c0] shadow-[0_6px_16px_-10px_rgba(88,110,255,0.6)] transition-[width]
          duration-700 ease-out"
          style={{ width: `${percent * 100}%` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.7),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.4),transparent_36%)]" />
      </div>
    </div>
  );
};
