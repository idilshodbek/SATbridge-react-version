import { cn, Link } from "@heroui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { featureFlags } from "@/app/config";
import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { BridgeAiWelcome } from "@/components/ai/BridgeAiWelcome";
import { BotIcon, ChevronLeftIcon, ChevronRightIcon, FriendsIcon, ListIcon, PlusIcon, TimerIcon } from "@/components/icons";
import { ProBadge } from "@/components/ui/Badges";
import { Button, ButtonLink } from "@/components/ui/Button";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { GradientTile } from "@/components/ui/GradientTile";
import { LinePanel, LineTabs } from "@/components/ui/LineTabs";
import { allLessons, type Lesson, lessonAbout, lessonAiPrompts, lessonTranscript, syllabus } from "@/data/course";
import { AI_QUESTIONS_LEFT } from "@/data/tutor";

type RailTab = "course" | "ai" | "transcript";

const railTabs = [
  { id: "course", label: "Course", glyph: "☰" },
  { id: "ai", label: "Ask Bridge AI", glyph: "◕" },
  { id: "transcript", label: "Transcript", glyph: "▤" },
] as const;

/** Big word shown on the video placeholder. */
const videoMark = (lesson: Lesson, index: number) => (index === 0 ? "SCAN" : lesson.title.split(" ")[0].toUpperCase());

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();
  const [railTab, setRailTab] = useState<RailTab>("course");

  const index = Math.max(
    0,
    allLessons.findIndex((lesson) => lesson.id === lessonId),
  );
  const lesson = allLessons[index];
  const courseHome = paths.course("rw");

  const goToLesson = (target: number) => navigate(paths.lesson(allLessons[target].id));
  const goNext = () => {
    completeLesson(lesson.id);
    goToLesson(Math.min(allLessons.length - 1, index + 1));
  };

  return (
    <div className="flex h-screen bg-surface">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-none items-center justify-between gap-4 border-b border-border px-6 py-3.5">
          <ButtonLink href={courseHome} className="gap-2.25 p-0 text-[15px] text-ink hover:text-accent">
            <ChevronLeftIcon size={17} />
            Go back
          </ButtonLink>
          <div className="flex items-center gap-2">
            <WithTooltip label="Friends">
              <ButtonLink
                href={paths.friends}
                aria-label="Friends"
                tone="outline"
                className="size-9.5 rounded-[11px] p-0 text-muted"
              >
                <FriendsIcon size={18} />
              </ButtonLink>
            </WithTooltip>
            <WithTooltip label="Study rooms · shared timer">
              <ButtonLink
                href={paths.studyRooms}
                aria-label="Study rooms"
                tone="outline"
                className="size-9.5 rounded-[11px] p-0 text-muted"
              >
                <TimerIcon size={18} />
              </ButtonLink>
            </WithTooltip>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-auto px-8 pt-6.5 pb-5">
          <div className="mx-auto max-w-240">
            <div className="mb-1 text-[14.5px] font-semibold text-muted-2">{lesson.moduleName}</div>
            <h1 className="mb-4.5 text-[29px] font-extrabold tracking-[-0.7px]">{lesson.title}</h1>

            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[14px] border border-border bg-surface-2">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center text-[250px] font-extrabold tracking-[-8px] text-ink opacity-[.045]"
              >
                SB
              </div>
              <div className="relative text-[96px] font-extrabold tracking-[-4px] text-ink">{videoMark(lesson, index)}</div>
              <div className="absolute right-5.5 bottom-5 flex items-center gap-2 text-[17px] font-extrabold text-ink">
                <GradientTile className="size-6 rounded-lg" />
                SATbridge
              </div>
              <div className="absolute inset-x-4.5 bottom-0 h-1 bg-border">
                <div className="h-full w-[22%] bg-accent" />
              </div>
            </div>

            <div className="mt-5.5 rounded-[14px] border-[1.5px] border-tint-blue-bd bg-tint-blue px-5.5 py-5">
              <div className="mb-2.25 flex items-center gap-2.75">
                <GradientTile className="size-7 rounded-[9px]">
                  <PlusIcon size={16} strokeWidth={2.4} />
                </GradientTile>
                <h2 className="text-[19px] font-extrabold tracking-[-0.3px]">About this video</h2>
              </div>
              <div className="text-[15.5px] leading-[1.7] font-medium text-ink-2">{lessonAbout}</div>
            </div>
          </div>
        </div>

        <footer className="flex flex-none flex-wrap items-center justify-between gap-3.5 border-t border-border px-6 py-3.5">
          <div className="flex gap-2.5">
            <Button
              tone="outline"
              onPress={() => setRailTab("course")}
              className="gap-2.25 bg-surface-2 px-4.5 py-2.75 text-[14px] hover:bg-surface-3"
            >
              <ListIcon size={16} />
              Course
            </Button>
            <Button tone="violet-soft" onPress={() => setRailTab("ai")} className="gap-2.25 px-4.5 py-2.75 text-[14px]">
              <BotIcon size={16} strokeWidth={2.2} />
              Ask Bridge AI
            </Button>
          </div>
          <div className="flex gap-2.5">
            <Button
              tone="outline"
              onPress={() => goToLesson(Math.max(0, index - 1))}
              className="gap-2 px-5 py-3 text-[14px] text-muted"
            >
              <ChevronLeftIcon size={15} strokeWidth={2.8} />
              Previous
            </Button>
            <Button tone="ink" onPress={goNext} className="gap-2 px-5.5 py-3 text-[14px]">
              Next lesson
              <ChevronRightIcon size={15} strokeWidth={2.8} />
            </Button>
          </div>
        </footer>
      </div>

      <aside className="flex w-130 flex-none flex-col border-l border-border bg-surface">
        <LineTabs
          aria-label="Lesson sidebar"
          items={railTabs}
          selectedKey={railTab}
          onSelectionChange={setRailTab}
          className="relative min-h-0 flex-1"
          listContainerClassName="flex-none py-3 pr-14 pl-4"
          listClassName="gap-1.5"
          tabClassName="px-3.5 pt-2.5 pb-[12.5px] text-[15px] font-bold text-muted-2"
          trailing={
            <ButtonLink
              href={courseHome}
              aria-label="Close sidebar"
              className="absolute top-3 right-4 size-8.5 rounded-[10px] p-0 text-[17px] font-normal text-muted-2 hover:bg-hover"
            >
              ✕
            </ButtonLink>
          }
        >
          <LinePanel id="course" className="min-h-0 flex-1 overflow-auto px-4 pt-3.5 pb-5">
            <CourseOutline currentId={lesson.id} />
          </LinePanel>
          <LinePanel id="ai" className="min-h-0 flex-1 overflow-auto px-4 pt-3.5 pb-5">
            <BridgeAiWelcome
              size="lg"
              subtitle="Ask Bridge AI anything about this lesson."
              prompts={lessonAiPrompts.map((text, i) => ({
                text,
                highlighted: i === 3,
              }))}
              questionsLeft={AI_QUESTIONS_LEFT}
              className="h-full animate-fade px-6 py-10"
            />
          </LinePanel>
          <LinePanel id="transcript" className="min-h-0 flex-1 overflow-auto px-4 pt-3.5 pb-5">
            <div className="flex animate-fade flex-col gap-3.5">
              {lessonTranscript.map((line) => (
                <div key={line.time} className="flex gap-3.5">
                  <div className="w-12 flex-none pt-0.5 text-[13.5px] font-bold text-accent">{line.time}</div>
                  <div className="flex-1 text-[15.5px] leading-[1.65] font-medium text-ink-2">{line.text}</div>
                </div>
              ))}
            </div>
          </LinePanel>
        </LineTabs>

        {featureFlags.showProBanners && (
          <div className="m-3.5 flex flex-none items-center justify-between gap-3.5 rounded-[14px] bg-tint-pink px-4.5 py-4">
            <div className="text-[17px] font-extrabold text-pink-ink">Unlock the full course with Pro.</div>
            <ButtonLink href={paths.billing} tone="pro" className="px-4.5 py-2.5 text-[13.5px]">
              Upgrade
            </ButtonLink>
          </div>
        )}
      </aside>
    </div>
  );
}

/** Syllabus in the side rail: module and group headings, then one row per lesson. */
function CourseOutline({ currentId }: { currentId: string }) {
  const { completedLessonIds } = useProgress();

  return (
    <div className="flex flex-col gap-0.5">
      {syllabus.map((module, moduleIndex) => (
        <div key={module.name} className="flex flex-col gap-0.5">
          {moduleIndex > 0 && (
            <div className="flex flex-wrap items-center gap-2.75 px-1.5 pt-5 pb-2.5">
              <h3 className="text-[23px] font-extrabold tracking-[-0.5px]">{module.name}</h3>
              {module.isPro && <ProBadge className="px-2.5 text-[11px]" />}
            </div>
          )}
          {module.groups.map((group) => (
            <div key={group.name} className="flex flex-col gap-0.5">
              {moduleIndex > 0 && <div className="px-1.5 pt-3.5 pb-1.5 text-[14.5px] font-bold text-muted-2">{group.name}</div>}
              {group.lessons.map((lesson) => {
                const isCurrent = lesson.id === currentId;
                const isDone = completedLessonIds.has(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    href={paths.lesson(lesson.id)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3.25 rounded-xl px-3.5 py-3 no-underline hover:bg-hover",
                      isCurrent && "bg-surface-3",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-6 flex-none place-items-center rounded-[7px] border-2 text-[13px] font-extrabold text-white",
                        isDone ? "border-accent bg-accent" : "border-border-2 bg-surface",
                      )}
                    >
                      {isDone && "✓"}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 text-[16px]",
                        isCurrent ? "font-extrabold text-ink" : "font-semibold text-ink-2",
                      )}
                    >
                      {lesson.title}
                    </span>
                    <span className="text-[14px] font-semibold text-muted-2">{lesson.duration}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
