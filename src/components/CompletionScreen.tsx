import { Check } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { type SessionLog } from "@/data/emotionSentences";
import { uiCopy, type Language } from "@/data/i18n";

interface CompletionScreenProps {
  logs: SessionLog[];
  language: Language;
}

export const CompletionScreen = ({ logs, language }: CompletionScreenProps) => {
  const copy = uiCopy[language];
  const totalDurationMs = logs.reduce((acc, log) => acc + (log.durationMs || 0), 0);
  const avgDurationMs = logs.length ? totalDurationMs / logs.length : 0;

  const handleExportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `emotion-session-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const uniqueEmotions = Array.from(new Set(logs.map((log) => log.emotionId))).length;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f5f7fb] px-6">
      <div className="max-w-lg rounded-3xl border border-white/70 bg-white/90 p-12 text-center shadow-2xl shadow-slate-200">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-slate-50 to-slate-200 text-slate-700">
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          {copy.sessionComplete}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          {copy.completionThanks}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 text-left text-slate-900">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-3xl font-semibold">{logs.length}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{copy.sentencesLogged}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-3xl font-semibold">{uniqueEmotions}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{copy.emotionStates}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-3xl font-semibold">{(avgDurationMs / 1000).toFixed(1)}s</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{copy.avgReadTime}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 col-span-2">
            <p className="text-xl font-semibold text-slate-700">
              {copy.exportPrompt}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {copy.exportDetails}
            </p>
          </div>
        </div>

        <button
          onClick={handleExportLogs}
          className="mt-12 inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white shadow-xl shadow-slate-900/20 transition hover:translate-y-0.5"
        >
          {copy.exportSessionData}
        </button>

        <p className="mt-4 text-xs text-slate-400">{copy.localDataNote}</p>
      </div>
    </div>
  );
};
