'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { catalog } from '@/lib/geometry/catalog';
import { Loader } from '@/components/ui/Loader';

const CompareViewer = dynamic(() => import('@/components/compare/CompareViewer').then((m) => m.CompareViewer), { ssr: false, loading: () => <Loader /> });

export default function ComparePage() {
  const [a, setA] = useState('cube'); const [b, setB] = useState('sphere');
  const itemA = catalog.find((c) => c.id === a)!; const itemB = catalog.find((c) => c.id === b)!;

  const rows = (() => {
    const pa = Object.fromEntries(itemA.params.map((p) => [p.key, p.default]));
    const pb = Object.fromEntries(itemB.params.map((p) => [p.key, p.default]));
    const ca = itemA.calculate(pa); const cb = itemB.calculate(pb);
    const labels = Array.from(new Set([...ca.map((c) => c.label), ...cb.map((c) => c.label)]));
    return labels.map((l) => ({
      label: l,
      a: ca.find((c) => c.label === l)?.value ?? 'N/A',
      b: cb.find((c) => c.label === l)?.value ?? 'N/A',
    }));
  })();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-4">Compare Objects</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        <select value={a} onChange={(e) => setA(e.target.value)} className="rounded border border-border p-2 text-sm">
          {catalog.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={b} onChange={(e) => setB(e.target.value)} className="rounded border border-border p-2 text-sm">
          {catalog.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2"><CompareViewer item={itemA} /><CompareViewer item={itemB} /></div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-ink-muted"><th className="py-2">Property</th><th>{itemA.name}</th><th>{itemB.name}</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border">
                <td className="py-2 text-ink-muted">{r.label}</td>
                <td className="py-2 font-mono">{typeof r.a === 'number' ? r.a.toFixed(3) : r.a}</td>
                <td className="py-2 font-mono">{typeof r.b === 'number' ? r.b.toFixed(3) : r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
