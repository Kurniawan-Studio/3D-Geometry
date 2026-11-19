'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { validatePolygon } from '@/lib/geometry/polygon';
import { Loader } from '@/components/ui/Loader';

const LabViewer = dynamic(() => import('@/components/lab/LabViewer').then((m) => m.LabViewer), { ssr: false, loading: () => <Loader /> });

export default function LabPage() {
  const [points, setPoints] = useState([{ x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }]);
  const [depth, setDepth] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const update = (i: number, axis: 'x' | 'y', v: number) => {
    const next = [...points]; next[i] = { ...next[i], [axis]: v }; setPoints(next);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:h-screen md:flex-row">
      <div className="flex-1"><LabViewer points={points} depth={depth} /></div>
      <aside className="w-full overflow-y-auto border-t border-border bg-surface p-4 md:w-96 md:border-l md:border-t-0">
        <h1 className="text-lg font-semibold mb-4">Custom Geometry Lab</h1>
        <div className="space-y-2">
          {points.map((p, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-xs text-ink-muted w-5">{i + 1}</span>
              <input type="number" step="0.1" value={p.x} onChange={(e) => update(i, 'x', Number(e.target.value))} className="w-full rounded border border-border px-1 py-1 text-sm" />
              <input type="number" step="0.1" value={p.y} onChange={(e) => update(i, 'y', Number(e.target.value))} className="w-full rounded border border-border px-1 py-1 text-sm" />
              <button onClick={() => points.length > 3 && setPoints(points.filter((_, j) => j !== i))} className="text-xs text-red-600">×</button>
            </div>
          ))}
        </div>
        <button onClick={() => setPoints([...points, { x: 0, y: 0 }])} className="mt-2 text-xs text-accent hover:underline">+ Add point</button>
        <div className="mt-4">
          <label className="text-xs font-medium text-ink-muted">Extrusion depth</label>
          <input type="range" min="0.1" max="5" step="0.1" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full accent-accent" />
        </div>
        <button onClick={() => { const r = validatePolygon(points); setError(r.valid ? null : r.error ?? 'Invalid'); }}
          className="mt-4 w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white">Validate polygon</button>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </aside>
    </div>
  );
}
