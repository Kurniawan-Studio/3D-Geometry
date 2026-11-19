'use client';
import { useState } from 'react';
import Link from 'next/link';
import { catalog } from '@/lib/geometry/catalog';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import { GeometryPreview } from '@/components/explore/GeometryPreview';
import { cn } from '@/lib/utils';

const cats = ['all', 'polyhedra', 'prism', 'pyramid', 'curved', 'extruded', 'modified'] as const;

export default function ExplorePage() {
  const [filter, setFilter] = useState<string>('all');
  const select = useGeometryStore((s) => s.select);
  const selectedId = useGeometryStore((s) => s.selectedId);
  const items = filter === 'all' ? catalog : catalog.filter((c) => c.category === filter);

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-xl font-semibold">Geometry Library</h1>
        <p className="text-sm text-ink-muted">{catalog.length} configurations</p>
      </header>
      <div className="mb-4 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={cn('rounded-md border px-3 py-1 text-xs font-medium capitalize', filter === c ? 'border-accent bg-accent-light text-accent-dark' : 'border-border text-ink-muted')}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <button key={item.id} onClick={() => select(item.id)}
            className={cn('rounded-lg border p-3 text-left transition-colors', selectedId === item.id ? 'border-accent bg-accent-light/30' : 'border-border bg-surface hover:border-accent/50')}>
            <div className="mb-2 h-32 w-full"><GeometryPreview item={item} /></div>
            <h2 className="text-sm font-semibold">{item.name}</h2>
            <p className="text-xs text-ink-muted capitalize">{item.category}</p>
          </button>
        ))}
      </div>
      <Link href="/workspace" className="mt-6 inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-white">Open Workspace</Link>
    </div>
  );
}
