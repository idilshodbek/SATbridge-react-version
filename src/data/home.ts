import { paths } from "@/app/paths";
import type { Icon3DName } from "@/components/ui/Icon3D";

import type { Subject, ValueTone } from "./types";
import { baselineCounts, TOTAL_WORDS } from "./vocab";

export type HomeStat = {
  label: string;
  value: string;
  valueTone: ValueTone;
  /** Large faded glyph in the corner of the stat cell. */
  ghost: string;
  action?: { label: string; to: string };
};

export const homeStats: HomeStat[] = [
  { label: "Questions Attempted", value: "142", valueTone: "ink", ghost: "✓" },
  { label: "Current Accuracy", value: "74%", valueTone: "success", ghost: "%" },
  {
    label: "Saved Questions",
    value: "18",
    valueTone: "ink",
    ghost: "★",
    action: { label: "View saved", to: paths.saved },
  },
  {
    label: "Recent Errors",
    value: "6",
    valueTone: "danger",
    ghost: "!",
    action: { label: "Start review", to: paths.rushSession },
  },
];

export type SkillScore = {
  skill: string;
  percent: number;
  /** Compact label for small screens. */
  short?: string;
};

/** Five-axis radar on the home page, per subject. */
export const radarAxes: Record<Subject, SkillScore[]> = {
  rw: [
    { skill: "Inferences", percent: 90 },
    { skill: "Command of evidence", percent: 95, short: "Evidence" },
    { skill: "Form & sense", percent: 80 },
    { skill: "Vocabulary", percent: 35 },
    { skill: "Boundaries", percent: 60 },
  ],
  math: [
    { skill: "Algebra", percent: 92 },
    { skill: "Advanced math", percent: 68, short: "Advanced" },
    { skill: "Data analysis", percent: 74, short: "Data" },
    { skill: "Geometry", percent: 52 },
    { skill: "Trigonometry", percent: 38, short: "Trig" },
  ],
};

/** Skill bars listed under the radar. */
export const radarBars: Record<Subject, SkillScore[]> = {
  rw: [
    { skill: "Inferences", percent: 99 },
    { skill: "Command of evidence", percent: 95 },
    { skill: "Text structure", percent: 80 },
    { skill: "Transitions", percent: 66 },
    { skill: "Vocabulary", percent: 27 },
  ],
  math: [
    { skill: "Linear equations", percent: 92 },
    { skill: "Systems", percent: 88 },
    { skill: "Quadratic graphs", percent: 64 },
    { skill: "Percent change", percent: 62 },
    { skill: "Circles & arcs", percent: 41 },
  ],
};

/* ---------- Mobile home ---------- */

/** Daily question goal (the mobile home ring). */
export const DAILY_GOAL = { initialAnswered: 15, target: 30, step: 5 };

export type QuickLink = {
  name: string;
  meta: string;
  icon: Icon3DName;
  to: string;
};

/** "Everything else" grid on the phone Today screen. */
export const quickLinks: QuickLink[] = [
  {
    name: "Daily question",
    meta: "+15 XP today",
    icon: "daily-question",
    to: paths.dailyQuestion,
  },
  {
    name: "1500+ set",
    meta: "420 hard questions",
    icon: "advanced-set",
    to: paths.advancedSet,
  },
  { name: "Mistakes", meta: "18 to replay", icon: "mistakes", to: paths.saved },
  {
    name: "Lessons",
    meta: "Masterclass",
    icon: "lessons",
    to: paths.course("rw"),
  },
  { name: "Desmos", meta: "6 techniques", icon: "desmos", to: paths.desmos },
  {
    name: "Vocabulary",
    meta: `${baselineCounts.learned} / ${TOTAL_WORDS}`,
    icon: "vocab",
    to: paths.vocab,
  },
  { name: "Ask Bridge AI", meta: "tutor", icon: "tutor", to: paths.tutor },
  {
    name: "Community",
    meta: "3 friends online",
    icon: "community",
    to: paths.community,
  },
];
