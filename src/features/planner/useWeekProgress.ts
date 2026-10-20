import { useProgress } from "@/app/progress-context";
import { paths } from "@/app/paths";
import { allLessons } from "@/data/course";
import { completedBeforeToday, type PlanSession, type SessionKind, studyWeek, todayTasks } from "@/data/planner";

/** Where each kind of session opens. */
export const sessionDestination: Record<SessionKind, string> = {
  lesson: paths.lesson(allLessons[0].id),
  rush: paths.rush,
  vocab: paths.vocab,
  mock: paths.tests,
  rest: paths.planner,
};

/** Session colours (legend dot / calendar accent). */
export const sessionColor: Record<SessionKind, string> = {
  lesson: "#009ADA",
  rush: "#7C3AED",
  vocab: "#F59E0B",
  mock: "#E5308F",
  rest: "var(--border-3)",
};

/**
 * Week totals for the planner. Today's sessions are ticked on the Today page
 * (shared progress); earlier days count as done.
 */
export function useWeekProgress() {
  const { completedTaskIds } = useProgress();
  const isDone = (session: PlanSession) => completedTaskIds.has(session.id) || completedBeforeToday.includes(session.id);

  const sessions = studyWeek.flatMap((day) => day.sessions).filter((s) => s.kind !== "rest");
  const done = sessions.filter(isDone);
  const sum = (list: PlanSession[], key: "minutes" | "xp") => list.reduce((total, s) => total + s[key], 0);

  return {
    isDone,
    sessionsDone: done.length,
    sessionsPlanned: sessions.length,
    minutesDone: sum(done, "minutes"),
    minutesPlanned: sum(sessions, "minutes"),
    xpEarned: sum(done, "xp"),
    xpPlanned: sum(sessions, "xp"),
    todayDone: todayTasks.filter(isDone).length,
    todayTotal: todayTasks.length,
  };
}
