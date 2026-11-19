import type { GeometryCatalogItem, ParamDefinition } from './types';
import {
  regularPolygonArea,
  regularPolygonPerimeter,
  regularPolygonApothem,
  polyhedronMeasures,
} from './math';
import { createGeometry } from './generators';
import { computeMeshSurfaceArea, computeMeshVolume } from './inspector';
import { shapeMetrics, starShape, crossShape, lShape, tShape } from './shapes';
import * as THREE from 'three';

const P = (
  key: string, label: string, def: number,
  min = 0.1, max = 5, step = 0.1, unit = 'u'
): ParamDefinition => ({ key, label, default: def, min, max, step, unit });

const I = (
  key: string, label: string, def: number,
  min = 3, max = 16, step = 1, unit = ''
): ParamDefinition => ({ key, label, default: def, min, max, step, unit, integer: true });

const side = (n: number): ParamDefinition => ({
  key: 'sides', label: 'Sides', default: n, min: n, max: n, step: 1, unit: '', integer: true,
});

const meshFallback = (item: GeometryCatalogItem, p: Record<string, number>) => {
  const g = createGeometry(item, p);
  if (!g) return [{ label: 'Volume', value: 'N/A' }, { label: 'Surface area', value: 'N/A' }];
  return [
    { label: 'Volume', value: computeMeshVolume(g), unit: 'u³' },
    { label: 'Surface area', value: computeMeshSurfaceArea(g), unit: 'u²' },
  ];
};

const platonicItems: GeometryCatalogItem[] = [
  ['tetrahedron', 'Tetrahedron', 4, 6, 4],
  ['cube', 'Cube', 8, 12, 6],
  ['octahedron', 'Octahedron', 6, 12, 8],
  ['dodecahedron', 'Dodecahedron', 20, 30, 12],
  ['icosahedron', 'Icosahedron', 12, 30, 20],
].map(([type, name, v, e, f]) => ({
  id: type as string,
  name: name as string,
  category: 'polyhedra' as const,
  description: `Regular ${name}.`,
  geometryType: type as string,
  params: [P('edge', 'Edge length', 1.5)],
  educational: 'Platonic solid with congruent regular faces.',
  vertexCount: v as number,
  edgeCount: e as number,
  faceCount: f as number,
  calculate: (p: Record<string, number>) => {
    const m = polyhedronMeasures(type as string, p.edge);
    return [
      { label: 'Volume', value: m.volume, unit: 'u³', formula: 'V = f(edge)' },
      { label: 'Surface area', value: m.surface, unit: 'u²', formula: 'A = f(edge)' },
    ];
  },
}));

const archimedeanItems: GeometryCatalogItem[] = [
  {
    id: 'truncated-cube',
    name: 'Truncated Cube',
    category: 'polyhedra',
    description: 'Cube with corners truncated; 6 octagons + 8 triangles.',
    geometryType: 'truncatedCube',
    params: [P('size', 'Bounding radius', 1.5)],
    educational: 'Archimedean solid. V=24, E=36, F=14. Vertex configuration 3.8.8.',
    vertexCount: 24, edgeCount: 36, faceCount: 14,
    calculate: (p) => meshFallback({ geometryType: 'truncatedCube' } as GeometryCatalogItem, p),
  },
  {
    id: 'cuboctahedron',
    name: 'Cuboctahedron',
    category: 'polyhedra',
    description: 'Rectified cube; 8 triangles + 6 squares.',
    geometryType: 'cuboctahedron',
    params: [P('size', 'Bounding radius', 1.5)],
    educational: 'Archimedean solid. V=12, E=24, F=14. Vertex configuration 3.4.3.4.',
    vertexCount: 12, edgeCount: 24, faceCount: 14,
    calculate: (p) => meshFallback({ geometryType: 'cuboctahedron' } as GeometryCatalogItem, p),
  },
  {
    id: 'truncated-tetrahedron',
    name: 'Truncated Tetrahedron',
    category: 'polyhedra',
    description: 'Tetrahedron with corners truncated; 4 triangles + 4 hexagons.',
    geometryType: 'truncatedTetrahedron',
    params: [P('size', 'Bounding radius', 1.5)],
    educational: 'Archimedean solid. V=12, E=18, F=8. Vertex configuration 3.6.6.',
    vertexCount: 12, edgeCount: 18, faceCount: 8,
    calculate: (p) => meshFallback({ geometryType: 'truncatedTetrahedron' } as GeometryCatalogItem, p),
  },
  {
    id: 'truncated-octahedron',
    name: 'Truncated Octahedron',
    category: 'polyhedra',
    description: 'Octahedron with corners truncated; 6 squares + 8 hexagons.',
    geometryType: 'truncatedOctahedron',
    params: [P('size', 'Bounding radius', 1.5)],
    educational: 'Archimedean solid. V=24, E=36, F=14. Vertex configuration 4.6.6.',
    vertexCount: 24, edgeCount: 36, faceCount: 14,
    calculate: (p) => meshFallback({ geometryType: 'truncatedOctahedron' } as GeometryCatalogItem, p),
  },
];

const polyItems: GeometryCatalogItem[] = [...platonicItems, ...archimedeanItems];

const prismItems: GeometryCatalogItem[] = [3, 4, 5, 6, 8, 10, 12, 14, 16].map((n) => ({
  id: `prism-${n}`,
  name: `${n}-gonal Prism`,
  category: 'prism' as const,
  description: `Regular ${n}-sided prism.`,
  geometryType: 'prism',
  params: [P('radius', 'Circumradius', 1.2), P('height', 'Height', 2), side(n)],
  educational: 'Prism volume = base area × height.',
  vertexCount: 2 * n,
  edgeCount: 3 * n,
  faceCount: n + 2,
  calculate: (p: Record<string, number>) => {
    const a = regularPolygonArea(n, p.radius);
    const per = regularPolygonPerimeter(n, p.radius);
    return [
      { label: 'Volume', value: a * p.height, unit: 'u³', formula: 'V = A_base × h' },
      { label: 'Surface area', value: 2 * a + per * p.height, unit: 'u²', formula: 'A = 2A_base + P·h' },
      { label: 'Base area', value: a, unit: 'u²' },
    ];
  },
}));

const pyramidItems: GeometryCatalogItem[] = [3, 4, 5, 6, 8, 10, 12, 14, 16].map((n) => ({
  id: `pyramid-${n}`,
  name: `${n}-gonal Pyramid`,
  category: 'pyramid' as const,
  description: `Regular ${n}-sided pyramid.`,
  geometryType: 'pyramid',
  params: [P('radius', 'Circumradius', 1.2), P('height', 'Height', 2), side(n)],
  educational: 'Pyramid volume = 1/3 × base area × height.',
  vertexCount: n + 1,
  edgeCount: 2 * n,
  faceCount: n + 1,
  calculate: (p: Record<string, number>) => {
    const a = regularPolygonArea(n, p.radius);
    const per = regularPolygonPerimeter(n, p.radius);
    const ap = regularPolygonApothem(n, p.radius);
    const slant = Math.sqrt(p.height ** 2 + ap ** 2);
    return [
      { label: 'Volume', value: (a * p.height) / 3, unit: 'u³', formula: 'V = ⅓A_base·h' },
      { label: 'Surface area', value: a + 0.5 * per * slant, unit: 'u²', formula: 'A = A_base + ½P·l' },
      { label: 'Slant height', value: slant, unit: 'u' },
    ];
  },
}));

const curvedItems: GeometryCatalogItem[] = [
  { id: 'sphere', name: 'Sphere', geometryType: 'sphere', params: [P('radius', 'Radius', 1.2)] },
  { id: 'hemisphere', name: 'Hemisphere', geometryType: 'hemisphere', params: [P('radius', 'Radius', 1.2)] },
  { id: 'ellipsoid', name: 'Ellipsoid', geometryType: 'ellipsoid', params: [P('a', 'Semi-axis a', 1.5), P('b', 'Semi-axis b', 1), P('c', 'Semi-axis c', 1)] },
  { id: 'cylinder', name: 'Cylinder', geometryType: 'cylinder', params: [P('radius', 'Radius', 1), P('height', 'Height', 2)] },
  { id: 'cone', name: 'Cone', geometryType: 'cone', params: [P('radius', 'Radius', 1), P('height', 'Height', 2)] },
  { id: 'frustum', name: 'Frustum', geometryType: 'frustum', params: [P('topRadius', 'Top radius', 0.6), P('bottomRadius', 'Bottom radius', 1.2), P('height', 'Height', 2)] },
  { id: 'torus', name: 'Torus', geometryType: 'torus', params: [P('radius', 'Major radius', 1.5), P('tube', 'Tube radius', 0.4)] },
  { id: 'capsule', name: 'Capsule', geometryType: 'capsule', params: [P('radius', 'Radius', 0.6), P('height', 'Cylinder height', 1.5)] },
  { id: 'spherical-cap', name: 'Spherical Cap', geometryType: 'sphericalCap', params: [P('radius', 'Sphere radius', 1.5), P('capHeight', 'Cap height', 0.8)] },
  { id: 'hollow-cylinder', name: 'Hollow Cylinder', geometryType: 'hollowCylinder', params: [P('outerRadius', 'Outer radius', 1.2), P('innerRadius', 'Inner radius', 0.7), P('height', 'Height', 2)] },
].map((c) => ({
  id: c.id,
  name: c.name,
  category: 'curved' as const,
  description: `${c.name} solid.`,
  geometryType: c.geometryType,
  params: c.params,
  educational: 'Curved solid with smooth surface.',
  calculate: (p: Record<string, number>) => {
    switch (c.geometryType) {
      case 'sphere':
        return [
          { label: 'Volume', value: (4 / 3) * Math.PI * p.radius ** 3, unit: 'u³', formula: 'V = 4/3 πr³' },
          { label: 'Surface area', value: 4 * Math.PI * p.radius ** 2, unit: 'u²', formula: 'A = 4πr²' },
          { label: 'Diameter', value: 2 * p.radius, unit: 'u' },
        ];
      case 'hemisphere':
        return [
          { label: 'Volume', value: (2 / 3) * Math.PI * p.radius ** 3, unit: 'u³' },
          { label: 'Surface area', value: 3 * Math.PI * p.radius ** 2, unit: 'u²' },
        ];
      case 'ellipsoid': {
        const { a, b, c: cc } = p;
        const k = 1.6075;
        const s = 4 * Math.PI * (((a ** k) * (b ** k) + (a ** k) * (cc ** k) + (b ** k) * (cc ** k)) / 3) ** (1 / k);
        return [
          { label: 'Volume', value: (4 / 3) * Math.PI * a * b * cc, unit: 'u³' },
          { label: 'Surface area', value: s, unit: 'u²', formula: 'Knud Thomsen approximation' },
        ];
      }
      case 'cylinder':
        return [
          { label: 'Volume', value: Math.PI * p.radius ** 2 * p.height, unit: 'u³' },
          { label: 'Surface area', value: 2 * Math.PI * p.radius * (p.radius + p.height), unit: 'u²' },
        ];
      case 'cone':
        return [
          { label: 'Volume', value: (Math.PI * p.radius ** 2 * p.height) / 3, unit: 'u³' },
          { label: 'Surface area', value: Math.PI * p.radius * (p.radius + Math.sqrt(p.radius ** 2 + p.height ** 2)), unit: 'u²' },
        ];
      case 'frustum': {
        const { topRadius: r, bottomRadius: R, height: h } = p;
        const l = Math.sqrt((R - r) ** 2 + h ** 2);
        return [
          { label: 'Volume', value: (Math.PI * h / 3) * (R ** 2 + R * r + r ** 2), unit: 'u³' },
          { label: 'Surface area', value: Math.PI * (R ** 2 + r ** 2 + (R + r) * l), unit: 'u²' },
        ];
      }
      case 'torus':
        return [
          { label: 'Volume', value: 2 * Math.PI ** 2 * p.radius * p.tube ** 2, unit: 'u³' },
          { label: 'Surface area', value: 4 * Math.PI ** 2 * p.radius * p.tube, unit: 'u²' },
        ];
      case 'capsule':
        return [
          { label: 'Volume', value: Math.PI * p.radius ** 2 * p.height + (4 / 3) * Math.PI * p.radius ** 3, unit: 'u³' },
          { label: 'Surface area', value: 2 * Math.PI * p.radius * p.height + 4 * Math.PI * p.radius ** 2, unit: 'u²' },
        ];
      case 'sphericalCap': {
        const { radius: R, capHeight: h } = p;
        const a = Math.sqrt(h * (2 * R - h));
        return [
          { label: 'Volume', value: (Math.PI * h ** 2 / 3) * (3 * R - h), unit: 'u³' },
          { label: 'Surface area', value: 2 * Math.PI * R * h + Math.PI * a ** 2, unit: 'u²' },
        ];
      }
      case 'hollowCylinder': {
        const { outerRadius: R, innerRadius: r, height: h } = p;
        return [
          { label: 'Volume', value: Math.PI * h * (R ** 2 - r ** 2), unit: 'u³' },
          { label: 'Surface area', value: 2 * Math.PI * h * (R + r) + 2 * Math.PI * (R ** 2 - r ** 2), unit: 'u²' },
        ];
      }
      default:
        return [];
    }
  },
}));

const extrudedItems: GeometryCatalogItem[] = [
  { id: 'star-5', name: '5-Point Star', type: 'star', params: [I('points', 'Points', 5, 3, 12), P('outerRadius', 'Outer radius', 1.4), P('innerRadius', 'Inner radius', 0.6), P('depth', 'Depth', 0.8)] },
  { id: 'star-6', name: '6-Point Star', type: 'star', params: [I('points', 'Points', 6, 3, 12), P('outerRadius', 'Outer radius', 1.4), P('innerRadius', 'Inner radius', 0.7), P('depth', 'Depth', 0.8)] },
  { id: 'cross', name: 'Cross', type: 'cross', params: [P('armWidth', 'Arm width', 0.5), P('armLength', 'Arm length', 2.4), P('depth', 'Depth', 0.8)] },
  { id: 'l-shape', name: 'L-Shape', type: 'lshape', params: [P('armWidth', 'Arm width', 0.6), P('armLength', 'Arm length', 2), P('depth', 'Depth', 0.8)] },
  { id: 't-shape', name: 'T-Shape', type: 'tshape', params: [P('stemWidth', 'Stem width', 0.6), P('topWidth', 'Top width', 2), P('height', 'Height', 1.8), P('stemHeight', 'Stem height', 1), P('depth', 'Depth', 0.8)] },
].map((e) => ({
  id: e.id,
  name: e.name,
  category: 'extruded' as const,
  description: `Extruded ${e.name.toLowerCase()}.`,
  geometryType: e.type,
  params: e.params,
  educational: 'Volume = cross-section area × extrusion depth.',
  calculate: (p: Record<string, number>) => {
    let shape: THREE.Shape;
    switch (e.type) {
      case 'star': shape = starShape(p.points, p.outerRadius, p.innerRadius); break;
      case 'cross': shape = crossShape(p.armWidth, p.armLength); break;
      case 'lshape': shape = lShape(p.armWidth, p.armLength); break;
      case 'tshape': shape = tShape(p.stemWidth, p.topWidth, p.height, p.stemHeight); break;
      default: return [];
    }
    const m = shapeMetrics(shape);
    return [
      { label: 'Volume', value: m.area * p.depth, unit: 'u³', formula: 'V = A × d' },
      { label: 'Surface area', value: 2 * m.area + m.perimeter * p.depth, unit: 'u²' },
      { label: 'Cross-section area', value: m.area, unit: 'u²' },
    ];
  },
}));

const modifiedItems: GeometryCatalogItem[] = [
  { id: 'rounded-box', name: 'Rounded Box', type: 'roundedBox', params: [P('width', 'Width', 1.5), P('height', 'Height', 1.5), P('depth', 'Depth', 1.5), P('radius', 'Corner radius', 0.2, 0.01, 0.7)] },
  { id: 'beveled-box', name: 'Beveled Box', type: 'beveledBox', params: [P('width', 'Width', 1.5), P('height', 'Height', 1.5), P('depth', 'Depth', 1.5), P('bevel', 'Bevel', 0.15, 0.01, 0.5)] },
  { id: 'chamfered-box', name: 'Chamfered Box', type: 'chamferedBox', params: [P('width', 'Width', 1.5), P('height', 'Height', 1.5), P('depth', 'Depth', 1.5), P('bevel', 'Chamfer', 0.15, 0.01, 0.5)] },
].map((m) => ({
  id: m.id,
  name: m.name,
  category: 'modified' as const,
  description: `${m.name} with modified edges.`,
  geometryType: m.type,
  params: m.params,
  educational: 'Modified solid; measurements computed from mesh.',
  calculate: (p: Record<string, number>) =>
    meshFallback({ geometryType: m.type } as GeometryCatalogItem, p),
}));

export const catalog: GeometryCatalogItem[] = [
  ...polyItems,
  ...prismItems,
  ...pyramidItems,
  ...curvedItems,
  ...extrudedItems,
  ...modifiedItems,
];
