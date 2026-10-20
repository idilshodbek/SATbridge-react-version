import { type ReactNode, useEffect, useMemo, useState } from "react";

import { SearchPalette } from "@/components/search/SearchPalette";

import { SearchPaletteContext } from "./search-context";

/** Provides the search palette and its ⌘K / Ctrl+K shortcut (works even while typing in a field). */
export function SearchPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return (
    <SearchPaletteContext value={value}>
      {children}
      <SearchPalette isOpen={isOpen} onOpenChange={setIsOpen} />
    </SearchPaletteContext>
  );
}
