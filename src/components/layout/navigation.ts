import { paths } from "@/app/paths";
import type { Icon3DName } from "@/components/ui/Icon3D";

export type NavItem = {
  label: string;
  href: string;
  icon: Icon3DName;
  /**
   * URL patterns that highlight this item (React Router syntax, "/*" = include nested pages).
   * Defaults to the exact `href`.
   */
  match?: string[];
  isNew?: boolean;
};

/** A titled group of links. Untitled groups render as a plain block with spacing above. */
export type NavSection = { title?: string; items: NavItem[] };

export const sidebarSections: NavSection[] = [
  {
    items: [
      {
        label: "Today",
        href: paths.home,
        icon: "today",
        match: [paths.home, paths.planner],
      },
    ],
  },
  {
    title: "PRACTICE",
    items: [
      {
        label: "Question bank",
        href: paths.questionBank,
        icon: "question-bank",
      },
      { label: "Rush", href: paths.rush, icon: "rush", match: ["/rush/*"] },
      {
        label: "Daily question",
        href: paths.dailyQuestion,
        icon: "daily-question",
        isNew: true,
      },
      {
        label: "1500+ set",
        href: paths.advancedSet,
        icon: "advanced-set",
        isNew: true,
      },
      { label: "Mistakes", href: paths.saved, icon: "mistakes" },
    ],
  },
  {
    title: "TESTS",
    items: [
      {
        label: "Full-length",
        href: paths.tests,
        icon: "full-length",
        match: [paths.tests, paths.exam],
      },
      { label: "Section", href: paths.sectionTests, icon: "section" },
      {
        label: "Reports",
        href: paths.reports,
        icon: "reports",
        match: [`${paths.reports}/*`],
      },
    ],
  },
  {
    title: "LEARN",
    items: [
      {
        label: "Lessons",
        href: paths.course("rw"),
        icon: "lessons",
        match: ["/courses/*", "/lessons/*"],
      },
      { label: "Desmos", href: paths.desmos, icon: "desmos", isNew: true },
      { label: "Vocab", href: paths.vocab, icon: "vocab" },
    ],
  },
  {
    title: "PROGRESS",
    items: [
      {
        label: "Predicted score",
        href: paths.predictedScore,
        icon: "predicted-score",
      },
      { label: "Analytics", href: paths.analytics, icon: "analytics" },
    ],
  },
  {
    items: [
      {
        label: "Community",
        href: paths.community,
        icon: "community",
        match: ["/community/*"],
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "Plan & billing", href: paths.billing, icon: "billing" },
      { label: "Parent access", href: paths.parentAccess, icon: "parents" },
      { label: "Settings", href: paths.settings, icon: "settings" },
    ],
  },
];

export type MoreDialog = "help" | "support" | "bug" | "feedback" | "calculator" | "shortcuts" | "blog";

export type MoreMenuItem = {
  icon: Icon3DName;
  label: string;
  href?: string;
  dialog?: MoreDialog;
  isNew?: boolean;
};

/** Groups in the sidebar's "More" menu. Items with `href` navigate; the rest open a dialog. */
export const moreMenuGroups: { title: string; items: MoreMenuItem[] }[] = [
  {
    title: "SHORTCUTS",
    items: [
      { icon: "tutor", label: "Ask Bridge AI", href: paths.tutor },
      { icon: "plan", label: "Weekly plan", href: paths.planner },
      { icon: "classes", label: "My classes", href: paths.classes },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { icon: "help", label: "Help Center", dialog: "help", isNew: true },
      { icon: "support", label: "Chat with support", dialog: "support" },
      { icon: "bug-report", label: "Bug report", dialog: "bug" },
      { icon: "feedback", label: "Give feedback", dialog: "feedback" },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      {
        icon: "calculator",
        label: "DSAT score calculator",
        dialog: "calculator",
      },
      { icon: "shortcuts", label: "Keyboard shortcuts", dialog: "shortcuts" },
      { icon: "blog", label: "Blog", dialog: "blog" },
    ],
  },
];
