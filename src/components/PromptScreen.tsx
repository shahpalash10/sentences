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
    <div className="fixed inset-0 overflow-y-auto bg-[#f8f9fb] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 h-16 w-16 rounded-3xl bg-white border border-slate-100 shadow-md flex items-center justify-center">
            <span className="text-2xl">🎙️</span>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{copy.appTitle}</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            {copy.appSubtitle}
          </h1>
        </div>

        {/* Process Overview */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">{copy.processOverview}</p>
          <div className="space-y-3">
            {copy.processSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{step.label}</p>
                  <p className="mt-0.5 text-sm text-slate-500 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Valence & Arousal Explainer */}
        <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-3">{copy.valenceTitle}</p>
          <p className="text-sm text-slate-500 mb-4">{copy.valenceExplainer}</p>
          <div className="space-y-3">
            <div className="rounded-xl bg-white border border-slate-100 p-4 shadow-sm">
              <span className="inline-block mb-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">Valence</span>
              <p className="text-sm text-slate-600 leading-relaxed">{copy.valenceDef}</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-100 p-4 shadow-sm">
              <span className="inline-block mb-1 rounded-full bg-orange-50 border border-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600">Arousal</span>
              <p className="text-sm text-slate-600 leading-relaxed">{copy.arousalDef}</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-indigo-400 font-medium">{copy.valenceExample}</p>
        </div>

        {/* How It Works */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">{copy.howItWorks}</p>
          <ol className="space-y-3">
            {copy.promptChecklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-600">{item}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Name + Begin */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            {copy.participantNameLabel}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.participantNamePlaceholder}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-inner focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <button
            onClick={() => onStart(name.trim())}
            disabled={!name.trim()}
            className="mt-4 w-full inline-flex items-center justify-center rounded-xl bg-slate-900 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copy.beginSession}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">{copy.estimatedDuration}</p>
        </div>
      </div>
    </div>
  );
};
