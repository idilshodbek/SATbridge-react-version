/* ------------------------------------------------------------------ */
/* Desmos: the built-in SAT calculator, and when to reach for it        */
/* ------------------------------------------------------------------ */

export type DesmosTechnique = {
  id: string;
  title: string;
  /** Which questions it helps with. */
  useWhen: string;
  steps: string[];
  example: string;
  /** Typical time saved per question. */
  saves: string;
};

export const desmosTechniques: DesmosTechnique[] = [
  {
    id: "graph-both-sides",
    title: "Solve any equation by graphing both sides",
    useWhen: "One-variable equations, linear or not",
    steps: [
      "Type the left side as y = …",
      "Type the right side as y = … on the next line",
      "Click the intersection: its x-value is the answer",
    ],
    example: "2x² − 3 = 5x  →  intersections at x = −0.5 and x = 3",
    saves: "~40s",
  },
  {
    id: "systems",
    title: "Systems of equations in one step",
    useWhen: "Two equations, two unknowns",
    steps: [
      "Type both equations exactly as written",
      "Click the point where the lines cross",
      "The (x, y) label is the solution",
    ],
    example: "3x + 2y = 12 and x − y = 1  →  (2.8, 1.8)",
    saves: "~60s",
  },
  {
    id: "vertex-roots",
    title: "Vertex, roots and intercepts instantly",
    useWhen: "Quadratics: minimum, maximum, x-intercepts",
    steps: [
      "Type the function",
      "Click the grey points Desmos marks on the curve",
      "Read the vertex and the roots from the labels",
    ],
    example: "y = 2x² − 12x + 13  →  vertex (3, −5)",
    saves: "~45s",
  },
  {
    id: "regression",
    title: "Regression for unknown constants",
    useWhen: 'A table of values, or "for some constant a, b, c"',
    steps: [
      "Add a table and enter the points as x₁, y₁",
      "Type y₁ ~ ax₁² + bx₁ + c (use ~, not =)",
      "Read a, b and c from the results panel",
    ],
    example: "(0, 2), (1, 5), (2, 12)  →  a = 2, b = 1, c = 2",
    saves: "~90s",
  },
  {
    id: "sliders",
    title: 'Sliders for "no solution" and "infinitely many"',
    useWhen: "Questions about the constant that changes the number of solutions",
    steps: [
      "Replace the unknown constant with k",
      'Click "add slider" for k',
      "Drag k until the lines overlap (infinitely many) or run parallel (none)",
    ],
    example: "kx + 3y = 6 and 2x + y = 2  →  k = 6 gives parallel lines",
    saves: "~50s",
  },
  {
    id: "circles",
    title: "Read a circle straight from its equation",
    useWhen: "Circle equations in any form, including unexpanded ones",
    steps: [
      "Type the equation exactly as given",
      "Hover over the centre and edge points",
      "Radius = distance from centre to any point on the circle",
    ],
    example: "x² + y² − 4x + 6y = 12  →  centre (2, −3), radius 5",
    saves: "~60s",
  },
];

export const DESMOS_CALCULATOR_URL = "https://www.desmos.com/calculator";
