import { create } from 'zustand';
import { catalog } from '@/lib/geometry/catalog';

interface GeometryState {
  selectedId: string | null;
  params: Record<string, number>;
  select: (id: string) => void;
  updateParam: (key: string, value: number) => void;
  resetParams: () => void;
}

export const useGeometryStore = create<GeometryState>((set, get) => ({
  selectedId: null,
  params: {},
  select: (id) => {
    const item = catalog.find((c) => c.id === id);
    if (!item) return;
    const defaults: Record<string, number> = {};
    item.params.forEach((p) => { defaults[p.key] = p.default; });
    set({ selectedId: id, params: defaults });
  },
  updateParam: (key, value) => {
    const item = catalog.find((c) => c.id === get().selectedId);
    if (!item) return;
    const def = item.params.find((p) => p.key === key);
    if (!def) return;
    const clamped = Math.min(def.max, Math.max(def.min, value));
    set((s) => ({ params: { ...s.params, [key]: clamped } }));
  },
  resetParams: () => {
    const item = catalog.find((c) => c.id === get().selectedId);
    if (!item) return;
    const defaults: Record<string, number> = {};
    item.params.forEach((p) => { defaults[p.key] = p.default; });
    set({ params: defaults });
  },
}));
