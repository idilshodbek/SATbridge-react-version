import { cn, Link } from "@heroui/react";

import { Panel } from "@/components/ui/Panel";
import { formatMinutes, formatTime, type PlanDay, studyWeek, TODAY_INDEX } from "@/data/planner";

import { PlanAdjustment, PlanPhases } from "../PlannerPage";
import { sessionColor, sessionDestination, useWeekProgress } from "../useWeekProgress";

/** Weekly plan on phones: week totals, then one card per day. Today is ticked off on the Today tab. */
export function PlannerMobile() {
  const week = useWeekProgress();

  const totals = [
    {
      label: "Sessions",
      value: `${week.sessionsDone}/${week.sessionsPlanned}`,
    },
    { label: "Studied", value: formatMinutes(week.minutesDone) },
    { label: "XP earned", value: `${week.xpEarned}` },
  ];

  return (
    <div className="flex animate-fade flex-col gap-3.5">
      <div className="flex gap-2.5">
        {totals.map((total) => (
          <Panel key={total.label} className="flex-1 p-3.5">
            <div className="text-[19px] font-extrabold tracking-[-0.6px]">{total.value}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-muted-2">{total.label}</div>
          </Panel>
        ))}
      </div>

      {studyWeek.map((day, index) => (
        <DayCard key={day.weekday} day={day} isToday={index === TODAY_INDEX} isDone={week.isDone} />
      ))}

      <PlanAdjustment />
      <PlanPhases />
    </div>
  );
}

type DayCardProps = {
  day: PlanDay;
  isToday: boolean;
  isDone: ReturnType<typeof useWeekProgress>["isDone"];
};

function DayCard({ day, isToday, isDone }: DayCardProps) {
  const minutes = day.sessions.reduce((total, s) => total + (s.kind === "rest" ? 0 : s.minutes), 0);
  const xp = day.sessions.reduce((total, s) => total + s.xp, 0);

  return (
    <Panel className={cn("rounded-[18px] p-4", isToday && "border-tint-blue-bd")}>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-[16px] font-extrabold tracking-[-0.3px]">
          {day.weekday} {day.date}
        </span>
        {isToday && (
          <span className="rounded-md bg-accent px-2 py-0.5 text-[10.5px] font-extrabold tracking-[.4px] text-white">TODAY</span>
        )}
        <span className="ml-auto text-[12px] font-bold text-muted-2">
          {minutes ? formatMinutes(minutes) : "Rest"}
          {xp > 0 && ` · ${xp} XP`}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {day.sessions.map((session) => {
          const done = isDone(session);
          return (
            <Link
              key={session.id}
              href={sessionDestination[session.kind]}
              className="flex w-full items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5 font-normal text-ink no-underline"
            >
              <span className="w-10.5 flex-none text-[11.5px] font-bold text-muted-2">{formatTime(session.startHour)}</span>
              <span className="size-2.25 flex-none rounded-full" style={{ background: sessionColor[session.kind] }} />
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate text-[14px] font-bold", done && "text-muted-2 line-through")}>
                  {done && "✓ "}
                  {session.title}
                </span>
                <span className="block truncate text-[11.5px] font-semibold text-muted-2">
                  {session.detail} · {session.minutes}m
                </span>
              </span>
              {session.xp > 0 && <span className="flex-none text-[12px] font-extrabold text-accent">+{session.xp}</span>}
            </Link>
          );
        })}
      </div>
    </Panel>
  );
}
