import { createContext, useContext } from "react";

/**
 * Study progress shared across pages (and across the desktop and mobile layouts):
 *  - today's plan tasks (Home ↔ Planner "Today" stat)
 *  - watched lessons (Course progress ↔ Lesson player)
 *  - questions answered today towards the daily goal (mobile Home ↔ question runner)
 *  - XP, awarded by finishing plan sessions, correct answers and learned words
 *
 * In-memory for the demo; swap the useState calls for API calls when a backend exists.
 */
export type ProgressContextValue = {
  completedTaskIds: ReadonlySet<string>;
  toggleTask: (taskId: string) => void;
  completedLessonIds: ReadonlySet<string>;
  completeLesson: (lessonId: string) => void;
  dailyGoal: { answered: number; target: number };
  /** Adds (or with a negative number removes) answered questions, clamped to the goal. */
  addAnswered: (count: number) => void;
  /** Total XP (the account's XP plus everything earned in this session). */
  xp: number;
  /** Adds XP and shows a "+N XP" toast. `reason` is the toast's description, e.g. the session name. */
  awardXp: (amount: number, reason?: string) => void;
};

export const ProgressContext = createContext<ProgressContextValue | null>(null);

/** Shared study progress. Must be used inside <ProgressProvider>. */
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside <ProgressProvider>");
  return context;
}
