import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/** Ref for a scroll container that jumps back to the top whenever the URL path changes. */
export function useScrollResetRef<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return ref;
}
