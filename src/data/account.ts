import type { Icon3DName } from "@/components/ui/Icon3D";

/* ------------------------------------------------------------------ */
/* Account: plans & billing, parent access, settings                    */
/* Prices are demo values.                                              */
/* ------------------------------------------------------------------ */

export type BillingPeriod = "monthly" | "quarterly" | "annual";

export const billingPeriods: {
  id: BillingPeriod;
  label: string;
  shortLabel: string;
  note?: string;
}[] = [
  { id: "monthly", label: "Monthly", shortLabel: "Monthly" },
  { id: "quarterly", label: "3 months", shortLabel: "3 mo", note: "Save 20%" },
  { id: "annual", label: "Yearly", shortLabel: "Yearly", note: "Save 45%" },
];

export type Plan = {
  id: "free" | "pro" | "pro-tutoring";
  name: string;
  icon: Icon3DName;
  tagline: string;
  /** Price per month for each billing period (USD). */
  monthlyPrice: Record<BillingPeriod, number>;
  /** What is charged at checkout, e.g. "$69 every 3 months". */
  billedAs: Record<BillingPeriod, string>;
  features: string[];
  isPopular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    icon: "plan-free",
    tagline: "Try SATbridge and build the habit",
    monthlyPrice: { monthly: 0, quarterly: 0, annual: 0 },
    billedAs: {
      monthly: "Free forever",
      quarterly: "Free forever",
      annual: "Free forever",
    },
    features: [
      "Official College Board question bank",
      "Daily question and streaks",
      "2 predicted tests",
      "20 Bridge AI questions a day",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: "plan-pro",
    tagline: "Everything you need to hit your goal score",
    monthlyPrice: { monthly: 29, quarterly: 23, annual: 16 },
    billedAs: {
      monthly: "$29 billed monthly",
      quarterly: "$69 every 3 months",
      annual: "$199 billed yearly",
    },
    features: [
      "3,882 SATbridge questions + the 1500+ set",
      "All 8 predicted tests and section tests",
      "Plan that adapts after every session",
      "Unlimited Bridge AI and Desmos solutions",
      "Full analytics and predicted score",
    ],
    isPopular: true,
  },
  {
    id: "pro-tutoring",
    name: "Pro + Tutoring",
    icon: "plan-tutoring",
    tagline: "Pro plus live help from 1500+ scorers",
    monthlyPrice: { monthly: 79, quarterly: 66, annual: 54 },
    billedAs: {
      monthly: "$79 billed monthly",
      quarterly: "$199 every 3 months",
      annual: "$649 billed yearly",
    },
    features: [
      "Everything in Pro",
      "2 live group sessions a week",
      "Weekly 1:1 check-in with a tutor",
      "Personal plan review before each mock",
    ],
  },
];

export const CURRENT_PLAN_ID: Plan["id"] = "free";

/** What the Free plan has used so far. */
export const planUsage: {
  label: string;
  used: number;
  limit: number;
  resets: string;
}[] = [
  {
    label: "Bridge AI questions",
    used: 8,
    limit: 20,
    resets: "resets tonight",
  },
  { label: "Predicted tests", used: 1, limit: 2, resets: "per account" },
  {
    label: "1500+ set questions",
    used: 10,
    limit: 10,
    resets: "preview limit",
  },
];

export const billingFaq: { question: string; answer: string }[] = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes. You keep Pro until the end of the period you paid for, then drop back to Free. Your progress stays.",
  },
  {
    question: "Can my parents pay?",
    answer: 'Yes. Invite them from Parent access and turn on "Billing & payments" so they can manage the subscription.',
  },
  {
    question: "Do you offer refunds?",
    answer: "Within 7 days of your first payment, no questions asked.",
  },
];

/* ---------- Parent access ---------- */

export type LinkedParent = {
  id: string;
  name: string;
  email: string;
  relation: string;
  status: "active" | "invited";
  note: string;
};

export const initialParents: LinkedParent[] = [
  {
    id: "p1",
    name: "Nodira Ismoilova",
    email: "nodira.i@example.com",
    relation: "Mother",
    status: "active",
    note: "Viewed your progress 2 days ago",
  },
  {
    id: "p2",
    name: "",
    email: "otabek.i@example.com",
    relation: "Father",
    status: "invited",
    note: "Invite sent Sep 10",
  },
];

export const parentRelations = ["Mother", "Father", "Guardian", "Other"];

export const parentPermissions: {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}[] = [
  {
    id: "progress",
    label: "Study progress & streak",
    description: "Time studied, sessions done and your streak.",
    defaultOn: true,
  },
  {
    id: "scores",
    label: "Test scores & reports",
    description: "Scores and reports from every test you take.",
    defaultOn: true,
  },
  {
    id: "plan",
    label: "Study plan & activity",
    description: "Your week plan and what you worked on each day.",
    defaultOn: true,
  },
  {
    id: "billing",
    label: "Billing & payments",
    description: "Lets them upgrade, pay and manage your plan.",
    defaultOn: false,
  },
];

/** The weekly summary parents receive (also shown as a preview). Each item needs its permission. */
export const parentWeeklySummary: {
  label: string;
  value: string;
  permission: string;
}[] = [
  { label: "Studied", value: "4h 25m", permission: "progress" },
  { label: "Sessions", value: "11 of 18", permission: "plan" },
  { label: "Predicted", value: "1290", permission: "scores" },
  { label: "Streak", value: "24 days", permission: "progress" },
];

export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ---------- Settings ---------- */

export const settingsOptions = {
  grades: ["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Gap year"],
  testDates: ["Oct 3, 2026", "Nov 7, 2026", "Dec 5, 2026", "Mar 13, 2027", "May 1, 2027"],
  dailyGoals: ["10 questions", "20 questions", "30 questions", "50 questions"],
  reminderTimes: ["07:00", "16:00", "18:00", "20:00", "21:30"],
  extendedTime: ["None", "1.5× time", "2× time"],
};

export const defaultSettings = {
  fullName: "Dilshodbek Ismoilov",
  displayName: "Dilshodbek I.",
  email: "dilshodbek@example.com",
  school: "Tashkent 1500 Club",
  grade: "Grade 11",
  testDate: "Oct 3, 2026",
  goalScore: 1550,
  targetColleges: ["Harvard University", "NYU Abu Dhabi", "KAIST"],
  dailyGoal: "30 questions",
  studyDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  reminderTime: "18:00",
  notifications: {
    dailyReminder: true,
    streakAtRisk: true,
    weeklyReport: true,
    communityReplies: false,
  },
  extendedTime: "None",
  extraBreaks: false,
  publicProfile: true,
  showOnLeaderboard: true,
};

export type Settings = typeof defaultSettings;
