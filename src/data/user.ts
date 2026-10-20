/**
 * The signed-in student.
 * Progress is measured with two things only: the study streak (days) and XP.
 */
export const currentUser = {
  firstName: "Dilshodbek",
  fullName: "Dilshodbek Ismoilov",
  shortName: "Dilshodbek I.",
  initials: "DI",
  email: "dilshodbek@example.com",
  questionsAnswered: "1,146",
  /** Consecutive study days. */
  studyStreak: 24,
  /** Total XP earned. */
  xp: 4860,
  /** XP earned this week (leaderboards reset every Monday). */
  weeklyXp: 2240,
  joined: "June",
  /** Overall accuracy across all practice. */
  accuracy: "79%",
};

/** "4,860 XP" */
export const formatXp = (xp: number) => `${xp.toLocaleString("en-US")} XP`;

/** Score goal shown on the home dashboard. */
export const scoreGoal = {
  current: 1080,
  target: 1550,
  readingWriting: 510,
  math: 570,
  monthlyGain: 130,
  university: { name: "Harvard University", initial: "H", medianSat: 1520 },
  /** Time left until the exam, as shown in the design. */
  examCountdown: { days: 189, hours: 19, minutes: 32 },
};

/** Welcome-offer banner countdown (seconds). 22h 44m 55s in the design. */
export const WELCOME_OFFER_SECONDS = 22 * 3600 + 44 * 60 + 55;
