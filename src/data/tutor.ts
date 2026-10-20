import type { Tone } from "./types";

export const tutorSuggestions: { glyph: string; text: string; tone: Tone }[] = [
  {
    glyph: "⌁",
    text: "Why was I wrong on the ice-core dual text?",
    tone: "blue",
  },
  {
    glyph: "◑",
    text: "Explain infinitely many solutions simply",
    tone: "violet",
  },
  {
    glyph: "◔",
    text: "How do I stop running out of time in Module 2?",
    tone: "amber",
  },
  {
    glyph: "★",
    text: "Build me a 20-question set from my weak topics",
    tone: "green",
  },
];

/** Canned answer used by the demo tutor. */
export const tutorDemoReply =
  "Short version: you picked the choice that contradicted Ndlovu instead of the one that limited Oyola-Merced. On cross-text questions, find the concession first — the clause that grants the other author's premise — then look for what the second author restricts. Want me to build five more of these?";

/** Simulated "thinking" delay before the demo reply appears (ms). */
export const TUTOR_REPLY_DELAY = 900;

/* ---------- Mobile tutor ---------- */

/** First message in the mobile chat. */
export const tutorGreeting =
  "I looked at your last 40 questions. Vocabulary in context is costing you the most points — 27% accuracy over 46 attempts. Want a 10-question set on it?";

export const mobileTutorPrompts = [
  "Why is B wrong here?",
  "Explain this like I'm new",
  "Give me a similar question",
  "What should I drill tonight?",
];

/** Keyword-based demo answers for the mobile chat. */
export function mobileTutorReply(question: string) {
  const text = question.toLowerCase();
  if (text.includes("drill") || text.includes("tonight")) {
    return "Tonight: 10 questions on vocabulary in context, then 5 on transitions. Keep it under 15 minutes — your accuracy drops after that on evening sessions.";
  }
  if (text.includes("wrong")) {
    return "B looks right because it repeats a word from the passage. That is the trap: the question asks for function, not content. The correct choice describes what the sentence does — it gives a reason.";
  }
  return "Short version: predict an answer in your own words before reading the choices, then eliminate anything that changes the meaning. Want a 5-question set to try it?";
}

/** Bridge AI questions left today on the Free plan (Pro is unlimited). */
export const AI_QUESTIONS_LEFT = 20;
