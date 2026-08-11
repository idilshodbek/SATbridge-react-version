// Content for the SATbridge prototype, lifted verbatim from the Claude Design source.
// Colour constants double as design tokens; the theme layer re-maps the blues at runtime.

export const BRAND = "#009ADA", BRAND_D = "#007AB0", GREEN = "#58CC02", GREEN_D = "#46A302",
  GOLD = "#FFC800", GOLD_D = "#D9A400", ORANGE = "#FF9600", INK = "#0E2430", INK_D = "#071620";

export const AXES = [
  { name: "Inferences", rw: 99, math: 88 },
  { name: "Notes", rw: 97, math: 72 },
  { name: "Structure", rw: 80, math: 95 },
  { name: "Vocab", rw: 27, math: 64 },
  { name: "Boundaries", rw: 59, math: 81 }
];

export const UNITS = [
  {
    n: 1, short: "Linear basics", name: "Linear foundations", section: "Math",
    blurb: "Slopes, intercepts and one-variable equations.", color: GREEN, dark: GREEN_D,
    skills: [["Solving for x", 96], ["Slope", 91], ["Intercepts", 88], ["Graph reading", 84]],
    lessons: [
      { t: "Order of operations", s: "8 questions · 20 XP", k: "lesson", tags: ["8 questions", "20 XP"] },
      { t: "Solving for one variable", s: "10 questions · 20 XP", k: "lesson", tags: ["10 questions", "20 XP"] },
      { t: "Slope from two points", s: "8 questions · 20 XP", k: "lesson", tags: ["8 questions", "20 XP"] },
      { t: "Speed chest", s: "Free 40 XP for a 60-second round", k: "chest", tags: ["60 seconds", "40 XP"] },
      { t: "Reading linear graphs", s: "12 questions · 25 XP", k: "lesson", tags: ["12 questions", "25 XP"] },
      { t: "Unit 1 boss check", s: "20 questions, adaptive difficulty", k: "trophy", tags: ["20 questions", "60 XP"] }
    ]
  },
  {
    n: 2, short: "Heart of Algebra", name: "Heart of Algebra", section: "Math",
    blurb: "The highest-yield math domain on the test.", color: BRAND, dark: BRAND_D,
    skills: [["Systems", 74], ["Inequalities", 62], ["Word problems", 48], ["Rate of change", 81]],
    lessons: [
      { t: "Linear equations in 1 variable", s: "8 questions · 20 XP", k: "lesson", tags: ["8 questions", "20 XP"] },
      { t: "Systems of equations", s: "10 questions · 20 XP", k: "lesson", tags: ["10 questions", "20 XP"] },
      { t: "Inequalities & number lines", s: "8 questions · 20 XP", k: "lesson", tags: ["8 questions", "20 XP"] },
      { t: "Algebra chest", s: "Free 40 XP + a streak freeze", k: "chest", tags: ["Bonus", "40 XP"] },
      { t: "Word problems → equations", s: "12 questions · 25 XP", k: "lesson", tags: ["12 questions", "25 XP"] },
      { t: "Rate of change in context", s: "9 questions · 20 XP", k: "lesson", tags: ["9 questions", "20 XP"] },
      { t: "Mixed algebra drill", s: "15 questions, mixed difficulty", k: "lesson", tags: ["15 questions", "30 XP"] },
      { t: "Unit 2 boss check", s: "20 questions, adaptive difficulty", k: "trophy", tags: ["20 questions", "60 XP"] },
      { t: "Section mock module", s: "Timed 22-question module", k: "mock", tags: ["Timed", "120 XP"] }
    ]
  },
  {
    n: 3, short: "Data & stats", name: "Problem solving & data", section: "Math",
    blurb: "Ratios, percentages, tables and scatterplots.", color: GOLD, dark: GOLD_D,
    skills: [["Ratios", 41], ["Percent change", 38], ["Tables", 22], ["Scatterplots", 15]],
    lessons: [
      { t: "Ratios and units", s: "8 questions · 20 XP", k: "lesson", tags: ["8 questions", "20 XP"] },
      { t: "Percent change", s: "10 questions · 20 XP", k: "lesson", tags: ["10 questions", "20 XP"] },
      { t: "Reading two-way tables", s: "8 questions · 20 XP", k: "lesson", tags: ["8 questions", "20 XP"] },
      { t: "Data chest", s: "Free 40 XP for a perfect round", k: "chest", tags: ["Bonus", "40 XP"] },
      { t: "Scatterplots & lines of fit", s: "12 questions · 25 XP", k: "lesson", tags: ["12 questions", "25 XP"] },
      { t: "Probability basics", s: "9 questions · 20 XP", k: "lesson", tags: ["9 questions", "20 XP"] },
      { t: "Unit 3 boss check", s: "20 questions, adaptive difficulty", k: "trophy", tags: ["20 questions", "60 XP"] }
    ]
  }
];

export const QS = [
  {
    module: "Geometry and Trigonometry: Module 1", kind: "Student-produced prompt", topic: "Volume",
    passage: "A cube has an edge length of 41 inches. Recall that the volume of a cube with edge length s is given by V = s³.",
    prompt: "What is the volume, in cubic inches, of the cube?",
    choices: ["164", "1,681", "10,086", "68,921"], answer: 3, hasFig: true, figNote: "Cube with edge 41 in",
    hint: "164 is 4 × 41 (perimeter thinking) and 1,681 is 41² (area). Volume needs the edge cubed."
  },
  {
    module: "Algebra: Module 1", kind: "Multiple choice", topic: "Linear equations",
    passage: "The equation 3x + 7 = 25 models the number of practice questions x a student finishes per hour after a 7-question warm-up.",
    prompt: "What value of x satisfies the equation 3x + 7 = 25?",
    choices: ["4", "6", "8", "12"], answer: 1, hasFig: false,
    hint: "Undo the +7 first, then divide both sides by 3."
  },
  {
    module: "Reading and Writing: Module 2", kind: "Text structure and purpose", topic: "Purpose",
    passage: "Marine biologist Ayana Johnson notes that coral restoration projects often measure success by counting transplanted fragments. Yet fragment counts say little about whether a reef can reproduce on its own. Johnson therefore argues that surveys should track larval settlement — the arrival of new, wild-born coral — as the real signal of recovery.",
    prompt: "Which choice best describes the function of the underlined sentence in the text as a whole?",
    choices: [
      "It introduces a measurement that the author will go on to endorse.",
      "It identifies a limitation that motivates the researcher's proposal.",
      "It provides evidence that restoration projects have failed entirely.",
      "It compares two competing methods of counting coral fragments."
    ], answer: 1, hasFig: false,
    hint: "Ask what job the sentence does for the argument, not what it says."
  }
];

export const TESTS = [
  {
    id: "t1", name: "Full Test 01", tag: "Adaptive", mode: "full", thumb: "65%", state: "paused",
    meta: "Paused in Module 2 · 1h 12m left", ring: 65,
    sections: [["R&W 1", "done", "540"], ["R&W 2", "now", ""], ["Math 1", "", ""], ["Math 2", "", ""]]
  },
  {
    id: "t2", name: "Full Test 02", tag: "Official style", mode: "full", thumb: "New", state: "new",
    meta: "Not started · 2h 14m · 4 modules", ring: 0,
    sections: [["R&W 1", "", ""], ["R&W 2", "", ""], ["Math 1", "", ""], ["Math 2", "", ""]]
  },
  {
    id: "t3", name: "Full Test 03", tag: "Hard", mode: "full", thumb: "1180", state: "done",
    meta: "Completed 12 Jul · 1180 · 84th percentile", ring: 100,
    sections: [["R&W 570", "done", ""], ["Math 610", "done", ""]]
  },
  {
    id: "m1", name: "Math Mock 04", tag: "Math only", mode: "math", thumb: "New", state: "new",
    meta: "Not started · 70 min · 2 modules · 44 questions", ring: 0,
    sections: [["Module 1", "", ""], ["Module 2", "", ""]]
  },
  {
    id: "m2", name: "Math Mock 03", tag: "Math only", mode: "math", thumb: "610", state: "done",
    meta: "Completed 8 Jul · 610 · +40 vs last", ring: 100,
    sections: [["Algebra 82%", "done", ""], ["Geometry 61%", "", ""]]
  },
  {
    id: "e1", name: "R&W Mock 04", tag: "English only", mode: "eng", thumb: "New", state: "new",
    meta: "Not started · 64 min · 2 modules · 54 questions", ring: 0,
    sections: [["Module 1", "", ""], ["Module 2", "", ""]]
  },
  {
    id: "e2", name: "R&W Mock 03", tag: "English only", mode: "eng", thumb: "540", state: "done",
    meta: "Completed 5 Jul · 540 · vocab flagged", ring: 100,
    sections: [["Craft 74%", "done", ""], ["Vocab 27%", "", ""]]
  },
  {
    id: "d1", name: "Diagnostic sprint", tag: "20 min", mode: "quick", thumb: "20m", state: "new",
    meta: "Mixed 20 questions · finds your weakest 3 skills", ring: 0,
    sections: [["Mixed", "", ""], ["Adaptive", "", ""]]
  },
  {
    id: "d2", name: "Vocab rapid fire", tag: "10 min", mode: "quick", thumb: "10m", state: "new",
    meta: "30 words in context · beats your 27% mastery", ring: 0,
    sections: [["Vocab", "", ""]]
  }
];

export const RADAR = {
  rw: {
    axes: [["Inferences", 90], ["Command of evidence", 95], ["Form & sense", 80], ["Vocabulary", 35], ["Boundaries", 60]],
    bars: [["Inferences", 99], ["Command of evidence", 95], ["Text structure", 80], ["Transitions", 66], ["Vocabulary", 27]]
  },
  math: {
    axes: [["Algebra", 85], ["Advanced math", 68], ["Problem solving", 75], ["Geometry", 55], ["Data analysis", 72]],
    bars: [["Linear equations", 100], ["Systems of equations", 88], ["Quadratics", 64], ["Circles", 41], ["Trigonometry", 33]]
  }
};

export const CHAT0 = [
  { who: "ai", text: "Hey Sukhrob. You missed 4 vocabulary-in-context questions this week. Want me to walk through the trickiest one?" },
  { who: "me", text: "Yes, the coral reef passage." },
  { who: "ai", text: "In that passage the sentence about fragment counts sets up a limitation — it says what the counts *don't* show. When a sentence highlights what a method misses, its function is usually to motivate the alternative that follows. That is why B was right." }
];

export const LB = {
  week: [
    ["Malika K.", "Uzbekistan", 1820, "+3", "MK"], ["Daniel A.", "Spain", 1610, "+1", "DA"],
    ["You", "Tashkent", 1240, "=", "SJ"], ["Lin T.", "Vietnam", 1105, "-1", "LT"],
    ["Ahmed R.", "Egypt", 1080, "+2", "AR"], ["Sofia P.", "Brazil", 990, "-2", "SP"],
    ["Kenji T.", "Japan", 940, "+4", "KT"], ["Nora B.", "Morocco", 880, "-1", "NB"],
    ["Ivan M.", "Serbia", 810, "=", "IM"], ["Priya S.", "India", 760, "-3", "PS"]
  ],
  all: [
    ["Malika K.", "Uzbekistan", 18420, "=", "MK"], ["Lin T.", "Vietnam", 16110, "+2", "LT"],
    ["Daniel A.", "Spain", 15980, "-1", "DA"], ["You", "Tashkent", 14260, "+1", "SJ"],
    ["Sofia P.", "Brazil", 13800, "-2", "SP"], ["Kenji T.", "Japan", 12440, "=", "KT"],
    ["Ahmed R.", "Egypt", 11900, "+3", "AR"], ["Nora B.", "Morocco", 10870, "-1", "NB"],
    ["Ivan M.", "Serbia", 9980, "=", "IM"], ["Priya S.", "India", 9110, "-2", "PS"]
  ],
  friends: [
    ["Malika K.", "Uzbekistan", 1820, "+3", "MK"], ["Daniel A.", "Spain", 1610, "+1", "DA"],
    ["You", "Tashkent", 1240, "=", "SJ"], ["Lin T.", "Vietnam", 1105, "-1", "LT"]
  ]
};

export const DRILLS = [
  { name: "Vocabulary in context", domain: "rw", q: 10, min: 12, acc: 27, diff: "Weakest", color: "#FF4B4B" },
  { name: "Boundaries & punctuation", domain: "rw", q: 12, min: 14, acc: 59, diff: "Medium", color: ORANGE },
  { name: "Command of evidence", domain: "rw", q: 10, min: 13, acc: 95, diff: "Easy", color: GREEN },
  { name: "Systems of equations", domain: "math", q: 12, min: 15, acc: 88, diff: "Easy", color: GREEN },
  { name: "Circles & arcs", domain: "math", q: 10, min: 16, acc: 41, diff: "Hard", color: "#FF4B4B" },
  { name: "Percent change", domain: "math", q: 12, min: 14, acc: 62, diff: "Medium", color: ORANGE },
  { name: "Quadratic graphs", domain: "math", q: 10, min: 15, acc: 64, diff: "Medium", color: ORANGE },
  { name: "Transitions", domain: "rw", q: 12, min: 12, acc: 66, diff: "Medium", color: ORANGE }
];

export const VOCAB_UNITS = [
  { name: "Unit 1", total: 50, learned: 5, subs: [["Unit 1.1", 50, 5], ["Unit 1.2", 50, 0]] },
  { name: "Unit 2", total: 50, learned: 0, subs: [["Unit 2.1", 50, 0], ["Unit 2.2", 50, 0]] },
  { name: "Unit 3", total: 50, learned: 0, subs: [["Unit 3.1", 50, 0]] }
];

export const WORDS = [
  ["obfuscate", "to make something unclear on purpose", "repeat"],
  ["candid", "honest and direct, even when awkward", "learned"],
  ["ubiquitous", "found everywhere at once", "learned"],
  ["mitigate", "to make less severe", "repeat"],
  ["prudent", "careful about future consequences", "new"],
  ["nuance", "a very small difference in meaning", "learned"],
  ["tenacious", "holding on stubbornly", "new"],
  ["ambivalent", "having mixed feelings", "repeat"]
];

export const LESSON_META = {
  desc: "A short video walkthrough, then the exercises. Watch the method once, then run the 8-question set — the tutor tracks which step you slip on.",
  bullets: [
    "Isolate the variable before you touch anything else",
    "Check the sign every time you divide by a negative",
    "Substitute your answer back in — 20 seconds, catches most misses"
  ]
};

export const QBANK = [
  { p: "If 3x + 7 = 25, what is the value of 4x − 2?", topic: "Linear equations", domain: "math", diff: "Easy", src: "Official 2024", status: "correct" },
  { p: "A circle has centre (2, −3) and radius 5. Which equation represents it?", topic: "Circles", domain: "math", diff: "Hard", src: "SATbridge", status: "wrong" },
  { p: "Which choice best states the function of the third sentence?", topic: "Text structure", domain: "rw", diff: "Medium", src: "Official 2023", status: "correct" },
  { p: "Which word most nearly means 'to make deliberately unclear'?", topic: "Vocabulary", domain: "rw", diff: "Medium", src: "SATbridge", status: "wrong" },
  { p: "The scatterplot shows study hours vs score. What does the slope represent?", topic: "Data analysis", domain: "math", diff: "Medium", src: "Official 2024", status: "unseen" },
  { p: "Which choice completes the text with the most logical transition?", topic: "Transitions", domain: "rw", diff: "Easy", src: "SATbridge", status: "unseen" },
  { p: "In the figure, lines l and m are parallel. What is the measure of angle x?", topic: "Geometry", domain: "math", diff: "Hard", src: "Official 2022", status: "wrong" },
  { p: "Which quotation best supports the student's claim about migration?", topic: "Command of evidence", domain: "rw", diff: "Hard", src: "Official 2024", status: "correct" }
];

export const PLAN = [
  { d: "MON", items: [["Algebra lesson", "lesson"], ["Vocab 10", "vocab"]] },
  { d: "TUE", items: [["Vocab drill", "drill"], ["Geometry lesson", "lesson"]] },
  { d: "WED", items: [["Vocab 10", "vocab"], ["Mixed drill", "drill"], ["Tutor review", "tutor"]] },
  { d: "THU", items: [["Data lesson", "lesson"]] },
  { d: "FRI", items: [["R&W module", "mock"]] },
  { d: "SAT", items: [["Full mock 04", "mock"]] },
  { d: "SUN", items: [["Score review", "tutor"]] }
];

export const TODAY = [
  ["Watch: Word problems → equations", "12 min", "lesson"],
  ["Vocabulary set · 10 words", "4 min", "vocab"],
  ["Drill: vocabulary in context", "12 min", "drill"],
  ["Tutor: review yesterday's misses", "8 min", "tutor"]
];

export const ANA_SKILLS = [
  ["Inferences", 99, 12, "rw"], ["Command of evidence", 95, 14, "rw"], ["Text structure", 80, 18, "rw"],
  ["Transitions", 66, 21, "rw"], ["Boundaries", 59, 24, "rw"], ["Vocabulary in context", 27, 38, "rw"],
  ["Linear equations", 92, 41, "math"], ["Systems", 88, 48, "math"], ["Percent change", 62, 62, "math"],
  ["Quadratic graphs", 64, 71, "math"], ["Circles & arcs", 41, 84, "math"], ["Trigonometry", 38, 96, "math"]
];

export const ANA_WEEKS = [["W1", 2.1], ["W2", 3.4], ["W3", 4.0], ["W4", 3.2], ["W5", 5.1], ["W6", 4.6], ["W7", 4.3]];

export const ANA_MOCKS = [
  ["Mock 06", 1180, 570, 610, "12 Jul", 8],
  ["Mock 05", 1120, 540, 580, "28 Jun", 6],
  ["Mock 04", 1020, 500, 520, "14 Jun", 11],
  ["Mock 03", 1040, 510, 530, "31 May", 9]
];

export const REVIEW = [
  [1, "Linear equations", "math", "correct", "0:48", "You solved it in one step — good."],
  [2, "Systems", "math", "correct", "1:10", ""],
  [3, "Circles & arcs", "math", "wrong", "2:34", "You used diameter instead of radius in (x−h)²+(y−k)²=r²."],
  [4, "Percent change", "math", "careless", "0:39", "Right method, you answered the increase not the final value."],
  [5, "Data analysis", "math", "skipped", "0:04", "Ran out of time — this was a 45-second question."],
  [6, "Vocabulary in context", "rw", "wrong", "1:52", "'Candid' means honest; the passage needed 'guarded'."],
  [7, "Text structure", "rw", "correct", "1:04", ""],
  [8, "Transitions", "rw", "careless", "0:33", "You picked 'however' but the sentences agree."]
];

export const ONB = [
  { q: "What score are you aiming for?", sub: "We build the plan backwards from this", opts: ["1200+", "1350+", "1450+", "1550+"] },
  { q: "When is your exam?", sub: "Official dates in the next 6 months", opts: ["23 Aug 2026", "3 Oct 2026", "7 Nov 2026", "Not booked yet"] },
  { q: "How much can you study each week?", sub: "Be honest — the plan adapts", opts: ["2–3 hours", "4–6 hours", "7–10 hours", "10+ hours"] },
  { q: "Which feels hardest right now?", sub: "Pick one to start with", opts: ["Reading & Writing", "Math", "Pacing and timing", "No idea yet"] },
  { q: "Dream school?", sub: "We show how close you are", opts: ["Harvard", "Stanford", "MIT", "Still deciding"] }
];

export const RUN = [
  { p: "If 3x + 7 = 25, what is x?", c: ["4", "6", "8", "12"], a: 1, why: "Subtract 7 → 3x = 18 → x = 6." },
  { p: "Which word means 'to make deliberately unclear'?", c: ["candid", "obfuscate", "prudent", "nuance"], a: 1, why: "Obfuscate literally means to darken or confuse." },
  { p: "2x − 5 = 11. What is 4x?", c: ["8", "16", "32", "64"], a: 2, why: "x = 8, so 4x = 32." },
  { p: "Slope of a line through (1,2) and (3,8)?", c: ["2", "3", "4", "6"], a: 1, why: "(8−2)/(3−1) = 3." }
];

export const NOTES = [
  ["Circles: always convert diameter → radius first", "Math · Circles & arcs", "note", "Today"],
  ["'Guarded' vs 'candid' — opposite tone words", "R&W · Vocabulary", "note", "Yesterday"],
  ["Q3 mock 06 — centre/radius equation", "Flagged question", "flag", "12 Jul"],
  ["Tutor: how to pace the last 5 minutes", "Saved tutor answer", "tutor", "10 Jul"],
  ["Trig: SOH-CAH-TOA sign rules", "Math · Trigonometry", "note", "8 Jul"],
  ["Q17 mock 05 — transition trap", "Flagged question", "flag", "28 Jun"]
];

export const ACHV = [
  ["Early bird", "Study before 8am 5 times", 1, "🌅"], ["Streak keeper", "Reach a 25-day streak", 0.96, "🔥"],
  ["Mock veteran", "Finish 6 full mocks", 1, "📝"], ["Word collector", "Learn 50 vocabulary words", 0.1, "📚"],
  ["Perfect module", "Get every question right in a module", 0, "💎"], ["Comeback", "Beat your best score by 100", 1, "📈"],
  ["Sharpshooter", "90% accuracy on 3 drills in a row", 0.66, "🎯"], ["Night owl", "Study after 11pm 5 times", 1, "🌙"],
  ["League champion", "Finish rank 1 in your league", 0, "👑"]
];

export const THEMES = [
  ["#009ADA", "Sky"], ["#7C4DFF", "Violet"], ["#00A99D", "Teal"], ["#FF5C8A", "Rose"], ["#F2620F", "Amber"]
];