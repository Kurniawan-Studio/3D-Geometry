import * as THREE from 'three';

export function starShape(points: number, outerR: number, innerR: number): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

export function crossShape(armWidth: number, armLength: number): THREE.Shape {
  const w = armWidth / 2, l = armLength / 2;
  const s = new THREE.Shape();
  s.moveTo(-w, -l); s.lineTo(w, -l); s.lineTo(w, -w); s.lineTo(l, -w);
  s.lineTo(l, w); s.lineTo(w, w); s.lineTo(w, l); s.lineTo(-w, l);
  s.lineTo(-w, w); s.lineTo(-l, w); s.lineTo(-l, -w); s.lineTo(-w, -w);
  s.closePath();
  return s;
}

export function lShape(armWidth: number, armLength: number): THREE.Shape {
  const w = armWidth, l = armLength;
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.lineTo(l, 0); s.lineTo(l, w); s.lineTo(w, w);
  s.lineTo(w, l); s.lineTo(0, l); s.closePath();
  return s;
}

export function tShape(stemWidth: number, topWidth: number, height: number, stemHeight: number): THREE.Shape {
  const sw = stemWidth / 2, tw = topWidth / 2;
  const s = new THREE.Shape();
  s.moveTo(-sw, 0); s.lineTo(sw, 0); s.lineTo(sw, stemHeight);
  s.lineTo(tw, stemHeight); s.lineTo(tw, height); s.lineTo(-tw, height);
  s.lineTo(-tw, stemHeight); s.lineTo(-sw, stemHeight); s.closePath();
  return s;
}

export function shapeMetrics(shape: THREE.Shape) {
  const pts = shape.getPoints(0);
  let area = 0, perimeter = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
    perimeter += pts[i].distanceTo(pts[j]);
  }
  return { area: Math.abs(area / 2), perimeter };
}
