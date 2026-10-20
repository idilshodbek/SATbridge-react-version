import type { Difficulty } from "./types";

export type SavedTabId = "saved" | "mistakes" | "notes" | "collections";

export type SavedTab = {
  id: SavedTabId;
  label: string;
  /** Label on the mobile filter pills. */
  shortLabel: string;
  title: string;
  badge: number;
  total: number;
};

export const savedTabs: SavedTab[] = [
  {
    id: "saved",
    label: "Saved questions",
    shortLabel: "Saved",
    title: "Saved questions",
    badge: 12,
    total: 12,
  },
  {
    id: "mistakes",
    label: "Mistakes log",
    shortLabel: "Mistakes",
    title: "Mistakes log",
    badge: 6,
    total: 6,
  },
  {
    id: "notes",
    label: "Notes",
    shortLabel: "Notes",
    title: "Notes",
    badge: 0,
    total: 9,
  },
  {
    id: "collections",
    label: "Collections",
    shortLabel: "Collections",
    title: "Collections",
    badge: 0,
    total: 4,
  },
];

/** Each filter chip cycles through its options when pressed. */
export const savedFilters = {
  corrected: ["Never corrected", "Corrected once"],
  section: ["Both sections", "Math only", "R&W only"],
  time: ["All time", "Last 7 days"],
} as const;

export type SectionFilter = (typeof savedFilters.section)[number];

export type MistakeEntry = {
  subject: "Reading & Writing" | "Math";
  difficulty: Difficulty;
  question: string;
  /** Number of wrong attempts. */
  attempts: number;
  when: string;
  /** Show the typeset equation above the question. */
  hasEquation: boolean;
};

export const mistakes: MistakeEntry[] = [
  {
    subject: "Reading & Writing",
    difficulty: "Easy",
    question: "Which choice completes the text with the most logical and precise word or phrase?",
    attempts: 1,
    when: "53m ago",
    hasEquation: false,
  },
  {
    subject: "Math",
    difficulty: "Hard",
    question:
      "In the equation above, c and d are constants and c > 0. If the equation has infinitely many solutions, what is the value of c?",
    attempts: 1,
    when: "54m ago",
    hasEquation: true,
  },
  {
    subject: "Reading & Writing",
    difficulty: "Hard",
    question: "Based on the texts, how would Ndlovu most likely respond to Oyola-Merced's claim about counting layers?",
    attempts: 2,
    when: "56m ago",
    hasEquation: false,
  },
  {
    subject: "Reading & Writing",
    difficulty: "Easy",
    question: "Which choice best describes the function of the underlined sentence in the text as a whole?",
    attempts: 1,
    when: "56m ago",
    hasEquation: false,
  },
  {
    subject: "Math",
    difficulty: "Medium",
    question: "A circle has centre (2, −3) and radius 5. Which equation represents the circle in the xy-plane?",
    attempts: 1,
    when: "1h ago",
    hasEquation: false,
  },
  {
    subject: "Reading & Writing",
    difficulty: "Medium",
    question: "Which quotation from the passage best supports the student's claim about seasonal migration?",
    attempts: 3,
    when: "1h ago",
    hasEquation: false,
  },
];

export const mistakePatternInsight =
  "Eleven of your last nineteen misses are cross-text and vocabulary items answered in under forty seconds, which suggests you are committing to a choice before predicting the answer. Your math misses cluster in circles and trigonometry, where your average time is already double the platform median.";

/** "2 wrong attempts" */
export const attemptsLabel = (count: number) => `${count} wrong attempt${count === 1 ? "" : "s"}`;
