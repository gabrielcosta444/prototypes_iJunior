export type PaintStatus = 'completed' | 'inProgress' | 'pending' | 'occurrence';
export type PaintTool = 'move' | 'brush' | 'eraser' | 'calibrate';

export type NormalizedPoint = {
  x: number;
  y: number;
};

export type PlantPageSize = {
  widthPoints: number;
  heightPoints: number;
};

export type PaintStroke = {
  id: string;
  page: number;
  points: NormalizedPoint[];
  brushWidth: number;
  tool: 'brush' | 'eraser';
  status: PaintStatus;
  color: string;
  opacity: number;
  createdAt: string;
  user: string;
  sessionId: string;
};

export type PaintSession = {
  id: string;
  label: string;
  status: PaintStatus;
  color: string;
  date: string;
  owner: string;
  orderId?: string;
  activity?: string;
  project?: string;
  visible: boolean;
};

export type PlantCalibration = {
  page: number;
  start: NormalizedPoint;
  end: NormalizedPoint;
  realDistanceMeters: number;
  metersPerPoint: number;
};

export type PlantMap = {
  id: string;
  name: string;
  ufv: string;
  project?: string;
  scale: number;
  expectedAreaHa?: number;
  pdfName: string;
  pdfData?: string;
  pageCount: number;
  pages: Record<number, PlantPageSize>;
  importedAt: string;
  updatedAt: string;
  calibration?: PlantCalibration;
  sessions: PaintSession[];
  strokes: PaintStroke[];
};

export type StatusArea = {
  m2: number;
  ha: number;
};

export type AreaSummary = {
  totalM2: number;
  totalHa: number;
  byStatus: Record<PaintStatus, StatusArea>;
};

export const PAINT_STATUS_META: Record<PaintStatus, { label: string; color: string }> = {
  completed: { label: 'Concluído', color: '#168c43' },
  inProgress: { label: 'Em execução', color: '#f5a623' },
  pending: { label: 'Pendente', color: '#7b8580' },
  occurrence: { label: 'Ocorrência', color: '#d14343' },
};
