import type { Subject } from "./types";

/* ------------------------------------------------------------------ */
/* Course catalogue                                                    */
/* ------------------------------------------------------------------ */

export type CourseInfo = {
  title: string;
  instructor: { name: string; bio: string };
  /** CSS gradient for the hero banner. */
  heroGradient: string;
  totalXp: string;
  streak: number;
};

export const courses: Record<Subject, CourseInfo> = {
  rw: {
    title: "SATbridge Reading & Writing Masterclass",
    instructor: {
      name: "Amara Whitfield",
      bio: "Amara scored 1580 (800 R&W) and has coached 400+ students through the digital SAT. Her students average a 190-point gain across a 13-week cycle.",
    },
    heroGradient: "linear-gradient(105deg,#C42B8E 0%,#E5308F 45%,#F06CB4 100%)",
    totalXp: "2,450",
    streak: 24,
  },
  math: {
    title: "SATbridge Math & Graphing Masterclass",
    instructor: {
      name: "Idris Okonkwo",
      bio: "Idris scored a perfect 800 in Math and teaches the Desmos-first method: build the graph, then read the answer. His students gain 120 Math points on average.",
    },
    heroGradient: "linear-gradient(105deg,#0072AA 0%,#0091D6 45%,#4FD0F0 100%)",
    totalXp: "3,180",
    streak: 24,
  },
};

export type CourseFact = { glyph: string; label: string; value: string };

export const courseFacts: CourseFact[] = [
  { glyph: "◱", label: "Modules", value: "5" },
  { glyph: "▤", label: "Lessons", value: "23" },
  { glyph: "◍", label: "Language", value: "English" },
  { glyph: "◔", label: "Duration", value: "1h 20m" },
  { glyph: "▦", label: "Additional resources", value: "9 practice sets" },
];

/* ------------------------------------------------------------------ */
/* Skill path (gamified lesson map on the course page)                 */
/* ------------------------------------------------------------------ */

export type PathLesson = { title: string; duration: string; xp: number };
export type PathUnit = {
  name: string;
  lessonsCleared: number;
  lessons: PathLesson[];
};

const lesson = (title: string, duration: string, xp: number): PathLesson => ({
  title,
  duration,
  xp,
});

export const skillPaths: Record<Subject, PathUnit[]> = {
  rw: [
    {
      name: "Information & Ideas",
      lessonsCleared: 4,
      lessons: [
        lesson("Central ideas", "8 min", 25),
        lesson("Supporting details", "11 min", 25),
        lesson("Textual evidence", "14 min", 30),
        lesson("Quantitative evidence", "12 min", 30),
        lesson("Inferences", "15 min", 35),
        lesson("Unit checkpoint", "20 min", 60),
      ],
    },
    {
      name: "Craft & Structure",
      lessonsCleared: 2,
      lessons: [
        lesson("Words in context", "13 min", 25),
        lesson("Second-meaning words", "9 min", 25),
        lesson("Text structure", "12 min", 30),
        lesson("Purpose of a sentence", "10 min", 30),
        lesson("Cross-text connections", "16 min", 40),
      ],
    },
    {
      name: "Expression of Ideas",
      lessonsCleared: 0,
      lessons: [
        lesson("Rhetorical synthesis", "14 min", 30),
        lesson("Choosing the best note", "11 min", 30),
        lesson("Transitions", "13 min", 35),
        lesson("Unit checkpoint", "20 min", 60),
      ],
    },
    {
      name: "Conventions",
      lessonsCleared: 0,
      lessons: [
        lesson("Sentence boundaries", "12 min", 25),
        lesson("Punctuation pairs", "10 min", 25),
        lesson("Subject-verb agreement", "9 min", 30),
        lesson("Modifiers & tense", "13 min", 35),
      ],
    },
  ],
  math: [
    {
      name: "Algebra",
      lessonsCleared: 5,
      lessons: [
        lesson("Linear equations", "10 min", 25),
        lesson("Linear functions", "12 min", 25),
        lesson("Two-variable equations", "13 min", 30),
        lesson("Systems of equations", "15 min", 30),
        lesson("Linear inequalities", "11 min", 35),
        lesson("Unit checkpoint", "20 min", 60),
      ],
    },
    {
      name: "Advanced Math",
      lessonsCleared: 1,
      lessons: [
        lesson("Equivalent expressions", "14 min", 30),
        lesson("Quadratic graphs", "16 min", 35),
        lesson("Nonlinear equations", "15 min", 35),
        lesson("Function notation", "10 min", 30),
        lesson("Unit checkpoint", "20 min", 60),
      ],
    },
    {
      name: "Data Analysis",
      lessonsCleared: 0,
      lessons: [
        lesson("Ratios & rates", "9 min", 25),
        lesson("Percent change", "11 min", 30),
        lesson("One-variable data", "12 min", 30),
        lesson("Scatterplots & models", "14 min", 35),
        lesson("Probability", "10 min", 30),
      ],
    },
    {
      name: "Geometry & Trig",
      lessonsCleared: 0,
      lessons: [
        lesson("Lines & angles", "10 min", 25),
        lesson("Area & volume", "13 min", 30),
        lesson("Right triangles", "12 min", 35),
        lesson("Circles & arcs", "15 min", 40),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Video syllabus (lesson player rail)                                 */
/* ------------------------------------------------------------------ */

export type Lesson = {
  id: string;
  title: string;
  /** Video length, or empty for a practice set. */
  duration: string;
  moduleName: string;
  groupName: string;
};

export type SyllabusGroup = { name: string; lessons: Lesson[] };
export type SyllabusModule = {
  name: string;
  isPro: boolean;
  groups: SyllabusGroup[];
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type RawModule = {
  name: string;
  isPro: boolean;
  groups: { name: string; lessons: [string, string][] }[];
};

const rawSyllabus: RawModule[] = [
  {
    name: "Pre Course Videos",
    isPro: false,
    groups: [
      {
        name: "Start here",
        lessons: [
          ["The SCAN Reading Method", "08:58"],
          ["How to use this course", "05:12"],
          ["Building your 13-week plan", "06:40"],
        ],
      },
    ],
  },
  {
    name: "Information & Ideas",
    isPro: true,
    groups: [
      {
        name: "Central Ideas and Details",
        lessons: [
          ["Finding central ideas and details", "04:13"],
          ["Practice: central ideas and details", ""],
        ],
      },
      {
        name: "Command of Evidence",
        lessons: [
          ["Matching claims to evidence", "03:59"],
          ["Practice: matching claims to evidence", ""],
        ],
      },
      {
        name: "Inferences",
        lessons: [
          ["Making evidence-based predictions", "04:05"],
          ["Practice: evidence-based predictions", ""],
        ],
      },
    ],
  },
  {
    name: "Craft & Structure",
    isPro: true,
    groups: [
      {
        name: "Words in Context",
        lessons: [
          ["Using context, roots, and tone", "06:00"],
          ["Practice: context, roots, and tone", ""],
        ],
      },
      {
        name: "Text Structure and Purpose",
        lessons: [
          ["Reading for function, not content", "05:21"],
          ["Practice: function questions", ""],
        ],
      },
      {
        name: "Cross-Text Connections",
        lessons: [
          ["Comparing two texts", "03:15"],
          ["Practice: comparing two texts", ""],
        ],
      },
    ],
  },
  {
    name: "Expression of Ideas",
    isPro: true,
    groups: [
      {
        name: "Transitions",
        lessons: [
          ["The four transition families", "05:44"],
          ["Practice: transitions", ""],
        ],
      },
      {
        name: "Rhetorical Synthesis",
        lessons: [
          ["Choosing by the stated goal", "04:52"],
          ["Practice: rhetorical synthesis", ""],
        ],
      },
    ],
  },
  {
    name: "Standard English Conventions",
    isPro: true,
    groups: [
      {
        name: "Boundaries",
        lessons: [
          ["Splitting and joining clauses", "06:18"],
          ["Practice: boundaries", ""],
        ],
      },
      {
        name: "Form, Structure, and Sense",
        lessons: [
          ["Agreement and verb form", "05:03"],
          ["Practice: form and structure", ""],
        ],
      },
    ],
  },
];

export const syllabus: SyllabusModule[] = rawSyllabus.map((module) => ({
  name: module.name,
  isPro: module.isPro,
  groups: module.groups.map((group) => ({
    name: group.name,
    lessons: group.lessons.map(([title, duration]) => ({
      id: slugify(title),
      title,
      duration,
      moduleName: module.name,
      groupName: group.name,
    })),
  })),
}));

/** All lessons in watch order. */
export const allLessons: Lesson[] = syllabus.flatMap((m) => m.groups.flatMap((g) => g.lessons));

export const TOTAL_LESSONS = allLessons.length;

/** Lessons already finished when the app loads. */
export const initiallyCompletedLessonIds = [allLessons[0].id];

export const lessonAbout =
  "This video covers the SCAN method — Skim, Claim, Anchor, Name — so you approach every SAT passage with a plan instead of re-reading. Practise it on the two sets that follow.";

export const lessonTranscript: { time: string; text: string }[] = [
  {
    time: "00:00",
    text: "Most students read an SAT passage the way they read a novel — start at the top, hope it sticks. That is the habit we are replacing today.",
  },
  {
    time: "00:24",
    text: "SCAN has four moves: Skim the shape, Claim, Anchor, Name the job. You run them in order, every time, until it is automatic.",
  },
  {
    time: "01:10",
    text: "Skim the shape first. Two sentences in, you should be able to say whether this is an argument, a study, or a narrative.",
  },
  {
    time: "02:02",
    text: "Claim means find the one sentence the rest of the paragraph exists to support. On the digital SAT that sentence is usually second or last.",
  },
  {
    time: "03:30",
    text: "Anchor is where most points are won. Before you look at the choices, predict the answer in your own words.",
  },
  {
    time: "05:15",
    text: "Name the job is for function questions: ask what the sentence does for the argument, not what it says.",
  },
];

export const lessonAiPrompts = [
  "What is this video about?",
  "Summarise the key points of this lesson",
  "Explain the SCAN method simply",
  "What should I remember from this lesson?",
];

/* ------------------------------------------------------------------ */
/* Mobile: module map, course summary and unit detail                  */
/* ------------------------------------------------------------------ */

export const courseSummaries: Record<Subject, { title: string; meta: string; percent: number; xp: string }> = {
  rw: {
    title: "Reading & Writing Masterclass",
    meta: "Amara Whitfield · 5 modules · 23 lessons",
    percent: 62,
    xp: "1,690",
  },
  math: {
    title: "Math & Graphing Masterclass",
    meta: "Idris Okonkwo · 5 modules · 25 lessons",
    percent: 48,
    xp: "1,240",
  },
};

export type CourseModule = {
  tag: string;
  name: string;
  percent: number;
  progress: string;
  isLocked: boolean;
};

const courseModule = (tag: string, name: string, percent: number, progress: string, isLocked = false): CourseModule => ({
  tag,
  name,
  percent,
  progress,
  isLocked,
});

/** Vertical module map shown on the mobile Learn tab. */
export const modulePaths: Record<Subject, CourseModule[]> = {
  rw: [
    courseModule("MODULE 1", "Reading fundamentals", 100, "4 / 4"),
    courseModule("MODULE 2", "Information & ideas", 100, "6 / 6"),
    courseModule("MODULE 3", "Craft & structure", 55, "3 / 6"),
    courseModule("MODULE 4", "Expression of ideas", 0, "0 / 4", true),
    courseModule("MODULE 5", "Standard English conventions", 0, "0 / 4", true),
    courseModule("BOSS", "Section simulation", 0, "27 questions", true),
  ],
  math: [
    courseModule("MODULE 1", "Algebra foundations", 100, "5 / 5"),
    courseModule("MODULE 2", "Linear systems", 100, "4 / 4"),
    courseModule("MODULE 3", "Advanced math", 40, "2 / 5"),
    courseModule("MODULE 4", "Problem solving & data", 0, "0 / 7", true),
    courseModule("MODULE 5", "Geometry & trigonometry", 0, "0 / 4", true),
    courseModule("BOSS", "Module 2 simulation", 0, "22 questions", true),
  ],
};

export type UnitItem = {
  kind: "video" | "practice";
  name: string;
  length: string;
  state: "done" | "now" | "locked";
};

export type UnitDetail = {
  tag: string;
  name: string;
  lessonCount: number;
  duration: string;
  percent: number;
  video: { title: string; length: string; watchedAt: string };
  description: string;
  learningPoints: string[];
  items: UnitItem[];
  exerciseCount: number;
};

/** The unit currently in progress, per subject (mobile unit screen). */
export const currentUnits: Record<Subject, UnitDetail> = {
  rw: {
    tag: "MODULE 3 · CRAFT & STRUCTURE",
    name: "Words in context",
    lessonCount: 6,
    duration: "42m",
    percent: 55,
    video: {
      title: "Using context, roots and tone",
      length: "6:00",
      watchedAt: "2:31",
    },
    description:
      "Never read the answer choices first. Predict a word in your own language, then match. This lesson covers the three signals the digital SAT hides in every vocabulary item: contrast words, repeated ideas and the tone of the surrounding sentence.",
    learningPoints: [
      "Predict before you look at the choices",
      "Spot contrast and continuation signals",
      "Use word roots only as a tiebreaker",
    ],
    items: [
      {
        kind: "video",
        name: "Using context, roots and tone",
        length: "6:00",
        state: "done",
      },
      {
        kind: "video",
        name: "Two-word blank strategy",
        length: "4:20",
        state: "done",
      },
      {
        kind: "practice",
        name: "Practice: context and roots",
        length: "12 q",
        state: "now",
      },
      {
        kind: "practice",
        name: "Practice: tone matching",
        length: "10 q",
        state: "locked",
      },
    ],
    exerciseCount: 15,
  },
  math: {
    tag: "MODULE 3 · ADVANCED MATH",
    name: "Nonlinear functions",
    lessonCount: 5,
    duration: "38m",
    percent: 40,
    video: {
      title: "Reading a parabola from its equation",
      length: "5:40",
      watchedAt: "2:31",
    },
    description:
      "Three forms, one parabola. This lesson shows when to convert to vertex form, when to factor and when the fastest route is simply typing the equation into Desmos and reading the graph.",
    learningPoints: [
      "Pick the form that answers the question",
      "Read vertex, roots and intercepts fast",
      "Use Desmos as a check, not a crutch",
    ],
    items: [
      {
        kind: "video",
        name: "Reading a parabola",
        length: "5:40",
        state: "done",
      },
      {
        kind: "video",
        name: "Vertex form conversions",
        length: "4:55",
        state: "now",
      },
      {
        kind: "practice",
        name: "Practice: quadratic graphs",
        length: "12 q",
        state: "locked",
      },
      {
        kind: "practice",
        name: "Practice: mixed nonlinear",
        length: "15 q",
        state: "locked",
      },
    ],
    exerciseCount: 15,
  },
};

/** Starting position of the unit video progress bar (%). */
export const UNIT_VIDEO_PROGRESS = 42;
