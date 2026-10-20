import { useMediaQuery } from "@heroui/react";
import { useEffect, useRef, useState } from "react";

/** True when the OS asks for less motion; animations then jump straight to their final state. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type AnimatedNumberOptions = {
  /** Animation length in ms. */
  duration?: number;
  /** Where the first animation starts (default 0). */
  from?: number;
};

/**
 * Counts from `from` (or the previous value) to `target` with an ease-out curve.
 * Powers the animated stats, score rings and progress bars.
 */
export function useAnimatedNumber(target: number, { duration = 900, from = 0 }: AnimatedNumberOptions = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(from);
  const current = useRef(from);

  useEffect(() => {
    if (reducedMotion) return;
    const start = current.current;
    const delta = target - start;
    if (delta === 0) return;

    const startedAt = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      const next = start + delta * easeOutCubic(progress);
      current.current = next;
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    });
    // Background tabs throttle animation frames; make sure the final value lands regardless.
    const settle = window.setTimeout(() => {
      cancelAnimationFrame(frame);
      current.current = target;
      setValue(target);
    }, duration + 50);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [target, duration, reducedMotion]);

  return reducedMotion ? target : value;
}
