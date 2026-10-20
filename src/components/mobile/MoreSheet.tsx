import { cn, Drawer, Link, Switch } from "@heroui/react";
import { matchPath, useLocation } from "react-router";

import { useCommunity } from "@/app/community-context";
import { paths } from "@/app/paths";
import { useSearchPalette } from "@/app/search-context";
import { useAppTheme } from "@/app/theme-context";
import { BridgeWaveIcon, SearchIcon } from "@/components/icons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { GradientTile } from "@/components/ui/GradientTile";
import { Icon3D } from "@/components/ui/Icon3D";

import { glassSheetStyle } from "./glass";
import { GlassHighlights } from "./GlassHighlights";
import { type MoreSheetItem, moreSheetGroups } from "./mobileNavigation";

type MoreSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const rowClass = "flex h-auto w-full items-center justify-start gap-3.25 rounded-xl text-left";

/** "All of SATbridge": a glass bottom sheet listing every screen that is not in the tab bar. */
export function MoreSheet({ isOpen, onOpenChange }: MoreSheetProps) {
  const close = () => onOpenChange(false);
  const { open: openSearch } = useSearchPalette();

  return (
    <Drawer.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} className="bg-[rgba(6,18,26,.55)]">
      <Drawer.Content placement="bottom">
        <Drawer.Dialog
          aria-label="All of SATbridge"
          // `touchAction` keeps HeroUI's drag-to-dismiss working (it is dropped when `style` is overridden).
          style={{ ...glassSheetStyle, touchAction: "none" }}
          className="max-h-[88dvh] overflow-hidden rounded-t-[26px] p-0"
        >
          <GlassHighlights surface="sheet" />

          <div className="relative flex-none px-4.5 pt-3.5 pb-2.5">
            <div aria-hidden className="mx-auto mb-3.5 h-1 w-10.5 rounded-[3px] bg-white/22" />
            <div className="flex items-center gap-2.75">
              <GradientTile className="size-8.5 rounded-[11px]">
                <BridgeWaveIcon size={20} />
              </GradientTile>
              <div className="min-w-0 flex-1">
                <div className="text-[17px] font-extrabold tracking-[-0.4px] text-white">All of SATbridge</div>
                <div className="text-[12px] font-semibold text-[#9FC2D2]">Everything not in the tab bar</div>
              </div>
              <Button
                aria-label="Close"
                onPress={close}
                className="size-8 flex-none rounded-[10px] bg-white/12 p-0 text-[14px] font-normal text-[#D7E9F2] hover:bg-white/12"
              >
                ✕
              </Button>
            </div>
          </div>

          <Drawer.Body className="no-scrollbar relative m-0 px-3 pt-1.5 pb-24 text-[15.5px] leading-[normal]">
            <Button
              onPress={() => {
                close();
                openSearch();
              }}
              className={cn(rowClass, "mt-1 bg-white/10 px-3.5 py-3 text-[15px] font-medium text-[#D7E5EC] hover:bg-white/14")}
            >
              <SearchIcon size={18} className="text-[#9FC2D2]" />
              Search pages and actions…
            </Button>
            {moreSheetGroups.map((group, index) => (
              <div key={group.title ?? index} className="mb-1.5">
                {/* Rendered even without a title: the empty row spaces the first group from the header. */}
                <div className="px-2.5 pt-3.5 pb-1.5 text-[10.5px] font-bold tracking-[1.2px] text-[#8FB3C4]">{group.title}</div>
                {group.items.map((item) => (
                  <SheetLink key={item.name} item={item} onNavigate={close} />
                ))}
              </div>
            ))}

            <DarkModeRow />

            <ButtonLink
              href={paths.billing}
              onPress={close}
              className={cn(rowClass, "mt-2 bg-[rgba(255,197,61,.16)] px-3 py-3.25 hover:bg-[rgba(255,197,61,.16)]")}
            >
              <Icon3D icon="upgrade" size={28} />
              <span className="flex-1 text-[15.5px] font-bold text-white">Upgrade to Pro</span>
              <span className="flex-none rounded-[7px] bg-gold px-2.25 py-0.75 text-[11px] font-extrabold text-gold-ink">
                40% off
              </span>
            </ButtonLink>
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}

function SheetLink({ item, onNavigate }: { item: MoreSheetItem; onNavigate: () => void }) {
  const { pathname } = useLocation();
  const { unreadCount, requests, rooms } = useCommunity();
  const isActive = matchPath({ path: item.to, end: true }, pathname) !== null;

  const counts = {
    unreadChats: `${unreadCount} new`,
    friendRequests: `${requests.length} requests`,
    liveRooms: `${rooms.length} live`,
  };
  const isEmptyCount =
    (item.count === "unreadChats" && unreadCount === 0) || (item.count === "friendRequests" && requests.length === 0);
  const meta = item.count ? (isEmptyCount ? undefined : counts[item.count]) : item.meta;

  return (
    <Link
      href={item.to}
      onPress={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        rowClass,
        "mb-0.5 p-3 no-underline hover:bg-white/10",
        isActive ? "bg-white/16 text-white" : "bg-transparent text-[#D7E5EC]",
      )}
    >
      <Icon3D icon={item.icon} size={28} />
      <span className="min-w-0 flex-1 truncate text-[15.5px] font-semibold">{item.name}</span>
      {item.isNew && (
        <span className="flex-none rounded-[7px] bg-accent px-2.25 py-0.75 text-[11px] font-bold text-white">New</span>
      )}
      {meta && <span className="flex-none text-[12px] font-semibold text-[#9FC2D2]">{meta}</span>}
    </Link>
  );
}

function DarkModeRow() {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <Switch isSelected={isDark} onChange={toggleTheme} className="group mt-2.5 w-full">
      <Switch.Content className={cn(rowClass, "cursor-pointer bg-white/8 px-3 py-3.25")}>
        <Icon3D icon="dark-mode" size={28} />
        <span className="flex-1 text-[15.5px] font-semibold text-white">{isDark ? "Dark mode" : "Light mode"}</span>
        <Switch.Control className="h-5 w-9 rounded-full bg-border-2 group-data-[selected=true]:bg-accent">
          <Switch.Thumb className="ms-[2.5px] size-3.5 rounded-full bg-white shadow-none group-data-[selected=true]:ms-4.25 group-data-[selected=true]:bg-white" />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
