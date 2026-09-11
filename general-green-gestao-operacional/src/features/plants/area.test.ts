import { describe, expect, it } from 'vitest';
import { calculateAreaSummary } from './area';
import type { PaintSession, PaintStroke, PlantPageSize } from './types';

const pages: Record<number, PlantPageSize> = {
  1: { widthPoints: 72, heightPoints: 72 },
};

const sessions: PaintSession[] = [
  {
    id: 'session-complete',
    label: 'Roçagem — OS 0182',
    status: 'completed',
    color: '#24a148',
    date: '2026-09-10',
    owner: 'Tiago Oliveira',
    orderId: 'OS-2026-0182',
    activity: 'Roçagem',
    project: 'Contrato O&M 2026',
    visible: true,
  },
  {
    id: 'session-progress',
    label: 'Roçagem em execução',
    status: 'inProgress',
    color: '#f5a623',
    date: '2026-09-10',
    owner: 'Tiago Oliveira',
    activity: 'Roçagem',
    visible: true,
  },
];

function stroke(overrides: Partial<PaintStroke> = {}): PaintStroke {
  return {
    id: 'stroke-1',
    page: 1,
    points: [{ x: 0.5, y: 0.5 }],
    brushWidth: 2,
    tool: 'brush',
    status: 'completed',
    color: '#24a148',
    opacity: 0.4,
    createdAt: '2026-09-10T12:00:00.000Z',
    user: 'Tiago Oliveira',
    sessionId: 'session-complete',
    ...overrides,
  };
}

describe('calculateAreaSummary', () => {
  it('converte a área da página PDF usando a escala nominal', () => {
    const result = calculateAreaSummary([stroke()], sessions, pages, 1000);

    expect(result.totalM2).toBeCloseTo(645.16, 1);
    expect(result.totalHa).toBeCloseTo(0.064516, 4);
    expect(result.byStatus.completed.m2).toBeCloseTo(645.16, 1);
  });

  it('prioriza a calibração manual sobre a escala nominal', () => {
    const result = calculateAreaSummary([stroke()], sessions, pages, 500, {
      page: 1,
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
      realDistanceMeters: 72,
      metersPerPoint: 1,
    });

    expect(result.totalM2).toBeCloseTo(5184, 0);
  });

  it('não duplica área quando strokes do mesmo status se sobrepõem', () => {
    const oneStroke = calculateAreaSummary([stroke()], sessions, pages, 1000);
    const overlapped = calculateAreaSummary([
      stroke(),
      stroke({ id: 'stroke-2', createdAt: '2026-09-10T12:01:00.000Z' }),
    ], sessions, pages, 1000);

    expect(overlapped.totalM2).toBeCloseTo(oneStroke.totalM2, 5);
  });

  it('atribui uma sobreposição ao último status sem duplicá-la', () => {
    const result = calculateAreaSummary([
      stroke(),
      stroke({
        id: 'stroke-2',
        points: [{ x: 0.1, y: 0.5 }],
        brushWidth: 0.7,
        status: 'inProgress',
        color: '#f5a623',
        sessionId: 'session-progress',
        createdAt: '2026-09-10T12:01:00.000Z',
      }),
    ], sessions, pages, 1000);

    expect(result.totalM2).toBeCloseTo(645.16, 1);
    expect(result.byStatus.completed.m2).toBeGreaterThan(0);
    expect(result.byStatus.inProgress.m2).toBeGreaterThan(0);
    expect(result.byStatus.completed.m2 + result.byStatus.inProgress.m2).toBeCloseTo(result.totalM2, 5);
  });

  it('remove da máscara a parte percorrida pela borracha', () => {
    const painted = calculateAreaSummary([stroke()], sessions, pages, 1000);
    const erased = calculateAreaSummary([
      stroke(),
      stroke({
        id: 'eraser',
        points: [{ x: 0.5, y: 0.5 }],
        brushWidth: 0.5,
        tool: 'eraser',
        createdAt: '2026-09-10T12:01:00.000Z',
      }),
    ], sessions, pages, 1000);

    expect(erased.totalM2).toBeLessThan(painted.totalM2);
    expect(erased.totalM2).toBeGreaterThan(0);
  });

  it('ignora strokes de sessões ocultas', () => {
    const hiddenSessions = sessions.map((session) => ({ ...session, visible: false }));
    const result = calculateAreaSummary([stroke()], hiddenSessions, pages, 1000);

    expect(result.totalM2).toBe(0);
  });
});
