import { paths } from "@/app/paths";
import type { Icon3DName } from "@/components/ui/Icon3D";

/* ------------------------------------------------------------------ */
/* Question Rush: questions, sessions and the set-up wizard            */
/* ------------------------------------------------------------------ */

export type ExplanationStep = {
  title: string;
  body: string;
  /** Optional quote from the passage with a highlighted part. */
  quote?: { before: string; highlight: string; after: string };
};

type BaseQuestion = {
  prompt: string;
  /** Letter shown in the "Correct Answer" box of the explanation. */
  answerLetter: string;
  steps: ExplanationStep[];
};

export type DualTextQuestion = BaseQuestion & {
  kind: "dual";
  text1: string;
  text2: string;
  choices: string[];
  answerIndex: number;
};

export type MathQuestion = BaseQuestion & {
  kind: "math";
  answer: number;
  /** What the student typed (seeded) in the grid-in box. */
  studentAnswer: string;
  answerLabel: string;
};

export type RushQuestion = DualTextQuestion | MathQuestion;

export const RUSH_SET_SIZE = 15;

/** Starting time on the session clock (2:09). */
export const RUSH_TIME_SECONDS = 129;

export const rushQuestions: RushQuestion[] = [
  {
    kind: "dual",
    text1:
      "Palaeoclimatologist Mireya Oyola-Merced argues that Greenland ice cores remain the most trustworthy record of pre-industrial temperature, because each annual layer traps air directly from the atmosphere of its own year. Where the layers are ambiguous, she notes, chemical markers left by dated volcanic eruptions can anchor the count.",
    text2:
      "Dendrochronologist Peter Ndlovu points out that ice layers thin and deform under their own weight below a few hundred metres, blurring exactly the interval that climate models most need. Tree-ring series, assembled from overlapping living and fossil timber, are slower to build but can be cross-dated to a single calendar year.",
    prompt: "Based on the texts, how would Ndlovu most likely respond to Oyola-Merced's claim about counting layers?",
    choices: [
      "By noting that volcanic markers appear more often in tree rings than in ice cores.",
      "By conceding that ice cores are reliable but arguing that they cannot be dated at all.",
      "By pointing out that deformation at depth undermines counting precisely where precision matters most.",
      "By suggesting that neither record can be tied to a specific calendar year.",
    ],
    answerIndex: 2,
    answerLetter: "C",
    steps: [
      {
        title: "Step 1: Identify Text 1's claim",
        body: "Oyola-Merced's argument has two parts: each layer holds air from its own year, and volcanic markers fix the count where layers are unclear. Her confidence rests on the count being reliable.",
        quote: {
          before: "Where the layers are ambiguous, she notes, ",
          highlight: "chemical markers left by dated volcanic eruptions can anchor the count.",
          after: "",
        },
      },
      {
        title: "Step 2: Analyse Text 2's objection",
        body: "Ndlovu does not deny that ice traps air. He attacks the counting: below a few hundred metres the layers deform, and that is the exact interval the models need. Choice C states that objection without overstating it.",
      },
    ],
  },
  {
    kind: "dual",
    text1:
      "Historian Amara Whitfield contends that weekly rural markets in nineteenth-century Kenya functioned as information networks rather than as mere trading posts. Traders, she writes, carried news home along with their purchases, and prices in one valley moved within days of a harvest in another.",
    text2:
      "Economist Tomás Ferreira accepts that news travelled with traders but questions how far it reached. His reconstruction of grain prices suggests that markets more than two days' walk apart moved almost independently, implying that the network was dense but local.",
    prompt: "Which choice best describes the relationship between the two texts?",
    choices: [
      "Text 2 rejects Text 1's central premise about the movement of news.",
      "Text 2 accepts Text 1's premise but limits the scale at which it holds.",
      "Text 2 offers evidence that markets were primarily social gatherings.",
      "Text 2 argues that price data cannot describe historical networks.",
    ],
    answerIndex: 1,
    answerLetter: "B",
    steps: [
      {
        title: "Step 1: Locate the concession",
        body: "Ferreira's first clause grants Whitfield's premise outright — news did travel with traders. Any choice that says he rejects it is out.",
        quote: {
          before: "",
          highlight: "Ferreira accepts that news travelled with traders",
          after: " but questions how far it reached.",
        },
      },
      {
        title: "Step 2: Find the limit he adds",
        body: "His price data shows independence beyond two days' walk: the network is real but local. That is a limit on scale, not a rejection — choice B.",
      },
    ],
  },
  {
    kind: "math",
    prompt:
      "In the equation above, c and d are constants and c > 0. If the equation has infinitely many solutions, what is the value of c?",
    answer: 396,
    studentAnswer: "21",
    answerLabel: "c = 396",
    answerLetter: "—",
    steps: [
      {
        title: "Step 1: Simplify the left side",
        body: "(36x + 90)/6 = 6x + 15, so the equation is 6x + 15 − c/12 = dx − 3d.",
      },
      {
        title: "Step 2: Match both sides",
        body: "Infinitely many solutions means the sides are identical: d = 6, and 15 − c/12 = −18. So c/12 = 33 and c = 396.",
      },
    ],
  },
];

export const rushAiPrompts: { text: string; isNew: boolean }[] = [
  { text: "Solve this on the canvas", isNew: true },
  { text: "What's the best strategy for this?", isNew: false },
  { text: "Explain this step by step", isNew: false },
];

export type RushSession = {
  name: string;
  startedAgo: string;
  answered: string;
  skills: string;
};

export const rushSessionsInProgress: RushSession[] = [
  {
    name: "Words in context · 15 questions",
    startedAgo: "about 1 hour ago",
    answered: "4/15",
    skills: "1 skill selected",
  },
  {
    name: "Systems of equations · 12 questions",
    startedAgo: "yesterday",
    answered: "9/12",
    skills: "2 skills selected",
  },
  {
    name: "Mixed R&W drill · 15 questions",
    startedAgo: "2 days ago",
    answered: "1/15",
    skills: "4 skills selected",
  },
];

/* ---------- Set-up wizard ---------- */

export type WizardSubject = "Reading & Writing" | "Math";

export type WizardSkill = { name: string; questionCount: number };
export type WizardDomain = { name: string; skills: WizardSkill[] };

const skills = (...list: [string, number][]): WizardSkill[] => list.map(([name, questionCount]) => ({ name, questionCount }));

export const wizardDomains: Record<WizardSubject, WizardDomain[]> = {
  Math: [
    {
      name: "Algebra",
      skills: skills(
        ["Linear equations in one variable", 158],
        ["Linear functions", 225],
        ["Linear equations in two variables", 179],
        ["Systems of two linear equations", 161],
        ["Linear inequalities", 100],
      ),
    },
    {
      name: "Advanced Math",
      skills: skills(["Nonlinear functions", 254], ["Nonlinear equations", 231], ["Equivalent expressions", 204]),
    },
    {
      name: "Problem-Solving and Data Analysis",
      skills: skills(
        ["Ratios and rates", 92],
        ["Percentages", 78],
        ["One-variable data", 64],
        ["Two-variable data", 71],
        ["Probability", 58],
        ["Inference from samples", 69],
        ["Evaluating claims", 66],
      ),
    },
    {
      name: "Geometry and Trigonometry",
      skills: skills(["Area and volume", 104], ["Lines and angles", 96], ["Right triangles and trig", 98], ["Circles", 81]),
    },
  ],
  "Reading & Writing": [
    {
      name: "Information and Ideas",
      skills: skills(
        ["Central ideas and details", 142],
        ["Command of evidence: textual", 128],
        ["Command of evidence: quantitative", 96],
        ["Inferences", 118],
      ),
    },
    {
      name: "Craft and Structure",
      skills: skills(["Words in context", 214], ["Text structure and purpose", 132], ["Cross-text connections", 88]),
    },
    {
      name: "Expression of Ideas",
      skills: skills(["Rhetorical synthesis", 126], ["Transitions", 148]),
    },
    {
      name: "Standard English Conventions",
      skills: skills(["Boundaries", 136], ["Form, structure and sense", 124]),
    },
  ],
};

export const wizardSteps = [
  {
    title: "Pick your topics",
    blurb: "Choose the skills you want to drill. Use Select all to take every skill at once.",
    pane: "All topics",
  },
  {
    title: "Choose difficulty",
    blurb: "Rush adapts inside the range you pick, so leave it mixed if you are not sure.",
    pane: "Difficulty",
  },
  {
    title: "How many questions?",
    blurb: "Short sets keep accuracy high; long sets build stamina for module 2.",
    pane: "Question count",
  },
  {
    title: "Set your pace",
    blurb: "Focused gives you the official time per question. Rush cuts it by a third.",
    pane: "Pace",
  },
  {
    title: "Ready to start",
    blurb: "You can change any of this mid-session from the header.",
    pane: "Review",
  },
] as const;

export const difficultyOptions = ["Easy", "Medium", "Hard", "Mixed"] as const;
export const questionCountOptions = ["5", "10", "15", "25"] as const;
export const paceOptions = ["Focused", "Rush"] as const;

export type RushPace = (typeof paceOptions)[number];

/* ---------- Mobile practice hub ---------- */

/** Question shape used by the mobile question runner. */
export type RunnerQuestion = {
  passage: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  skill: string;
  /** Short explanation shown after checking. */
  why: string;
};

/** Practice set played in the mobile runner. */
export const runnerQuestions: RunnerQuestion[] = [
  {
    passage:
      "Before tarmac roads reached most of central Kenya, the weekly market at Kagio supplied goods that nearby villages could not produce themselves. The market was also a ______ of information: traders carried news of rainfall, prices and politics between valleys that otherwise rarely met.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    choices: ["rival", "source", "remnant", "burden"],
    answerIndex: 1,
    skill: "words in context",
    why: '"Source" fits a place news comes from. The other options describe conflict, leftovers or a weight — none of which the sentence sets up.',
  },
  {
    passage:
      "Palaeoclimatologist Mireya Oyola-Merced argues that Greenland ice cores remain the most trustworthy record of pre-industrial temperature, because each annual layer traps air from the atmosphere of its own year.",
    prompt: 'Which choice best states the function of the clause beginning "because"?',
    choices: [
      "It concedes a limitation of ice cores.",
      "It supplies the reason behind her claim.",
      "It compares two dating methods.",
      "It introduces a competing researcher.",
    ],
    answerIndex: 1,
    skill: "text structure",
    why: "The clause explains why the claim holds — that is a reason, not a concession or comparison.",
  },
  {
    passage: "In the xy-plane, the graph of y = 2x² − 12x + 13 is a parabola.",
    prompt: "What is the x-coordinate of the vertex of the parabola?",
    choices: ["−3", "2", "3", "6"],
    answerIndex: 2,
    skill: "quadratic graphs",
    why: "The vertex sits at x = −b / 2a = 12 / 4 = 3. Converting to vertex form gives 2(x − 3)² − 5.",
  },
];

/** Starting XP and streak in the runner header. */
export const RUNNER_START = { xp: 20, streak: 4, xpPerCorrect: 10 };

export type PracticeShortcut = {
  name: string;
  meta: string;
  icon: Icon3DName;
  to: string;
};

/** Everything in the Practice section, as tiles on the phone Practice tab. */
export const practiceShortcuts: PracticeShortcut[] = [
  {
    name: "Question bank",
    meta: "3,882 questions",
    icon: "question-bank",
    to: paths.questionBank,
  },
  {
    name: "Daily question",
    meta: "+15 XP today",
    icon: "daily-question",
    to: paths.dailyQuestion,
  },
  {
    name: "1500+ set",
    meta: "420 hard questions",
    icon: "advanced-set",
    to: paths.advancedSet,
  },
  { name: "Mistakes", meta: "18 to replay", icon: "mistakes", to: paths.saved },
];

export const weakestSkills: {
  name: string;
  accuracy: number;
  meta: string;
  color: string;
}[] = [
  {
    name: "Vocabulary in context",
    accuracy: 27,
    meta: "46 attempts · R&W",
    color: "#EF4444",
  },
  {
    name: "Trigonometry",
    accuracy: 38,
    meta: "31 attempts · Math",
    color: "#FF9500",
  },
  {
    name: "Circles & arcs",
    accuracy: 41,
    meta: "28 attempts · Math",
    color: "#FF9500",
  },
  {
    name: "Boundaries",
    accuracy: 59,
    meta: "37 attempts · R&W",
    color: "#FFC93C",
  },
];

export const practiceSubjects: {
  subject: WizardSubject;
  title: string;
  meta: string;
  tone: "pink" | "blue";
}[] = [
  {
    subject: "Reading & Writing",
    title: "Reading & Writing",
    meta: "1,492 questions · 28% solved",
    tone: "pink",
  },
  {
    subject: "Math",
    title: "Math & Graphing",
    meta: "2,390 questions · 31% solved",
    tone: "blue",
  },
];
