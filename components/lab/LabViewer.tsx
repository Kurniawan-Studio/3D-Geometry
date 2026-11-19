'use client';
import { useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function LabViewer({ points, depth }: { points: { x: number; y: number }[]; depth: number }) {
  const geometry = useMemo(() => {
    try {
      const shape = new THREE.Shape(points.map((p) => new THREE.Vector2(p.x, p.y)));
      return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    } catch { return null; }
  }, [points, depth]);

  return (
    <Canvas camera={{ position: [4, 3, 5], fov: 50 }}>
      <color attach="background" args={['#f9fafb']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />
      <gridHelper args={[20, 20]} />
      {geometry && <mesh geometry={geometry}><meshStandardMaterial color="#059669" roughness={0.5} /></mesh>}
      <OrbitControls makeDefault />
    </Canvas>
  );
}
