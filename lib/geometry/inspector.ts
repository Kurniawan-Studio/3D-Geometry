import * as THREE from 'three';

export function getMeshStats(geometry: THREE.BufferGeometry) {
  const pos = geometry.getAttribute('position');
  const vertexCount = pos ? pos.count : 0;
  const edgesGeo = new THREE.EdgesGeometry(geometry, 1);
  const ePos = edgesGeo.getAttribute('position');
  const edgeCount = ePos ? ePos.count / 2 : 0;
  const index = geometry.getIndex();
  const faceCount = index ? index.count / 3 : Math.floor(vertexCount / 3);
  const bbox = new THREE.Box3().setFromBufferAttribute(pos as THREE.BufferAttribute);
  const size = new THREE.Vector3();
  bbox.getSize(size);
  return {
    vertexCount,
    edgeCount,
    faceCount,
    dimensions: { x: size.x, y: size.y, z: size.z },
  };
}

export function computeMeshVolume(geometry: THREE.BufferGeometry): number {
  const pos = geometry.getAttribute('position');
  const idx = geometry.getIndex();
  let v = 0;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const tri = (i0: number, i1: number, i2: number) => {
    a.fromBufferAttribute(pos, i0);
    b.fromBufferAttribute(pos, i1);
    c.fromBufferAttribute(pos, i2);
    v += a.dot(b.clone().cross(c)) / 6;
  };
  if (idx) for (let i = 0; i < idx.count; i += 3) tri(idx.getX(i), idx.getX(i + 1), idx.getX(i + 2));
  else for (let i = 0; i < pos.count; i += 3) tri(i, i + 1, i + 2);
  return Math.abs(v);
}

export function computeMeshSurfaceArea(geometry: THREE.BufferGeometry): number {
  const pos = geometry.getAttribute('position');
  const idx = geometry.getIndex();
  let area = 0;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const tri = (i0: number, i1: number, i2: number) => {
    a.fromBufferAttribute(pos, i0);
    b.fromBufferAttribute(pos, i1);
    c.fromBufferAttribute(pos, i2);
    area += b.clone().sub(a).cross(c.clone().sub(a)).length() / 2;
  };
  if (idx) for (let i = 0; i < idx.count; i += 3) tri(idx.getX(i), idx.getX(i + 1), idx.getX(i + 2));
  else for (let i = 0; i < pos.count; i += 3) tri(i, i + 1, i + 2);
  return area;
}
