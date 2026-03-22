export type Language = "en" | "ja";

export const languageOptions: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "ja", label: "日本語" },
];

export const uiCopy = {
  en: {
    appTitle: "Emotion Voice Study",
    appSubtitle:
      "Research-grade data collection for emotion-conditioned voice analysis",
    howItWorks: "How It Works",
    promptChecklist: [
      "Sentences are grouped by emotional categories",
      "Each sentence stays on screen until you continue",
      "Read naturally, as if speaking the emotion aloud",
      "Progress is linear — stay with the present prompt",
    ],
    participantNameLabel: "Participant Name",
    participantNamePlaceholder: "Enter your name",
    beginSession: "Begin Session →",
    estimatedDuration: "Estimated duration: 15–20 minutes",
    nextEmotion: "Next Emotion",
    beginSentences: "Begin Sentences →",
    blockLabel: (current: number, total: number) => `Block ${current} of ${total}`,
    microphoneBlocked: "Microphone blocked",
    recording: "Recording",
    timerLabel: "Timer",
    continue: "Continue →",
    pressEnter: "Press Enter or Space to continue",
    previewTag: "Sample Screen",
    previewSubtitle:
      "This is exactly what the reading interface looks like. Review the highlights, then try a short practice run before the real session.",
    previewAction: "Start Practice",
    previewCallouts: {
      progress: "Progress tracker",
      emotion: "Emotion cue",
      sentence: "Sentence to read",
      timer: "Reading timer",
      continue: "Continue button",
    },
    practiceTag: "Practice Run",
    practiceSubtitle: "These practice sentences are not recorded.",
    practiceCompleteTitle: "Practice Complete",
    practiceCompleteBody: "You're ready to begin the real session.",
    practiceCompleteAction: "Begin Real Session →",
    progressSentence: (current: number) => `Sentence ${current}`,
    progressTotal: (total: number) => `${total} total`,
    sessionComplete: "Session Complete",
    completionThanks:
      "Thank you for contributing to the dataset. This transcript-ready log can now be archived with your recordings and biosignal streams.",
    sentencesLogged: "Sentences Logged",
    emotionStates: "Emotion States",
    avgReadTime: "Avg Read Time",
    exportPrompt:
      "Export JSON to pair with your voice files for downstream ingestion.",
    exportDetails:
      "Each record includes emotion label, sentence text, start/continue timestamps, and duration.",
    exportSessionData: "Export Session Data",
    localDataNote: "Data stays local until you export the JSON log",
    // New strings for UX feedback
    audioExample: "Play Example Audio",
    audioPause: "Pause Audio",
    audioHint: "Listen to an example of the desired vocal tone before you begin.",
    valenceTitle: "Understanding Emotion Dimensions",
    valenceExplainer:
      "Each emotion in this study is described by two dimensions:",
    valenceDef:
      "Valence — how pleasant or unpleasant the emotion feels. Positive valence = pleasant (e.g. joy, relief). Negative valence = unpleasant (e.g. anger, sadness).",
    arousalDef:
      "Arousal — how energised or calm the emotion feels. High arousal = activated (e.g. excitement, panic). Low arousal = subdued (e.g. contentment, fatigue).",
    valenceExample: "Example: Excitement = Positive Valence + High Arousal",
    processOverview: "Experiment Overview",
    processSteps: [
      { label: "Practice", detail: "Try the interface with 2 sample sentences — nothing is recorded." },
      { label: "Neutral Baseline", detail: "Read 5 sentences in a calm, matter-of-fact tone." },
      { label: "Emotional Quadrants", detail: "Read sentences for 4 emotion types: High Valence + High Arousal, Low Valence + High Arousal, High Valence + Low Arousal, and Low Valence + Low Arousal." },
    ],
  },
  ja: {
    appTitle: "感情音声スタディ",
    appSubtitle: "感情条件付き音声分析のための研究用データ収集",
    howItWorks: "進め方",
    promptChecklist: [
      "感情カテゴリーごとに文章が表示されます",
      "各文は「次へ」を押すまで表示されます",
      "感情を声に出すつもりで自然に読んでください",
      "進行は順番通りです。表示された文に集中してください",
    ],
    participantNameLabel: "参加者名",
    participantNamePlaceholder: "お名前を入力",
    beginSession: "セッション開始 →",
    estimatedDuration: "所要時間目安: 15〜20分",
    nextEmotion: "次の感情",
    beginSentences: "文を開始 →",
    blockLabel: (current: number, total: number) => `ブロック ${current} / ${total}`,
    microphoneBlocked: "マイクがブロックされています",
    recording: "録音中",
    timerLabel: "タイマー",
    continue: "次へ →",
    pressEnter: "EnterまたはSpaceで次へ",
    previewTag: "サンプル画面",
    previewSubtitle:
      "読み上げ画面の見た目はこの通りです。ポイントを確認したら、短い練習に進みましょう。",
    previewAction: "練習を開始",
    previewCallouts: {
      progress: "進捗バー",
      emotion: "感情の表示",
      sentence: "読み上げ文",
      timer: "タイマー",
      continue: "次へボタン",
    },
    practiceTag: "練習",
    practiceSubtitle: "練習の文章は記録されません。",
    practiceCompleteTitle: "練習完了",
    practiceCompleteBody: "本番のセッションを開始できます。",
    practiceCompleteAction: "本番を開始 →",
    progressSentence: (current: number) => `文 ${current}`,
    progressTotal: (total: number) => `全${total}`,
    sessionComplete: "セッション完了",
    completionThanks:
      "ご協力ありがとうございます。文字起こし可能なログを、録音データや生体信号と一緒に保管できます。",
    sentencesLogged: "記録した文",
    emotionStates: "感情カテゴリ",
    avgReadTime: "平均読上げ時間",
    exportPrompt: "音声ファイルと組み合わせるためのJSONをエクスポートできます。",
    exportDetails:
      "各記録には感情ラベル、文、開始/続行時刻、所要時間が含まれます。",
    exportSessionData: "セッションデータをエクスポート",
    localDataNote: "JSONをエクスポートするまでデータはローカルに保存されます",
    audioExample: "サンプル音声の再生",
    audioPause: "一時停止",
    audioHint: "始める前に、必要な声のトーンの例を聞いてください。",
    valenceTitle: "感情の次元について",
    valenceExplainer: "このスタディの感情は2つの次元で表されます：",
    valenceDef:
      "快（Valence）— 感情がどれくらい心地よい（または不快）かを表します。高快 = 心地よい（例：喜び、安堵）。低快 = 不快（例：怒り、悲しみ）。",
    arousalDef:
      "覚醒（Arousal）— 感情がどれくらい活発（または穏やか）かを表します。高覚醒 = 活性化（例：興奮、パニック）。低覚醒 = 落ち着き（例：満足、疲労）。",
    valenceExample: "例：興奮 = 高快 + 高覚醒",
    processOverview: "実験の流れ",
    processSteps: [
      { label: "練習", detail: "2つのサンプル文でインターフェースを試します。記録はされません。" },
      { label: "ニュートラルベースライン", detail: "5つの文を落ち着いたトーンで読んでください。" },
      { label: "感情の4象限", detail: "4種類の感情（高快・高覚醒、低快・高覚醒、高快・低覚醒、低快・低覚醒）で文を読んでください。" },
    ],
  },
};
