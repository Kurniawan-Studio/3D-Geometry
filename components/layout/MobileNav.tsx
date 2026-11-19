'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/workspace', label: '3D' },
  { href: '/lab', label: 'Lab' },
  { href: '/saved', label: 'Saved' },
];

export function MobileNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-border bg-surface md:hidden">
      {links.map((l) => (
        <Link key={l.href} href={l.href}
          className={cn('flex-1 py-3 text-center text-xs', path === l.href ? 'text-accent font-semibold' : 'text-ink-muted')}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
