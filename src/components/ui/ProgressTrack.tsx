import { cn, ProgressBar } from "@heroui/react";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

type ProgressTrackProps = {
  /** 0–100. */
  value: number;
  "aria-label": string;
  /** Fill colour; any CSS colour or `var(--token)`. Defaults to the brand blue. */
  color?: string;
  /** Track classes: height, radius, background. */
  className?: string;
  fillClassName?: string;
};

/** Thin horizontal progress bar (HeroUI ProgressBar with only track + fill). The fill grows in when it appears. */
export function ProgressTrack({ value, color, className, fillClassName, "aria-label": ariaLabel }: ProgressTrackProps) {
  const shown = useAnimatedNumber(value, { duration: 700 });

  return (
    <ProgressBar aria-label={ariaLabel} value={value} className="block w-full">
      <ProgressBar.Track className={cn("h-2 rounded-md bg-border", className)}>
        <ProgressBar.Fill
          className={cn("rounded-md", fillClassName)}
          style={{
            backgroundColor: color ?? "var(--accent)",
            width: `${shown}%`,
          }}
        />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
