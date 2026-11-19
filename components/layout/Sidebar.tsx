'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/workspace', label: 'Workspace' },
  { href: '/lab', label: 'Lab' },
  { href: '/compare', label: 'Compare' },
  { href: '/learn', label: 'Learn' },
  { href: '/saved', label: 'Saved' },
  { href: '/settings', label: 'Settings' },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-surface p-3 md:block">
      <div className="mb-6 px-2 py-3">
        <h1 className="text-sm font-semibold">Geometry Explorer</h1>
      </div>
      <nav className="space-y-1">
        {links.map((l) => (
          <Link key={l.href} href={l.href}
            className={cn('block rounded-md px-3 py-2 text-sm', path === l.href ? 'bg-accent-light text-accent-dark font-medium' : 'text-ink-muted hover:bg-surface-secondary')}>
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
