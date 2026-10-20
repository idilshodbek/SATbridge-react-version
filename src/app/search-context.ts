import { createContext, useContext } from "react";

export type SearchPaletteContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const SearchPaletteContext = createContext<SearchPaletteContextValue | null>(null);

/** Opens the ⌘K search palette from anywhere. Must be used inside <SearchPaletteProvider>. */
export function useSearchPalette() {
  const context = useContext(SearchPaletteContext);
  if (!context) throw new Error("useSearchPalette must be used inside <SearchPaletteProvider>");
  return context;
}
