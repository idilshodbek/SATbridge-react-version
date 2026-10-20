import { useMediaQuery } from "@heroui/react";
import { Outlet, useMatches } from "react-router";

import type { RouteHandle } from "@/app/routeHandle";
import { useKeyDown } from "@/hooks/useKeyDown";
import { useScrollResetRef } from "@/hooks/useScrollResetRef";
import { useStoredState } from "@/hooks/useStoredState";

import { Sidebar } from "./Sidebar";

/** Below this width the sidebar starts collapsed (the user can still expand it). */
const NARROW_QUERY = "(max-width: 1099px)";

type SidebarPreference = "expanded" | "collapsed" | null;

/** Tablet / desktop layout: dark sidebar + the page in a scroll container. */
export function DesktopShell() {
  const scrollRef = useScrollResetRef<HTMLElement>();
  const hideSidebar = useMatches().some((match) => (match.handle as RouteHandle | undefined)?.hideSidebar);

  const isNarrow = useMediaQuery(NARROW_QUERY);
  const [preference, setPreference] = useStoredState<SidebarPreference>("satbridge.sidebar", null);
  const isCollapsed = preference ? preference === "collapsed" : isNarrow;
  const toggleSidebar = () => setPreference(isCollapsed ? "expanded" : "collapsed");

  // ⌘B / Ctrl+B toggles the sidebar, like most editors.
  useKeyDown((event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
      event.preventDefault();
      toggleSidebar();
    }
  });

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {!hideSidebar && <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />}
      <main ref={scrollRef} className="relative h-full min-w-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
