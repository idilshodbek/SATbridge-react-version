import { cn, Link } from "@heroui/react";
import { useState } from "react";

import { paths } from "@/app/paths";
import { Button } from "@/components/ui/Button";
import {
  CALENDAR_HOURS,
  CALENDAR_START_HOUR,
  formatTime,
  type PlanSession,
  planLegend,
  plannerMonth,
  type SessionKind,
  studyWeek,
  TODAY_INDEX,
  WEEKDAY_COUNT,
} from "@/data/planner";

import { sessionColor, sessionDestination, useWeekProgress } from "./useWeekProgress";

const HOUR_HEIGHT = 54;
const hours = Array.from({ length: CALENDAR_HOURS }, (_, i) => `${String(CALENDAR_START_HOUR + i).padStart(2, "0")}:00`);

const blockStyles: Record<SessionKind, { card: string; text: string }> = {
  lesson: { card: "bg-tint-blue", text: "text-on-blue" },
  rush: { card: "bg-tint-violet", text: "text-on-violet" },
  vocab: { card: "bg-tint-amber", text: "text-on-amber" },
  mock: { card: "bg-tint-pink", text: "text-on-pink" },
  rest: { card: "bg-surface-3", text: "text-muted" },
};

/** The week grid (07:00–20:00). Today's column links back to the Today page. */
export function WeekCalendar() {
  const { isDone } = useWeekProgress();
  // Weeks before/after this one exist as dates only: the plan for them is built on Sunday.
  const [weekOffset, setWeekOffset] = useState(0);
  const isThisWeek = weekOffset === 0;

  return (
    <div className="mb-6 animate-fade overflow-hidden rounded-[18px] border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3.5 px-5.5 pt-4.5 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="text-[20px] font-extrabold tracking-[-0.5px]">
            {plannerMonth}
            {!isThisWeek && (
              <span className="ml-2 text-[14px] font-bold text-muted-2">
                {weekOffset > 0
                  ? `${weekOffset} week${weekOffset > 1 ? "s" : ""} ahead`
                  : `${-weekOffset} week${weekOffset < -1 ? "s" : ""} ago`}
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <Button
              aria-label="Previous week"
              tone="outline"
              onPress={() => setWeekOffset((w) => w - 1)}
              className="size-8 rounded-[10px] p-0 text-[16px] font-extrabold text-muted"
            >
              ‹
            </Button>
            {!isThisWeek && (
              <Button
                tone="outline"
                onPress={() => setWeekOffset(0)}
                className="rounded-[10px] px-3 py-1.5 text-[12.5px] text-muted"
              >
                This week
              </Button>
            )}
            <Button
              aria-label="Next week"
              tone="outline"
              onPress={() => setWeekOffset((w) => w + 1)}
              className="size-8 rounded-[10px] p-0 text-[16px] font-extrabold text-muted"
            >
              ›
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3.5">
          {planLegend.map((item) => (
            <span key={item.label} className="flex items-center gap-1.75 text-[12.5px] font-bold text-muted">
              <span className="size-2.5 rounded-sm" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex overflow-x-auto border-t border-border">
        <div className="w-15.5 flex-none border-r border-border">
          <div className="h-13.5 border-b border-border" />
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-13.5 border-b border-border px-2.5 pt-1 text-right text-[11.5px] font-semibold text-muted-3"
            >
              {hour}
            </div>
          ))}
        </div>

        <div className="relative grid min-w-140 flex-1 grid-cols-7">
          {!isThisWeek && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-background/70 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-6 py-5 text-center shadow-[0_14px_34px_rgba(15,36,48,.12)]">
                <div className="text-[16px] font-extrabold">{weekOffset > 0 ? "Not planned yet" : "Nothing to show"}</div>
                <div className="max-w-64 text-[13px] font-semibold text-muted-2">
                  {weekOffset > 0
                    ? "Your plan for this week is built on Sunday from this week's results."
                    : "Sessions from past weeks are counted in your analytics."}
                </div>
                <Button tone="brand" onPress={() => setWeekOffset(0)} className="mt-1 rounded-xl px-4 py-2 text-[13px]">
                  Back to this week
                </Button>
              </div>
            </div>
          )}
          {studyWeek.map((day, index) => {
            const isToday = isThisWeek && index === TODAY_INDEX;
            const header = (
              <>
                <span className={cn("text-[11.5px] font-bold tracking-[.6px]", isToday ? "text-on-blue" : "text-muted-2")}>
                  {isToday ? "TODAY" : day.weekday.toUpperCase()}
                </span>
                <span className={cn("text-[17px] font-extrabold tracking-[-0.4px]", isToday ? "text-on-blue" : "text-ink")}>
                  {day.date + weekOffset * 7}
                </span>
              </>
            );

            return (
              <div key={day.weekday} className="min-w-0 border-r border-border">
                {isToday ? (
                  <Link
                    href={paths.home}
                    aria-label="Open today's plan"
                    className="flex h-13.5 w-full flex-col items-center justify-center gap-px border-b border-border bg-tint-blue no-underline"
                  >
                    {header}
                  </Link>
                ) : (
                  <div className="flex h-13.5 flex-col items-center justify-center gap-px border-b border-border">{header}</div>
                )}

                <div
                  className={cn("relative", index >= WEEKDAY_COUNT ? "bg-surface-2" : "bg-surface")}
                  style={{ height: CALENDAR_HOURS * HOUR_HEIGHT }}
                >
                  {hours.map((hour) => (
                    <div key={hour} className="h-13.5 border-b border-border" />
                  ))}
                  {isThisWeek &&
                    day.sessions.map((session) => <SessionBlock key={session.id} session={session} isDone={isDone(session)} />)}
                  {isToday && (
                    <div className="absolute inset-x-0 top-[351px] h-0.5 bg-danger">
                      <span className="absolute -top-0.75 -left-0.75 size-2 rounded-full bg-danger" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SessionBlock({ session, isDone }: { session: PlanSession; isDone: boolean }) {
  const style = blockStyles[session.kind];
  const top = (session.startHour - CALENDAR_START_HOUR) * HOUR_HEIGHT;
  const height = Math.max(26, (session.minutes / 60) * HOUR_HEIGHT - 4);
  const isTall = session.minutes >= 60;

  return (
    <Link
      href={sessionDestination[session.kind]}
      className={cn(
        "absolute inset-x-0.75 block w-auto overflow-hidden rounded-[10px] border-l-[3px] px-2 py-1.75 no-underline hover:brightness-[.97]",
        style.card,
        isDone && "opacity-60",
      )}
      style={{ top, height, borderLeftColor: sessionColor[session.kind] }}
    >
      <div className={cn("truncate text-[11.5px] leading-[1.25] font-extrabold", style.text, isDone && "line-through")}>
        {isDone && "✓ "}
        {session.title}
      </div>
      <div className={cn("mt-0.5 text-[10.5px] font-semibold", style.text)}>
        {formatTime(session.startHour)} · {session.minutes}m{session.xp > 0 && ` · +${session.xp} XP`}
      </div>
      {isTall && <div className={cn("mt-1 text-[10.5px] leading-[1.3] font-semibold", style.text)}>{session.detail}</div>}
    </Link>
  );
}
