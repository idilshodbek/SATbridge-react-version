import { useCallback, useState } from "react";

/**
 * `useState` that remembers its value in localStorage (per-browser preferences such as the sidebar width).
 * Storage can be unavailable (private mode, blocked), so every access is guarded.
 */
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initial : (JSON.parse(stored) as T);
    } catch {
      return initial;
    }
  });

  const set = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Preference just won't persist.
      }
    },
    [key],
  );

  return [value, set] as const;
}
