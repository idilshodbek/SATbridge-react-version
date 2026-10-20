import { cn } from "@heroui/react";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router";

import { useCommunity } from "@/app/community-context";
import { paths } from "@/app/paths";
import { PlusIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Icon3D, type Icon3DName } from "@/components/ui/Icon3D";
import { LineTabs } from "@/components/ui/LineTabs";
import { PageTitle } from "@/components/ui/PageTitle";
import { useIsMobile } from "@/hooks/useIsMobile";

type CommunityTab = "feed" | "chats" | "friends" | "rooms";

const tabPaths: Record<CommunityTab, string> = {
  feed: paths.community,
  chats: paths.chats,
  friends: paths.friends,
  rooms: paths.studyRooms,
};

function currentTab(pathname: string): CommunityTab {
  if (matchPath(`${paths.chats}/*`, pathname)) return "chats";
  if (matchPath(paths.friends, pathname)) return "friends";
  if (matchPath(`${paths.studyRooms}/*`, pathname)) return "rooms";
  return "feed";
}

/** Community section: title, the Feed / Chats / Friends / Study rooms tabs and the current page. */
export function CommunityLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { unreadCount, requests, rooms } = useCommunity();
  const tab = currentTab(pathname);

  // Phones give a chat thread or a study room the whole screen (the header has a back button).
  const isDetailPage = matchPath("/community/chats/:chatId", pathname) || matchPath("/community/rooms/:roomId", pathname);
  const hideTabs = isMobile && isDetailPage;

  const items: {
    id: CommunityTab;
    label: string;
    icon: Icon3DName;
    count?: number;
  }[] = [
    { id: "feed", label: "Feed", icon: "feed" },
    { id: "chats", label: "Chats", icon: "chats", count: unreadCount },
    {
      id: "friends",
      label: "Friends",
      icon: "friends",
      count: requests.length,
    },
    {
      id: "rooms",
      label: isMobile ? "Rooms" : "Study rooms",
      icon: "rooms",
      count: rooms.length,
    },
  ];

  return (
    <div className="max-w-[1180px] md:px-9 md:pt-7.5 md:pb-17.5">
      <div className="mb-4.5 hidden flex-wrap items-center justify-between gap-4.5 md:flex">
        <PageTitle icon={<Icon3D icon="community" size={38} />}>Community</PageTitle>
        <ButtonLink href={paths.friends} tone="outline" className="gap-2 px-5 py-3 text-[14px]">
          <PlusIcon size={16} />
          Invite friends
        </ButtonLink>
      </div>

      {!hideTabs && (
        <LineTabs
          aria-label="Community"
          items={items.map((item) => ({
            id: item.id,
            label: (
              <span className="flex items-center gap-2">
                {!isMobile && <Icon3D icon={item.icon} size={22} />}
                {item.label}
              </span>
            ),
            suffix: item.count ? <CountBadge count={item.count} isAlert={item.id !== "rooms"} /> : undefined,
          }))}
          selectedKey={tab}
          onSelectionChange={(next) => navigate(tabPaths[next])}
          listContainerClassName="mb-4 border-b border-border md:mb-5.5"
          listClassName={isMobile ? "gap-4.5" : "gap-6.5"}
          tabClassName={isMobile ? "px-0.5 pt-2 pb-[13.5px] text-[14.5px]" : undefined}
        />
      )}

      <Outlet />
    </div>
  );
}

/** Small count next to a tab: red for unread / requests, grey for live rooms. */
function CountBadge({ count, isAlert }: { count: number; isAlert: boolean }) {
  return (
    <span
      className={cn(
        "grid h-4.5 min-w-4.5 place-items-center rounded-full px-1.25 text-[10.5px] font-extrabold",
        isAlert ? "bg-danger text-white" : "bg-surface-3 text-muted",
      )}
    >
      {count}
    </span>
  );
}
