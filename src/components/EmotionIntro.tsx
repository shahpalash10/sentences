import { useState, useRef } from "react";
import { uiCopy, type Language } from "@/data/i18n";

interface EmotionIntroProps {
  label: string;
  description: string;
  positionText: string;
  audioFile: string | null;
  onBegin: () => void;
  language: Language;
}

export const EmotionIntro = ({
  label,
  description,
  positionText,
  audioFile,
  onBegin,
  language,
}: EmotionIntroProps) => {
  const copy = uiCopy[language];
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fdfdfd] px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{copy.nextEmotion}</p>
      <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-slate-900">{label}</h2>
      <p className="mt-4 max-w-xl text-base text-slate-600">{description}</p>

      {/* Audio example card — only shown when an audio file is available */}
      {audioFile && (
        <div className="mt-8 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-md text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">
            {copy.audioExample}
          </p>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">{copy.audioHint}</p>
          <audio
            ref={audioRef}
            src={audioFile}
            onEnded={() => setPlaying(false)}
          />
          <button
            onClick={toggleAudio}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
          >
            <span className="text-base">{playing ? "⏸" : "▶️"}</span>
            {playing ? copy.audioPause : copy.audioExample}
          </button>
        </div>
      )}

      <p className="mt-8 text-sm tracking-[0.3em] text-slate-400">{positionText}</p>
      <button
        onClick={onBegin}
        className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-medium text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5"
      >
        {copy.beginSentences}
      </button>
    </div>
  );
};
