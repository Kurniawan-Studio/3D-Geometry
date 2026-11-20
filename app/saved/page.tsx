'use client';
import { useEffect, useState } from 'react';
import { getAllConfigs, deleteConfig, saveConfig, savedConfigSchema, type SavedConfig } from '@/lib/db/indexeddb';

export default function SavedPage() {
  const [items, setItems] = useState<SavedConfig[]>([]);
  
  const load = async () => { 
    try { 
      setItems(await getAllConfigs()); 
    } catch (err) {
      console.error(err);
    } 
  };
  
  useEffect(() => { load(); }, []);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'geometry-configs.json';
    a.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const arr = Array.isArray(data) ? data : [data];
      for (const c of arr) {
        const parsed = savedConfigSchema.safeParse(c);
        if (!parsed.success) throw new Error('Invalid config format');
        await saveConfig({ ...parsed.data, id: crypto.randomUUID() });
      }
      load();
    } catch (err) {
      alert('Import failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-4">Saved Configurations</h1>
      
      <div className="mb-4 flex gap-2">
        <button onClick={handleExport} className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-surface-secondary transition-colors">
          Export JSON
        </button>
        <label className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-xs hover:bg-surface-secondary transition-colors">
          Import JSON
          <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
        </label>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-ink-muted">No saved configurations.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-ink-muted">{c.geometryId}</p>
              </div>
              <button 
                onClick={async () => { await deleteConfig(c.id); load(); }} 
                className="text-xs text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
