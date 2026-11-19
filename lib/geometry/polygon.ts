export type Point2D = { x: number; y: number };

export function validatePolygon(points: Point2D[]): { valid: boolean; error?: string } {
  if (points.length < 3) return { valid: false, error: 'Polygon minimal membutuhkan 3 titik.' };
  for (let i = 0; i < points.length; i++)
    for (let j = i + 1; j < points.length; j++)
      if (Math.abs(points[i].x - points[j].x) < 1e-9 && Math.abs(points[i].y - points[j].y) < 1e-9)
        return { valid: false, error: `Titik duplikat pada indeks ${i + 1} dan ${j + 1}.` };

  const n = points.length;
  for (let i = 0; i < n; i++) {
    const a1 = points[i], a2 = points[(i + 1) % n];
    for (let j = i + 1; j < n; j++) {
      if (j === i || (j + 1) % n === i || j === (i + 1) % n) continue;
      if (segmentsIntersect(a1, a2, points[j], points[(j + 1) % n]))
        return { valid: false, error: `Self-intersection antara edge ${i + 1} dan ${j + 1}.` };
    }
  }
  if (Math.abs(polygonArea(points)) < 1e-9) return { valid: false, error: 'Poligon degenerate (luas nol).' };
  return { valid: true };
}

function segmentsIntersect(p1: Point2D, p2: Point2D, p3: Point2D, p4: Point2D): boolean {
  const d1 = cross(p3, p4, p1), d2 = cross(p3, p4, p2);
  const d3 = cross(p1, p2, p3), d4 = cross(p1, p2, p4);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
         ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
}
function cross(a: Point2D, b: Point2D, c: Point2D) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}
export function polygonArea(points: Point2D[]): number {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y - points[j].x * points[i].y;
  }
  return area / 2;
}
