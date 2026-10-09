import { Navigate, Route, Routes } from 'react-router-dom';
import { usePrototype } from './PrototypeContext';
import type { UserRole } from '../domain/types';
import { AppShell } from '../layouts/AppShell';
import { LoginPage, ManagerRegistrationPage, RecoveryPage, RegisterPage } from '../pages/auth/AuthPages';
import { ManagerCondominiumPage, ManagerHomePage, ManagerProviderProfilePage, ManagerProvidersPage } from '../pages/manager/ManagerPages';

const homeByRole: Record<UserRole, string> = { manager: '/sindico', provider: '/prestador', admin: '/admin' };

function RoleGuard({ role }: { role: UserRole }) {
  const { state } = usePrototype();
  if (!state.currentUser) return <Navigate to="/login" replace />;
  if (state.currentUser.role !== role) return <Navigate to={homeByRole[state.currentUser.role]} replace />;
  return <AppShell role={role} />;
}

function EnvironmentPlaceholder({ title, description }: { title: string; description: string }) {
  return <section className="placeholder-page"><p className="eyebrow">FS Intermedium</p><h1>{title}</h1><p>{description}</p></section>;
}

export function AppRoutes() {
  const { state } = usePrototype();
  return (
    <Routes>
      <Route path="/login" element={state.currentUser ? <Navigate to={homeByRole[state.currentUser.role]} replace /> : <LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/cadastro/condominio" element={<ManagerRegistrationPage />} />
      <Route path="/cadastro/prestador" element={<Navigate to="/login" replace />} />
      <Route path="/recuperar-senha" element={<RecoveryPage />} />

      <Route element={<RoleGuard role="manager" />}>
        <Route path="/sindico" element={<ManagerHomePage />} />
        <Route path="/sindico/prestadores" element={<ManagerProvidersPage />} />
        <Route path="/sindico/prestadores/:id" element={<ManagerProviderProfilePage />} />
        <Route path="/sindico/condominio" element={<ManagerCondominiumPage />} />
      </Route>
      <Route element={<RoleGuard role="provider" />}>
        <Route path="/prestador" element={<EnvironmentPlaceholder title="Ambiente do prestador" description="Acompanhe seu cadastro, perfil e assinatura." />} />
        <Route path="/prestador/*" element={<EnvironmentPlaceholder title="Ambiente do prestador" description="Conteúdo em preparação." />} />
      </Route>
      <Route element={<RoleGuard role="admin" />}>
        <Route path="/admin" element={<EnvironmentPlaceholder title="Ambiente administrativo" description="Gerencie validações e cadastros da plataforma." />} />
        <Route path="/admin/*" element={<EnvironmentPlaceholder title="Ambiente administrativo" description="Conteúdo em preparação." />} />
      </Route>
      <Route path="*" element={<Navigate to={state.currentUser ? homeByRole[state.currentUser.role] : '/login'} replace />} />
    </Routes>
  );
}
