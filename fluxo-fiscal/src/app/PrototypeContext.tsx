import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Toast } from '../components/ui/Toast';
import { initialIntegrations, initialRules, pendingItems as initialPendingItems } from '../data/mockData';
import type { IntegrationRecord, PendingItem, RuleRecord } from '../types/domain';

interface ToastState {
  message: string;
  tone: 'success' | 'info';
}

interface PrototypeContextValue {
  showToast: (message: string, tone?: ToastState['tone']) => void;
  pendingItems: PendingItem[];
  rules: RuleRecord[];
  resolvePending: (id: string, category: string, createRule: boolean) => void;
  addRule: (rule: RuleRecord) => void;
  integrations: IntegrationRecord[];
  syncIntegration: (id: string) => void;
}

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [pendingItems, setPendingItems] = useState(initialPendingItems);
  const [rules, setRules] = useState(initialRules);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const value = useMemo(() => ({
    pendingItems,
    rules,
    integrations,
    showToast(message: string, tone: ToastState['tone'] = 'success') {
      setToast({ message, tone });
      window.setTimeout(() => setToast(null), 3500);
    },
    resolvePending(id: string, category: string, createRule: boolean) {
      setPendingItems((items) => items.filter((item) => item.id !== id));
      if (createRule) {
        setRules((items) => [{ priority: 1, name: 'Morganite — Matéria-prima', conditions: ['Fornecedor = Morganite Brasil', 'CFOP = 5101'], category, applications: 1, active: true }, ...items.map((item) => ({ ...item, priority: item.priority + 1 }))]);
      }
    },
    addRule(rule: RuleRecord) {
      setRules((items) => [rule, ...items.map((item) => ({ ...item, priority: item.priority + 1 }))]);
    },
    syncIntegration(id: string) {
      setIntegrations((items) => items.map((item) => item.id === id ? { ...item, sync: 'agora' } : item));
    },
  }), [pendingItems, rules, integrations]);

  return (
    <PrototypeContext.Provider value={value}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) throw new Error('usePrototype must be used within PrototypeProvider');
  return context;
}
