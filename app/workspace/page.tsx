'use client';
// ... import lain tetap
import { saveConfig } from '@/lib/db/indexeddb';
import { saveConfig } from '@/lib/db/indexeddb';
import { useGeometryStore } from '@/lib/store/useGeometryStore'; // kalau belum ada
// di dalam komponen, tambahkan:
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

// di JSX aside, setelah <ParameterEditor .../>:
<button onClick={handleSave} className="mt-4 w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white">
  Save configuration
</button>
