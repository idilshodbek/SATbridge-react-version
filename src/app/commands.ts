import { moreMenuGroups, sidebarSections } from "@/components/layout/navigation";
import type { Icon3DName } from "@/components/ui/Icon3D";

import { paths } from "./paths";

export type CommandHelpers = {
  navigate: (to: string) => void;
  toggleTheme: () => void;
};

export type Command = {
  id: string;
  label: string;
  /** Group heading in the palette ("Practice", "Actions"…). */
  section: string;
  icon: Icon3DName;
  /** Extra words the search should match, e.g. "dark light theme". */
  keywords?: string;
  run: (helpers: CommandHelpers) => void;
};

const go = (to: string) => (helpers: CommandHelpers) => helpers.navigate(to);

/** Things you can do without opening a page first. Listed at the top of the palette. */
const actions: Command[] = [
  {
    id: "start-rush",
    label: "Start a Question Rush",
    section: "Actions",
    icon: "rush",
    keywords: "practice timed session",
    run: go(`${paths.rushSession}?mode=rush`),
  },
  {
    id: "daily",
    label: "Answer today's question",
    section: "Actions",
    icon: "daily-question",
    keywords: "streak",
    run: go(paths.dailyQuestion),
  },
  {
    id: "test",
    label: "Take a full-length test",
    section: "Actions",
    icon: "full-length",
    keywords: "mock exam predicted",
    run: go(paths.exam),
  },
  {
    id: "ask",
    label: "Ask Bridge AI",
    section: "Actions",
    icon: "tutor",
    keywords: "tutor chat help explain",
    run: go(paths.tutor),
  },
  {
    id: "theme",
    label: "Toggle dark mode",
    section: "Actions",
    icon: "dark-mode",
    keywords: "light theme appearance",
    run: ({ toggleTheme }) => toggleTheme(),
  },
];

/** Every page in the sidebar, in sidebar order. */
const pages: Command[] = sidebarSections.flatMap((section) =>
  section.items.map((item) => ({
    id: item.href,
    label: item.label,
    section: section.title ? section.title.charAt(0) + section.title.slice(1).toLowerCase() : "Pages",
    icon: item.icon,
    run: go(item.href),
  })),
);

/** Pages that are only reachable from menus. */
const extraPages: Command[] = [
  {
    id: paths.planner,
    label: "Weekly plan",
    section: "Today",
    icon: "plan",
    keywords: "schedule calendar",
    run: go(paths.planner),
  },
  {
    id: paths.chats,
    label: "Chats",
    section: "Community",
    icon: "chats",
    keywords: "messages",
    run: go(paths.chats),
  },
  {
    id: paths.friends,
    label: "Friends",
    section: "Community",
    icon: "friends",
    keywords: "requests invite",
    run: go(paths.friends),
  },
  {
    id: paths.studyRooms,
    label: "Study rooms",
    section: "Community",
    icon: "rooms",
    keywords: "focus timer pomodoro",
    run: go(paths.studyRooms),
  },
  {
    id: paths.myProfile,
    label: "My profile",
    section: "Account",
    icon: "profile",
    keywords: "public card",
    run: go(paths.myProfile),
  },
  ...moreMenuGroups
    .flatMap((group) => group.items)
    .filter((item) => item.href && item.label === "My classes")
    .map((item) => ({
      id: item.href!,
      label: item.label,
      section: "Account",
      icon: item.icon,
      run: go(item.href!),
    })),
];

export const commands: Command[] = [...actions, ...pages, ...extraPages].filter(
  (command, index, all) => all.findIndex((other) => other.id === command.id) === index,
);
