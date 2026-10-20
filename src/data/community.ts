import { paths } from "@/app/paths";
import type { Icon3DName } from "@/components/ui/Icon3D";

/* ------------------------------------------------------------------ */
/* Community feed, leaderboard and public profiles                     */
/* (people, friends, chats and study rooms live in social.ts)          */
/* ------------------------------------------------------------------ */

export type FeedPost = {
  id: string;
  /** Person id from social.ts, or "me". */
  authorId: string;
  initials: string;
  color: string;
  name: string;
  text: string;
  when: string;
};

export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    authorId: "malika",
    initials: "MK",
    color: "#FF9500",
    name: "Malika",
    text: "Just crushed a review lab. That's 135 questions over the last 24h!",
    when: "6 minutes ago",
  },
  {
    id: "post-2",
    authorId: "grinder",
    initials: "GR",
    color: "#009ADA",
    name: "Grinder",
    text: "Just crushed a study session with 83% accuracy!",
    when: "6 minutes ago",
  },
  {
    id: "post-3",
    authorId: "jao",
    initials: "JA",
    color: "#7C3AED",
    name: "JAO29",
    text: "Just crushed a study session with 70% accuracy!",
    when: "6 minutes ago",
  },
  {
    id: "post-4",
    authorId: "ghostie",
    initials: "GH",
    color: "#22C55E",
    name: "Ghostie",
    text: "Just crushed a review lab. That's 92 questions over the last 24h!",
    when: "5 minutes ago",
  },
  {
    id: "post-5",
    authorId: "shiny",
    initials: "SH",
    color: "#FFC93C",
    name: "ShinyAV",
    text: "Just crushed a study session with 100% accuracy!",
    when: "4 minutes ago",
  },
  {
    id: "post-6",
    authorId: "alif",
    initials: "AL",
    color: "#E5308F",
    name: "Alif",
    text: "Just crushed a study session. That's 26 questions over the last 24h!",
    when: "2 minutes ago",
  },
  {
    id: "post-7",
    authorId: "neverbored",
    initials: "NB",
    color: "#0C3A4E",
    name: "NeverBored",
    text: "Hit a 1510 on predicted test #4 — +110 from June.",
    when: "just now",
  },
];

/** "Happening now" list next to the feed. */
export const communityHighlights: {
  icon: Icon3DName;
  title: string;
  meta: string;
  to: string;
}[] = [
  {
    icon: "trophy",
    title: "Weekly challenge",
    meta: "Top 50 accuracy on the 1500+ set wins a month of Pro",
    to: paths.advancedSet,
  },
  {
    icon: "rooms",
    title: "Study rooms",
    meta: "4 rooms live now",
    to: paths.studyRooms,
  },
  {
    icon: "reports",
    title: "Score reports",
    meta: "84 shared this week",
    to: paths.reports,
  },
  {
    icon: "feed",
    title: "Tutor AMA",
    meta: "Thursday 19:00 with 1500+ scorers",
    to: paths.chats,
  },
];

/** Weekly XP leaderboard, shared by Community and My Classes. */
export type CohortMember = {
  rank: number;
  initials: string;
  name: string;
  bestScore: string;
  xp: number;
  color: string;
  isYou?: boolean;
};

export const cohort: CohortMember[] = [
  {
    rank: 1,
    initials: "MK",
    name: "Malika Karimova",
    bestScore: "1480",
    xp: 2840,
    color: "#F59E0B",
  },
  {
    rank: 2,
    initials: "DA",
    name: "Daniyar Abdullaev",
    bestScore: "1420",
    xp: 2610,
    color: "#009ADA",
  },
  {
    rank: 3,
    initials: "LT",
    name: "Lin Tran",
    bestScore: "1390",
    xp: 2480,
    color: "#22C55E",
  },
  {
    rank: 4,
    initials: "DI",
    name: "You",
    bestScore: "1290",
    xp: 2240,
    color: "#7C3AED",
    isYou: true,
  },
  {
    rank: 5,
    initials: "SB",
    name: "Sardor Bekmurodov",
    bestScore: "1250",
    xp: 2090,
    color: "#0C3A4E",
  },
];

/* ---------- Public profile (NeverBored) ---------- */

export const profile = {
  initials: "NB",
  name: "NeverBored",
  tagline: "main character energy · test date September 12",
  summary: "12,480 XP · 4,091 questions",
  scoreLift: "+110",
  totalScore: { value: "1510", delta: "▲110", range: "range 1470–1560" },
  sectionScores: [
    { label: "Math", value: "760", delta: "▲80" },
    { label: "Reading", value: "750", delta: "▲30" },
  ],
  last24h: [
    { value: "44", label: "questions" },
    { value: "80%", label: "accuracy", highlight: true },
    { value: "98%", label: "difficulty" },
  ],
  allTime: [
    { value: "4,091", label: "questions" },
    { value: "85%", label: "accuracy", highlight: true },
    { value: "85%", label: "difficulty" },
  ],
};

/** Estimated-score line chart points (x, y) in a 700×200 viewBox. */
export const scoreHistoryPoints =
  "50,172 78,166 96,176 118,150 140,132 168,120 196,126 224,104 252,96 280,110 308,88 336,72 364,80 392,60 420,66 448,52 476,58 504,48 532,62 560,54 588,44 616,58 644,50 672,64";

export const scoreAxisLabels = [
  { label: "1570", y: 20 },
  { label: "1510", y: 75 },
  { label: "1450", y: 130 },
  { label: "1330", y: 180 },
];

export const profileScores: {
  name: string;
  score: string;
  split: string;
  date: string;
}[] = [
  {
    name: "Predicted test #4",
    score: "1510",
    split: "760 / 750",
    date: "Aug 27, 2026",
  },
  {
    name: "Official SAT",
    score: "1340",
    split: "680 / 660",
    date: "Jun 6, 2026",
  },
  {
    name: "Predicted test #2",
    score: "1420",
    split: "700 / 720",
    date: "Jul 24, 2026",
  },
];

export const ACTIVITY_COLORS = ["var(--surface-3)", "#8CDD62", "#3FB618", "#1E7E12"];

/** Deterministic pseudo-random activity levels (0–3) for Jan–Aug, 30 cells each. */
export const activityByMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month, monthIndex) => ({
  month,
  levels: Array.from({ length: 30 }, (_, day) => {
    const seed = (monthIndex * 31 + day * 7) % 11;
    if (monthIndex < 4) return 0;
    if (monthIndex === 4) return seed > 8 ? 1 : 0;
    return seed > 7 ? 3 : seed > 5 ? 2 : seed > 3 ? 1 : 0;
  }),
}));

export const studyTotals = [
  { label: "Total", value: "54h 53m" },
  { label: "Reading & Writing", value: "21h 41m" },
  { label: "Math", value: "33h 12m" },
];

/** Minutes studied per day for the last 34 days, as % of the tallest bar. */
export const dailyStudyBars = [
  42, 78, 30, 96, 55, 68, 40, 88, 25, 62, 74, 36, 90, 48, 58, 33, 80, 44, 66, 28, 92, 52, 38, 70, 46, 84, 32, 60, 76, 41, 88, 50,
  64, 35,
];

export const domainMastery: {
  name: string;
  questions: number;
  avgTime: string;
  mastery: number;
  performance: string;
}[] = [
  {
    name: "Information and Ideas",
    questions: 324,
    avgTime: "51s",
    mastery: 97.2,
    performance: "750–800",
  },
  {
    name: "Craft and Structure",
    questions: 543,
    avgTime: "42s",
    mastery: 93.9,
    performance: "730–790",
  },
  {
    name: "Expression of Ideas",
    questions: 494,
    avgTime: "39s",
    mastery: 90.8,
    performance: "720–780",
  },
  {
    name: "Algebra",
    questions: 791,
    avgTime: "55s",
    mastery: 94.5,
    performance: "740–800",
  },
  {
    name: "Advanced Math",
    questions: 883,
    avgTime: "62s",
    mastery: 92.8,
    performance: "730–790",
  },
  {
    name: "Problem Solving and Data",
    questions: 194,
    avgTime: "48s",
    mastery: 89.8,
    performance: "710–770",
  },
];

/* ---------- My profile (signed-in student) ---------- */

export const myProfile = {
  scoreLift: "+130 lift",
  latestTest: { label: "Latest predicted test", score: "1290", delta: "▲60" },
  latestSplit: [
    { label: "R&W", value: "630" },
    { label: "Math", value: "660" },
    { label: "Accuracy", value: "79%", highlight: true },
  ],
  domains: [
    { name: "Information & ideas", percent: 97 },
    { name: "Craft & structure", percent: 84 },
    { name: "Expression of ideas", percent: 71 },
    { name: "Algebra", percent: 91 },
    { name: "Advanced math", percent: 58 },
  ],
};

/** Last 8 weeks of daily activity (0–3), 14 columns × 4 rows. */
export const recentActivity = Array.from({ length: 56 }, (_, day) => {
  const seed = (day * 7) % 11;
  return seed > 7 ? 3 : seed > 5 ? 2 : seed > 3 ? 1 : 0;
});
