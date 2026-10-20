import { paths } from "@/app/paths";
import {
  ChevronLeftIcon,
  ClockIcon,
  FastForwardIcon,
  FlameIcon,
  FlameSolidIcon,
  FriendsIcon,
  HighlighterIcon,
  PauseIcon,
  XpIcon,
} from "@/components/icons";
import { cn, ToggleButton } from "@heroui/react";

import { Button, ButtonLink } from "@/components/ui/Button";
import { HelpHint } from "@/components/ui/HelpHint";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { RUNNER_START } from "@/data/rush";
import { useProgress } from "@/app/progress-context";
import { currentUser, formatXp } from "@/data/user";
import { formatClock } from "@/lib/format";

export type RushMode = "focused" | "rush";

type RushTopBarProps = {
  streak: number;
  correct: number;
  secondsLeft: number;
  mode: RushMode;
  onModeChange: (mode: RushMode) => void;
  onPause: () => void;
  onSkip: () => void;
  isHighlighting: boolean;
  onHighlightChange: (isHighlighting: boolean) => void;
};

export function RushTopBar({
  streak,
  correct,
  secondsLeft,
  mode,
  onModeChange,
  onPause,
  onSkip,
  isHighlighting,
  onHighlightChange,
}: RushTopBarProps) {
  const { xp } = useProgress();

  return (
    <div className="flex flex-none flex-wrap items-center gap-4 px-4.5 py-3">
      <ButtonLink href={paths.questionBank} className="gap-1.75 p-0 text-[14.5px] text-ink-2 hover:text-accent">
        <ChevronLeftIcon size={16} />
        Back
      </ButtonLink>
      <div className="flex items-center gap-1.75 text-[15px] font-bold text-ink-2">
        <FlameIcon size={18} />
        <span className="font-extrabold text-ink">{streak}</span> streak
      </div>
      <div className="flex items-center gap-1.75 text-[15px] font-bold text-ink-2">
        <span className="grid size-4.75 place-items-center rounded-full bg-success-ink text-[11px] font-extrabold text-white">
          ✓
        </span>
        <span className="font-extrabold text-ink">{correct}</span> correct
      </div>

      <div className="mx-auto flex items-center gap-3.5 rounded-[14px] bg-surface-2 px-4 py-2">
        <div className="flex items-center gap-1.5 text-[15px] font-extrabold text-accent" aria-label="XP earned this session">
          <XpIcon size={17} />+{correct * RUNNER_START.xpPerCorrect} XP
        </div>
        <div className="h-4.5 w-px bg-border-2" />
        <div className="flex items-center gap-1.75 text-[15px] font-bold text-ink-2 tabular-nums" role="timer">
          <ClockIcon size={16} />
          {formatClock(secondsLeft)}
        </div>
        <WithTooltip label="Take a break · the timer pauses">
          <Button
            aria-label="Take a break"
            isIconOnly
            onPress={onPause}
            className="size-6.5 rounded-lg p-0 text-muted hover:bg-border"
          >
            <PauseIcon size={14} />
          </Button>
        </WithTooltip>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2">
          <SegmentedControl
            aria-label="Pace"
            tone="raised"
            options={[
              { id: "focused", label: "Focused" },
              { id: "rush", label: "Rush" },
            ]}
            value={mode}
            onChange={onModeChange}
            className="gap-0 rounded-xl bg-surface-2 p-1"
            itemClassName="px-4 py-2 text-[14px] font-bold"
          />
          <HelpHint title="Focused vs Rush">
            <b>Focused</b> gives you the full explanation after every question. <b>Rush</b> is timed and keeps the streak going:
            you get more XP per correct answer but explanations wait until the end.
          </HelpHint>
        </div>
        <WithTooltip label="Skip this question">
          <Button
            aria-label="Skip this question"
            isIconOnly
            onPress={onSkip}
            className="size-9.5 rounded-[11px] bg-tint-blue p-0 hover:bg-tint-blue-bd"
          >
            <FastForwardIcon size={18} className="text-[#0091D6]" />
          </Button>
        </WithTooltip>
        <WithTooltip label={isHighlighting ? "Highlighting on · select text to mark it" : "Highlight the passage"}>
          <ToggleButton
            aria-label="Highlight the passage"
            isSelected={isHighlighting}
            onChange={onHighlightChange}
            className={cn(
              "size-9.5 rounded-[11px] bg-transparent p-0 text-muted hover:bg-hover",
              "data-[selected=true]:bg-tint-amber data-[selected=true]:text-on-amber data-[selected=true]:hover:bg-tint-amber",
            )}
          >
            <HighlighterIcon size={19} />
          </ToggleButton>
        </WithTooltip>
        <WithTooltip label="Study rooms · practise with friends">
          <ButtonLink
            href={paths.studyRooms}
            aria-label="Study rooms"
            className="size-9.5 rounded-[11px] p-0 text-muted hover:bg-hover"
          >
            <FriendsIcon size={19} />
          </ButtonLink>
        </WithTooltip>
        <div className="flex items-center gap-0.5 rounded-xl border border-border p-1.25">
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-[14.5px] font-extrabold text-orange">
            <FlameSolidIcon size={16} />
            {currentUser.studyStreak}
          </div>
          <div className="h-4.5 w-px bg-border" />
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-[14.5px] font-extrabold text-accent">
            <XpIcon size={16} />
            {formatXp(xp)}
          </div>
        </div>
      </div>
    </div>
  );
}
