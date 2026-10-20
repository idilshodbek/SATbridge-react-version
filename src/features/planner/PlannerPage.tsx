import { cn } from "@heroui/react";

import { paths } from "@/app/paths";
import { ArrowUpRightIcon, SunIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon3D } from "@/components/ui/Icon3D";
import { PageTitle } from "@/components/ui/PageTitle";
import { Panel } from "@/components/ui/Panel";
import { formatMinutes, planAdjustment, planPhases, plannerSubtitle, type PlannerStat, weeklyStats } from "@/data/planner";

import { useWeekProgress } from "./useWeekProgress";
import { WeekCalendar } from "./WeekCalendar";

const statStyles: Record<PlannerStat["variant"], { card: string; label: string; value: string }> = {
  highlight: {
    card: "border-tint-blue-bd bg-tint-blue",
    label: "text-on-blue",
    value: "text-on-blue",
  },
  plain: {
    card: "border-border bg-surface",
    label: "text-muted",
    value: "text-ink",
  },
  warm: {
    card: "border-tint-amber-bd bg-tint-amber",
    label: "text-on-amber",
    value: "text-on-amber",
  },
};

/** The week plan. Today's sessions are checked off on the Today page. */
export function PlannerPage() {
  const week = useWeekProgress();

  const stats: PlannerStat[] = [
    {
      label: "Today",
      value: `${week.todayDone} / ${week.todayTotal}`,
      sub: "sessions done",
      variant: "highlight",
    },
    {
      label: "This week",
      value: formatMinutes(week.minutesDone),
      sub: `of ${formatMinutes(week.minutesPlanned)} planned`,
      variant: "plain",
    },
    {
      label: "XP this week",
      value: `${week.xpEarned}`,
      sub: `of ${week.xpPlanned} XP in the plan`,
      variant: "plain",
    },
    ...weeklyStats,
  ];

  return (
    <div className="max-w-[1420px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4.5">
        <div>
          <PageTitle icon={<Icon3D icon="plan" size={38} />}>Weekly plan</PageTitle>
          <div className="mt-1 text-[15.5px] font-semibold text-muted">{plannerSubtitle}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <ButtonLink href={paths.home} tone="outline" className="gap-2 px-5 py-3 text-[14px]">
            <SunIcon size={17} />
            Today&apos;s sessions
          </ButtonLink>
          <ButtonLink href={`${paths.settings}#study`} tone="outline" className="px-5 py-3 text-[14px]">
            Edit plan
          </ButtonLink>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4">
        {stats.map((stat) => {
          const style = statStyles[stat.variant];
          return (
            <div key={stat.label} className={cn("rounded-2xl border p-5", style.card)}>
              <div className={cn("mb-1.5 text-[14px] font-semibold", style.label)}>{stat.label}</div>
              <div className={cn("text-[28px] font-extrabold tracking-[-0.8px]", style.value)}>{stat.value}</div>
              <div className="mt-0.5 text-[13px] font-semibold text-muted-2">{stat.sub}</div>
            </div>
          );
        })}
      </div>

      <WeekCalendar />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
        <PlanAdjustment />
        <PlanPhases />
      </div>
    </div>
  );
}

/** Blue card with this week's automatic change to the plan. */
export function PlanAdjustment() {
  return (
    <div className="rounded-[18px] border border-tint-blue-bd bg-tint-blue p-5.5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <Icon3D icon="idea" size={28} />
        <Eyebrow className="text-on-blue">PLAN ADJUSTMENT</Eyebrow>
      </div>
      <div className="mb-4 text-[14.5px] leading-[1.6] font-medium text-ink-2">{planAdjustment}</div>
      <ButtonLink href={paths.vocab} tone="brand" className="gap-2 rounded-xl px-5 py-3 text-[13.5px]">
        Start vocab now
        <ArrowUpRightIcon size={15} />
      </ButtonLink>
    </div>
  );
}

/** The three phases of the 13-week plan. */
export function PlanPhases() {
  return (
    <Panel className="rounded-[18px] p-5.5">
      <Eyebrow className="mb-4">PHASES</Eyebrow>
      <div className="flex flex-col gap-3.5">
        {planPhases.map((phase) => (
          <div key={phase.name} className="flex items-start gap-3">
            <div
              className={cn(
                "grid size-6 flex-none place-items-center rounded-full text-[11.5px] font-extrabold",
                phase.status === "done" && "bg-success text-white",
                phase.status === "current" && "bg-accent text-white",
                phase.status === "upcoming" && "bg-surface-3 text-muted-2",
              )}
            >
              {phase.mark}
            </div>
            <div>
              <div className={cn("text-[15px] font-bold", phase.status === "upcoming" ? "text-muted" : "text-ink")}>
                {phase.name}
              </div>
              <div className="text-[12.5px] font-semibold text-muted-2">{phase.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
