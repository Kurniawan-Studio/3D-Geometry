'use client';
import { useEffect, useState } from 'react';
import { getAllConfigs, deleteConfig, type SavedConfig } from '@/lib/db/indexeddb';

export default function SavedPage() {
  const [items, setItems] = useState<SavedConfig[]>([]);
  const load = async () => { try { setItems(await getAllConfigs()); } catch {} };
  useEffect(() => { load(); }, []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-4">Saved Configurations</h1>
      {items.length === 0 ? <p className="text-sm text-ink-muted">No saved configurations.</p> : (
        <ul className="space-y-2">
          {items.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
              <div><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-ink-muted">{c.geometryId}</p></div>
              <button onClick={async () => { await deleteConfig(c.id); load(); }} className="text-xs text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
