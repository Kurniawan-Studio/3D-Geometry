'use client';
import { useState } from 'react';
import Link from 'next/link';
import { catalog } from '@/lib/geometry/catalog';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import { cn } from '@/lib/utils';

const cats = ['all', 'polyhedra', 'prism', 'pyramid', 'curved', 'extruded', 'modified'] as const;

export default function ExplorePage() {
  const [filter, setFilter] = useState<string>('all');
  const select = useGeometryStore((s) => s.select);
  const selectedId = useGeometryStore((s) => s.selectedId);
  
  const items = filter === 'all' ? catalog : catalog.filter((c) => c.category === filter);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink">Geometry Library</h1>
          <p className="text-sm text-ink-muted mt-1">{catalog.length} configurations available</p>
        </div>
        <Link href="/workspace" className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark transition-colors w-full md:w-auto">
          Buka Workspace &rarr;
        </Link>
      </header>

      {/* Filter Kategori */}
      <div className="mb-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button 
            key={c} 
            onClick={() => setFilter(c)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors', 
              filter === c 
                ? 'border-accent bg-accent-light text-accent-dark' 
                : 'border-border bg-surface text-ink-muted hover:border-accent/50'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid Katalog (Hanya Teks) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <button 
            key={item.id} 
            onClick={() => select(item.id)}
            className={cn(
              'flex flex-col justify-between h-full rounded-lg border p-4 text-left transition-all', 
              selectedId === item.id 
                ? 'border-accent bg-accent-light/20 shadow-sm' 
                : 'border-border bg-surface hover:border-accent/50 hover:shadow-sm'
            )}
          >
            <div>
              <span className="inline-block rounded-full bg-surface-secondary border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted mb-2">
                {item.category}
              </span>
              <h2 className="text-sm font-semibold text-ink">{item.name}</h2>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs font-medium text-accent">
              <span>{selectedId === item.id ? 'Selected' : 'Pilih Objek'}</span>
              <span>&rarr;</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
