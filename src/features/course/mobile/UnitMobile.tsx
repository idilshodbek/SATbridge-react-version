import { cn } from "@heroui/react";
import { type ReactNode, useState } from "react";
import { useParams } from "react-router";

import { paths } from "@/app/paths";
import { PlayIcon, PlusIcon } from "@/components/icons";
import { MobileEyebrow } from "@/components/mobile/MobileEyebrow";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { ProgressTrack } from "@/components/ui/ProgressTrack";
import { currentUnits, UNIT_VIDEO_PROGRESS, type UnitItem } from "@/data/course";
import type { Subject } from "@/data/types";

/** How far one tap on "play" moves the demo video (%). */
const PLAY_STEP = 12;

const itemIconClasses: Record<UnitItem["state"], string> = {
  done: "bg-success text-white",
  now: "bg-accent text-white",
  locked: "bg-surface-3 text-muted-2",
};

/** Unit overview on phones: header, video lesson, learning goals, lesson list and exercises. */
export function UnitMobile() {
  const subject: Subject = useParams().subject === "math" ? "math" : "rw";
  const unit = currentUnits[subject];
  const [videoProgress, setVideoProgress] = useState(UNIT_VIDEO_PROGRESS);

  return (
    <div className="flex animate-slide-in flex-col gap-3.5">
      <div className="relative overflow-hidden rounded-[20px] bg-ink-surface p-5">
        <div className="text-[10.5px] font-extrabold tracking-[1px] text-[#7FA0B1]">{unit.tag}</div>
        <h2 className="mt-1.25 mb-3 text-[23px] leading-[1.2] font-extrabold tracking-[-0.7px] text-white">{unit.name}</h2>
        <div className="flex flex-wrap gap-2">
          <HeaderPill>{unit.lessonCount} lessons</HeaderPill>
          <HeaderPill>{unit.duration}</HeaderPill>
          <HeaderPill className="bg-[rgba(34,197,94,.22)] text-[#7BE3A6]">{unit.percent}%</HeaderPill>
        </div>
      </div>

      <Panel className="overflow-hidden rounded-[18px]">
        <div className="relative grid aspect-video place-items-center bg-[linear-gradient(140deg,#123A4C,#0E2430)]">
          <Button
            aria-label="Play video"
            onPress={() => setVideoProgress((progress) => Math.min(100, progress + PLAY_STEP))}
            className="size-15.5 rounded-full bg-white/92 p-0 text-navy shadow-[0_10px_26px_rgba(0,0,0,.3)] hover:bg-white/92"
          >
            <PlayIcon size={24} />
          </Button>
          <div className="absolute inset-x-3.5 bottom-3">
            <ProgressTrack aria-label="Video progress" value={videoProgress} className="h-1.25 rounded-sm bg-white/28" />
            <div className="mt-1.5 flex justify-between text-[11px] font-bold text-white/85">
              <span>{unit.video.watchedAt}</span>
              <span>{unit.video.length}</span>
            </div>
          </div>
        </div>
        <div className="p-4.5">
          <MobileEyebrow className="mb-2">VIDEO LESSON</MobileEyebrow>
          <div className="mb-2 text-[16.5px] leading-[1.35] font-bold">{unit.video.title}</div>
          <p className="text-[14.5px] leading-[1.6] font-medium text-ink-2">{unit.description}</p>
        </div>
      </Panel>

      <Panel className="rounded-[18px] p-4.5">
        <MobileEyebrow className="mb-3">WHAT YOU WILL LEARN</MobileEyebrow>
        <ul className="flex flex-col gap-2.5">
          {unit.learningPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.75">
              <span className="grid size-5 flex-none place-items-center rounded-full bg-tint-green text-[11px] font-extrabold text-on-green">
                ✓
              </span>
              <span className="text-[14.5px] leading-[1.5] font-medium text-ink-2">{point}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel className="rounded-[18px] p-4.5">
        <MobileEyebrow className="mb-3">LESSONS</MobileEyebrow>
        <div className="flex flex-col gap-2">
          {unit.items.map((item) => (
            <Button
              key={item.name}
              // Demo: opening a lesson restarts the video.
              onPress={() => setVideoProgress(PLAY_STEP)}
              className={cn(
                "w-full justify-start gap-3 rounded-[13px] border border-border px-3.25 py-3 text-left font-normal",
                item.state === "now" ? "bg-tint-blue hover:bg-tint-blue" : "bg-surface-2 hover:bg-surface-2",
              )}
            >
              <span
                className={cn(
                  "grid size-7 flex-none place-items-center rounded-[9px] text-[12px] font-extrabold",
                  itemIconClasses[item.state],
                )}
              >
                {item.kind === "video" ? "▶" : "✎"}
              </span>
              <span className="min-w-0 flex-1 text-[14px] leading-[1.3] font-bold text-ink">{item.name}</span>
              <span className="text-[11.5px] font-semibold text-muted-2">{item.length}</span>
            </Button>
          ))}
        </div>
      </Panel>

      <ButtonLink
        href={paths.rush}
        className="w-full gap-2.5 rounded-[18px] border-b-4 border-success-ink bg-success p-4.25 text-[15.5px] font-extrabold text-white hover:bg-success data-[pressed=true]:translate-y-0.5 data-[pressed=true]:border-b-2"
      >
        <PlusIcon size={17} strokeWidth={2.8} />
        Exercises · {unit.exerciseCount} questions
      </ButtonLink>
    </div>
  );
}

function HeaderPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-[9px] bg-white/10 px-2.75 py-1.5 text-[12px] font-bold text-white", className)}>{children}</span>
  );
}
