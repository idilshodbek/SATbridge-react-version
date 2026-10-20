import { type UIEvent, useCallback, useRef, useState } from "react";

/** Ignore scroll jitter smaller than this (px). */
const MIN_SCROLL_DELTA = 8;
/** Never hide while the user is still near the top (px). */
const HIDE_AFTER = 90;

/**
 * Hides chrome (the mobile tab bar) while scrolling down and shows it again on scroll up.
 * Attach `onScroll` to the scroll container.
 */
export function useHideOnScrollDown() {
  const lastScrollTop = useRef(0);
  const [isHidden, setIsHidden] = useState(false);

  const onScroll = useCallback((event: UIEvent<HTMLElement>) => {
    const scrollTop = Math.max(0, event.currentTarget.scrollTop);
    const previous = lastScrollTop.current;
    if (Math.abs(scrollTop - previous) < MIN_SCROLL_DELTA) return;

    lastScrollTop.current = scrollTop;
    setIsHidden(scrollTop > previous && scrollTop > HIDE_AFTER);
  }, []);

  return { isHidden, onScroll };
}
