'use client';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import type { GeometryCatalogItem } from '@/lib/geometry/types';

export function ParameterEditor({ item }: { item: GeometryCatalogItem }) {
  const params = useGeometryStore((s) => s.params);
  const update = useGeometryStore((s) => s.updateParam);
  const reset = useGeometryStore((s) => s.resetParams);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Parameters</h3>
        <button onClick={reset} className="text-xs text-accent hover:underline">Reset</button>
      </div>
      {item.params.map((p) => (
        <div key={p.key}>
          <label className="flex justify-between text-xs font-medium text-ink-muted mb-1">
            <span>{p.label}</span>
            <span className="font-mono">{params[p.key]?.toFixed(p.step < 1 ? 2 : 0)} {p.unit}</span>
          </label>
          <input type="range" min={p.min} max={p.max} step={p.step}
            value={params[p.key] ?? p.default}
            onChange={(e) => update(p.key, Number(e.target.value))}
            className="w-full accent-accent" />
          <input type="number" min={p.min} max={p.max} step={p.step}
            value={params[p.key] ?? p.default}
            onChange={(e) => { const v = Number(e.target.value); if (!Number.isNaN(v)) update(p.key, v); }}
            className="mt-1 w-full rounded-md border border-border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
        </div>
      ))}
    </div>
  );
}
