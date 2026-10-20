import { useState } from "react";
import { Navigate, useParams } from "react-router";

import { featureFlags } from "@/app/config";
import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { LineTabs } from "@/components/ui/LineTabs";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { allLessons, courseFacts, courses, skillPaths, TOTAL_LESSONS } from "@/data/course";
import type { Subject } from "@/data/types";

import { SkillPath } from "./SkillPath";

type CourseTab = "path" | "progress";

const courseTabs = [
  { id: "path", label: "Skill Path", glyph: "☰" },
  { id: "progress", label: "Progress", glyph: "★" },
] as const;

const isSubject = (value: string | undefined): value is Subject => value === "rw" || value === "math";

export function CoursePage() {
  const { subject } = useParams();
  const [tab, setTab] = useState<CourseTab>("path");
  const { completedLessonIds } = useProgress();

  if (!isSubject(subject)) return <Navigate to={paths.course("rw")} replace />;

  const course = courses[subject];
  const doneCount = allLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
  const percent = Math.round((doneCount / TOTAL_LESSONS) * 100);
  const firstLesson = paths.lesson(allLessons[0].id);

  return (
    <div className="relative">
      <CourseHero title={course.title} gradient={course.heroGradient} tab={tab} onTabChange={setTab} />

      <div className="flex max-w-375 flex-wrap items-start gap-6.5 px-9 pt-7 pb-22.5">
        <div className="min-w-[min(100%,440px)] flex-[1_1_560px]">
          <Panel className="mb-4 flex flex-wrap items-center justify-between gap-4.5 px-6 py-5.5">
            <div>
              <h2 className="mb-1.25 text-[20px] font-extrabold tracking-[-0.3px]">Continue your course</h2>
              <div className="text-[14.5px] font-semibold text-muted">
                Pick up where you left off with your most recent lesson.
              </div>
            </div>
            <ButtonLink href={firstLesson} tone="ink" className="gap-2.25 px-5 py-3.25 text-[14.5px]">
              Resume course
              <ChevronRightIcon size={15} strokeWidth={2.8} />
            </ButtonLink>
          </Panel>

          <Panel className="mb-6.5 px-6 py-5.5">
            <div className="mb-2.75 flex items-center justify-between gap-3">
              <div className="text-[16px] font-bold">Your progress</div>
              <div className="text-[16px] font-extrabold text-muted">{percent}%</div>
            </div>
            <div className="mb-2.5">
              <ProgressTrack
                aria-label="Course progress"
                value={percent}
                className="h-2.25 rounded-md bg-border"
                fillClassName="duration-350"
              />
            </div>
            <div className="text-[14px] font-semibold text-muted-2">
              {doneCount} of {TOTAL_LESSONS} lessons complete
            </div>
          </Panel>

          <SkillPath key={subject} units={skillPaths[subject]} course={course} />
        </div>

        <div className="relative z-2 flex w-100 max-w-107.5 min-w-[min(100%,340px)] flex-[1_1_340px] flex-col gap-4.5 min-[1180px]:-mt-47.5">
          <Panel className="rounded-[18px] p-6 shadow-[0_18px_40px_rgba(15,36,48,.1)]">
            <h2 className="mb-4 text-[22px] font-extrabold tracking-[-0.4px]">Meet your instructor</h2>
            <div className="mb-3.5 size-24 overflow-hidden rounded-[14px] bg-surface-3">
              <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
                <rect width="96" height="96" fill="var(--surface-3)" />
                <circle cx="48" cy="38" r="16" fill="#B9CEDA" />
                <path d="M14 96c0-19 15-30 34-30s34 11 34 30Z" fill="#A9C2D0" />
              </svg>
            </div>
            <div className="mb-2 text-[21px] font-extrabold tracking-[-0.3px]">{course.instructor.name}</div>
            <div className="text-[15px] leading-[1.65] font-medium text-muted">{course.instructor.bio}</div>
          </Panel>

          <Panel className="rounded-[18px] p-6">
            <h2 className="mb-4 text-[22px] font-extrabold tracking-[-0.4px]">About this course</h2>
            <div className="flex flex-col gap-3.5">
              {courseFacts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-3">
                  <span className="grid size-6.5 flex-none place-items-center rounded-lg bg-hover text-[13px] text-muted">
                    {fact.glyph}
                  </span>
                  <span className="text-[15.5px] font-medium text-muted">
                    {fact.label}: <span className="font-bold text-ink">{fact.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {featureFlags.showProBanners && (
        <div className="pointer-events-none sticky bottom-0 flex justify-center px-9 pb-5.5">
          <div className="pointer-events-auto flex flex-wrap items-center gap-4 rounded-[14px] bg-pink py-3.5 pr-4 pl-6.5 shadow-[0_16px_36px_rgba(229,48,143,.35)]">
            <div className="text-[19px] font-extrabold text-white">Unlock the full course with Pro.</div>
            <div className="flex gap-2.25">
              <Button
                onPress={() => setTab("path")}
                className="rounded-[10px] border-[1.5px] border-white/60 px-4.5 py-2.75 text-[14px] text-white hover:bg-black/12"
              >
                View syllabus
              </Button>
              <ButtonLink
                href={paths.billing}
                tone="white"
                className="rounded-[10px] bg-surface px-4.5 py-2.75 text-[14px] text-pink-ink hover:bg-surface"
              >
                Upgrade
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type CourseHeroProps = {
  title: string;
  gradient: string;
  tab: CourseTab;
  onTabChange: (tab: CourseTab) => void;
};

function CourseHero({ title, gradient, tab, onTabChange }: CourseHeroProps) {
  return (
    <div className="relative min-h-82.5 overflow-hidden px-9 pt-6.5" style={{ background: gradient }}>
      <svg width="620" height="330" viewBox="0 0 620 330" className="absolute top-0 right-0 opacity-90" aria-hidden="true">
        <g opacity=".35">
          <path d="M330 300c40-120 130-210 290-250" stroke="var(--surface)" strokeWidth="2" fill="none" />
          <path d="M300 320c50-130 150-230 320-268" stroke="var(--surface)" strokeWidth="2" fill="none" />
        </g>
        <rect
          x="300"
          y="40"
          width="250"
          height="250"
          rx="16"
          fill="var(--surface)"
          opacity=".14"
          transform="rotate(-12 425 165)"
        />
        <g transform="rotate(-28 470 150)">
          <rect x="430" y="20" width="66" height="230" rx="30" fill="#FBD8A8" />
          <rect x="430" y="20" width="66" height="60" rx="30" fill="#F2A9C6" />
          <path d="M430 250c10 34 46 34 66 0Z" fill="#2C2136" />
        </g>
      </svg>

      <ButtonLink href={paths.home} className="relative mb-5.5 gap-2.25 px-0 py-1.5 text-[15.5px] text-white hover:opacity-80">
        <ChevronLeftIcon size={17} />
        Back to courses
      </ButtonLink>
      {/* Wide screens keep the title clear of the pencil illustration; narrower ones let it overlap. */}
      <h1 className="relative max-w-160 text-[46px] leading-[1.12] font-extrabold tracking-[-1.4px] text-white min-[1180px]:max-w-[min(900px,calc(100%-450px))]">
        {title}
      </h1>

      <LineTabs
        aria-label="Course sections"
        items={courseTabs}
        selectedKey={tab}
        onSelectionChange={onTabChange}
        className="relative mt-14"
        listContainerClassName="border-b-0"
        listClassName="gap-2.5"
        tabClassName="gap-2.25 px-4.5 pt-3.5 pb-[17px] text-[16px] font-bold text-white opacity-72 data-[selected=true]:text-white data-[selected=true]:opacity-100 hover:opacity-100"
        indicatorClassName="h-0.75 bg-white"
      />
    </div>
  );
}
