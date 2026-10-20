import type { RunnerQuestion } from "./rush";

/* ------------------------------------------------------------------ */
/* Practice: daily question and the 1500+ set                          */
/* ------------------------------------------------------------------ */

export const dailyQuestion = {
  number: 187,
  dateLabel: "Tuesday, September 13",
  subject: "Math" as const,
  difficulty: "Hard" as const,
  xp: 15,
  answeredBy: "3,412",
  percentCorrect: 41,
  question: {
    passage: "The function f is defined by f(x) = x² − 6x + c, where c is a constant. The minimum value of f(x) is 4.",
    prompt: "What is the value of c?",
    choices: ["5", "9", "13", "36"],
    answerIndex: 2,
    skill: "nonlinear functions",
    why: "The vertex of x² − 6x + c is at x = −(−6)/2 = 3, so the minimum is f(3) = 9 − 18 + c = c − 9. Setting c − 9 = 4 gives c = 13. In Desmos: type y = x² − 6x + c, add the slider for c and drag until the vertex sits at y = 4.",
  } satisfies RunnerQuestion,
};

export type DailyResult = "correct" | "wrong" | "missed" | "today";

/** The last seven daily questions, oldest first. The last one is today's. */
export const dailyHistory: { weekday: string; result: DailyResult }[] = [
  { weekday: "Wed", result: "correct" },
  { weekday: "Thu", result: "correct" },
  { weekday: "Fri", result: "wrong" },
  { weekday: "Sat", result: "correct" },
  { weekday: "Sun", result: "missed" },
  { weekday: "Mon", result: "correct" },
  { weekday: "Tue", result: "today" },
];

export const dailyStats = { streak: 2, answered: 42, accuracy: 76 };

/** Time until tomorrow's question unlocks (seconds). */
export const NEXT_DAILY_QUESTION_SECONDS = 7 * 3600 + 12 * 60;

export const yesterdaysQuestion = {
  prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
  skill: "Boundaries",
  yourAnswer: "C",
  percentCorrect: 58,
  isCorrect: true,
};

/* ---------- 1500+ set ---------- */

export const advancedSet = {
  total: 420,
  solved: 96,
  accuracy: 38,
  avgTime: "2:05",
  targetTime: "1:40",
};

export type AdvancedSkill = {
  name: string;
  subject: "R&W" | "Math";
  questions: number;
  solved: number;
  /** % correct so far; null when not started. */
  accuracy: number | null;
};

export const advancedSkills: AdvancedSkill[] = [
  {
    name: "Nonlinear functions",
    subject: "Math",
    questions: 64,
    solved: 18,
    accuracy: 44,
  },
  {
    name: "Right triangles & trigonometry",
    subject: "Math",
    questions: 42,
    solved: 11,
    accuracy: 29,
  },
  { name: "Circles", subject: "Math", questions: 38, solved: 9, accuracy: 33 },
  {
    name: "Systems of equations",
    subject: "Math",
    questions: 36,
    solved: 14,
    accuracy: 57,
  },
  {
    name: "Statistics & data",
    subject: "Math",
    questions: 28,
    solved: 6,
    accuracy: 50,
  },
  {
    name: "Words in context",
    subject: "R&W",
    questions: 52,
    solved: 13,
    accuracy: 38,
  },
  {
    name: "Cross-text connections",
    subject: "R&W",
    questions: 44,
    solved: 8,
    accuracy: 25,
  },
  {
    name: "Rhetorical synthesis",
    subject: "R&W",
    questions: 34,
    solved: 12,
    accuracy: 58,
  },
  {
    name: "Boundaries",
    subject: "R&W",
    questions: 26,
    solved: 5,
    accuracy: 60,
  },
  {
    name: "Inferences",
    subject: "R&W",
    questions: 56,
    solved: 0,
    accuracy: null,
  },
];

export const advancedTips = [
  "Budget up to 2 minutes each: these sit at the end of the harder Module 2.",
  "Graph every nonlinear system in Desmos before doing algebra.",
  "On cross-text questions, find what each author concedes before comparing them.",
];
