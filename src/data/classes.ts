import type { Tone } from "./types";

export const classCohort = {
  label: "FALL COHORT · 18 STUDENTS",
  name: "Tashkent 1500 Club",
  yourRank: "4th",
  highlights: [
    { value: "92%", label: "assignments on time" },
    { value: "+140", label: "cohort avg gain" },
    { value: "Tue", label: "next live session" },
  ],
};

export type Assignment = {
  name: string;
  meta: string;
  status: string;
  tone: Tone;
  /** Accent bar colour on the left of the row. */
  color: string;
  cta: "Start" | "Resume" | "Open" | "Review";
};

export const assignments: Assignment[] = [
  {
    name: "Predicted Test #2 · all modules",
    meta: "Due Saturday · 2h 14m",
    status: "Not started",
    tone: "pink",
    color: "#E5308F",
    cta: "Start",
  },
  {
    name: "Words in context drill",
    meta: "Due tomorrow · 12 questions",
    status: "In progress",
    tone: "blue",
    color: "#009ADA",
    cta: "Resume",
  },
  {
    name: "Craft & Structure module 2",
    meta: "Due Monday · 6 lessons",
    status: "Not started",
    tone: "amber",
    color: "#F59E0B",
    cta: "Open",
  },
  {
    name: "Vocab units 1.1–1.2",
    meta: "Submitted Wednesday",
    status: "Graded 92%",
    tone: "green",
    color: "#22C55E",
    cta: "Review",
  },
];
