import { useEffect, useState } from "react";

/** When the app was opened; shared live timers (study rooms) count from here. */
const appStartedAt = Date.now();

/** Seconds since the app was opened, right now. */
export const secondsSinceAppStart = () => Math.floor((Date.now() - appStartedAt) / 1000);

/** Seconds since the app was opened, re-rendering once a second. */
export function useAppClock() {
  const [seconds, setSeconds] = useState(secondsSinceAppStart);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds(secondsSinceAppStart()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return seconds;
}
