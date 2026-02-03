import { useState } from "react";
import { uiCopy, type Language } from "@/data/i18n";
interface PromptScreenProps {
  onStart: (participantName: string) => void;
  language: Language;
}

export const PromptScreen = ({ onStart, language }: PromptScreenProps) => {
  const [name, setName] = useState("");
  const copy = uiCopy[language];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#f8f9fb] text-center px-6">
      <div className="max-w-2xl">
        <div className="mx-auto mb-10 h-20 w-20 rounded-3xl bg-gradient-to-b from-[#e8edf7] to-white shadow-inner" />
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{copy.appTitle}</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-900">{copy.appSubtitle}</h1>
        <div className="mt-10 rounded-3xl border border-white/80 bg-white/90 p-8 shadow-2xl shadow-slate-200">
          <p className="text-sm font-medium tracking-[0.25em] text-slate-400 mb-6">{copy.howItWorks}</p>
          <ol className="space-y-4 text-left text-slate-600">
            {copy.promptChecklist.map((item, index) => (
              <li key={item} className="flex items-start gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
                  {index + 1}
                </span>
                <p className="text-base leading-relaxed text-slate-600">{item}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 space-y-3 text-left">
            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {copy.participantNameLabel}
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.participantNamePlaceholder}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-slate-400 focus:outline-none"
            />
          </div>
          <button
            onClick={() => onStart(name.trim())}
            disabled={!name.trim()}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-4 text-base font-medium text-white shadow-lg shadow-slate-900/20 transition hover:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {copy.beginSession}
          </button>
          <p className="mt-4 text-xs text-slate-400">{copy.estimatedDuration}</p>
        </div>
      </div>
    </div>
  );
};
