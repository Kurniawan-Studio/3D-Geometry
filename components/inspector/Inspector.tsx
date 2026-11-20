'use client';
import { useMemo } from 'react';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import { createGeometry } from '@/lib/geometry/generators';
import { getMeshStats } from '@/lib/geometry/inspector';
import type { GeometryCatalogItem } from '@/lib/geometry/types';

export function Inspector({ item }: { item: GeometryCatalogItem }) {
  const params = useGeometryStore((s) => s.params);
  const geometry = useMemo(() => createGeometry(item, params), [item, params]);
  const stats = useMemo(() => (geometry ? getMeshStats(geometry) : null), [geometry]);
  const calcs = useMemo(() => item.calculate(params), [item, params]);

  const v = typeof item.vertexCount === 'function' ? item.vertexCount(params) : item.vertexCount ?? stats?.vertexCount ?? '—';
  const e = typeof item.edgeCount === 'function' ? item.edgeCount(params) : item.edgeCount ?? stats?.edgeCount ?? '—';
  const f = typeof item.faceCount === 'function' ? item.faceCount(params) : item.faceCount ?? stats?.faceCount ?? '—';

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold">{item.name}</h2>
        <p className="text-xs text-ink-muted mt-1">{item.description}</p>
      </div>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">Topology</h3>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <Stat label="Vertices" value={v} />
          <Stat label="Edges" value={e} />
          <Stat label="Faces" value={f} />
          <Stat label="Euler χ" value={typeof v === 'number' && typeof e === 'number' && typeof f === 'number' ? v - e + f : 'N/A'} />
        </dl>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">Measurements</h3>
        <dl className="space-y-1 text-sm">
          {calcs.map((c) => (
            <div key={c.label} className="flex justify-between gap-2">
              <dt className="text-ink-muted">{c.label}</dt>
              <dd className="font-mono text-right">{typeof c.value === 'number' ? c.value.toFixed(4) : c.value} {c.unit ?? ''}</dd>
            </div>
          ))}
        </dl>
      </section>
      {stats && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-2">Bounding dimensions</h3>
          <p className="font-mono text-xs text-ink-muted">
            {stats.dimensions.x.toFixed(3)} × {stats.dimensions.y.toFixed(3)} × {stats.dimensions.z.toFixed(3)} u
          </p>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border p-2">
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="font-mono text-sm">{value}</dd>
    </div>
  );
}
