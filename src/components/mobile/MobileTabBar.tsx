import { cn, Link } from "@heroui/react";

import { Button } from "@/components/ui/Button";

import { glassBarStyle } from "./glass";
import { GlassHighlights } from "./GlassHighlights";
import { mobileTabs } from "./mobileNavigation";
import type { MobileTab } from "./mobileScreens";
import { TabIcon, type TabIconName } from "./TabIcons";

type MobileTabBarProps = {
  activeTab: MobileTab | "more";
  /** Slides the bar off-screen (while scrolling down). */
  isHidden: boolean;
  onToggleMore: () => void;
  /** Tapping the tab you're already on. */
  onReselect: () => void;
  /** Unread chats + friend requests, shown as a dot on More. */
  alertCount: number;
};

const tabClass = [
  "relative flex h-auto min-w-0 flex-1 flex-col items-center justify-start gap-1 rounded-none px-0.5 pt-2 pb-0",
  "bg-transparent text-[11.5px] tracking-[-0.2px] text-white no-underline transition-opacity duration-200",
  "hover:bg-transparent data-[pressed=true]:scale-100 data-[pressed=true]:opacity-55",
].join(" ");

/** Glass tab bar pinned to the bottom of the mobile shell. */
export function MobileTabBar({ activeTab, isHidden, onToggleMore, onReselect, alertCount }: MobileTabBarProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-60 flex justify-center">
      <nav
        aria-label="Tabs"
        style={glassBarStyle}
        className={cn(
          // The top 26px (pt-6.5) tucks under the content card's rounded corners; the rest is --tab-bar-height.
          "pointer-events-auto relative flex h-[calc(var(--tab-bar-height)+26px)] w-full max-w-110 items-start justify-between overflow-hidden px-1.5 pt-6.5",
          "transition-transform duration-300 ease-[cubic-bezier(.32,.72,0,1)]",
          isHidden && "translate-y-[calc(100%+2px)]",
        )}
      >
        <GlassHighlights surface="bar" />
        {mobileTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <Link
              key={tab.id}
              href={tab.to}
              aria-current={isActive ? "page" : undefined}
              onPress={isActive ? onReselect : undefined}
              className={cn(tabClass, isActive ? "font-bold" : "font-medium opacity-62")}
            >
              <TabContent icon={tab.icon} label={tab.label} isActive={isActive} />
            </Link>
          );
        })}
        <Button
          aria-expanded={activeTab === "more"}
          onPress={onToggleMore}
          className={cn(tabClass, activeTab === "more" ? "font-bold" : "font-medium opacity-62")}
        >
          <TabContent icon="more" label="More" isActive={activeTab === "more"} badge={alertCount} />
        </Button>
      </nav>
    </div>
  );
}

type TabContentProps = {
  icon: TabIconName;
  label: string;
  isActive: boolean;
  badge?: number;
};

function TabContent({ icon, label, isActive, badge = 0 }: TabContentProps) {
  return (
    <>
      <span
        className={cn(
          "relative grid h-6.5 w-10 place-items-center rounded-full transition-[background-color,box-shadow] duration-200",
          isActive && "bg-white/26 shadow-[inset_0_1px_0_rgba(255,255,255,.5)]",
        )}
      >
        <TabIcon name={icon} />
        {badge > 0 && (
          <span
            aria-label={`${badge} new`}
            className="absolute -top-0.5 right-0.5 grid h-4 min-w-4 place-items-center rounded-full border-2 border-[#12506a] bg-danger px-0.75 text-[9.5px] font-extrabold text-white"
          >
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </span>
      {label}
    </>
  );
}
