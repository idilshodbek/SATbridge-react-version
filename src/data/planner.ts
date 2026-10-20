/* ------------------------------------------------------------------ */
/* Study plan: one week of sessions. "Today" is one day of this week,   */
/* so Home (today's checklist) and the Planner (the week) never drift.  */
/* ------------------------------------------------------------------ */

export const plannerMonth = "September 2026";

export type SessionKind = "lesson" | "rush" | "vocab" | "mock" | "rest";

export type PlanSession = {
  id: string;
  kind: SessionKind;
  title: string;
  /** Topic or size, e.g. "Craft & structure" or "15 questions". */
  detail: string;
  subject?: "Math" | "R&W";
  /** Start time in hours, e.g. 16.5 = 16:30. */
  startHour: number;
  minutes: number;
  /** XP earned for finishing the session. */
  xp: number;
};

export type PlanDay = {
  weekday: string;
  shortWeekday: string;
  date: number;
  sessions: PlanSession[];
};

export const CALENDAR_START_HOUR = 7;
export const CALENDAR_HOURS = 14; // 07:00 → 20:00
/** Index of "today" inside `studyWeek`. */
export const TODAY_INDEX = 1;
/** Monday–Friday are school days; the weekend is lighter. */
export const WEEKDAY_COUNT = 5;

let nextId = 0;
const session = (
  kind: SessionKind,
  title: string,
  detail: string,
  startHour: number,
  minutes: number,
  xp: number,
  subject?: PlanSession["subject"],
  id = `session-${nextId++}`,
): PlanSession => ({
  id,
  kind,
  title,
  detail,
  subject,
  startHour,
  minutes,
  xp,
});

export const studyWeek: PlanDay[] = [
  {
    weekday: "Mon",
    shortWeekday: "Mo",
    date: 12,
    sessions: [
      session("lesson", "Linear equations", "Heart of algebra", 8, 40, 40, "Math"),
      session("vocab", "Vocab set 11", "10 new words", 16.5, 25, 20, "R&W"),
      session("rush", "Mixed algebra rush", "15 questions", 19, 40, 60, "Math"),
    ],
  },
  {
    weekday: "Tue",
    shortWeekday: "Tu",
    date: 13,
    sessions: [
      session(
        "lesson",
        "How to best use the SAT Math Masterclass",
        "Masterclass intro",
        8,
        2,
        10,
        "Math",
        "math-masterclass-intro",
      ),
      session(
        "lesson",
        "How to best use the Reading & Writing Masterclass",
        "Masterclass intro",
        8.5,
        2,
        10,
        "R&W",
        "rw-masterclass-intro",
      ),
      session("vocab", "Vocab set 12", "17 words", 16.5, 13, 20, "R&W", "vocab-set-12"),
      session("rush", "Question Rush: words in context", "15 questions", 17.5, 12, 60, "R&W", "rush-words-in-context"),
    ],
  },
  {
    weekday: "Wed",
    shortWeekday: "We",
    date: 14,
    sessions: [
      session("lesson", "Nonlinear functions", "Advanced math", 9, 50, 40, "Math"),
      session("rush", "Quadratics drill", "10 questions", 16, 35, 40, "Math"),
      session("vocab", "Vocab set 13", "10 new words", 20.5, 20, 20, "R&W"),
    ],
  },
  {
    weekday: "Thu",
    shortWeekday: "Th",
    date: 15,
    sessions: [
      session("lesson", "Transitions", "Expression of ideas", 8, 40, 40, "R&W"),
      session("rush", "Boundaries drill", "12 questions", 15.5, 35, 50, "R&W"),
      session("vocab", "Vocab review", "22 due cards", 19.5, 25, 20, "R&W"),
    ],
  },
  {
    weekday: "Fri",
    shortWeekday: "Fr",
    date: 16,
    sessions: [
      session("mock", "Predicted test #5", "Full length · 2h 14m", 9, 135, 200),
      session("rush", "Mistake replay", "18 missed items", 18, 45, 60),
    ],
  },
  {
    weekday: "Sat",
    shortWeekday: "Sa",
    date: 17,
    sessions: [
      session("lesson", "Circles & arcs", "Geometry", 10, 50, 40, "Math"),
      session("rush", "Trig drill", "12 questions", 12, 40, 50, "Math"),
      session("vocab", "Vocab set 14", "10 new words", 17, 20, 20, "R&W"),
    ],
  },
  {
    weekday: "Sun",
    shortWeekday: "Su",
    date: 18,
    sessions: [session("rest", "Rest day", "Plan rebalances tonight", 11, 60, 0)],
  },
];

export const today = studyWeek[TODAY_INDEX];

const plannedSessions = studyWeek.flatMap((day) => day.sessions).filter((s) => s.kind !== "rest");
const plannedMinutes = plannedSessions.reduce((total, s) => total + s.minutes, 0);

/** "Week 7 of 13 · 18 sessions · 10h 29m" */
export const weekSummary = `Week 7 of 13 · ${plannedSessions.length} sessions · ${formatMinutes(plannedMinutes)}`;

export const plannerSubtitle = `${weekSummary} · rebalanced every Sunday from your mock results`;

/** Today's checklist on Home. */
export const todayTasks = today.sessions;

export const todayLabel = `Today · ${today.weekday}, Sep ${today.date}`;

/** Sessions already ticked off when the app loads. */
export const initiallyCompletedTaskIds = ["math-masterclass-intro", "rw-masterclass-intro"];

/** Sessions finished earlier this week (before today), for the week totals. */
export const completedBeforeToday = studyWeek.slice(0, TODAY_INDEX).flatMap((day) => day.sessions.map((s) => s.id));

export type PlannerStat = {
  label: string;
  value: string;
  sub: string;
  /** "highlight" = blue tint card, "warm" = amber tint card. */
  variant: "highlight" | "plain" | "warm";
};

/** The "Today" and "XP this week" stats are computed from progress; these are static. */
export const weeklyStats: PlannerStat[] = [
  {
    label: "Phase",
    value: "Skill building",
    sub: "mocks start week 10",
    variant: "plain",
  },
  { label: "On pace", value: "+140", sub: "points per month", variant: "warm" },
];

export const planLegend: { kind: SessionKind; label: string; color: string }[] = [
  { kind: "lesson", label: "Lesson", color: "#009ADA" },
  { kind: "rush", label: "Drill", color: "#7C3AED" },
  { kind: "vocab", label: "Vocab", color: "#FFC93C" },
  { kind: "mock", label: "Mock test", color: "#E5308F" },
];

export const planAdjustment = "Your vocabulary accuracy is 27%. Sunday's rebalance swaps one math drill for two vocab sets.";

export const planPhases: {
  name: string;
  meta: string;
  status: "done" | "current" | "upcoming";
  mark: string;
}[] = [
  {
    name: "Foundations",
    meta: "Weeks 1–4 · complete",
    status: "done",
    mark: "✓",
  },
  {
    name: "Skill building",
    meta: "Weeks 5–9 · you are here",
    status: "current",
    mark: "●",
  },
  { name: "Full mocks", meta: "Weeks 10–13", status: "upcoming", mark: "3" },
];

/** "08:30" */
export function formatTime(startHour: number) {
  const hour = Math.floor(startHour);
  const minute = Math.round((startHour - hour) * 60);
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

/** "2h 14m" / "40m" */
export function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}m`;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}
