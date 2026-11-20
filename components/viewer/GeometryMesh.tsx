'use client';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { createGeometry } from '@/lib/geometry/generators';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import type { GeometryCatalogItem } from '@/lib/geometry/types';

export function GeometryMesh({ item, mode }: { item: GeometryCatalogItem; mode: string }) {
  const params = useGeometryStore((s) => s.params);
  const geometry = useMemo(() => createGeometry(item, params), [item, params]);

  useEffect(() => () => { geometry?.dispose(); }, [geometry]);
  if (!geometry) return null;

  const wireframe = mode === 'wireframe';
  const showEdges = mode === 'edges' || mode === 'vertices';
  const showVertices = mode === 'vertices';

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#059669" metalness={0.1} roughness={0.5}
          wireframe={wireframe} flatShading={false} side={THREE.DoubleSide}
        />
      </mesh>
      {showEdges && (
        <lineSegments geometry={new THREE.EdgesGeometry(geometry)}>
          <lineBasicMaterial color="#111827" />
        </lineSegments>
      )}
      {showVertices && (
        <points geometry={geometry}>
          <pointsMaterial color="#ef4444" size={0.08} sizeAttenuation />
        </points>
      )}
    </group>
  );
}
