import { getEmotionSequence, totalSentences } from "@/data/emotionSentences";
import { uiCopy, type Language } from "@/data/i18n";
import { SentenceDisplay } from "@/components/SentenceDisplay";

interface PreviewSlideProps {
  language: Language;
  onStartPractice: () => void;
}

export const PreviewSlide = ({ language, onStartPractice }: PreviewSlideProps) => {
  const copy = uiCopy[language];
  const sampleCategory = getEmotionSequence(language)[0];
  const sampleSentence = sampleCategory.sentences[0];

  return (
    <div className="preview-slide">
      <SentenceDisplay
        emotionLabel={sampleCategory.label}
        sentence={sampleSentence}
        progressCurrent={1}
        progressTotal={totalSentences}
        onContinue={() => undefined}
        isButtonEnabled={false}
        accentColor={sampleCategory.palette.accent}
        elapsedMs={1200}
        language={language}
      />

      <div className="fixed inset-x-0 top-5 z-10 flex flex-col items-center gap-3 px-4 text-center">
        <div className="rounded-full border border-white/70 bg-white/90 px-5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
          {copy.previewTag}
        </div>
        <p className="max-w-2xl text-sm text-slate-500">{copy.previewSubtitle}</p>
        <button
          onClick={onStartPractice}
          className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5"
        >
          {copy.previewAction}
        </button>
      </div>

      <div className="pointer-events-none fixed inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="4"
              markerHeight="4"
              refX="3"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 4 2, 0 4" fill="#94a3b8" />
            </marker>
          </defs>
          <line
            x1="16"
            y1="19"
            x2="28"
            y2="22"
            stroke="#cbd5f0"
            strokeWidth="0.4"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="82"
            y1="28"
            x2="70"
            y2="30"
            stroke="#cbd5f0"
            strokeWidth="0.4"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="18"
            y1="50"
            x2="40"
            y2="50"
            stroke="#cbd5f0"
            strokeWidth="0.4"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="82"
            y1="60"
            x2="60"
            y2="56"
            stroke="#cbd5f0"
            strokeWidth="0.4"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="22"
            y1="82"
            x2="40"
            y2="78"
            stroke="#cbd5f0"
            strokeWidth="0.4"
            markerEnd="url(#arrowhead)"
          />
        </svg>
        <div className="absolute left-4 top-24 md:left-10">
          <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {copy.previewCallouts.progress}
          </div>
        </div>
        <div className="absolute right-4 top-44 md:right-12">
          <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {copy.previewCallouts.emotion}
          </div>
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 md:left-12">
          <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {copy.previewCallouts.sentence}
          </div>
        </div>
        <div className="absolute right-4 top-[58%] md:right-12">
          <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {copy.previewCallouts.timer}
          </div>
        </div>
        <div className="absolute bottom-28 left-4 md:left-12">
          <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            {copy.previewCallouts.continue}
          </div>
        </div>
      </div>
    </div>
  );
};
