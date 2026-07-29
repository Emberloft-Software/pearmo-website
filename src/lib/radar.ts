/**
 * Geometry for the personality radar chart.
 *
 * Pure functions so the whole chart can be computed at build time and shipped
 * in the HTML. The original built it in the browser with innerHTML, which meant
 * the axis labels and trait values existed only after JS ran.
 */

export const RADAR = {
  cx: 210,
  cy: 190,
  radius: 130,
  rings: 4,
  /** Distance past the outer ring where labels sit. */
  labelOffset: 34,
  viewBox: "0 0 420 380",
} as const;

export type Point = { x: number; y: number };

/**
 * Position on the chart for spoke `index` of `count`, at radius `r`.
 * Starts at -90° so the first axis points straight up.
 */
export function radarPoint(index: number, count: number, r: number): Point {
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
  return {
    x: RADAR.cx + r * Math.cos(angle),
    y: RADAR.cy + r * Math.sin(angle),
  };
}

function toPointsAttr(points: readonly Point[]): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

/** Concentric grid polygons, innermost first. */
export function ringPolygons(count: number): string[] {
  return Array.from({ length: RADAR.rings }, (_, ring) => {
    const r = (RADAR.radius * (ring + 1)) / RADAR.rings;
    return toPointsAttr(
      Array.from({ length: count }, (_, i) => radarPoint(i, count, r)),
    );
  });
}

/** The spoke lines from centre to outer ring. */
export function axisLines(count: number): { x2: number; y2: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const p = radarPoint(i, count, RADAR.radius);
    return { x2: p.x, y2: p.y };
  });
}

/** The filled shape for a set of 0..max scores. */
export function scorePolygon(
  scores: readonly number[],
  max: number,
): { points: string; dots: readonly Point[] } {
  const dots = scores.map((score, i) =>
    radarPoint(i, scores.length, RADAR.radius * (score / max)),
  );
  return { points: toPointsAttr(dots), dots };
}

/** Label anchor positions, with the text-anchor that keeps them off the chart. */
export function labelPositions(
  count: number,
): { x: number; y: number; anchor: "start" | "middle" | "end" }[] {
  return Array.from({ length: count }, (_, i) => {
    const p = radarPoint(i, count, RADAR.radius + RADAR.labelOffset);
    const anchor =
      Math.abs(p.x - RADAR.cx) < 10 ? "middle" : p.x > RADAR.cx ? "start" : "end";
    return { x: p.x, y: p.y, anchor };
  });
}
