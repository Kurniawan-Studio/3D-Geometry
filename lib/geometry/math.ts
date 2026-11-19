export const regularPolygonArea = (n: number, r: number) =>
  (n / 2) * r * r * Math.sin((2 * Math.PI) / n);

export const regularPolygonPerimeter = (n: number, r: number) =>
  2 * n * r * Math.sin(Math.PI / n);

export const regularPolygonApothem = (n: number, r: number) =>
  r * Math.cos(Math.PI / n);

export const edgeToCircumradius = (type: string, a: number): number => {
  switch (type) {
    case 'tetrahedron': return (a * Math.sqrt(6)) / 4;
    case 'octahedron': return (a * Math.SQRT2) / 2;
    case 'dodecahedron': return (a * Math.sqrt(3) / 4) * (1 + Math.sqrt(5));
    case 'icosahedron': return (a / 4) * Math.sqrt(10 + 2 * Math.sqrt(5));
    default: return a;
  }
};

export const polyhedronMeasures = (type: string, a: number) => {
  const sq3 = Math.sqrt(3), sq5 = Math.sqrt(5), sq2 = Math.SQRT2;
  switch (type) {
    case 'tetrahedron':
      return { volume: (a ** 3) / (6 * sq2), surface: sq3 * a * a };
    case 'cube':
      return { volume: a ** 3, surface: 6 * a * a };
    case 'octahedron':
      return { volume: (sq2 / 3) * a ** 3, surface: 2 * sq3 * a * a };
    case 'dodecahedron':
      return {
        volume: ((15 + 7 * sq5) / 4) * a ** 3,
        surface: 3 * Math.sqrt(25 + 10 * sq5) * a * a,
      };
    case 'icosahedron':
      return {
        volume: (5 * (3 + sq5) / 12) * a ** 3,
        surface: 5 * sq3 * a * a,
      };
    default:
      return { volume: 0, surface: 0 };
  }
};
