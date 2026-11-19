'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { GeometryMesh } from './GeometryMesh';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { useGeometryStore } from '@/lib/store/useGeometryStore';
import { catalog } from '@/lib/geometry/catalog';

export function Scene() {
  const { mode, cameraType, showGrid, showAxes, quality } = useViewerStore();
  const selectedId = useGeometryStore((s) => s.selectedId);
  const item = catalog.find((c) => c.id === selectedId);
  const dpr: [number, number] = quality === 'high' ? [1, 2] : quality === 'medium' ? [1, 1.5] : [1, 1];

  return (
    <Canvas camera={{ position: [4, 3, 5], fov: 50 }} orthographic={cameraType === 'orthographic'} dpr={dpr} gl={{ antialias: quality !== 'low' }}>
      <color attach="background" args={['#f9fafb']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      {showGrid && <Grid args={[20, 20]} cellColor="#e5e7eb" sectionColor="#d1d5db" fadeDistance={30} infiniteGrid />}
      {showAxes && <axesHelper args={[2]} />}
      {item && <GeometryMesh item={item} mode={mode} />}
      <OrbitControls makeDefault enablePan enableZoom enableRotate />
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="black" />
      </GizmoHelper>
    </Canvas>
  );
}
