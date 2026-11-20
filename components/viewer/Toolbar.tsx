'use client';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { cn } from '@/lib/utils';

export function Toolbar() {
  const { mode, setMode, showGrid, toggleGrid, showAxes, toggleAxes } = useViewerStore();
  const modes = ['solid', 'wireframe', 'edges', 'vertices'] as const;
  return (
    <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1 rounded-lg border border-border bg-surface/90 p-1 shadow-sm backdrop-blur">
      {modes.map((m) => (
        <button key={m} onClick={() => setMode(m)}
          className={cn('rounded-md px-2 py-1 text-xs font-medium capitalize', mode === m ? 'bg-accent text-white' : 'text-ink-muted hover:bg-surface-secondary')}>
          {m}
        </button>
      ))}
      <span className="mx-1 w-px bg-border" />
      <button onClick={toggleGrid} className={cn('rounded-md px-2 py-1 text-xs', showGrid ? 'bg-accent text-white' : 'text-ink-muted')}>Grid</button>
      <button onClick={toggleAxes} className={cn('rounded-md px-2 py-1 text-xs', showAxes ? 'bg-accent text-white' : 'text-ink-muted')}>Axes</button>
    </div>
  );
}
