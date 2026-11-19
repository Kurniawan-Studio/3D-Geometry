'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import { catalog } from '@/lib/geometry/catalog';
import { Inspector } from '@/components/inspector/Inspector';
import { ParameterEditor } from '@/components/inspector/ParameterEditor';
import { Toolbar } from '@/components/viewer/Toolbar';
import { Loader } from '@/components/ui/Loader';

const Scene = dynamic(() => import('@/components/viewer/Scene').then((m) => m.Scene), {
  ssr: false,
  loading: () => <Loader />,
});

export default function WorkspacePage() {
  const selectedId = useGeometryStore((s) => s.selectedId);
  const select = useGeometryStore((s) => s.select);

  useEffect(() => { if (!selectedId) select('cube'); }, [selectedId, select]);
  const item = catalog.find((c) => c.id === selectedId);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:h-screen md:flex-row">
      <div className="relative flex-1">
        <Scene />
        <Toolbar />
      </div>
      <aside className="w-full overflow-y-auto border-t border-border bg-surface p-4 md:w-96 md:border-l md:border-t-0">
        {item ? <><Inspector item={item} /><ParameterEditor item={item} /></> : <p className="text-sm text-ink-muted">Select a geometry.</p>}
      </aside>
    </div>
  );
}
