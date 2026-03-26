import type { Language } from "./i18n";

export type EmotionCategoryId =
  | "neutral_baseline"
  | "high_arousal_positive"
  | "high_arousal_negative"
  | "low_arousal_positive"
  | "low_arousal_negative";

export interface EmotionSentence {
  id: number;
  text: string;
}

export interface EmotionCategory {
  id: EmotionCategoryId;
  label: string;
  description: string;
  audioFile: string | null;
  sentences: EmotionSentence[];
  palette: {
    accent: string;
    subtle: string;
  };
}

export interface SessionLog {
  emotionId: EmotionCategoryId;
  emotionLabel: string;
  sentenceId: number;
  sentence: string;
  sessionId: string;
  sessionStartedAtMs: number;
  sessionStartedAtLocal: string;
  sentenceShownAtMs: number;
  sentenceShownAtLocal: string;
  continuePressedAtMs: number;
  continuePressedAtLocal: string;
  durationMs: number;
  participantName?: string;
}

const emotionCategoryDefinitions: Array<{
  id: EmotionCategoryId;
  audioFile: string | null;
  palette: { accent: string; subtle: string };
  translations: Record<
    Language,
    { label: string; description: string; sentences: EmotionSentence[] }
  >;
}> = [
  {
    id: "neutral_baseline",
    audioFile: "/audio/neutral.mp3",
    palette: { accent: "#E3E7F1", subtle: "#6E768C" },
    translations: {
      en: {
        label: "Neutral",
        description: "Read in a calm, flat tone — no emotion, just stating a fact.",
        sentences: [
          { id: 1, text: "The meeting starts at three." },
          { id: 2, text: "Just leave the notebook on the desk." },
          { id: 3, text: "The train's coming on platform four." },
          { id: 4, text: "Looks like the document uploaded fine." },
          { id: 5, text: "Let's review the results tomorrow." },
        ],
      },
      ja: {
        label: "ニュートラル",
        description: "感情を込めず、淡々と事実を述べるように読んでください。",
        sentences: [
          { id: 1, text: "会議は3時に始まります。" },
          { id: 2, text: "ノートは机に置いておいてください。" },
          { id: 3, text: "列車は4番線に来ます。" },
          { id: 4, text: "書類はうまくアップロードできたようです。" },
          { id: 5, text: "明日、一緒に結果を確認しましょう。" },
        ],
      },
    },
  },
  {
    id: "high_arousal_positive",
    audioFile: "/audio/high_arousal_high_valence.mp3",
    palette: { accent: "#F9E6D8", subtle: "#C66C3A" },
    translations: {
      en: {
        label: "Joy & Excitement",
        description: "Happy, excited, thrilled — like something great just happened.",
        sentences: [
          { id: 6, text: "I can't wait for the weekend, I am so excited!" },
          { id: 7, text: "I was so happy when I got the results back!" },
          { id: 8, text: "I can't believe they won the game!" },
          { id: 9, text: "We should go out and celebrate on Friday!" },
        ],
      },
      ja: {
        label: "喜び・興奮",
        description: "嬉しくて、興奮している — 何か素晴らしいことが起きたような気持ちで。",
        sentences: [
          { id: 6, text: "週末が待ち遠しくて、もう本当に楽しみ！" },
          { id: 7, text: "結果が来たとき、本当に嬉しかった！" },
          { id: 8, text: "あのチームが勝つなんて、信じられない！" },
          { id: 9, text: "金曜日、みんなで出かけてお祝いしようよ！" },
        ],
      },
    },
  },
  {
    id: "high_arousal_negative",
    audioFile: "/audio/high_arousal_low_valence.mp3",
    palette: { accent: "#F6DADB", subtle: "#A54141" },
    translations: {
      en: {
        label: "Stress & Panic",
        description: "Worried, tense, anxious — like something is going wrong right now.",
        sentences: [
          { id: 10, text: "This is bad, what am I going to do?" },
          { id: 11, text: "What am I supposed to do in this situation?" },
          { id: 12, text: "I feel so stressed out right now." },
          { id: 13, text: "Am I about to completely mess this up?" },
        ],
      },
      ja: {
        label: "ストレス・パニック",
        description: "不安で、緊張している — 何かがうまくいっていないような気持ちで。",
        sentences: [
          { id: 10, text: "やばい、どうしたらいいんだろう？" },
          { id: 11, text: "この状況、どう対応すればいいの？" },
          { id: 12, text: "今、本当にストレスがやばい。" },
          { id: 13, text: "完全にやらかしそうで怖い。" },
        ],
      },
    },
  },
  {
    id: "low_arousal_positive",
    audioFile: "/audio/high_valence_low_arousal.mp3",
    palette: { accent: "#DBF0EA", subtle: "#4A7F70" },
    translations: {
      en: {
        label: "Calm & Relaxed",
        description: "Peaceful, content, at ease — like you have nothing to worry about.",
        sentences: [
          { id: 14, text: "Ahhh, this feels nice and calming." },
          { id: 15, text: "I feel so relaxed right now." },
          { id: 16, text: "Exams are finally over, time to chill and relax." },
          { id: 17, text: "Can't this moment last a little longer?" },
        ],
      },
      ja: {
        label: "落ち着き・リラックス",
        description: "穏やかで、のんびりしている — 何も心配することがないような気持ちで。",
        sentences: [
          { id: 14, text: "あー、これ気持ちいいし、落ち着くなあ。" },
          { id: 15, text: "今、すごくリラックスしてる。" },
          { id: 16, text: "ようやく試験が終わった、ゆっくりしよう。" },
          { id: 17, text: "この瞬間、もう少し続かないかな。" },
        ],
      },
    },
  },
  {
    id: "low_arousal_negative",
    audioFile: "/audio/low_valence_low_arousal.mp3",
    palette: { accent: "#E7E3ED", subtle: "#5F5369" },
    translations: {
      en: {
        label: "Sad & Tired",
        description: "Low energy, down, worn out — like you just don't have the energy for anything.",
        sentences: [
          { id: 18, text: "Sorry, I am not really in the mood today." },
          { id: 19, text: "I just don't feel like doing anything right now." },
          { id: 20, text: "I don't really feel like talking to anyone." },
          { id: 21, text: "Today has been really tiring." },
          { id: 22, text: "Nothing really matters right now." },
          { id: 23, text: "I just want to stay in bed and sleep." },
        ],
      },
      ja: {
        label: "悲しみ・疲れ",
        description: "エネルギーが低く、落ち込んでいる — 何もする気力がないような気持ちで。",
        sentences: [
          { id: 18, text: "ごめん、今日はあまり気分が乗らない。" },
          { id: 19, text: "今は何もしたくない気分。" },
          { id: 20, text: "誰かと話す気分じゃない。" },
          { id: 21, text: "今日は本当に疲れた。" },
          { id: 22, text: "今は何も大事に思えない。" },
          { id: 23, text: "ずっとベッドで寝ていたい。" },
        ],
      },
    },
  },
];

export const getEmotionSequence = (language: Language): EmotionCategory[] =>
  emotionCategoryDefinitions.map((category) => {
    const translation = category.translations[language];
    return {
      id: category.id,
      label: translation.label,
      description: translation.description,
      audioFile: category.audioFile,
      sentences: translation.sentences,
      palette: category.palette,
    };
  });

export const totalSentences = emotionCategoryDefinitions.reduce(
  (total, category) => total + category.translations.en.sentences.length,
  0,
);
