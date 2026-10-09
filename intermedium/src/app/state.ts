import { createSeedState } from '../data/seed';
import type { Category, Condominium, CurrentUser, DemoState, Provider, RegistrationStatus, SubscriptionStatus } from '../domain/types';

export const STORAGE_KEY = 'fs-intermedium-demo-v1';

export type PrototypeAction =
  | { type: 'LOGIN'; user: CurrentUser }
  | { type: 'LOGOUT' }
  | { type: 'APPROVE_PROVIDER'; providerId: string }
  | { type: 'REJECT_PROVIDER'; providerId: string; reason: string }
  | { type: 'RESUBMIT_PROVIDER'; providerId: string }
  | { type: 'UPDATE_PROVIDER'; providerId: string; changes: Partial<Provider> }
  | { type: 'SET_PROVIDER_STATUS'; providerId: string; status: RegistrationStatus }
  | { type: 'TOGGLE_BLOCK_PROVIDER'; providerId: string }
  | { type: 'SET_SUBSCRIPTION'; providerId: string; status: SubscriptionStatus }
  | { type: 'UPDATE_CONDOMINIUM'; condominiumId: string; changes: Partial<Condominium> }
  | { type: 'ADD_CONDOMINIUM'; condominium: Condominium }
  | { type: 'UPSERT_CATEGORY'; category: Category }
  | { type: 'TOGGLE_CATEGORY'; categoryId: string }
  | { type: 'RESET_DEMO' };

const updateProvider = (state: DemoState, providerId: string, mutate: (provider: Provider) => Provider): DemoState => ({
  ...state,
  providers: state.providers.map((provider) => provider.id === providerId ? mutate(provider) : provider),
});

const eventDetails: Record<SubscriptionStatus, { type: DemoState['paymentEvents'][number]['type']; description: string }> = {
  active: { type: 'confirmed', description: 'Pagamento demonstrativo confirmado' },
  pending: { type: 'pending', description: 'Pagamento demonstrativo pendente' },
  delinquent: { type: 'failed', description: 'Falha no pagamento demonstrativo' },
  cancelled: { type: 'cancelled', description: 'Assinatura demonstrativa cancelada' },
  not_contracted: { type: 'cancelled', description: 'Assinatura ainda não contratada' },
};

export function prototypeReducer(state: DemoState, action: PrototypeAction): DemoState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.user };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'APPROVE_PROVIDER': {
      const provider = state.providers.find((item) => item.id === action.providerId);
      if (!provider) return state;
      const next = updateProvider(state, action.providerId, (item) => ({ ...item, registrationStatus: 'approved', rejectionReason: undefined }));
      return {
        ...next,
        notifications: [...next.notifications, {
          id: `notice-${Date.now()}`,
          recipient: provider.accountEmail,
          subject: 'Cadastro aprovado pela FS Intermedium (simulação)',
          createdAt: new Date().toISOString(),
        }],
      };
    }
    case 'REJECT_PROVIDER': {
      const reason = action.reason.trim();
      const provider = state.providers.find((item) => item.id === action.providerId);
      if (!reason || !provider) return state;
      const next = updateProvider(state, action.providerId, (item) => ({ ...item, registrationStatus: 'rejected', rejectionReason: reason }));
      return {
        ...next,
        notifications: [...next.notifications, {
          id: `notice-${Date.now()}`,
          recipient: provider.accountEmail,
          subject: 'Cadastro precisa de ajustes (simulação)',
          createdAt: new Date().toISOString(),
        }],
      };
    }
    case 'RESUBMIT_PROVIDER':
      return updateProvider(state, action.providerId, (item) => ({ ...item, registrationStatus: 'under_review', rejectionReason: undefined }));
    case 'UPDATE_PROVIDER':
      return updateProvider(state, action.providerId, (item) => ({ ...item, ...action.changes, id: item.id }));
    case 'SET_PROVIDER_STATUS':
      return updateProvider(state, action.providerId, (item) => ({ ...item, registrationStatus: action.status }));
    case 'TOGGLE_BLOCK_PROVIDER':
      return updateProvider(state, action.providerId, (item) => ({ ...item, blocked: !item.blocked }));
    case 'SET_SUBSCRIPTION': {
      const provider = state.providers.find((item) => item.id === action.providerId);
      if (!provider) return state;
      const now = new Date();
      const nextPayment = new Date(now);
      nextPayment.setMonth(nextPayment.getMonth() + 1);
      const next = updateProvider(state, action.providerId, (item) => ({
        ...item,
        subscriptionStatus: action.status,
        subscriptionActivatedAt: action.status === 'active' ? now.toISOString().slice(0, 10) : item.subscriptionActivatedAt,
        nextPaymentAt: action.status === 'active' ? nextPayment.toISOString().slice(0, 10) : item.nextPaymentAt,
      }));
      const details = eventDetails[action.status];
      return {
        ...next,
        paymentEvents: [{ id: `event-${Date.now()}`, providerId: action.providerId, ...details, createdAt: now.toISOString() }, ...next.paymentEvents],
      };
    }
    case 'UPDATE_CONDOMINIUM':
      return { ...state, condominiums: state.condominiums.map((item) => item.id === action.condominiumId ? { ...item, ...action.changes, id: item.id } : item) };
    case 'ADD_CONDOMINIUM':
      return { ...state, condominiums: [...state.condominiums, action.condominium] };
    case 'UPSERT_CATEGORY': {
      const exists = state.categories.some((item) => item.id === action.category.id);
      return { ...state, categories: exists ? state.categories.map((item) => item.id === action.category.id ? action.category : item) : [...state.categories, action.category] };
    }
    case 'TOGGLE_CATEGORY':
      return { ...state, categories: state.categories.map((item) => item.id === action.categoryId ? { ...item, active: !item.active } : item) };
    case 'RESET_DEMO':
      return createSeedState();
    default:
      return state;
  }
}

export function loadDemoState(raw: string | null): DemoState {
  if (!raw) return createSeedState();
  try {
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    if (parsed.version !== 1 || !Array.isArray(parsed.providers) || !Array.isArray(parsed.categories) || !Array.isArray(parsed.condominiums)) {
      return createSeedState();
    }
    return parsed as DemoState;
  } catch {
    return createSeedState();
  }
}
