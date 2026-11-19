import * as THREE from 'three';
import { RoundedBoxGeometry, ConvexGeometry } from 'three-stdlib';
import type { GeometryCatalogItem } from './types';
import { edgeToCircumradius } from './math';
import { starShape, crossShape, lShape, tShape } from './shapes';

function archimedeanVertices(type: string): THREE.Vector3[] {
  const v: THREE.Vector3[] = [];
  const signs = [
    [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
  ];

  if (type === 'cuboctahedron') {
    const coords: [number, number, number][] = [
      [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
      [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1],
      [1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
    ];
    return coords.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  }

  if (type === 'truncatedCube') {
    const c = 1, t = 0.5;
    for (const [sx, sy, sz] of signs) {
      v.push(new THREE.Vector3(sx * c, sy * c, sz * (c - t)));
      v.push(new THREE.Vector3(sx * c, sy * (c - t), sz * c));
      v.push(new THREE.Vector3(sx * (c - t), sy * c, sz * c));
    }
    return v;
  }

  if (type === 'truncatedOctahedron') {
    const oct: [number, number, number][] = [
      [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
    ];
    const t = 1 / 3;
    for (const [ax, ay, az] of oct) {
      for (const [bx, by, bz] of oct) {
        if (ax + bx === 0 && ay + by === 0 && az + bz === 0) continue;
        v.push(new THREE.Vector3(ax + (bx - ax) * t, ay + (by - ay) * t, az + (bz - az) * t));
      }
    }
    const unique: THREE.Vector3[] = [];
    for (const p of v) if (!unique.some((q) => q.distanceTo(p) < 1e-6)) unique.push(p);
    return unique;
  }

  if (type === 'truncatedTetrahedron') {
    const tet: [number, number, number][] = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    const t = 1 / 3;
    for (const [ax, ay, az] of tet) {
      for (const [bx, by, bz] of tet) {
        if (ax === bx && ay === by && az === bz) continue;
        v.push(new THREE.Vector3(ax + (bx - ax) * t, ay + (by - ay) * t, az + (bz - az) * t));
      }
    }
    const unique: THREE.Vector3[] = [];
    for (const p of v) if (!unique.some((q) => q.distanceTo(p) < 1e-6)) unique.push(p);
    return unique;
  }

  return v;
}

export function createGeometry(
  item: GeometryCatalogItem,
  p: Record<string, number>
): THREE.BufferGeometry | null {
  const t = item.geometryType;
  try {
    switch (t) {
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(edgeToCircumradius('tetrahedron', p.edge));
      case 'cube':
        return new THREE.BoxGeometry(p.width, p.height, p.depth);
      case 'octahedron':
        return new THREE.OctahedronGeometry(edgeToCircumradius('octahedron', p.edge));
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(edgeToCircumradius('dodecahedron', p.edge));
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(edgeToCircumradius('icosahedron', p.edge));
      case 'truncatedCube':
      case 'cuboctahedron':
      case 'truncatedOctahedron':
      case 'truncatedTetrahedron': {
        const verts = archimedeanVertices(t);
        if (verts.length < 4) return null;
        const maxR = Math.max(...verts.map((v) => v.length()));
        const s = (p.size ?? 1.5) / maxR;
        verts.forEach((v) => v.multiplyScalar(s));
        return new ConvexGeometry(verts);
      }
      case 'prism':
        return new THREE.CylinderGeometry(p.radius, p.radius, p.height, p.sides);
      case 'pyramid':
        return new THREE.ConeGeometry(p.radius, p.height, p.sides);
      case 'sphere':
        return new THREE.SphereGeometry(p.radius, 32, 24);
      case 'hemisphere':
        return new THREE.SphereGeometry(p.radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      case 'ellipsoid':
        return new THREE.SphereGeometry(1, 32, 24).scale(p.a, p.b, p.c);
      case 'cylinder':
        return new THREE.CylinderGeometry(p.radius, p.radius, p.height, 32);
      case 'cone':
        return new THREE.ConeGeometry(p.radius, p.height, 32);
      case 'frustum':
        return new THREE.CylinderGeometry(p.topRadius, p.bottomRadius, p.height, 32);
      case 'torus':
        return new THREE.TorusGeometry(p.radius, p.tube, 24, 48);
      case 'capsule':
        return new THREE.CapsuleGeometry(p.radius, p.height, 8, 16);
      case 'sphericalCap': {
        const theta = Math.acos(1 - p.capHeight / p.radius);
        return new THREE.SphereGeometry(p.radius, 32, 16, 0, Math.PI * 2, 0, theta);
      }
      case 'hollowCylinder': {
        const shape = new THREE.Shape();
        shape.absarc(0, 0, p.outerRadius, 0, Math.PI * 2, false);
        const hole = new THREE.Path();
        hole.absarc(0, 0, p.innerRadius, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape, { depth: p.height, bevelEnabled: false });
      }
      case 'roundedBox':
        return new RoundedBoxGeometry(p.width, p.height, p.depth, 4, p.radius);
      case 'beveledBox':
      case 'chamferedBox': {
        const shape = new THREE.Shape();
        const w = p.width / 2, d = p.depth / 2, b = p.bevel;
        shape.moveTo(-w + b, -d); shape.lineTo(w - b, -d);
        shape.lineTo(w, -d + b); shape.lineTo(w, d - b);
        shape.lineTo(w - b, d); shape.lineTo(-w + b, d);
        shape.lineTo(-w, d - b); shape.lineTo(-w, -d + b);
        shape.closePath();
        return new THREE.ExtrudeGeometry(shape, { depth: p.height, bevelEnabled: false });
      }
      case 'star':
        return new THREE.ExtrudeGeometry(
          starShape(p.points, p.outerRadius, p.innerRadius),
          { depth: p.depth, bevelEnabled: false }
        );
      case 'cross':
        return new THREE.ExtrudeGeometry(crossShape(p.armWidth, p.armLength), {
          depth: p.depth, bevelEnabled: false,
        });
      case 'lshape':
        return new THREE.ExtrudeGeometry(lShape(p.armWidth, p.armLength), {
          depth: p.depth, bevelEnabled: false,
        });
      case 'tshape':
        return new THREE.ExtrudeGeometry(
          tShape(p.stemWidth, p.topWidth, p.height, p.stemHeight),
          { depth: p.depth, bevelEnabled: false }
        );
      default:
        return null;
    }
  } catch {
    return null;
  }
}
        
