/* ------------------------------------------------------------------ */
/* Full-length predicted tests, the exam player and the score report   */
/* ------------------------------------------------------------------ */

export type PredictedTest = {
  id: string;
  name: string;
  isPro: boolean;
  tint: string;
};

export const predictedTests: PredictedTest[] = [
  {
    id: "predicted-1",
    name: "Predicted Test #1",
    isPro: false,
    tint: "var(--tint-blue)",
  },
  {
    id: "predicted-2",
    name: "Predicted Test #2",
    isPro: true,
    tint: "var(--tint-green)",
  },
  {
    id: "predicted-3",
    name: "Predicted Test #3",
    isPro: true,
    tint: "var(--tint-amber)",
  },
  {
    id: "predicted-4",
    name: "Predicted Test #4",
    isPro: true,
    tint: "#FDEDF5",
  },
];

/* ---------- Exam player ---------- */

export type ExamQuestion = {
  passage: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  /** Used by the mobile runner header and feedback. */
  skill: string;
  why: string;
};

export const EXAM_MODULE_SIZE = 27;

/** Module clock at the start: 31:56. */
export const EXAM_TIME_SECONDS = 1916;

export const examDirections =
  "The questions in this section address a number of important reading and writing skills. Each question includes one or more passages. Read each passage, then choose the best answer to the question based on the passage.";

export const examQuestions: ExamQuestion[] = [
  {
    passage:
      "Before tarmac roads reached most of central Kenya, the weekly market at Kagio was essential to daily life: it supplied the goods that nearby villages could not produce for themselves. The market was also a ____ of information. Traders who met there carried news home along with their purchases.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["source", "rival", "remnant", "surplus"],
    answerIndex: 0,
    skill: "words in context",
    why: "The market passed news between villages, so it was a source of information. Nothing in the text sets up a rivalry, a leftover or an excess.",
  },
  {
    passage:
      "In 1911 the physicist Lise Meitner began work in a converted carpentry shop, the only space in the institute open to women. She published nine papers from that room in four years — a record that makes the arrangement look less like a concession than an oversight on the institute's part.",
    prompt: 'As used in the text, what does the phrase "less like a concession" most nearly mean?',
    choices: ["not primarily a compromise", "not entirely a refusal", "hardly an accident", "rarely an advantage"],
    answerIndex: 0,
    skill: "words in context",
    why: "A concession is something granted as a compromise. The author says the room looked less like a compromise than an oversight — choice A.",
  },
];

/* ---------- Score report ---------- */

export type TestReport = {
  id: string;
  name: string;
  kind: "Full-length" | "Section";
  scope: string;
  date: string;
  total: number;
  /** Highest possible score (1600 full test, 800 one section). */
  maxScore: number;
  sections: { label: string; subject: "R&W" | "Math"; score: number }[];
  /** Change vs. the previous test of the same kind, e.g. "+60". */
  delta?: string;
  platformAverage: number;
  percentile: number;
};

/** Completed tests, newest first. The first one is the most recent full-length test. */
export const testReports: TestReport[] = [
  {
    id: "predicted-1",
    name: "SATbridge Predicted Test #1",
    kind: "Full-length",
    scope: "All modules",
    date: "Aug 28, 2026",
    total: 1290,
    maxScore: 1600,
    sections: [
      { label: "Reading and Writing", subject: "R&W", score: 630 },
      { label: "Math", subject: "Math", score: 660 },
    ],
    delta: "+60",
    platformAverage: 1140,
    percentile: 71,
  },
  {
    id: "math-section-2",
    name: "Math section",
    kind: "Section",
    scope: "Math · both modules",
    date: "Aug 21, 2026",
    total: 640,
    maxScore: 800,
    sections: [{ label: "Math", subject: "Math", score: 640 }],
    delta: "+30",
    platformAverage: 570,
    percentile: 66,
  },
  {
    id: "rw-section-1",
    name: "Reading & Writing section",
    kind: "Section",
    scope: "Reading and Writing · both modules",
    date: "Aug 14, 2026",
    total: 600,
    maxScore: 800,
    sections: [{ label: "Reading and Writing", subject: "R&W", score: 600 }],
    platformAverage: 560,
    percentile: 58,
  },
  {
    id: "official-3",
    name: "Official Practice Test #3",
    kind: "Full-length",
    scope: "All modules · College Board paper",
    date: "Jul 30, 2026",
    total: 1230,
    maxScore: 1600,
    sections: [
      { label: "Reading and Writing", subject: "R&W", score: 600 },
      { label: "Math", subject: "Math", score: 630 },
    ],
    delta: "+80",
    platformAverage: 1140,
    percentile: 62,
  },
];

export const reportById = (reportId: string | undefined) => testReports.find((r) => r.id === reportId);

export type ModuleResult = {
  name: string;
  subject: "R&W" | "Math";
  correct: number;
  wrong: number;
  omitted: number;
  avgTime: string;
  targetTime: string;
  questionCount: number;
};

export const moduleResults: ModuleResult[] = [
  {
    name: "R&W – Module 1",
    subject: "R&W",
    correct: 21,
    wrong: 4,
    omitted: 2,
    avgTime: "1:04",
    targetTime: "1:11",
    questionCount: 27,
  },
  {
    name: "R&W – Module 2 (Hard)",
    subject: "R&W",
    correct: 18,
    wrong: 7,
    omitted: 2,
    avgTime: "1:12",
    targetTime: "1:11",
    questionCount: 27,
  },
  {
    name: "Math – Module 1",
    subject: "Math",
    correct: 18,
    wrong: 3,
    omitted: 1,
    avgTime: "1:26",
    targetTime: "1:35",
    questionCount: 22,
  },
  {
    name: "Math – Module 2 (Hard)",
    subject: "Math",
    correct: 14,
    wrong: 5,
    omitted: 3,
    avgTime: "1:44",
    targetTime: "1:35",
    questionCount: 22,
  },
];

export const accuracyComparison = { you: 79, platform: 64 };

/* ---------- Mobile test catalogue ---------- */

export type TestStatus = "COMPLETED" | "NEXT UP" | "MODULE" | "OFFICIAL";

export type CatalogTest = {
  name: string;
  status: TestStatus;
  meta: string;
  result?: { score: string; split: string; delta: string };
  cta: string;
};

export const testCatalog: CatalogTest[] = [
  {
    name: "Predicted test #1",
    status: "COMPLETED",
    meta: "2h 14m · Aug 12",
    result: { score: "1290", split: "R&W 630 · Math 660", delta: "+60" },
    cta: "Review answers",
  },
  {
    name: "Predicted test #2",
    status: "NEXT UP",
    meta: "Full length · adaptive",
    cta: "Start test",
  },
  {
    name: "Math module only",
    status: "MODULE",
    meta: "35m · 22 questions",
    cta: "Start module",
  },
  {
    name: "R&W module only",
    status: "MODULE",
    meta: "32m · 27 questions",
    cta: "Start module",
  },
  {
    name: "Official practice #4",
    status: "OFFICIAL",
    meta: "College Board paper",
    cta: "Start test",
  },
];

/* ---------- Section tests ---------- */

export type SectionTest = {
  id: string;
  title: string;
  subject: "R&W" | "Math";
  kind: "Full section" | "Single module";
  questions: number;
  minutes: number;
  detail: string;
  lastScore?: string;
  isPro?: boolean;
};

export const sectionTests: SectionTest[] = [
  {
    id: "rw-section",
    title: "Reading & Writing section",
    subject: "R&W",
    kind: "Full section",
    questions: 54,
    minutes: 64,
    detail: "Both modules · adaptive",
    lastScore: "600",
  },
  {
    id: "math-section",
    title: "Math section",
    subject: "Math",
    kind: "Full section",
    questions: 44,
    minutes: 70,
    detail: "Both modules · adaptive · Desmos",
    lastScore: "640",
  },
  {
    id: "rw-module-1",
    title: "R&W · Module 1",
    subject: "R&W",
    kind: "Single module",
    questions: 27,
    minutes: 32,
    detail: "Mixed difficulty",
  },
  {
    id: "rw-module-2",
    title: "R&W · Module 2 (harder)",
    subject: "R&W",
    kind: "Single module",
    questions: 27,
    minutes: 32,
    detail: "The module you get after a strong start",
    isPro: true,
  },
  {
    id: "math-module-1",
    title: "Math · Module 1",
    subject: "Math",
    kind: "Single module",
    questions: 22,
    minutes: 35,
    detail: "Mixed difficulty",
  },
  {
    id: "math-module-2",
    title: "Math · Module 2 (harder)",
    subject: "Math",
    kind: "Single module",
    questions: 22,
    minutes: 35,
    detail: "The module you get after a strong start",
    isPro: true,
  },
];
