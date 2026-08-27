import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import type { ActivityStatus } from '../domain/types';

type Connectivity = 'online' | 'offline';

type PrototypeContextValue = {
  connectivity: Connectivity;
  activityStatus: ActivityStatus;
  checklistCompleted: number[];
  queuedPhotos: number;
  toast: string;
  setConnectivity: (value: Connectivity) => void;
  startActivity: () => void;
  toggleChecklistItem: (id: number) => void;
  queueEvidence: () => void;
  syncActivity: () => Promise<void>;
  submitForReview: () => void;
  approveActivity: () => void;
  returnActivity: () => void;
  clearToast: () => void;
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export function PrototypeProvider({ children }: PropsWithChildren) {
  const [connectivity, setConnectivity] = useState<Connectivity>('online');
  const [activityStatus, setActivityStatus] = useState<ActivityStatus>('idle');
  const [checklistCompleted, setChecklistCompleted] = useState<number[]>([1, 2, 3, 4]);
  const [queuedPhotos, setQueuedPhotos] = useState(4);
  const [toast, setToast] = useState('');

  const value = useMemo<PrototypeContextValue>(() => ({
    connectivity,
    activityStatus,
    checklistCompleted,
    queuedPhotos,
    toast,
    setConnectivity,
    startActivity: () => setActivityStatus('running'),
    toggleChecklistItem: (id) => setChecklistCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    queueEvidence: () => {
      setQueuedPhotos((current) => current + 1);
      setToast(connectivity === 'offline' ? 'Evidência salva no dispositivo' : 'Evidência adicionada');
    },
    syncActivity: async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      setConnectivity('online');
      setQueuedPhotos(0);
      setToast('Sincronização concluída');
    },
    submitForReview: () => {
      setActivityStatus('review');
      setToast('Atividade enviada para revisão');
    },
    approveActivity: () => setActivityStatus('approved'),
    returnActivity: () => {
      setActivityStatus('returned');
      setToast('Solicitação de correção enviada');
    },
    clearToast: () => setToast(''),
  }), [activityStatus, checklistCompleted, connectivity, queuedPhotos, toast]);

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) throw new Error('usePrototype must be used inside PrototypeProvider');
  return context;
}
