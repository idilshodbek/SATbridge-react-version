import { createContext, useContext } from "react";

export type ThemeContextValue = { isDark: boolean; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Current colour scheme + toggle. Must be used inside <ThemeProvider>. */
export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAppTheme must be used inside <ThemeProvider>");
  return context;
}
