import type {
  AreaSummary,
  NormalizedPoint,
  PaintSession,
  PaintStatus,
  PaintStroke,
  PlantCalibration,
  PlantPageSize,
  StatusArea,
} from './types';

const MASK_LONG_EDGE = 640;
const PAPER_METERS_PER_POINT = 0.0254 / 72;

const statusCodes: Record<PaintStatus, number> = {
  completed: 1,
  inProgress: 2,
  pending: 3,
  occurrence: 4,
};

const codeStatuses: Record<number, PaintStatus> = {
  1: 'completed',
  2: 'inProgress',
  3: 'pending',
  4: 'occurrence',
};

function emptyStatusAreas(): Record<PaintStatus, StatusArea> {
  return {
    completed: { m2: 0, ha: 0 },
    inProgress: { m2: 0, ha: 0 },
    pending: { m2: 0, ha: 0 },
    occurrence: { m2: 0, ha: 0 },
  };
}

function distanceToSegment(
  x: number,
  y: number,
  start: NormalizedPoint,
  end: NormalizedPoint,
  width: number,
  height: number,
) {
  const ax = start.x * width;
  const ay = start.y * height;
  const bx = end.x * width;
  const by = end.y * height;
  const abX = bx - ax;
  const abY = by - ay;
  const lengthSquared = abX * abX + abY * abY;
  const projection = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((x - ax) * abX + (y - ay) * abY) / lengthSquared));
  const dx = x - (ax + projection * abX);
  const dy = y - (ay + projection * abY);
  return Math.sqrt(dx * dx + dy * dy);
}

function paintSegment(
  mask: Uint8Array,
  width: number,
  height: number,
  start: NormalizedPoint,
  end: NormalizedPoint,
  brushWidth: number,
  code: number,
) {
  const radius = Math.max(0.75, brushWidth * Math.min(width, height) / 2);
  const minX = Math.max(0, Math.floor(Math.min(start.x, end.x) * width - radius));
  const maxX = Math.min(width - 1, Math.ceil(Math.max(start.x, end.x) * width + radius));
  const minY = Math.max(0, Math.floor(Math.min(start.y, end.y) * height - radius));
  const maxY = Math.min(height - 1, Math.ceil(Math.max(start.y, end.y) * height + radius));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (distanceToSegment(x + 0.5, y + 0.5, start, end, width, height) <= radius) {
        mask[y * width + x] = code;
      }
    }
  }
}

function rasterizePage(strokes: PaintStroke[], size: PlantPageSize) {
  const landscape = size.widthPoints >= size.heightPoints;
  const width = landscape ? MASK_LONG_EDGE : Math.max(1, Math.round(MASK_LONG_EDGE * size.widthPoints / size.heightPoints));
  const height = landscape ? Math.max(1, Math.round(MASK_LONG_EDGE * size.heightPoints / size.widthPoints)) : MASK_LONG_EDGE;
  const mask = new Uint8Array(width * height);

  strokes.forEach((stroke) => {
    if (stroke.points.length === 0) return;
    const code = stroke.tool === 'eraser' ? 0 : statusCodes[stroke.status];
    if (stroke.points.length === 1) {
      paintSegment(mask, width, height, stroke.points[0], stroke.points[0], stroke.brushWidth, code);
      return;
    }
    for (let index = 1; index < stroke.points.length; index += 1) {
      paintSegment(mask, width, height, stroke.points[index - 1], stroke.points[index], stroke.brushWidth, code);
    }
  });

  return { mask, width, height };
}

function metersPerPoint(scale: number, calibration?: PlantCalibration) {
  return calibration?.metersPerPoint ?? PAPER_METERS_PER_POINT * scale;
}

export function calculateAreaSummary(
  strokes: PaintStroke[],
  sessions: PaintSession[],
  pages: Record<number, PlantPageSize>,
  scale: number,
  calibration?: PlantCalibration,
): AreaSummary {
  const visibleSessions = new Set(sessions.filter((session) => session.visible).map((session) => session.id));
  const visibleStrokes = strokes.filter((stroke) => visibleSessions.has(stroke.sessionId));
  const byStatus = emptyStatusAreas();
  const conversion = metersPerPoint(scale, calibration);

  Object.entries(pages).forEach(([pageKey, size]) => {
    const page = Number(pageKey);
    const pageStrokes = visibleStrokes.filter((stroke) => stroke.page === page);
    if (pageStrokes.length === 0) return;
    const { mask, width, height } = rasterizePage(pageStrokes, size);
    const squarePointsPerPixel = size.widthPoints * size.heightPoints / (width * height);
    const squareMetersPerPixel = squarePointsPerPixel * conversion * conversion;
    const counts = new Uint32Array(5);
    mask.forEach((code) => { counts[code] += 1; });

    for (let code = 1; code <= 4; code += 1) {
      const status = codeStatuses[code];
      byStatus[status].m2 += counts[code] * squareMetersPerPixel;
    }
  });

  let totalM2 = 0;
  (Object.keys(byStatus) as PaintStatus[]).forEach((status) => {
    byStatus[status].ha = byStatus[status].m2 / 10_000;
    totalM2 += byStatus[status].m2;
  });

  return {
    totalM2,
    totalHa: totalM2 / 10_000,
    byStatus,
  };
}

export function createCalibration(
  page: number,
  start: NormalizedPoint,
  end: NormalizedPoint,
  realDistanceMeters: number,
  size: PlantPageSize,
): PlantCalibration {
  const dx = (end.x - start.x) * size.widthPoints;
  const dy = (end.y - start.y) * size.heightPoints;
  const pointDistance = Math.sqrt(dx * dx + dy * dy);
  if (!Number.isFinite(realDistanceMeters) || realDistanceMeters <= 0 || pointDistance === 0) {
    throw new Error('Informe uma distância real válida e selecione dois pontos diferentes.');
  }
  return { page, start, end, realDistanceMeters, metersPerPoint: realDistanceMeters / pointDistance };
}
