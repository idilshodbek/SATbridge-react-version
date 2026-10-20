/* ------------------------------------------------------------------ */
/* Progress: predicted score                                            */
/* ------------------------------------------------------------------ */

export const prediction = {
  total: 1290,
  low: 1240,
  high: 1340,
  confidence: "High",
  basis: "6 tests and 1,842 questions · updated today",
  weeklyChange: "+18",
  target: 1550,
  sections: [
    {
      label: "Reading & Writing",
      score: 640,
      low: 610,
      high: 670,
      change: "+30",
    },
    { label: "Math", score: 650, low: 620, high: 680, change: "+40" },
  ],
};

/** Predicted total at the end of each week of prep. */
export const predictionHistory: { week: string; score: number }[] = [
  { week: "W1", score: 1080 },
  { week: "W2", score: 1100 },
  { week: "W3", score: 1150 },
  { week: "W4", score: 1170 },
  { week: "W5", score: 1210 },
  { week: "W6", score: 1272 },
  { week: "W7", score: 1290 },
];

/** Skills that would add the most points if brought to 80% accuracy. */
export const pointGains: {
  skill: string;
  subject: "R&W" | "Math";
  points: number;
  accuracy: number;
}[] = [
  { skill: "Vocabulary in context", subject: "R&W", points: 40, accuracy: 27 },
  { skill: "Trigonometry", subject: "Math", points: 30, accuracy: 38 },
  { skill: "Circles & arcs", subject: "Math", points: 25, accuracy: 41 },
  { skill: "Boundaries", subject: "R&W", points: 20, accuracy: 59 },
  { skill: "Transitions", subject: "R&W", points: 15, accuracy: 66 },
];

export const predictionMethod = [
  "Every question you answer updates your accuracy on its skill and difficulty.",
  "We simulate the adaptive digital SAT hundreds of times with those accuracies.",
  "The range covers 80% of the simulated scores; it narrows as you practise more.",
];
