import { cn } from "@heroui/react";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

type AnimatedNumberProps = {
  value: number;
  /** Turns the (fractional, mid-animation) number into text. Defaults to a rounded integer. */
  format?: (value: number) => string;
  duration?: number;
  className?: string;
};

/** A number that counts up to its value when it appears (or changes). */
export function AnimatedNumber({ value, format = (n) => `${Math.round(n)}`, duration, className }: AnimatedNumberProps) {
  const shown = useAnimatedNumber(value, { duration });
  return <span className={cn("tabular-nums", className)}>{format(shown)}</span>;
}
