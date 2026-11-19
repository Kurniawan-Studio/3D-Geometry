'use client';
import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { createGeometry } from '@/lib/geometry/generators';
import type { GeometryCatalogItem } from '@/lib/geometry/types';

export function CompareViewer({ item }: { item: GeometryCatalogItem }) {
  const geometry = useMemo(() => {
    const p: Record<string, number> = {};
    item.params.forEach((d) => { p[d.key] = d.default; });
    return createGeometry(item, p);
  }, [item]);
  if (!geometry) return null;
  return (
    <div className="h-64 rounded-lg border border-border bg-surface">
      <Canvas camera={{ position: [3, 2, 4], fov: 40 }}>
        <ambientLight intensity={0.7} /><directionalLight position={[3, 5, 3]} intensity={1} />
        <mesh geometry={geometry}><meshStandardMaterial color="#059669" /></mesh>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
