import { Checkbox, cn } from "@heroui/react";

import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { ChevronRightIcon, PlayIcon } from "@/components/icons";
import { MobileEyebrow } from "@/components/mobile/MobileEyebrow";
import { ShortcutTile } from "@/components/mobile/ShortcutTile";
import { ButtonLink } from "@/components/ui/Button";
import { Icon3D } from "@/components/ui/Icon3D";
import { Panel } from "@/components/ui/Panel";
import { quickLinks } from "@/data/home";
import { formatMinutes, type PlanSession, todayTasks, weekSummary } from "@/data/planner";
import { currentUser } from "@/data/user";

import { SquareCheck } from "../TodayPlan";
import { DailyGoalCard } from "./DailyGoalCard";
import { MobileRadarCard } from "./MobileRadarCard";
import { MobileScoreCard } from "./MobileScoreCard";

/** Home tab on phones: score, daily goal, radar, shortcuts and today's plan. */
export function HomeMobile() {
  const { completedTaskIds } = useProgress();
  const doneCount = todayTasks.filter((task) => completedTaskIds.has(task.id)).length;

  const stats = [
    {
      value: currentUser.studyStreak,
      label: "day streak",
      className: "text-orange",
    },
    {
      value: currentUser.accuracy,
      label: "accuracy",
      className: "text-success",
    },
    {
      value: `${doneCount}/${todayTasks.length}`,
      label: "plan done",
      className: "text-ink",
    },
  ];

  return (
    <div className="flex animate-fade flex-col gap-3.5">
      <MobileScoreCard />

      <ButtonLink
        href={paths.rush}
        tone="brand"
        className="w-full gap-2.5 rounded-[18px] p-4.25 text-[16px] font-extrabold shadow-[0_8px_20px_rgba(0,154,218,.28)] data-[pressed=true]:translate-y-px"
      >
        <PlayIcon size={17} />
        Start today&apos;s session
      </ButtonLink>

      <DailyGoalCard />

      <div className="flex gap-2.5">
        {stats.map((stat) => (
          <Panel key={stat.label} className="flex-1 p-3.5">
            <div className={cn("text-[21px] font-extrabold tracking-[-0.7px]", stat.className)}>{stat.value}</div>
            <div className="mt-0.5 text-[11px] leading-[1.3] font-semibold text-muted-2">{stat.label}</div>
          </Panel>
        ))}
      </div>

      <MobileRadarCard />

      <MobileEyebrow className="mt-1">EVERYTHING ELSE</MobileEyebrow>
      <div className="grid grid-cols-2 gap-2.5">
        {quickLinks.map((link) => (
          <ShortcutTile key={link.name} {...link} />
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between gap-2.5">
        <h2 className="text-[17px] font-extrabold tracking-[-0.4px]">Today&apos;s plan</h2>
        <div className="text-[12.5px] font-bold text-muted-2">
          {doneCount} of {todayTasks.length} blocks
        </div>
      </div>
      <div className="flex flex-col gap-2.25">
        {todayTasks.map((task) => (
          <PlanTask key={task.id} task={task} />
        ))}
      </div>

      <ButtonLink
        href={paths.planner}
        className="mt-0.5 w-full justify-start gap-3.25 rounded-[18px] border border-tint-blue-bd bg-tint-blue p-4 text-left hover:bg-tint-blue data-[pressed=true]:translate-y-px"
      >
        <Icon3D icon="plan" size={38} />
        <span className="min-w-0 flex-1">
          <span className="block text-[15.5px] font-extrabold text-ink">Weekly plan</span>
          <span className="mt-0.5 block text-[12.5px] font-semibold text-on-blue">{weekSummary}</span>
        </span>
        <ChevronRightIcon size={17} strokeWidth={2.6} className="text-on-blue" />
      </ButtonLink>
    </div>
  );
}

function PlanTask({ task }: { task: PlanSession }) {
  const { completedTaskIds, toggleTask } = useProgress();
  const isDone = completedTaskIds.has(task.id);

  return (
    <Checkbox isSelected={isDone} onChange={() => toggleTask(task.id)} className="group">
      <Checkbox.Content className="flex w-full cursor-pointer items-center gap-3.25 rounded-2xl border border-border bg-surface px-4 py-3.75">
        <SquareCheck />
        <div className="min-w-0 flex-1">
          <div className={cn("text-[14.5px] leading-[1.35] font-bold", isDone ? "text-muted-2 line-through" : "text-ink")}>
            {task.title}
          </div>
          <div className="mt-0.75 text-[11.5px] font-semibold text-muted-2">
            {[task.subject, formatMinutes(task.minutes)].filter(Boolean).join(" · ")} ·{" "}
            <span className="font-extrabold text-accent">+{task.xp} XP</span>
          </div>
        </div>
        <ChevronRightIcon size={15} strokeWidth={2.6} className="text-muted-3" />
      </Checkbox.Content>
    </Checkbox>
  );
}
