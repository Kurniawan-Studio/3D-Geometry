import { create } from 'zustand';

type ViewerMode = 'solid' | 'wireframe' | 'edges' | 'vertices';
type CameraType = 'perspective' | 'orthographic';
type Quality = 'low' | 'medium' | 'high';

interface ViewerState {
  mode: ViewerMode;
  cameraType: CameraType;
  showGrid: boolean;
  showAxes: boolean;
  autoRotate: boolean;
  quality: Quality;
  setMode: (m: ViewerMode) => void;
  setCameraType: (c: CameraType) => void;
  toggleGrid: () => void;
  toggleAxes: () => void;
  setQuality: (q: Quality) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  mode: 'solid',
  cameraType: 'perspective',
  showGrid: true,
  showAxes: true,
  autoRotate: false,
  quality: 'medium',
  setMode: (mode) => set({ mode }),
  setCameraType: (cameraType) => set({ cameraType }),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
  toggleAxes: () => set((s) => ({ showAxes: !s.showAxes })),
  setQuality: (quality) => set({ quality }),
}));
