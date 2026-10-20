import { useEffect, useEffectEvent } from "react";

/**
 * Listens for key presses on the window while the component is mounted.
 * Ignores keys typed into inputs, and the handler always sees fresh props/state.
 */
export function useKeyDown(handler: (event: KeyboardEvent) => void) {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const { target } = event;
    if (target instanceof Element && target.closest("input, textarea, [contenteditable='true']")) return;
    handler(event);
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
