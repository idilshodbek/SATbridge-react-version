import { paths } from "@/app/paths";

import type { HomeStat } from "./home";

export const bankSubjects = [
  {
    subject: "Reading & Writing",
    solved: "412 of 1,492 solved",
    percent: 28,
    tone: "pink" as const,
  },
  {
    subject: "Math",
    solved: "734 of 2,390 solved",
    percent: 31,
    tone: "blue" as const,
  },
];

export const bankStats: HomeStat[] = [
  {
    label: "Questions Attempted",
    value: "1,146",
    valueTone: "ink",
    ghost: "✓",
  },
  { label: "Current Accuracy", value: "74%", valueTone: "success", ghost: "%" },
  {
    label: "Saved Questions",
    value: "18",
    valueTone: "ink",
    ghost: "★",
    action: { label: "View saved", to: paths.saved },
  },
  { label: "Study Streak", value: "24", valueTone: "streak", ghost: "◔" },
];

/** Weekly answered questions, split by result and difficulty (max 20 per week). */
export type TrendWeek = {
  correct: number;
  correctHard: number;
  wrong: number;
  wrongHard: number;
};

export const TREND_MAX = 20;

export const activityTrend: TrendWeek[] = [
  { correct: 6, correctHard: 3, wrong: 2, wrongHard: 1 },
  { correct: 8, correctHard: 4, wrong: 3, wrongHard: 2 },
  { correct: 9, correctHard: 5, wrong: 2, wrongHard: 2 },
  { correct: 7, correctHard: 3, wrong: 4, wrongHard: 2 },
  { correct: 11, correctHard: 5, wrong: 3, wrongHard: 1 },
  { correct: 10, correctHard: 6, wrong: 2, wrongHard: 2 },
  { correct: 12, correctHard: 5, wrong: 2, wrongHard: 1 },
  { correct: 9, correctHard: 4, wrong: 1, wrongHard: 1 },
];

export const topicAccuracy: {
  subject: string;
  topics: { name: string; attempts: number; accuracy: number }[];
}[] = [
  {
    subject: "English",
    topics: [
      { name: "Information and Ideas", attempts: 46, accuracy: 82 },
      { name: "Craft and Structure", attempts: 39, accuracy: 71 },
      { name: "Expression of Ideas", attempts: 28, accuracy: 64 },
      { name: "Standard English Conventions", attempts: 34, accuracy: 88 },
    ],
  },
  {
    subject: "Math",
    topics: [
      { name: "Algebra", attempts: 61, accuracy: 86 },
      { name: "Advanced Math", attempts: 44, accuracy: 68 },
      { name: "Problem-Solving and Data", attempts: 37, accuracy: 74 },
      { name: "Geometry and Trigonometry", attempts: 26, accuracy: 52 },
    ],
  },
];
