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
        label: "Neutral Baseline",
        description: "Center yourself with a steady, neutral delivery.",
        sentences: [
          { id: 1, text: "The meeting is scheduled for three o'clock." },
          { id: 2, text: "Please place the notebook on the desk." },
          { id: 3, text: "The train arrives at platform four." },
          { id: 4, text: "The document was uploaded successfully." },
        ],
      },
      ja: {
        label: "ニュートラル・ベースライン",
        description: "落ち着いた中立的なトーンで話してください。",
        sentences: [
          { id: 1, text: "会議は3時に予定されています。" },
          { id: 2, text: "ノートを机の上に置いてください。" },
          { id: 3, text: "列車は4番線に到着します。" },
          { id: 4, text: "書類は正常にアップロードされました。" },
        ],
      },
    },
  },
  {
    id: "high_arousal_positive",
    palette: { accent: "#F9E6D8", subtle: "#C66C3A" },
    translations: {
      en: {
        label: "High Arousal Positive",
        description: "Let the words carry excitement and uplift.",
        sentences: [
          { id: 5, text: "Everyone cheered when the results were announced." },
          { id: 6, text: "She jumped with excitement after hearing the news." },
          { id: 7, text: "The crowd erupted in applause." },
          { id: 8, text: "He couldn't stop smiling during the celebration." },
        ],
      },
      ja: {
        label: "高覚醒・ポジティブ",
        description: "高揚感と喜びをのせて話してください。",
        sentences: [
          { id: 5, text: "結果が発表されると、みんなが歓声を上げました。" },
          { id: 6, text: "その知らせを聞いて、彼女は嬉しさのあまり跳びはねました。" },
          { id: 7, text: "群衆から拍手が沸き起こりました。" },
          { id: 8, text: "お祝いの間、彼は笑顔が止まりませんでした。" },
        ],
      },
    },
  },
  {
    id: "high_arousal_negative",
    palette: { accent: "#F6DADB", subtle: "#A54141" },
    translations: {
      en: {
        label: "High Arousal Negative",
        description: "Channel urgency, tension, or alarm.",
        sentences: [
          { id: 9, text: "The argument escalated into shouting." },
          { id: 10, text: "Panic spread quickly through the room." },
          { id: 11, text: "She slammed the door in anger." },
          { id: 12, text: "His voice trembled with rage." },
        ],
      },
      ja: {
        label: "高覚醒・ネガティブ",
        description: "切迫感や緊張、警戒心を込めて話してください。",
        sentences: [
          { id: 9, text: "口論は叫び声にまでエスカレートしました。" },
          { id: 10, text: "パニックが部屋中に急速に広がりました。" },
          { id: 11, text: "彼女は怒ってドアを強く閉めました。" },
          { id: 12, text: "怒りで彼の声が震えました。" },
        ],
      },
    },
  },
  {
    id: "low_arousal_positive",
    palette: { accent: "#DBF0EA", subtle: "#4A7F70" },
    translations: {
      en: {
        label: "Low Arousal Positive",
        description: "Speak with calm optimism and warmth.",
        sentences: [
          { id: 13, text: "The lake lies still and the cabin lights glow softly." },
          { id: 14, text: "Fresh tea is steeping by the open window." },
          { id: 15, text: "Every email in the queue has been answered." },
          { id: 16, text: "We'll review the results together tomorrow." },
        ],
      },
      ja: {
        label: "低覚醒・ポジティブ",
        description: "穏やかな前向きさと温かさで話してください。",
        sentences: [
          { id: 13, text: "湖は静まり、キャビンの明かりが柔らかく灯っています。" },
          { id: 14, text: "開いた窓のそばで新しいお茶が蒸らされています。" },
          { id: 15, text: "キューのメールはすべて返信済みです。" },
          { id: 16, text: "明日、一緒に結果を確認しましょう。" },
        ],
      },
    },
  },
  {
    id: "low_arousal_negative",
    palette: { accent: "#E7E3ED", subtle: "#5F5369" },
    translations: {
      en: {
        label: "Low Arousal Negative",
        description: "Allow weight and heaviness to guide the pacing.",
        sentences: [
          { id: 17, text: "The hallway feels longer at this hour." },
          { id: 18, text: "Another request arrived just as we were leaving." },
          { id: 19, text: "The voicemail light keeps blinking in the dark." },
          { id: 20, text: "Only two chairs remain at the table." },
        ],
      },
      ja: {
        label: "低覚醒・ネガティブ",
        description: "重さや陰りを感じるペースで話してください。",
        sentences: [
          { id: 17, text: "この時間の廊下はいつもより長く感じます。" },
          { id: 18, text: "出発しようとした矢先に、また依頼が届きました。" },
          { id: 19, text: "暗闇の中で留守電のランプが点滅し続けています。" },
          { id: 20, text: "テーブルには椅子があと二脚しか残っていません。" },
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
