import type { Difficulty, Tone, ValueTone } from "@/data/types";

import type { SubjectTone } from "./SubjectBanner";

/** Tinted background + matching foreground, e.g. for tags and icon chips. */
export const toneClasses: Record<Tone, string> = {
  blue: "bg-tint-blue text-on-blue",
  pink: "bg-tint-pink text-on-pink",
  green: "bg-tint-green text-on-green",
  red: "bg-tint-red text-on-red",
  amber: "bg-tint-amber text-on-amber",
  violet: "bg-tint-violet text-on-violet",
  neutral: "bg-surface-3 text-muted",
};

/** Colour for big numbers (stats, KPIs). */
export const valueToneClasses: Record<ValueTone, string> = {
  ink: "text-ink",
  success: "text-success",
  danger: "text-danger",
  streak: "text-orange",
  muted: "text-muted-2",
};

/** Classes for the white pill button on a banner (use with `tone="white"`). */
export const subjectButtonClass: Record<SubjectTone, string> = {
  pink: "gap-2 px-5 py-2.75 text-[14px] text-pink-ink",
  blue: "gap-2 px-5 py-2.75 text-[14px] text-[#0072AA]",
};

/** Tag colours for question difficulty. */
export const difficultyClasses: Record<Difficulty, string> = {
  Easy: "bg-tint-green text-on-green",
  Medium: "bg-tint-amber text-on-amber",
  Hard: "bg-tint-red text-on-red",
};
