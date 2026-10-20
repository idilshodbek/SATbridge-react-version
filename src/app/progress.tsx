import { toast } from "@heroui/react";
import { type ReactNode, useCallback, useMemo, useState } from "react";

import { initiallyCompletedLessonIds } from "@/data/course";
import { DAILY_GOAL } from "@/data/home";
import { initiallyCompletedTaskIds, todayTasks } from "@/data/planner";
import { currentUser } from "@/data/user";

import { ProgressContext } from "./progress-context";

/** Holds today's tasks, watched lessons, daily goal progress and XP (in memory for the demo). */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedTaskIds, setCompletedTaskIds] = useState<ReadonlySet<string>>(() => new Set(initiallyCompletedTaskIds));
  const [completedLessonIds, setCompletedLessonIds] = useState<ReadonlySet<string>>(() => new Set(initiallyCompletedLessonIds));

  const [earnedXp, setEarnedXp] = useState(0);

  const awardXp = useCallback((amount: number, reason?: string) => {
    setEarnedXp((current) => current + amount);
    if (amount > 0) toast.success(`+${amount} XP`, { description: reason, timeout: 2500 });
  }, []);

  const toggleTask = useCallback(
    (taskId: string) => {
      const task = todayTasks.find((t) => t.id === taskId);
      setCompletedTaskIds((current) => {
        const next = new Set(current);
        if (next.has(taskId)) next.delete(taskId);
        else next.add(taskId);
        return next;
      });
      // Finishing a session earns its XP; un-ticking takes it back quietly.
      if (task) {
        if (completedTaskIds.has(taskId)) setEarnedXp((current) => current - task.xp);
        else awardXp(task.xp, task.title);
      }
    },
    [awardXp, completedTaskIds],
  );

  const completeLesson = useCallback((lessonId: string) => {
    setCompletedLessonIds((current) => new Set(current).add(lessonId));
  }, []);

  const [answeredToday, setAnsweredToday] = useState(DAILY_GOAL.initialAnswered);

  const addAnswered = useCallback((count: number) => {
    setAnsweredToday((current) => Math.min(DAILY_GOAL.target, Math.max(0, current + count)));
  }, []);

  const value = useMemo(
    () => ({
      completedTaskIds,
      toggleTask,
      completedLessonIds,
      completeLesson,
      dailyGoal: { answered: answeredToday, target: DAILY_GOAL.target },
      addAnswered,
      xp: currentUser.xp + earnedXp,
      awardXp,
    }),
    [completedTaskIds, toggleTask, completedLessonIds, completeLesson, answeredToday, addAnswered, earnedXp, awardXp],
  );

  return <ProgressContext value={value}>{children}</ProgressContext>;
}
