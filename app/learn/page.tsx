const lessons = [
  { title: 'Vertices, Edges, Faces', body: 'Vertex = corner. Edge = segment where two faces meet. Face = flat polygonal surface. Euler: V − E + F = 2 for convex polyhedra.' },
  { title: 'Five Platonic Solids', body: 'Tetrahedron (4 triangular faces), cube (6 squares), octahedron (8 triangles), dodecahedron (12 pentagons), icosahedron (20 triangles).' },
  { title: 'Sphere Formulas', body: 'Surface area A = 4πr². Volume V = (4/3)πr³.' },
  { title: 'Cylinder Formulas', body: 'Volume V = πr²h. Total surface area A = 2πr(r + h).' },
  { title: 'Cone Formulas', body: 'Volume V = (1/3)πr²h. Surface area A = πr(r + √(r² + h²)).' },
];

export default function LearnPage() {
  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <h1 className="text-xl font-semibold mb-4">Interactive Learning</h1>
      <div className="space-y-4">
        {lessons.map((l) => (
          <article key={l.title} className="rounded-lg border border-border bg-surface p-4">
            <h2 className="text-base font-semibold mb-1">{l.title}</h2>
            <p className="text-sm text-ink-muted leading-relaxed">{l.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
