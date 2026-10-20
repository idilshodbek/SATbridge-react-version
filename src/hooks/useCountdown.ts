import { useEffect, useState } from "react";

/**
 * Counts down once per second from `initialSeconds` to 0.
 * Pass `paused: true` to freeze the clock (e.g. while a break dialog is open).
 */
export function useCountdown(initialSeconds: number, { paused = false, loop = false } = {}) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds > 0) return seconds - 1;
        return loop ? initialSeconds : 0;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [paused, loop, initialSeconds]);

  return secondsLeft;
}
