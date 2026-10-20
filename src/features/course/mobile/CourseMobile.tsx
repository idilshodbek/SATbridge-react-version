import { cn, Link } from "@heroui/react";
import { useNavigate, useParams } from "react-router";

import { paths } from "@/app/paths";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { type CourseModule, courseSummaries, modulePaths } from "@/data/course";
import type { Subject } from "@/data/types";

const heroGradients: Record<Subject, string> = {
  rw: "linear-gradient(115deg,#C42B8E,#E5308F 55%,#F06CB4)",
  math: "linear-gradient(115deg,#0072AA,#0091D6 55%,#4FD0F0)",
};

/** Learn tab on phones: subject switch, course progress and the module map. */
export function CourseMobile() {
  const navigate = useNavigate();
  const subject: Subject = useParams().subject === "math" ? "math" : "rw";
  const summary = courseSummaries[subject];
  const modules = modulePaths[subject];

  return (
    <div className="animate-fade">
      <SegmentedControl
        aria-label="Subject"
        tone="ink"
        options={[
          { id: "rw", label: "Reading & Writing" },
          { id: "math", label: "Math & Graphing" },
        ]}
        value={subject}
        onChange={(next) => navigate(paths.course(next), { replace: true })}
        className="mb-4 w-full gap-1 rounded-[14px] border border-border bg-surface p-1"
        itemClassName="flex-1 rounded-[10px] px-1.5 py-2.75 text-[13px]"
      />

      <div className="relative mb-4.5 overflow-hidden rounded-[20px] p-5" style={{ background: heroGradients[subject] }}>
        <h2 className="text-[21px] leading-[1.2] font-extrabold tracking-[-0.6px] text-white">{summary.title}</h2>
        <div className="mt-1.25 mb-3.5 text-[13px] font-semibold text-white/86">{summary.meta}</div>
        <ProgressTrack
          aria-label="Course progress"
          value={summary.percent}
          color="#ffffff"
          className="mb-2 h-2.25 rounded-md bg-white/24"
        />
        <div className="text-[12px] font-bold text-white">
          {summary.percent}% complete · {summary.xp} XP
        </div>
      </div>

      <div className="flex flex-col">
        {modules.map((module, index) => (
          <ModuleRow
            key={module.tag}
            module={module}
            href={paths.courseUnit(subject)}
            hasConnector={index < modules.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

type ModuleRowProps = {
  module: CourseModule;
  href: string;
  hasConnector: boolean;
};

/** One stop on the module map. Unlocked modules open the unit screen. */
function ModuleRow({ module, href, hasConnector }: ModuleRowProps) {
  const isDone = module.percent === 100;
  const isStarted = module.percent > 0 && !isDone;
  const rowClass = "flex w-full items-start gap-3.5 font-normal text-ink no-underline";

  const content = (
    <>
      <div className="flex w-15 flex-none flex-col items-center">
        <div
          className={cn(
            "grid size-15 place-items-center rounded-full text-[19px] font-extrabold",
            module.isLocked && "bg-surface-3 text-muted-2",
            isDone && "bg-success text-white shadow-[0_5px_0_#16A34A]",
            !module.isLocked && !isDone && "bg-accent text-white shadow-[0_5px_0_#0072AA]",
          )}
        >
          {module.isLocked ? "🔒" : isDone ? "✓" : "▶"}
        </div>
        {hasConnector && <div className={cn("h-8.5 w-1 rounded-[3px]", isDone ? "bg-success" : "bg-border-2")} />}
      </div>

      <div
        className={cn(
          "mb-2 min-w-0 flex-1 rounded-2xl border bg-surface px-3.5 py-3",
          isStarted ? "border-tint-blue-bd" : "border-border",
        )}
      >
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-extrabold tracking-[0.9px]",
              module.isLocked ? "text-muted-3" : isDone ? "text-on-green" : "text-on-blue",
            )}
          >
            {module.tag}
          </span>
          {module.isLocked && (
            <span className="rounded-md bg-surface-3 px-1.75 py-0.5 text-[9.5px] font-extrabold text-muted-2">LOCKED</span>
          )}
        </div>
        <div className="text-[15.5px] leading-[1.3] font-bold">{module.name}</div>
        <div className="mt-2 flex items-center gap-2.25">
          <ProgressTrack
            aria-label={`${module.name} progress`}
            value={module.percent}
            color={isDone ? "#22C55E" : "#009ADA"}
            className="h-1.75 rounded-[5px] bg-surface-3"
          />
          <span className="flex-none text-[11.5px] font-bold text-muted-2">{module.progress}</span>
        </div>
      </div>
    </>
  );

  if (module.isLocked) return <div className={rowClass}>{content}</div>;
  return (
    <Link href={href} className={cn(rowClass, "data-[pressed=true]:translate-y-0.5")}>
      {content}
    </Link>
  );
}
