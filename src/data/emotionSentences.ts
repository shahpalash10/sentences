export type EmotionCategoryId =
  | "neutral_baseline"
  | "high_arousal_positive"
  | "high_arousal_negative"
  | "low_arousal_positive"
  | "low_arousal_negative"
  | "high_expectation"
  | "low_expectation";

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
  startedAt: string;
  continueClickedAt: string;
}

export const emotionSequence: EmotionCategory[] = [
  {
    id: "neutral_baseline",
    label: "Neutral Baseline",
    description: "Center yourself with a steady, neutral delivery.",
    palette: { accent: "#E3E7F1", subtle: "#6E768C" },
    sentences: [
      { id: 1, text: "The meeting is scheduled for three o'clock." },
      { id: 2, text: "Please place the notebook on the desk." },
      { id: 3, text: "The train arrives at platform four." },
      { id: 4, text: "The sample was stored at room temperature." },
    ],
  },
  {
    id: "high_arousal_positive",
    label: "High Arousal Positive",
    description: "Let the words carry excitement and uplift.",
    palette: { accent: "#F9E6D8", subtle: "#C66C3A" },
    sentences: [
      { id: 5, text: "The grant was approved faster than anyone expected!" },
      { id: 6, text: "We just hit the target and the team is cheering." },
      { id: 7, text: "The lights came on and the crowd roared to life." },
      { id: 8, text: "Every sensor reported a perfect score." },
    ],
  },
  {
    id: "high_arousal_negative",
    label: "High Arousal Negative",
    description: "Channel urgency, tension, or alarm.",
    palette: { accent: "#F6DADB", subtle: "#A54141" },
    sentences: [
      { id: 9, text: "The alarms are blaring and no one is responding." },
      { id: 10, text: "They ignored the protocol and the sample ruptured." },
      { id: 11, text: "We are running out of time and the door is locked." },
      { id: 12, text: "The sky darkened so quickly that the street emptied." },
    ],
  },
  {
    id: "low_arousal_positive",
    label: "Low Arousal Positive",
    description: "Speak with calm optimism and warmth.",
    palette: { accent: "#DBF0EA", subtle: "#4A7F70" },
    sentences: [
      { id: 13, text: "The lake is still and the cabin lights glow." },
      { id: 14, text: "Fresh tea is steeping beside the open window." },
      { id: 15, text: "Every email in the queue is finally answered." },
      { id: 16, text: "We will review the results together tomorrow." },
    ],
  },
  {
    id: "low_arousal_negative",
    label: "Low Arousal Negative",
    description: "Allow weight and heaviness to guide the pacing.",
    palette: { accent: "#E7E3ED", subtle: "#5F5369" },
    sentences: [
      { id: 17, text: "The hallway feels longer at this hour." },
      { id: 18, text: "Another request came in just as we were leaving." },
      { id: 19, text: "The voicemail light keeps blinking in the dark." },
      { id: 20, text: "Only two chairs remain around the table." },
    ],
  },
  {
    id: "high_expectation",
    label: "High Expectation",
    description: "Hold a confident, anticipatory tone.",
    palette: { accent: "#F1E8D7", subtle: "#8A6D36" },
    sentences: [
      { id: 21, text: "The envelope is sealed and waiting to be opened." },
      { id: 22, text: "We double-checked the numbers before submitting." },
      { id: 23, text: "Everyone paused, listening for the announcement." },
      { id: 24, text: "The final chord is hanging in the air." },
    ],
  },
  {
    id: "low_expectation",
    label: "Low Expectation",
    description: "Let resignation and acceptance soften the delivery.",
    palette: { accent: "#E6ECF0", subtle: "#6A7681" },
    sentences: [
      { id: 25, text: "The line will probably stay this long all evening." },
      { id: 26, text: "The report may not change anyone's mind." },
      { id: 27, text: "We can file the appeal, but nothing is guaranteed." },
      { id: 28, text: "Tomorrow will look a lot like today." },
    ],
  },
];

export const totalSentences = emotionSequence.reduce(
  (total, category) => total + category.sentences.length,
  0,
);
