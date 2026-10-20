import { matchPath } from "react-router";

import { paths } from "@/app/paths";
import { currentUnits } from "@/data/course";
import { initialChats, initialRooms, personById } from "@/data/social";
import { reportById } from "@/data/tests";
import type { Subject } from "@/data/types";
import { currentUser, formatXp } from "@/data/user";

export type MobileTab = "today" | "practice" | "tests" | "progress";

type Params = Record<string, string | undefined>;

export type MobileScreen = {
  pattern: string;
  title: string | ((params: Params) => string);
  subtitle: string | ((params: Params) => string);
  /** Bottom tab this screen belongs to. Screens without one keep the last tab highlighted. */
  tab?: MobileTab;
  /** Tab roots show the logo (Today) or no back button. */
  isTabRoot?: boolean;
  /** Full-screen flows (question runner) hide the header and tab bar. */
  isFullscreen?: boolean;
};

const subjectOf = (params: Params): Subject => (params.subject === "math" ? "math" : "rw");
const communitySubtitle = "Feed · chats · friends · rooms";

/** Header text and navigation behaviour for every route on phones. */
const mobileScreens: MobileScreen[] = [
  /* Today */
  {
    pattern: paths.home,
    title: "SATbridge",
    subtitle: `${formatXp(currentUser.xp)} · ${currentUser.questionsAnswered} questions`,
    tab: "today",
    isTabRoot: true,
  },
  {
    pattern: paths.planner,
    title: "Weekly plan",
    subtitle: "Week 7 of 13",
    tab: "today",
  },
  {
    pattern: paths.tutor,
    title: "Ask Bridge AI",
    subtitle: "Always on, always patient",
  },

  /* Practice */
  {
    pattern: paths.practice,
    title: "Practice",
    subtitle: "Rush, drills and question sets",
    tab: "practice",
    isTabRoot: true,
  },
  {
    pattern: paths.rush,
    title: "Question Rush",
    subtitle: "Timed sets that earn XP",
    tab: "practice",
  },
  {
    pattern: paths.questionBank,
    title: "Question bank",
    subtitle: "3,882 questions by skill",
    tab: "practice",
  },
  {
    pattern: paths.dailyQuestion,
    title: "Daily question",
    subtitle: "One question a day · +15 XP",
    tab: "practice",
  },
  {
    pattern: paths.advancedSet,
    title: "1500+ set",
    subtitle: "The hardest questions on the test",
    tab: "practice",
  },
  {
    pattern: paths.saved,
    title: "Mistakes",
    subtitle: "Saved questions & mistakes",
    tab: "practice",
  },
  {
    pattern: paths.rushSession,
    title: "Question Rush",
    subtitle: "",
    isFullscreen: true,
  },

  /* Tests */
  {
    pattern: paths.tests,
    title: "Full-length tests",
    subtitle: "8 predicted papers",
    tab: "tests",
    isTabRoot: true,
  },
  {
    pattern: paths.sectionTests,
    title: "Section tests",
    subtitle: "One section or one module",
    tab: "tests",
  },
  {
    pattern: paths.reports,
    title: "Reports",
    subtitle: "Every test you've taken",
    tab: "tests",
  },
  {
    pattern: "/tests/reports/:reportId",
    title: "Score report",
    subtitle: (p) => reportById(p.reportId)?.name ?? "Report",
    tab: "tests",
  },
  {
    pattern: paths.exam,
    title: "Practice test",
    subtitle: "",
    isFullscreen: true,
  },

  /* Learn */
  {
    pattern: "/courses/:subject",
    title: "Lessons",
    subtitle: (p) => (subjectOf(p) === "math" ? "Math & Graphing" : "Reading & Writing"),
  },
  {
    pattern: "/courses/:subject/unit",
    title: "Unit",
    subtitle: (p) => currentUnits[subjectOf(p)].name,
  },
  {
    pattern: "/lessons/:lessonId",
    title: "Unit",
    subtitle: currentUnits.rw.name,
  },
  {
    pattern: paths.desmos,
    title: "Desmos",
    subtitle: "The built-in SAT calculator",
  },
  {
    pattern: paths.vocab,
    title: "Vocabulary",
    subtitle: "150 words · 10 a day",
  },

  /* Progress */
  {
    pattern: paths.predictedScore,
    title: "Predicted score",
    subtitle: "Updated after every session",
    tab: "progress",
    isTabRoot: true,
  },
  {
    pattern: paths.analytics,
    title: "Analytics",
    subtitle: "6 mocks · 1,842 questions",
    tab: "progress",
  },

  /* Community */
  { pattern: paths.community, title: "Community", subtitle: communitySubtitle },
  { pattern: paths.chats, title: "Chats", subtitle: communitySubtitle },
  {
    pattern: "/community/chats/:chatId",
    // Direct chats started from Friends use the friend's id as the chat id.
    title: (p) => initialChats.find((chat) => chat.id === p.chatId)?.name ?? personById(p.chatId ?? "")?.name ?? "Chat",
    subtitle: (p) => {
      const chat = initialChats.find((c) => c.id === p.chatId);
      if (!chat) return "New conversation";
      return chat.kind === "group" ? `${chat.memberIds.length + 1} members` : "Direct message";
    },
  },
  { pattern: paths.friends, title: "Friends", subtitle: communitySubtitle },
  {
    pattern: paths.studyRooms,
    title: "Study rooms",
    subtitle: communitySubtitle,
  },
  {
    pattern: "/community/rooms/:roomId",
    title: (p) => initialRooms.find((room) => room.id === p.roomId)?.name ?? "Study room",
    subtitle: "Study room",
  },
  { pattern: paths.profile, title: "Profile", subtitle: "NeverBored" },

  /* Account */
  { pattern: paths.myProfile, title: "Profile", subtitle: "Public card" },
  {
    pattern: paths.billing,
    title: "Plan & billing",
    subtitle: "You're on the Free plan",
  },
  {
    pattern: paths.parentAccess,
    title: "Parent access",
    subtitle: "Share your progress",
  },
  {
    pattern: paths.settings,
    title: "Settings",
    subtitle: "Account, goals and notifications",
  },
  {
    pattern: paths.classes,
    title: "My classes",
    subtitle: "Tashkent 1500 Club",
  },
];

const fallbackScreen = mobileScreens[0];

const resolve = (value: MobileScreen["title"], params: Params) => (typeof value === "function" ? value(params) : value);

/** Finds the screen config for a URL, with its title and subtitle resolved. */
export function resolveMobileScreen(pathname: string) {
  for (const screen of mobileScreens) {
    const match = matchPath({ path: screen.pattern, end: true }, pathname);
    if (match) {
      return {
        ...screen,
        title: resolve(screen.title, match.params),
        subtitle: resolve(screen.subtitle, match.params),
      };
    }
  }
  return {
    ...fallbackScreen,
    title: resolve(fallbackScreen.title, {}),
    subtitle: resolve(fallbackScreen.subtitle, {}),
  };
}

export type ResolvedMobileScreen = ReturnType<typeof resolveMobileScreen>;
