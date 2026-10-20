import { Checkbox, Chip, cn } from "@heroui/react";

import { useProgress } from "@/app/progress-context";
import { ClockIcon } from "@/components/icons";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { formatMinutes, type PlanSession, todayLabel, todayTasks } from "@/data/planner";

/** Today's checklist with a completion bar. */
export function TodayPlan() {
  const { completedTaskIds, toggleTask } = useProgress();
  const doneCount = todayTasks.filter((task) => completedTaskIds.has(task.id)).length;
  const percent = Math.round((doneCount / todayTasks.length) * 100);

  return (
    <div className="min-w-0 flex-[1_1_520px]">
      <div className="mb-2.5 text-[15px] font-bold text-muted">{todayLabel}</div>
      <Panel className="overflow-hidden">
        {todayTasks.map((task) => (
          <TaskRow key={task.id} task={task} isDone={completedTaskIds.has(task.id)} onToggle={() => toggleTask(task.id)} />
        ))}
        <div className="flex items-center justify-between gap-3 bg-surface-2 px-5 py-3.5">
          <div className="text-[13.5px] font-bold text-muted">
            {doneCount} of {todayTasks.length} done · {percent}%
          </div>
          <div className="max-w-55 flex-1">
            <ProgressTrack aria-label="Today's plan progress" value={percent} className="h-2 rounded-md" />
          </div>
        </div>
      </Panel>
    </div>
  );
}

function TaskRow({ task, isDone, onToggle }: { task: PlanSession; isDone: boolean; onToggle: () => void }) {
  const isMath = task.subject === "Math";

  return (
    <Checkbox isSelected={isDone} onChange={onToggle} className="group border-b border-border">
      <Checkbox.Content className="flex w-full cursor-pointer items-start gap-3.5 px-5 py-4.5 hover:bg-surface-2">
        <SquareCheck />
        <div className="min-w-0 flex-1">
          <div className={cn("mb-2 text-[16.5px] font-bold", isDone ? "text-muted-2 line-through" : "text-ink")}>
            {task.title}
          </div>
          <div className="flex flex-wrap items-center gap-2.25">
            {task.subject && (
              <Chip
                className={cn(
                  "rounded-[7px] px-2.5 py-1 text-[11.5px] font-bold",
                  isMath ? "bg-tint-blue text-brand-ink" : "bg-tint-pink text-on-pink",
                )}
              >
                {task.subject}
              </Chip>
            )}
            <span className="flex items-center gap-1.25 text-[12.5px] font-semibold text-muted-2">
              <ClockIcon size={13} />
              {formatMinutes(task.minutes)}
            </span>
            <span className="text-[12.5px] font-semibold text-muted-2">· {task.detail}</span>
            <span className="text-[12.5px] font-extrabold text-accent">+{task.xp} XP</span>
          </div>
        </div>
      </Checkbox.Content>
    </Checkbox>
  );
}

/** 24px rounded-square checkbox from the design (brand blue when checked). */
export function SquareCheck() {
  return (
    <Checkbox.Control className="size-6 rounded-[7px] border-2 border-border-2 bg-surface shadow-none before:rounded-none before:bg-accent group-data-[selected=true]:border-accent">
      <Checkbox.Indicator className="size-3.25 text-white [&_svg]:stroke-3" />
    </Checkbox.Control>
  );
}
