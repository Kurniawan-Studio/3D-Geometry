import Link from 'next/link';
import { catalog } from '@/lib/geometry/catalog';

export default function HomePage() {
  return (
    <div className="p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Geometry Explorer</h1>
        <p className="text-sm text-ink-muted mt-1">Interactive 3D geometry laboratory and inspection tool.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/explore" className="rounded-lg border border-border bg-surface p-4 hover:border-accent/50">
          <h2 className="text-sm font-semibold">Explore library</h2>
          <p className="text-xs text-ink-muted mt-1">{catalog.length} configurations.</p>
        </Link>
        <Link href="/workspace" className="rounded-lg border border-border bg-surface p-4 hover:border-accent/50">
          <h2 className="text-sm font-semibold">Open workspace</h2>
          <p className="text-xs text-ink-muted mt-1">Inspect and manipulate 3D objects.</p>
        </Link>
        <Link href="/lab" className="rounded-lg border border-border bg-surface p-4 hover:border-accent/50">
          <h2 className="text-sm font-semibold">Custom lab</h2>
          <p className="text-xs text-ink-muted mt-1">Build and validate extruded geometry.</p>
        </Link>
      </div>
    </div>
  );
}
