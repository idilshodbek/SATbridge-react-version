/* ------------------------------------------------------------------ */
/* Analytics dashboard                                                 */
/* ------------------------------------------------------------------ */

export type AnalyticsScope = "all" | "rw" | "math";

export const scopeHeadlines: Record<AnalyticsScope, string> = {
  all: "Where the next 370 points are",
  rw: "Where the next 290 R&W points are",
  math: "Where the next 140 Math points are",
};

export const analyticsSummary = "6 mocks · 1,842 questions answered · 26.7h studied in 7 weeks";
/** Phone-width version of the summary line. */
export const analyticsSummaryShort = "6 mocks · 1,842 questions · 26.7h studied";

export type KpiTile = {
  label: string;
  value: string;
  sub: string;
  variant: "brand" | "success" | "plain" | "danger" | "warm";
  /** Compact label / sub-line for small screens. */
  shortLabel?: string;
  shortSub?: string;
};

export const kpiTiles: KpiTile[] = [
  {
    label: "LATEST MOCK",
    value: "1290",
    sub: "+60 vs test #5",
    variant: "brand",
  },
  {
    label: "ACCURACY",
    value: "79%",
    sub: "up 9 pts this month",
    shortSub: "up 9 pts",
    variant: "success",
  },
  {
    label: "AVG PER QUESTION",
    shortLabel: "AVG / QUESTION",
    value: "1:21",
    sub: "target 1:15",
    variant: "plain",
  },
  {
    label: "CARELESS MISSES",
    shortLabel: "CARELESS",
    value: "19",
    sub: "knew it, rushed it",
    variant: "danger",
  },
  {
    label: "PROJECTED",
    value: "1420",
    sub: "at this pace by 3 Oct",
    variant: "warm",
  },
];

export type HeatTile = {
  subject: "R&W" | "Math";
  skill: string;
  accuracy: number;
  avgTime: string;
  /** Compact skill name for small screens. */
  short?: string;
};

export const heatmap: HeatTile[] = [
  { subject: "R&W", skill: "Inferences", accuracy: 99, avgTime: "12s" },
  {
    subject: "R&W",
    skill: "Command of evidence",
    short: "Evidence",
    accuracy: 95,
    avgTime: "14s",
  },
  { subject: "R&W", skill: "Text structure", accuracy: 80, avgTime: "18s" },
  { subject: "R&W", skill: "Transitions", accuracy: 66, avgTime: "21s" },
  { subject: "R&W", skill: "Boundaries", accuracy: 59, avgTime: "24s" },
  {
    subject: "R&W",
    skill: "Vocabulary in context",
    short: "Vocabulary",
    accuracy: 27,
    avgTime: "38s",
  },
  { subject: "Math", skill: "Linear equations", accuracy: 92, avgTime: "41s" },
  { subject: "Math", skill: "Systems", accuracy: 88, avgTime: "48s" },
  { subject: "Math", skill: "Percent change", accuracy: 62, avgTime: "62s" },
  { subject: "Math", skill: "Quadratic graphs", accuracy: 64, avgTime: "71s" },
  { subject: "Math", skill: "Circles & arcs", accuracy: 41, avgTime: "84s" },
  { subject: "Math", skill: "Trigonometry", accuracy: 38, avgTime: "96s" },
];

/** Heatmap legend, weak → strong. */
export const heatScale = ["#FF4B55", "#FF9500", "#FFC93C", "#8CDD62", "#3FB618"];

export type QuadrantDot = {
  x: number;
  y: number;
  color: string;
  topic: string;
};

const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const VIOLET = "#7C3AED";

/** Confidence quadrant dots in a 300×300 viewBox. */
export const quadrants: { subject: string; dots: QuadrantDot[] }[] = [
  {
    subject: "English",
    dots: [
      { x: 72, y: 60, color: GREEN, topic: "Inferences" },
      { x: 104, y: 96, color: GREEN, topic: "Command of evidence" },
      { x: 126, y: 44, color: GREEN, topic: "Central ideas" },
      { x: 188, y: 82, color: AMBER, topic: "Text structure" },
      { x: 214, y: 122, color: AMBER, topic: "Transitions" },
      { x: 96, y: 206, color: RED, topic: "Boundaries" },
      { x: 204, y: 232, color: VIOLET, topic: "Cross-text connections" },
      { x: 246, y: 258, color: VIOLET, topic: "Vocabulary in context" },
    ],
  },
  {
    subject: "Math",
    dots: [
      { x: 60, y: 48, color: GREEN, topic: "Linear equations" },
      { x: 92, y: 88, color: GREEN, topic: "Systems" },
      { x: 140, y: 116, color: GREEN, topic: "Linear functions" },
      { x: 176, y: 62, color: AMBER, topic: "Quadratic graphs" },
      { x: 232, y: 106, color: AMBER, topic: "Percent change" },
      { x: 118, y: 196, color: RED, topic: "Ratios & rates" },
      { x: 66, y: 228, color: RED, topic: "Probability" },
      { x: 226, y: 244, color: VIOLET, topic: "Circles & arcs" },
    ],
  },
];

export type TimeShareRow = {
  label: string;
  you: string;
  average: string;
  color: string;
};

/** Share of time per difficulty; segments are 40% / 34% / 26% of the ring. */
export const TIME_SHARE_SEGMENTS = [40, 34, 26];

export const timeShare: {
  subject: string;
  total: string;
  rows: TimeShareRow[];
}[] = [
  {
    subject: "English",
    total: "2m 12s",
    rows: [
      { label: "Easy", you: "46s", average: "1m 11s", color: "#7BE3A6" },
      { label: "Medium", you: "1m 14s", average: "1m 31s", color: "#F59E0B" },
      { label: "Hard", you: "2m 52s", average: "2m 20s", color: "#DC2626" },
    ],
  },
  {
    subject: "Math",
    total: "1m 58s",
    rows: [
      { label: "Easy", you: "55s", average: "1m 11s", color: "#7BE3A6" },
      { label: "Medium", you: "1m 35s", average: "1m 38s", color: "#F59E0B" },
      { label: "Hard", you: "3m 08s", average: "2m 44s", color: "#DC2626" },
    ],
  },
];
