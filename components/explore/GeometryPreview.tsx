'use client';
import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { createGeometry } from '@/lib/geometry/generators';
import type { GeometryCatalogItem } from '@/lib/geometry/types';

export function GeometryPreview({ item }: { item: GeometryCatalogItem }) {
  const geometry = useMemo(() => {
    const p: Record<string, number> = {};
    item.params.forEach((d) => { p[d.key] = d.default; });
    return createGeometry(item, p);
  }, [item]);
  
  if (!geometry) return null;
  
  return (
    // frameloop="demand" mencegah render berlebihan yang bikin WebGL crash di HP
    <Canvas camera={{ position: [3, 2, 4], fov: 40 }} dpr={[1, 1]} frameloop="demand">
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={1} />
      <Center>
        <mesh geometry={geometry}>
          <meshStandardMaterial color="#059669" roughness={0.5} />
        </mesh>
      </Center>
    </Canvas>
  );
}
