import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

type DonutRingProps = {
  /** Outer diameter in px. */
  size: number;
  /** Inner (hole) diameter in px. */
  holeSize: number;
  /** Background of the hole, so the ring reads correctly on any card. */
  holeClassName?: string;
  className?: string;
  children?: ReactNode;
} & (
  | {
      /** Filled share of the ring, 0–100. Sweeps in when the ring appears. */
      value: number;
      color: string;
      /** Colour of the unfilled part. */
      trackColor?: string;
      gradient?: never;
    }
  | {
      /** Custom ring colours as a CSS `conic-gradient(...)` (multi-segment rings). See `conicSegments`. */
      gradient: string;
      value?: never;
      color?: never;
      trackColor?: never;
    }
);

/** A conic-gradient ring with centred content (score rings, daily goal, vocab progress, time share). */
export function DonutRing({ size, holeSize, holeClassName, className, children, ...ring }: DonutRingProps) {
  const shown = useAnimatedNumber(ring.value ?? 0);
  const background =
    ring.gradient ?? `conic-gradient(${ring.color} ${(shown * 3.6).toFixed(1)}deg, ${ring.trackColor ?? "var(--surface-3)"} 0)`;

  return (
    <div
      className={cn("grid flex-none place-items-center rounded-full", className)}
      style={{ width: size, height: size, background }}
    >
      <div
        className={cn("grid place-items-center rounded-full bg-surface text-center", holeClassName)}
        style={{ width: holeSize, height: holeSize }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
