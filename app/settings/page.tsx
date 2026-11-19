'use client';
import { useViewerStore } from '@/lib/store/useViewerStore';

export default function SettingsPage() {
  const { quality, setQuality, showGrid, toggleGrid } = useViewerStore();
  return (
    <div className="p-4 md:p-6 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-ink-muted">Render quality</label>
          <select value={quality} onChange={(e) => setQuality(e.target.value as any)} className="mt-1 w-full rounded border border-border p-2 text-sm">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
        </div>
        <button onClick={toggleGrid} className="rounded-md border border-border px-4 py-2 text-sm">{showGrid ? 'Hide grid' : 'Show grid'}</button>
      </div>
    </div>
  );
}
