import type { Language } from "@/data/i18n";
import { languageOptions } from "@/data/i18n";

interface LanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
}

export const LanguageToggle = ({ language, onChange }: LanguageToggleProps) => {
  return (
    <div className="fixed right-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-lg shadow-slate-200 backdrop-blur-md">
      {languageOptions.map((option) => {
        const isActive = language === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={[
              "rounded-full px-4 py-2 text-xs font-semibold transition",
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
