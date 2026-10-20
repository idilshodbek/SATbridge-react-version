import { Avatar, cn, Link, Switch } from "@heroui/react";
import type { ReactNode } from "react";
import { matchPath, useLocation } from "react-router";

import { paths } from "@/app/paths";
import { useProgress } from "@/app/progress-context";
import { useSearchPalette } from "@/app/search-context";
import { useAppTheme } from "@/app/theme-context";
import { BridgeLogoIcon, ChevronLeftIcon, ChevronRightIcon, FlameIcon, SearchIcon, XpIcon } from "@/components/icons";
import { NewBadge } from "@/components/ui/Badges";
import { Button, ButtonLink } from "@/components/ui/Button";
import { GradientTile } from "@/components/ui/GradientTile";
import { Icon3D } from "@/components/ui/Icon3D";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { currentUser, formatXp } from "@/data/user";
import { modifierKeyLabel } from "@/lib/platform";

import { MoreMenu } from "./MoreMenu";
import { type NavItem, sidebarSections } from "./navigation";
import { sidebarItemClass } from "./sidebarStyles";

type SidebarProps = {
  /** Icon-only rail (narrow windows, or by choice). */
  isCollapsed: boolean;
  onToggle: () => void;
};

/** Dark navigation column. Collapses to a 76px icon rail with tooltips. */
export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { xp } = useProgress();
  const { open: openSearch } = useSearchPalette();

  return (
    <aside
      className={cn(
        "no-scrollbar relative flex h-full flex-none flex-col gap-0.5 overflow-x-hidden overflow-y-auto bg-side pt-4.5 pb-3.5",
        "transition-[width] duration-200 ease-out motion-reduce:transition-none",
        isCollapsed ? "w-19 px-3" : "w-[262px] px-3.5",
      )}
    >
      <div className={cn("flex items-center pb-3", isCollapsed ? "flex-col gap-2" : "gap-2.5 px-2 pt-0.5")}>
        <Link href={paths.home} aria-label="SATbridge home" className="flex items-center gap-2.5 no-underline">
          <GradientTile className="size-9 rounded-[11px]">
            <BridgeLogoIcon size={21} />
          </GradientTile>
          {!isCollapsed && <span className="text-[21px] font-extrabold tracking-[-0.4px] text-white">SATbridge</span>}
        </Link>
        <RailTooltip
          label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          shortcut={`${modifierKeyLabel} B`}
          isCollapsed={isCollapsed}
        >
          <Button
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onPress={onToggle}
            className={cn(
              "size-8 rounded-lg p-0 text-[#7FA0B1] hover:bg-side-active hover:text-white",
              !isCollapsed && "ml-auto",
            )}
          >
            {isCollapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
          </Button>
        </RailTooltip>
      </div>

      <RailTooltip label="Search" shortcut={`${modifierKeyLabel} K`} isCollapsed={isCollapsed}>
        <Button
          aria-label="Search SATbridge"
          onPress={openSearch}
          className={cn(
            sidebarItemClass({ collapsed: isCollapsed }),
            "mb-2 border border-side-active bg-side-2 text-[#7FA0B1] hover:bg-side-active hover:text-white",
            !isCollapsed && "py-2.25",
          )}
        >
          <SearchIcon size={17} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-[14px] font-medium">Search…</span>
              <span className="rounded-md border border-side-active px-1.5 py-0.5 text-[11px] font-bold">
                {modifierKeyLabel}K
              </span>
            </>
          )}
        </Button>
      </RailTooltip>

      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {sidebarSections.map((section, index) => (
          <div key={section.title ?? index} className="flex flex-col gap-0.5">
            {isCollapsed ? (
              index > 0 && <div className="mx-2 my-1.5 h-px bg-side-active" />
            ) : section.title ? (
              <div className="px-3 pt-4 pb-1.5 text-[11px] font-bold tracking-[1.1px] text-[#5C8296]">{section.title}</div>
            ) : (
              index > 0 && <div className="h-3" />
            )}
            {section.items.map((item) => (
              <SidebarLink key={item.href} item={item} isCollapsed={isCollapsed} />
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-0.5 pt-4.5">
        <RailTooltip label="Upgrade · 40% off" isCollapsed={isCollapsed}>
          <ButtonLink
            href={paths.billing}
            aria-label="Upgrade"
            className={sidebarItemClass({
              collapsed: isCollapsed,
              className: "font-bold text-sky hover:bg-side-active",
            })}
          >
            <Icon3D icon="upgrade" size={24} />
            {!isCollapsed && (
              <>
                <span className="flex-1">Upgrade</span>
                <span className="rounded-[7px] bg-gold px-2 py-0.75 text-[10.5px] font-extrabold text-gold-ink">40% Off</span>
              </>
            )}
          </ButtonLink>
        </RailTooltip>

        <DarkModeSwitch isCollapsed={isCollapsed} />
        <MoreMenu isCollapsed={isCollapsed} />

        <RailTooltip label={currentUser.fullName} isCollapsed={isCollapsed}>
          <Link
            href={paths.myProfile}
            aria-label="My profile"
            className={cn(
              "mt-2 flex items-center gap-2.5 rounded-none border-t border-side-active pt-3 pb-1 no-underline",
              isCollapsed ? "justify-center" : "px-2",
            )}
          >
            <Avatar className="size-8.5 rounded-full">
              <Avatar.Fallback
                className="text-[13px] font-extrabold text-[#04303F]"
                style={{
                  background: "linear-gradient(140deg,#7BE3A6,#009ADA)",
                }}
              >
                {currentUser.initials}
              </Avatar.Fallback>
            </Avatar>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-bold text-white">{currentUser.fullName}</div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-[#7FA0B1]">
                  <span className="flex items-center gap-1">
                    <FlameIcon size={13} />
                    {currentUser.studyStreak}
                  </span>
                  <span className="flex items-center gap-1">
                    <XpIcon size={13} />
                    {formatXp(xp)}
                  </span>
                </div>
              </div>
            )}
          </Link>
        </RailTooltip>
      </div>
    </aside>
  );
}

type RailTooltipProps = {
  label: string;
  shortcut?: string;
  isCollapsed: boolean;
  children: ReactNode;
};

/** In the rail, wraps a control in a right-side tooltip; expanded rows show their own labels. */
function RailTooltip({ label, shortcut, isCollapsed, children }: RailTooltipProps) {
  if (!isCollapsed) return children;
  return (
    <WithTooltip
      placement="right"
      label={
        <span className="flex items-center gap-2">
          {label}
          {shortcut && <span className="rounded border border-white/25 px-1 text-[10.5px] opacity-80">{shortcut}</span>}
        </span>
      }
    >
      {children}
    </WithTooltip>
  );
}

function SidebarLink({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) {
  const { pathname } = useLocation();
  const patterns = item.match ?? [item.href];
  const isActive = patterns.some((pattern) => matchPath({ path: pattern, end: !pattern.endsWith("/*") }, pathname));

  return (
    <RailTooltip label={item.label} isCollapsed={isCollapsed}>
      <Link
        href={item.href}
        aria-label={isCollapsed ? item.label : undefined}
        aria-current={isActive ? "page" : undefined}
        className={sidebarItemClass({
          active: isActive,
          collapsed: isCollapsed,
        })}
      >
        <Icon3D icon={item.icon} size={24} />
        {isCollapsed ? (
          item.isNew && <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />
        ) : (
          <>
            <span className="flex-1">{item.label}</span>
            {item.isNew && <NewBadge />}
          </>
        )}
      </Link>
    </RailTooltip>
  );
}

function DarkModeSwitch({ isCollapsed }: { isCollapsed: boolean }) {
  const { isDark, toggleTheme } = useAppTheme();
  const label = isDark ? "Dark mode" : "Light mode";

  if (isCollapsed) {
    return (
      <RailTooltip label={`${label} · click to switch`} isCollapsed>
        <Button
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          onPress={toggleTheme}
          className={sidebarItemClass({ collapsed: true })}
        >
          <Icon3D icon="dark-mode" size={24} />
        </Button>
      </RailTooltip>
    );
  }

  return (
    <Switch isSelected={isDark} onChange={toggleTheme} className="group w-full">
      <Switch.Content className={sidebarItemClass({ className: "hover:bg-side-active" })}>
        <Icon3D icon="dark-mode" size={24} />
        <span className="flex-1">{label}</span>
        <Switch.Control className="h-4.75 w-8.5 rounded-full bg-white/18 group-data-[selected=true]:bg-accent">
          <Switch.Thumb className="ms-[2.5px] size-3.5 rounded-full bg-white shadow-none group-data-[selected=true]:ms-4.25 group-data-[selected=true]:bg-white" />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
