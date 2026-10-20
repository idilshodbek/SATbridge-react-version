import { cn, Link, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { type Key, useState } from "react";

import { paths } from "@/app/paths";
import { BoltFilledIcon, CheckIcon, ChevronRightIcon, FlameSolidIcon, LockIcon, PlayIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { allLessons, type CourseInfo, type PathLesson, type PathUnit } from "@/data/course";

/* Path geometry in the SVG's 800-wide viewBox: nodes zig-zag between two columns. */
const ROW_HEIGHT = 172;
const EDGE_PADDING = 78;
const VIEW_WIDTH = 800;
const COLUMN_X = [196, 604];

type NodeState = "done" | "current" | "locked";

const nodePoint = (index: number) => ({
  x: COLUMN_X[index % 2],
  y: EDGE_PADDING + index * ROW_HEIGHT,
});

/** SVG path that curves through every node. */
function buildPath(count: number) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const p = nodePoint(i);
    if (i === 0) {
      d = `M ${p.x} ${p.y}`;
      continue;
    }
    const prev = nodePoint(i - 1);
    d += ` C ${prev.x} ${prev.y + ROW_HEIGHT * 0.55} ${p.x} ${p.y - ROW_HEIGHT * 0.55} ${p.x} ${p.y}`;
  }
  return d;
}

type SkillPathProps = { units: PathUnit[]; course: CourseInfo };

/** Gamified lesson map: pick a unit, then follow the winding path of lessons. */
export function SkillPath({ units, course }: SkillPathProps) {
  const [unitIndex, setUnitIndex] = useState(0);
  const unit = units[Math.min(unitIndex, units.length - 1)];
  const { lessons, lessonsCleared } = unit;

  const viewHeight = EDGE_PADDING * 2 + (lessons.length - 1) * ROW_HEIGHT;
  const nextLesson = lessons[Math.min(lessonsCleared, lessons.length - 1)];

  const selectUnit = (keys: Set<Key>) => {
    const [key] = keys;
    if (key !== undefined) setUnitIndex(Number(key));
  };

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-border bg-tint-blue px-5 pt-6 pb-4.5">
      <div className="relative z-3 mb-4 flex flex-wrap items-center justify-between gap-3.5">
        <div>
          <h2 className="text-[28px] font-extrabold tracking-[-0.9px] text-ink">Skill Path</h2>
          <div className="mt-0.75 text-[14px] font-semibold text-on-blue">
            {unit.name} · {lessonsCleared} of {lessons.length} lessons cleared
          </div>
        </div>
        <div className="flex items-center gap-2.25">
          <span className="flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2.25 text-[13.5px] font-extrabold text-orange">
            <FlameSolidIcon size={14} />
            {course.streak}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-2.25 text-[13.5px] font-extrabold text-on-green">
            <BoltFilledIcon size={13} />
            {course.totalXp} XP
          </span>
        </div>
      </div>

      <ToggleButtonGroup
        aria-label="Units"
        isDetached
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[String(unitIndex)]}
        onSelectionChange={selectUnit}
        className="relative z-3 flex w-auto justify-start gap-2.25 overflow-auto px-0.5 pt-0.5 pb-3.5"
      >
        {units.map((u, index) => (
          <ToggleButton
            key={u.name}
            id={String(index)}
            className={cn(
              "group h-auto flex-none gap-2.25 rounded-full bg-white/45 px-4.5 py-3 text-[15px] font-bold text-on-blue opacity-80 hover:bg-white/45",
              "data-[selected=true]:bg-surface data-[selected=true]:text-ink data-[selected=true]:opacity-100",
              "data-[selected=true]:shadow-[0_6px_16px_rgba(15,36,48,.14)] data-[selected=true]:hover:bg-surface",
            )}
          >
            <span className="grid size-5.5 place-items-center rounded-full bg-border-3 text-[11px] font-extrabold text-white group-data-[selected=true]:bg-accent">
              {index + 1}
            </span>
            {u.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <div className="relative -mx-1" style={{ height: Math.round(viewHeight * 0.78) }}>
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${viewHeight}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <path
            d={buildPath(lessons.length)}
            fill="none"
            stroke="var(--surface)"
            strokeWidth="62"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildPath(lessons.length)}
            fill="none"
            stroke="var(--border-3)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="16 18"
            opacity=".85"
          />
        </svg>

        {lessons.map((lesson, index) => {
          const state: NodeState = index < lessonsCleared ? "done" : index === lessonsCleared ? "current" : "locked";
          const point = nodePoint(index);
          return (
            <PathNode
              key={lesson.title}
              lesson={lesson}
              state={state}
              alignRight={index % 2 === 1}
              left={(point.x / VIEW_WIDTH) * 100}
              top={(point.y / viewHeight) * 100}
            />
          );
        })}
      </div>

      <div className="relative z-3 flex flex-wrap items-center justify-between gap-3.5 px-1 pt-4 pb-0.5">
        <div className="text-[14.5px] font-bold text-on-blue">
          {lessons.length - lessonsCleared} lessons left in this unit · next up {nextLesson.title}
        </div>
        <ButtonLink
          href={paths.lesson(allLessons[0].id)}
          tone="brand"
          className="gap-2.25 px-5.5 py-3.25 text-[14.5px] font-extrabold shadow-[0_8px_20px_rgba(0,154,218,.32)]"
        >
          Continue path
          <ChevronRightIcon size={15} strokeWidth={2.8} />
        </ButtonLink>
      </div>
    </div>
  );
}

const nodeStyles: Record<NodeState, string> = {
  done: "bg-success shadow-[0_8px_18px_rgba(34,197,94,.35)]",
  current: "bg-surface shadow-[0_8px_20px_rgba(0,154,218,.3),0_0_0_8px_rgba(0,154,218,.16)]",
  locked: "cursor-not-allowed bg-surface-3",
};

type PathNodeProps = {
  lesson: PathLesson;
  state: NodeState;
  alignRight: boolean;
  left: number;
  top: number;
};

function PathNode({ lesson, state, alignRight, left, top }: PathNodeProps) {
  const isLocked = state === "locked";
  const nodeClass = cn("grid size-18.5 flex-none place-items-center rounded-full transition-transform", nodeStyles[state]);
  const glyph =
    state === "done" ? (
      <CheckIcon size={30} className="text-white" />
    ) : state === "current" ? (
      <PlayIcon size={26} className="text-accent" />
    ) : (
      <LockIcon size={28} className="text-muted-3" />
    );

  return (
    <div
      className={cn("absolute z-4 flex -translate-1/2 items-center gap-4", alignRight && "flex-row-reverse")}
      style={{ left: `${left.toFixed(2)}%`, top: `${top.toFixed(2)}%` }}
    >
      {isLocked ? (
        <span role="img" aria-label={`${lesson.title} (locked)`} className={nodeClass}>
          {glyph}
        </span>
      ) : (
        <Link href={paths.lesson(allLessons[0].id)} aria-label={lesson.title} className={cn(nodeClass, "hover:scale-106")}>
          {glyph}
        </Link>
      )}

      <div className={cn("max-w-50", alignRight ? "text-right" : "text-left")}>
        <div
          className={cn(
            "mb-1.75 text-[19px] leading-[1.25] font-extrabold tracking-[-0.4px]",
            isLocked ? "text-muted-3" : "text-ink",
          )}
        >
          {lesson.title}
        </div>
        <div className={cn("flex flex-wrap gap-1.75", alignRight && "flex-row-reverse")}>
          <span
            className={cn(
              "flex items-center gap-1.25 rounded-full px-2.75 py-1.25 text-[12.5px] font-extrabold",
              isLocked ? "bg-surface text-muted-3" : "bg-tint-green text-on-green",
            )}
          >
            <BoltFilledIcon size={11} />+{lesson.xp} XP
          </span>
          <span className="rounded-full bg-surface px-2.75 py-1.25 text-[12.5px] font-bold text-muted">{lesson.duration}</span>
        </div>
      </div>
    </div>
  );
}
