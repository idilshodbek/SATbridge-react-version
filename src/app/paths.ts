import type { Subject } from "@/data/types";

/** Every URL in the app. Use these instead of string literals. */
export const paths = {
  /* Today */
  home: "/",
  planner: "/planner",
  tutor: "/tutor",

  /* Practice */
  /** Phone hub for the Practice tab (desktop jumps to the question bank). */
  practice: "/practice",
  questionBank: "/question-bank",
  rush: "/rush",
  rushSession: "/rush/session",
  dailyQuestion: "/daily-question",
  advancedSet: "/advanced",
  /** Saved questions & mistakes ("Mistakes" in the menu). */
  saved: "/saved",

  /* Tests */
  tests: "/tests",
  sectionTests: "/tests/section",
  exam: "/tests/exam",
  reports: "/tests/reports",
  report: (reportId: string) => `/tests/reports/${reportId}`,

  /* Learn */
  course: (subject: Subject) => `/courses/${subject}`,
  courseUnit: (subject: Subject) => `/courses/${subject}/unit`,
  lesson: (lessonId: string) => `/lessons/${lessonId}`,
  desmos: "/desmos",
  vocab: "/vocab",

  /* Progress */
  predictedScore: "/progress",
  analytics: "/analytics",

  /* Community */
  community: "/community",
  chats: "/community/chats",
  chat: (chatId: string) => `/community/chats/${chatId}`,
  friends: "/community/friends",
  studyRooms: "/community/rooms",
  studyRoom: (roomId: string) => `/community/rooms/${roomId}`,
  /** A classmate's public profile. */
  profile: "/community/profile",

  /* Account */
  myProfile: "/profile",
  billing: "/account/billing",
  parentAccess: "/account/parents",
  settings: "/account/settings",
  classes: "/classes",
} as const;
