import { useTheme } from "@heroui/react";
import { type ReactNode, useMemo } from "react";

import { ThemeContext } from "./theme-context";

/**
 * Single theme controller for the app (HeroUI's `useTheme`).
 * It persists the choice in localStorage and sets `class` + `data-theme` on <html>,
 * which switches both HeroUI and the SATbridge tokens in `styles/theme.css`.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme("light");
  const isDark = resolvedTheme === "dark";

  const value = useMemo(() => ({ isDark, toggleTheme: () => setTheme(isDark ? "light" : "dark") }), [isDark, setTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
