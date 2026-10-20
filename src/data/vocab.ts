export type WordStatus = "learned" | "repeat" | "new";

export type VocabWord = {
  word: string;
  definition: string;
  status: WordStatus;
};

export const TOTAL_WORDS = 150;

/** Counts before the student rates any flashcard in this session. */
export const baselineCounts = { learned: 44, repeat: 9 };

export const vocabWords: VocabWord[] = [
  {
    word: "obfuscate",
    definition: "to make something unclear on purpose",
    status: "repeat",
  },
  {
    word: "candid",
    definition: "honest and direct, even when awkward",
    status: "learned",
  },
  {
    word: "ubiquitous",
    definition: "found everywhere at once",
    status: "learned",
  },
  { word: "mitigate", definition: "to make less severe", status: "repeat" },
  {
    word: "prudent",
    definition: "careful about future consequences",
    status: "new",
  },
  {
    word: "nuance",
    definition: "a very small difference in meaning",
    status: "learned",
  },
  { word: "tenacious", definition: "holding on stubbornly", status: "new" },
  {
    word: "ambivalent",
    definition: "having mixed feelings about something",
    status: "repeat",
  },
];

export const studyModes = [
  {
    name: "Learn mode",
    glyph: "◑",
    blurb: "Work through 10 questions built from the words you have not mastered yet.",
  },
  {
    name: "Match",
    glyph: "⇄",
    blurb: "Quick matching game — pair words with their definitions against the clock.",
  },
  {
    name: "Flashcards",
    glyph: "▢",
    blurb: "Learn definitions and practise the words in real sentences.",
  },
];

export type VocabUnit = {
  name: string;
  total: number;
  learned: number;
  parts: { name: string; total: number; learned: number }[];
};

export const vocabUnits: VocabUnit[] = [
  {
    name: "Unit 1 · Argument words",
    total: 50,
    learned: 32,
    parts: [
      { name: "Unit 1.1", total: 25, learned: 22 },
      { name: "Unit 1.2", total: 25, learned: 10 },
    ],
  },
  {
    name: "Unit 2 · Tone and attitude",
    total: 50,
    learned: 12,
    parts: [
      { name: "Unit 2.1", total: 25, learned: 12 },
      { name: "Unit 2.2", total: 25, learned: 0 },
    ],
  },
  {
    name: "Unit 3 · Science passages",
    total: 50,
    learned: 0,
    parts: [{ name: "Unit 3.1", total: 25, learned: 0 }],
  },
];
