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
  palette: { accent: string; subtle: string };
  translations: Record<
    Language,
    { label: string; description: string; sentences: EmotionSentence[] }
  >;
}> = [
  {
    id: "neutral_baseline",
    palette: { accent: "#E3E7F1", subtle: "#6E768C" },
    translations: {
      en: {
        label: "Neutral",
        description: "Deliver the sentence in a steady, matter-of-fact tone.",
        sentences: [
          { id: 1, text: "The meeting is scheduled for three o'clock." },
          { id: 2, text: "Please place the notebook on the desk." },
          { id: 3, text: "The train arrives at platform four." },
          { id: 4, text: "The document was uploaded successfully." },
          { id: 5, text: "We'll review the results together tomorrow." },
        ],
      },
      ja: {
        label: "ニュートラル",
        description: "淡々とした落ち着いたトーンで話してください。",
        sentences: [
          { id: 1, text: "会議は3時に予定されています。" },
          { id: 2, text: "ノートを机の上に置いてください。" },
          { id: 3, text: "列車は4番線に到着します。" },
          { id: 4, text: "書類は正常にアップロードされました。" },
          { id: 5, text: "明日、一緒に結果を確認しましょう。" },
        ],
      },
    },
  },
  {
    id: "high_arousal_positive",
    palette: { accent: "#F9E6D8", subtle: "#C66C3A" },
    translations: {
      en: {
        label: "High Valence + High Arousal",
        description: "Pleasant and energized: excitement, triumph, joy.",
        sentences: [
          { id: 6, text: "I cheered when the results were announced." },
          { id: 7, text: "I jumped with excitement after hearing the news." },
          { id: 8, text: "I broke into applause." },
          { id: 9, text: "I couldn't stop smiling during the celebration." },
        ],
      },
      ja: {
        label: "高快・高覚醒",
        description: "喜びや高揚感を強く込めて話してください。",
        sentences: [
          { id: 6, text: "結果が発表されると、私は歓声を上げました。" },
          { id: 7, text: "その知らせを聞いて、私は嬉しさのあまり跳びはねました。" },
          { id: 8, text: "私は拍手を送りました。" },
          { id: 9, text: "お祝いの間、私は笑顔が止まりませんでした。" },
        ],
      },
    },
  },
  {
    id: "high_arousal_negative",
    palette: { accent: "#F6DADB", subtle: "#A54141" },
    translations: {
      en: {
        label: "Low Valence + High Arousal",
        description: "Unpleasant and energized: anger, panic, fear.",
        sentences: [
          { id: 10, text: "The argument escalated into shouting." },
          { id: 11, text: "Panic spread quickly through the room." },
          { id: 12, text: "I slammed the door in anger." },
          { id: 13, text: "My voice trembled with rage." },
        ],
      },
      ja: {
        label: "低快・高覚醒",
        description: "怒りや不安、恐怖を強く込めて話してください。",
        sentences: [
          { id: 10, text: "口論は叫び声にまでエスカレートしました。" },
          { id: 11, text: "パニックが部屋中に急速に広がりました。" },
          { id: 12, text: "私は怒ってドアを強く閉めました。" },
          { id: 13, text: "怒りで私の声が震えました。" },
        ],
      },
    },
  },
  {
    id: "low_arousal_positive",
    palette: { accent: "#DBF0EA", subtle: "#4A7F70" },
    translations: {
      en: {
        label: "High Valence + Low Arousal",
        description: "Pleasant and calm: serenity, comfort, relief.",
        sentences: [
          { id: 14, text: "The lake lies still and the cabin lights glow softly." },
          { id: 15, text: "Fresh tea is steeping by the open window." },
          { id: 16, text: "Everything feels quiet and safe right now." },
          { id: 17, text: "Every email in the queue has been answered." },
        ],
      },
      ja: {
        label: "高快・低覚醒",
        description: "穏やかさや安らぎを込めて話してください。",
        sentences: [
          { id: 14, text: "湖は静まり、キャビンの明かりが柔らかく灯っています。" },
          { id: 15, text: "開いた窓のそばで新しいお茶が蒸らされています。" },
          { id: 16, text: "今は静かで安心できます。" },
          { id: 17, text: "キューのメールはすべて返信済みです。" },
        ],
      },
    },
  },
  {
    id: "low_arousal_negative",
    palette: { accent: "#E7E3ED", subtle: "#5F5369" },
    translations: {
      en: {
        label: "Low Valence + Low Arousal",
        description: "Unpleasant and subdued: sadness, loneliness, fatigue.",
        sentences: [
          { id: 18, text: "The hallway feels longer at this hour." },
          { id: 19, text: "The voicemail light keeps blinking in the dark." },
          { id: 20, text: "It feels empty, and I don't want to be here." },
          { id: 21, text: "There's no one left to talk to." },
        ],
      },
      ja: {
        label: "低快・低覚醒",
        description: "落ち込みや疲れを静かに込めて話してください。",
        sentences: [
          { id: 18, text: "この時間の廊下はいつもより長く感じます。" },
          { id: 19, text: "暗闇の中で留守電のランプが点滅し続けています。" },
          { id: 20, text: "空っぽに感じて、ここにいたくありません。" },
          { id: 21, text: "話す相手がもう誰もいません。" },
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
      sentences: translation.sentences,
      palette: category.palette,
    };
  });

export const totalSentences = emotionCategoryDefinitions.reduce(
  (total, category) => total + category.translations.en.sentences.length,
  0,
);
