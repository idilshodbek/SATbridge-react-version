import { cn } from "@heroui/react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router";

import { useCommunity } from "@/app/community-context";
import { useHideOnScrollDown } from "@/hooks/useHideOnScrollDown";
import { useScrollResetRef } from "@/hooks/useScrollResetRef";

import { MobileHeader } from "./MobileHeader";
import { type MobileTab, resolveMobileScreen } from "./mobileScreens";
import { MobileTabBar } from "./MobileTabBar";
import { MoreSheet } from "./MoreSheet";

/**
 * Phone layout: a rounded content card (sticky header + page) over deep teal,
 * the glass tab bar at the bottom and the "All of SATbridge" sheet.
 * Full-screen flows (question runner) get the whole viewport instead.
 */
export function MobileShell() {
  const { pathname } = useLocation();
  const screen = resolveMobileScreen(pathname);
  const activeTab = useActiveTab(screen.tab);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { isHidden, onScroll } = useHideOnScrollDown();
  const scrollRef = useScrollResetRef<HTMLDivElement>();
  const { unreadCount, requests } = useCommunity();

  if (screen.isFullscreen) {
    return (
      <div className="h-dvh overflow-hidden bg-surface">
        <Outlet />
      </div>
    );
  }

  const isTabBarHidden = isHidden && !isMoreOpen;

  return (
    // --tab-bar-height: the visible part of the tab bar (icons + labels). The content card ends where it starts.
    <div className="relative h-dvh overflow-hidden bg-teal [--tab-bar-height:62px]">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className={cn(
          // Sits above the tab bar (z-62 vs 60): the card's rounded bottom overlaps the bar's top padding.
          "no-scrollbar relative z-62 overflow-x-hidden overflow-y-auto overscroll-contain rounded-b-[26px] bg-background",
          "transition-[height] duration-300 ease-[cubic-bezier(.32,.72,0,1)]",
          isTabBarHidden ? "h-full" : "h-[calc(100%-var(--tab-bar-height))]",
        )}
      >
        <MobileHeader screen={screen} onOpenMore={() => setIsMoreOpen(true)} />
        <main className="px-4 pt-4 pb-5">
          <Outlet />
        </main>
      </div>

      <MobileTabBar
        activeTab={isMoreOpen ? "more" : activeTab}
        isHidden={isTabBarHidden}
        onToggleMore={() => setIsMoreOpen((open) => !open)}
        onReselect={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        alertCount={unreadCount + requests.length}
      />
      <MoreSheet isOpen={isMoreOpen} onOpenChange={setIsMoreOpen} />
    </div>
  );
}

/** Screens outside the tab bar (Vocab, Analytics…) keep the tab you came from highlighted. */
function useActiveTab(screenTab: MobileTab | undefined) {
  const [lastTab, setLastTab] = useState<MobileTab>(screenTab ?? "today");
  if (screenTab && screenTab !== lastTab) setLastTab(screenTab);
  return screenTab ?? lastTab;
}
