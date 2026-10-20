import { paths } from "@/app/paths";
import type { Icon3DName } from "@/components/ui/Icon3D";
import { currentUser, formatXp } from "@/data/user";
import { baselineCounts, TOTAL_WORDS } from "@/data/vocab";

import type { MobileTab } from "./mobileScreens";
import type { TabIconName } from "./TabIcons";

export type MobileTabItem = {
  id: MobileTab;
  label: string;
  icon: TabIconName;
  to: string;
};

/** Bottom tab bar. "More" is appended by the tab bar itself (it opens a sheet, not a route). */
export const mobileTabs: MobileTabItem[] = [
  { id: "today", label: "Today", icon: "home", to: paths.home },
  { id: "practice", label: "Practice", icon: "practice", to: paths.practice },
  { id: "tests", label: "Tests", icon: "tests", to: paths.tests },
  {
    id: "progress",
    label: "Progress",
    icon: "progress",
    to: paths.predictedScore,
  },
];

export type MoreSheetItem = {
  name: string;
  icon: Icon3DName;
  to: string;
  isNew?: boolean;
  meta?: string;
  /** Live count shown instead of `meta` (from community state). */
  count?: "unreadChats" | "friendRequests" | "liveRooms";
};
export type MoreSheetGroup = { title?: string; items: MoreSheetItem[] };

/** Groups in the "All of SATbridge" sheet (everything that is not a tab). */
export const moreSheetGroups: MoreSheetGroup[] = [
  {
    items: [
      { name: "Ask Bridge AI", icon: "tutor", to: paths.tutor },
      { name: "Weekly plan", icon: "plan", to: paths.planner },
    ],
  },
  {
    title: "LEARN",
    items: [
      { name: "Lessons", icon: "lessons", to: paths.course("rw") },
      { name: "Desmos", icon: "desmos", to: paths.desmos, isNew: true },
      {
        name: "Vocab",
        icon: "vocab",
        to: paths.vocab,
        meta: `${baselineCounts.learned} / ${TOTAL_WORDS}`,
      },
    ],
  },
  {
    title: "COMMUNITY",
    items: [
      { name: "Feed", icon: "feed", to: paths.community },
      { name: "Chats", icon: "chats", to: paths.chats, count: "unreadChats" },
      {
        name: "Friends",
        icon: "friends",
        to: paths.friends,
        count: "friendRequests",
      },
      {
        name: "Study rooms",
        icon: "rooms",
        to: paths.studyRooms,
        count: "liveRooms",
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        name: "My profile",
        icon: "profile",
        to: paths.myProfile,
        meta: formatXp(currentUser.xp),
      },
      { name: "Plan & billing", icon: "billing", to: paths.billing },
      { name: "Parent access", icon: "parents", to: paths.parentAccess },
      { name: "Settings", icon: "settings", to: paths.settings },
      { name: "My classes", icon: "classes", to: paths.classes },
    ],
  },
];
