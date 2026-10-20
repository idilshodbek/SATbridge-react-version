import { cn } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

type Phase = "hidden" | "loading" | "done";

/** Show delay (ms): instant navigations never flash the bar. */
const SHOW_AFTER = 120;
/** How long the finished bar stays before fading (ms). */
const HIDE_AFTER = 400;

/** Thin brand-blue bar along the top of the window while the next page's code is loading. */
export function RouteProgressBar() {
  const isLoading = useNavigation().state !== "idle";
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (isLoading) {
      const show = window.setTimeout(() => setPhase("loading"), SHOW_AFTER);
      return () => window.clearTimeout(show);
    }
    const finish = window.setTimeout(() => setPhase((current) => (current === "loading" ? "done" : current)), 0);
    const hide = window.setTimeout(() => setPhase("hidden"), HIDE_AFTER);
    return () => {
      window.clearTimeout(finish);
      window.clearTimeout(hide);
    };
  }, [isLoading]);

  if (phase === "hidden") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-100 h-[3px]">
      <div
        className={cn(
          "h-full rounded-r-full bg-accent shadow-[0_0_10px_rgba(0,154,218,.6)]",
          phase === "loading" && "animate-route-progress",
          phase === "done" && "w-full opacity-0 transition-[width,opacity] duration-300",
        )}
      />
    </div>
  );
}
