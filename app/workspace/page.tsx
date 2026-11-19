'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { saveConfig } from '@/lib/db/indexeddb';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
// 👇 Sesuaikan 3 import di bawah ini sama nama file asli di folder lib/ & components/ lu
import { GEOMETRIES } from '@/lib/geometry/registry';
import ParameterEditor from '@/components/workspace/ParameterEditor';
import WorkspaceViewer from '@/components/workspace/WorkspaceViewer';

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || searchParams.get('geometry');
  const item = GEOMETRIES.find((g) => g.id === id) ?? GEOMETRIES[0];

  const handleSave = async () => {
    if (!item) return;
    const name = prompt('Name for this configuration:', item.name);
    if (!name) return;
    await saveConfig({
      id: crypto.randomUUID(),
      name,
      geometryId: item.id,
      params: useGeometryStore.getState().params,
      createdAt: Date.now(),
    });
    alert('Saved!');
  };

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <main className="relative flex-1">
        <WorkspaceViewer item={item} />
      </main>
      <aside className="w-full border-t border-neutral-800 p-4 lg:w-80 lg:border-l lg:border-t-0">
        <h2 className="mb-4 text-lg font-semibold">{item?.name}</h2>
        <ParameterEditor item={item} />
        <button
          onClick={handleSave}
          className="mt-4 w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          Save configuration
        </button>
      </aside>
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div className="p-4">Loading workspace...</div>}>
      <WorkspaceContent />
    </Suspense>
  );
}
