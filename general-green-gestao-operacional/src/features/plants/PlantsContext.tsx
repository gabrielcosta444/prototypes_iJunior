import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { loadStoredPlants, storePlants } from './storage';
import { PAINT_STATUS_META, type PaintSession, type PaintStroke, type PlantMap } from './types';

export type PlantDraft = Pick<PlantMap, 'name' | 'ufv' | 'scale' | 'pdfName'> &
  Partial<Pick<PlantMap, 'project' | 'expectedAreaHa' | 'pdfData'>>;

type PlantsContextValue = {
  plants: PlantMap[];
  storageError: string;
  addPlant: (draft: PlantDraft) => PlantMap;
  updatePlant: (id: string, changes: Partial<PlantMap>) => void;
  deletePlant: (id: string) => void;
  getPlant: (id: string) => PlantMap | undefined;
};

const PlantsContext = createContext<PlantsContextValue | null>(null);

function createId(prefix: string) {
  const random = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function demoPlants(): PlantMap[] {
  const completed = PAINT_STATUS_META.completed;
  const inProgress = PAINT_STATUS_META.inProgress;
  const sessions: PaintSession[] = [
    {
      id: 'session-demo-completed',
      label: '06/09/2026 — Roçagem — OS 0182',
      status: 'completed',
      color: completed.color,
      date: '2026-09-06',
      owner: 'Tiago Oliveira',
      orderId: 'OS-2026-0182',
      activity: 'Roçagem',
      project: 'Contrato O&M 2026',
      visible: true,
    },
    {
      id: 'session-demo-progress',
      label: '10/09/2026 — Roçagem — OS 0182',
      status: 'inProgress',
      color: inProgress.color,
      date: '2026-09-10',
      owner: 'Tiago Oliveira',
      orderId: 'OS-2026-0182',
      activity: 'Roçagem',
      project: 'Contrato O&M 2026',
      visible: true,
    },
  ];
  const strokes: PaintStroke[] = [
    {
      id: 'stroke-demo-1', page: 1, tool: 'brush', status: 'completed', color: completed.color, opacity: 0.4,
      brushWidth: 0.055, createdAt: '2026-09-06T14:20:00.000Z', user: 'Tiago Oliveira', sessionId: sessions[0].id,
      points: [{ x: 0.16, y: 0.33 }, { x: 0.3, y: 0.36 }, { x: 0.45, y: 0.39 }, { x: 0.62, y: 0.42 }],
    },
    {
      id: 'stroke-demo-2', page: 1, tool: 'brush', status: 'completed', color: completed.color, opacity: 0.4,
      brushWidth: 0.055, createdAt: '2026-09-06T14:22:00.000Z', user: 'Tiago Oliveira', sessionId: sessions[0].id,
      points: [{ x: 0.18, y: 0.45 }, { x: 0.34, y: 0.48 }, { x: 0.52, y: 0.51 }, { x: 0.7, y: 0.54 }],
    },
    {
      id: 'stroke-demo-3', page: 1, tool: 'brush', status: 'inProgress', color: inProgress.color, opacity: 0.42,
      brushWidth: 0.055, createdAt: '2026-09-10T13:05:00.000Z', user: 'Tiago Oliveira', sessionId: sessions[1].id,
      points: [{ x: 0.56, y: 0.62 }, { x: 0.68, y: 0.64 }, { x: 0.8, y: 0.66 }],
    },
  ];

  return [{
    id: 'plant-sol-do-cerrado',
    name: 'Planta geral — Setor Norte',
    ufv: 'UFV Sol do Cerrado',
    project: 'Contrato O&M 2026',
    scale: 1000,
    expectedAreaHa: 12,
    pdfName: 'planta-geral-setor-norte.pdf',
    pageCount: 1,
    pages: { 1: { widthPoints: 841.89, heightPoints: 595.28 } },
    importedAt: '2026-09-02T11:30:00.000Z',
    updatedAt: '2026-09-10T13:05:00.000Z',
    sessions,
    strokes,
  }];
}

export function PlantsProvider({ children }: PropsWithChildren) {
  const [plants, setPlants] = useState<PlantMap[]>(() => loadStoredPlants() ?? demoPlants());
  const [storageError, setStorageError] = useState('');

  const commit = useCallback((updater: (current: PlantMap[]) => PlantMap[]) => {
    setPlants((current) => {
      const next = updater(current);
      try {
        storePlants(next);
        setStorageError('');
      } catch {
        setStorageError('Não foi possível salvar localmente. O PDF pode exceder o espaço disponível no navegador.');
      }
      return next;
    });
  }, []);

  const value = useMemo<PlantsContextValue>(() => ({
    plants,
    storageError,
    addPlant: (draft) => {
      const now = new Date().toISOString();
      const status = PAINT_STATUS_META.completed;
      const sessionId = createId('session');
      const plant: PlantMap = {
        ...draft,
        id: createId('plant'),
        pageCount: 1,
        pages: {},
        importedAt: now,
        updatedAt: now,
        sessions: [{
          id: sessionId,
          label: `${new Date().toLocaleDateString('pt-BR')} — Nova sessão`,
          status: 'completed',
          color: status.color,
          date: now.slice(0, 10),
          owner: 'Tiago Oliveira',
          project: draft.project,
          visible: true,
        }],
        strokes: [],
      };
      commit((current) => [plant, ...current]);
      return plant;
    },
    updatePlant: (id, changes) => commit((current) => current.map((plant) => plant.id === id
      ? { ...plant, ...changes, updatedAt: changes.updatedAt ?? new Date().toISOString() }
      : plant)),
    deletePlant: (id) => commit((current) => current.filter((plant) => plant.id !== id)),
    getPlant: (id) => plants.find((plant) => plant.id === id),
  }), [commit, plants, storageError]);

  return <PlantsContext.Provider value={value}>{children}</PlantsContext.Provider>;
}

export function usePlants() {
  const context = useContext(PlantsContext);
  if (!context) throw new Error('usePlants must be used inside PlantsProvider');
  return context;
}
