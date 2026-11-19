export type GeometryCategory =
  | 'polyhedra' | 'prism' | 'pyramid' | 'curved' | 'extruded' | 'modified';

export type ParamDefinition = {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
  integer?: boolean;
};

export type CalculationResult = {
  label: string;
  value: number | string;
  unit?: string;
  formula?: string;
};

export type GeometryCatalogItem = {
  id: string;
  name: string;
  category: GeometryCategory;
  description: string;
  geometryType: string;
  params: ParamDefinition[];
  educational: string;
  calculate: (params: Record<string, number>) => CalculationResult[];
  vertexCount?: number | ((p: Record<string, number>) => number);
  edgeCount?: number | ((p: Record<string, number>) => number);
  faceCount?: number | ((p: Record<string, number>) => number);
};
