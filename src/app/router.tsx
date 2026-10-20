import type { ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import { AppLayout } from "@/components/layout/AppLayout";
import { allLessons } from "@/data/course";

import { paths } from "./paths";
import { ResponsivePage } from "./ResponsivePage";
import type { RouteHandle } from "./routeHandle";

/** Focus screens (lesson player, rush session, exam) render without the sidebar. */
const focusMode: RouteHandle = { hideSidebar: true };

type PageLoader = () => Promise<ComponentType>;

/*
 * Every page is code-split: its module is fetched the first time the route is visited.
 * `lazy` returns `{ Component }` / `{ element }`, React Router's convention for lazily loaded routes.
 */

/** A page with one layout that adapts to every screen size. */
const page = (load: PageLoader) => async () => ({ Component: await load() });

/** A page with a separate phone design (features/<name>/mobile). The variant is picked at render time. */
const responsivePage = (loadDesktop: PageLoader, loadMobile: PageLoader) => async () => {
  const [desktop, mobile] = await Promise.all([loadDesktop(), loadMobile()]);
  return { element: <ResponsivePage desktop={desktop} mobile={mobile} /> };
};

/* Phone screens shared by several routes. */
const unitMobile = async () => (await import("@/features/course/mobile/UnitMobile")).UnitMobile;
const practiceMobile = async () => (await import("@/features/rush/mobile/PracticeMobile")).PracticeMobile;

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    hydrateFallbackElement: <div className="h-dvh bg-background" />,
    children: [
      /* Today */
      {
        index: true,
        lazy: responsivePage(
          async () => (await import("@/features/home/HomePage")).HomePage,
          async () => (await import("@/features/home/mobile/HomeMobile")).HomeMobile,
        ),
      },
      {
        path: paths.planner,
        lazy: responsivePage(
          async () => (await import("@/features/planner/PlannerPage")).PlannerPage,
          async () => (await import("@/features/planner/mobile/PlannerMobile")).PlannerMobile,
        ),
      },
      {
        path: paths.tutor,
        lazy: responsivePage(
          async () => (await import("@/features/tutor/TutorPage")).TutorPage,
          async () => (await import("@/features/tutor/mobile/TutorMobile")).TutorMobile,
        ),
      },

      /* Practice */
      {
        path: paths.practice,
        lazy: responsivePage(
          async () => (await import("@/features/practice/PracticeHubRedirect")).PracticeHubRedirect,
          practiceMobile,
        ),
      },
      {
        path: paths.questionBank,
        lazy: page(async () => (await import("@/features/bank/QuestionBankPage")).QuestionBankPage),
      },
      {
        path: paths.rush,
        lazy: responsivePage(async () => (await import("@/features/rush/RushHomePage")).RushHomePage, practiceMobile),
      },
      {
        path: paths.rushSession,
        handle: focusMode,
        lazy: responsivePage(
          async () => (await import("@/features/rush/RushSessionPage")).RushSessionPage,
          async () => (await import("@/features/rush/mobile/RunnerMobile")).RushRunnerMobile,
        ),
      },
      {
        path: paths.dailyQuestion,
        lazy: page(async () => (await import("@/features/practice/DailyQuestionPage")).DailyQuestionPage),
      },
      {
        path: paths.advancedSet,
        lazy: page(async () => (await import("@/features/practice/AdvancedSetPage")).AdvancedSetPage),
      },
      {
        path: paths.saved,
        lazy: responsivePage(
          async () => (await import("@/features/saved/SavedPage")).SavedPage,
          async () => (await import("@/features/saved/mobile/SavedMobile")).SavedMobile,
        ),
      },

      /* Tests */
      {
        path: paths.tests,
        lazy: responsivePage(
          async () => (await import("@/features/tests/TestsPage")).TestsPage,
          async () => (await import("@/features/tests/mobile/TestsMobile")).TestsMobile,
        ),
      },
      {
        path: paths.sectionTests,
        lazy: page(async () => (await import("@/features/tests/SectionTestsPage")).SectionTestsPage),
      },
      {
        path: paths.exam,
        handle: focusMode,
        lazy: responsivePage(
          async () => (await import("@/features/tests/ExamPage")).ExamPage,
          async () => (await import("@/features/rush/mobile/RunnerMobile")).ExamRunnerMobile,
        ),
      },
      {
        path: paths.reports,
        lazy: page(async () => (await import("@/features/tests/ReportsPage")).ReportsPage),
      },
      {
        path: `${paths.reports}/:reportId`,
        lazy: page(async () => (await import("@/features/tests/ReportPage")).ReportPage),
      },

      /* Learn */
      {
        path: "/courses/:subject",
        lazy: responsivePage(
          async () => (await import("@/features/course/CoursePage")).CoursePage,
          async () => (await import("@/features/course/mobile/CourseMobile")).CourseMobile,
        ),
      },
      // Phones open a unit overview; desktop goes straight to the lesson player.
      {
        path: "/courses/:subject/unit",
        lazy: responsivePage(async () => (await import("@/features/course/FirstLessonRedirect")).FirstLessonRedirect, unitMobile),
      },
      {
        path: "/lessons",
        element: <Navigate to={paths.lesson(allLessons[0].id)} replace />,
      },
      {
        path: "/lessons/:lessonId",
        handle: focusMode,
        lazy: responsivePage(async () => (await import("@/features/course/LessonPage")).LessonPage, unitMobile),
      },
      {
        path: paths.desmos,
        lazy: page(async () => (await import("@/features/learn/DesmosPage")).DesmosPage),
      },
      {
        path: paths.vocab,
        lazy: responsivePage(
          async () => (await import("@/features/vocab/VocabPage")).VocabPage,
          async () => (await import("@/features/vocab/mobile/VocabMobile")).VocabMobile,
        ),
      },

      /* Progress */
      {
        path: paths.predictedScore,
        lazy: page(async () => (await import("@/features/progress/PredictedScorePage")).PredictedScorePage),
      },
      {
        path: paths.analytics,
        lazy: responsivePage(
          async () => (await import("@/features/analytics/AnalyticsPage")).AnalyticsPage,
          async () => (await import("@/features/analytics/mobile/AnalyticsMobile")).AnalyticsMobile,
        ),
      },

      /* Community: one layout (title + tabs) around the feed, chats, friends and study rooms */
      {
        path: paths.community,
        lazy: page(async () => (await import("@/features/community/CommunityLayout")).CommunityLayout),
        children: [
          {
            index: true,
            lazy: page(async () => (await import("@/features/community/FeedPage")).FeedPage),
          },
          {
            path: "chats/:chatId?",
            lazy: page(async () => (await import("@/features/community/ChatsPage")).ChatsPage),
          },
          {
            path: "friends",
            lazy: page(async () => (await import("@/features/community/FriendsPage")).FriendsPage),
          },
          {
            path: "rooms",
            lazy: page(async () => (await import("@/features/community/StudyRoomsPage")).StudyRoomsPage),
          },
          {
            path: "rooms/:roomId",
            lazy: page(async () => (await import("@/features/community/StudyRoomPage")).StudyRoomPage),
          },
        ],
      },
      {
        path: paths.profile,
        lazy: page(async () => (await import("@/features/community/ProfilePage")).ProfilePage),
      },

      /* Account */
      {
        path: paths.myProfile,
        lazy: page(async () => (await import("@/features/community/MyProfilePage")).MyProfilePage),
      },
      {
        path: paths.billing,
        lazy: page(async () => (await import("@/features/account/BillingPage")).BillingPage),
      },
      {
        path: paths.parentAccess,
        lazy: page(async () => (await import("@/features/account/ParentAccessPage")).ParentAccessPage),
      },
      {
        path: paths.settings,
        lazy: page(async () => (await import("@/features/account/SettingsPage")).SettingsPage),
      },
      {
        path: paths.classes,
        lazy: page(async () => (await import("@/features/classes/ClassesPage")).ClassesPage),
      },

      { path: "*", element: <Navigate to={paths.home} replace /> },
    ],
  },
]);
