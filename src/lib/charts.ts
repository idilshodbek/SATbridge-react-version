/**
 * Builds a conic-gradient from consecutive segments.
 *   conicSegments([{ color: "#22C55E", percent: 30 }], "var(--border)")
 */
export function conicSegments(segments: { color: string; percent: number }[], restColor?: string) {
  let startDeg = 0;
  const stops = segments.map(({ color, percent }) => {
    const endDeg = startDeg + Math.round(percent * 3.6);
    const stop = `${color} ${startDeg}deg ${endDeg}deg`;
    startDeg = endDeg;
    return stop;
  });
  if (restColor) stops.push(`${restColor} ${startDeg}deg`);
  return `conic-gradient(${stops.join(",")})`;
}
