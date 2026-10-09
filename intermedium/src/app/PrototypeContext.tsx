import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CurrentUser, DemoState, UserRole } from '../domain/types';
import { loadDemoState, prototypeReducer, STORAGE_KEY, type PrototypeAction } from './state';

interface PrototypeContextValue {
  state: DemoState;
  dispatch: React.Dispatch<PrototypeAction>;
  loginDemo: (role: UserRole) => CurrentUser;
  loginWithEmail: (email: string) => CurrentUser | null;
  logout: () => void;
  resetDemo: () => void;
}

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

const adminUser: CurrentUser = { id: 'admin-1', name: 'Fernanda Souza', email: 'admin@demo.fs', role: 'admin' };

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(prototypeReducer, undefined, () => loadDemoState(localStorage.getItem(STORAGE_KEY)));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<PrototypeContextValue>(() => {
    const getDemoUser = (role: UserRole): CurrentUser => {
      if (role === 'admin') return adminUser;
      if (role === 'manager') {
        const condo = state.condominiums[0];
        return { id: 'manager-1', name: condo.responsibleName, email: condo.accountEmail, role, entityId: condo.id };
      }
      const provider = state.providers[0];
      return { id: 'provider-user-1', name: provider.fullName, email: provider.accountEmail, role, entityId: provider.id };
    };

    const loginDemo = (role: UserRole) => {
      const user = getDemoUser(role);
      dispatch({ type: 'LOGIN', user });
      return user;
    };

    const loginWithEmail = (email: string) => {
      const normalized = email.trim().toLowerCase();
      let user: CurrentUser | null = null;
      if (normalized === adminUser.email) user = adminUser;
      const condo = state.condominiums.find((item) => item.accountEmail.toLowerCase() === normalized);
      if (condo) user = { id: `manager-${condo.id}`, name: condo.responsibleName, email: condo.accountEmail, role: 'manager', entityId: condo.id };
      const provider = state.providers.find((item) => item.accountEmail.toLowerCase() === normalized);
      if (provider) user = { id: `user-${provider.id}`, name: provider.fullName, email: provider.accountEmail, role: 'provider', entityId: provider.id };
      if (user) dispatch({ type: 'LOGIN', user });
      return user;
    };

    return {
      state,
      dispatch,
      loginDemo,
      loginWithEmail,
      logout: () => dispatch({ type: 'LOGOUT' }),
      resetDemo: () => dispatch({ type: 'RESET_DEMO' }),
    };
  }, [state]);

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype(): PrototypeContextValue {
  const context = useContext(PrototypeContext);
  if (!context) throw new Error('usePrototype deve ser usado dentro de PrototypeProvider');
  return context;
}
