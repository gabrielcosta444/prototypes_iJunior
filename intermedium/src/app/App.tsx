import { Navigate, Route, Routes } from 'react-router-dom';
import { usePrototype } from './PrototypeContext';
import type { UserRole } from '../domain/types';
import { AppShell } from '../layouts/AppShell';
import { LoginPage, ManagerRegistrationPage, RecoveryPage, RegisterPage } from '../pages/auth/AuthPages';
import { ManagerCondominiumPage, ManagerHomePage, ManagerProviderProfilePage, ManagerProvidersPage } from '../pages/manager/ManagerPages';
import { ProviderHomePage, ProviderProfilePage, ProviderRegistrationPage, ProviderStartPage, ProviderStatusPage, ProviderSubscriptionPage } from '../pages/provider/ProviderPages';
import { AdminAnalysesPage, AdminAnalysisDetailPage, AdminCategoriesPage, AdminCondominiumsPage, AdminHomePage, AdminPaymentEventsPage, AdminProvidersPage, AdminSubscriptionsPage } from '../pages/admin/AdminPages';

const homeByRole: Record<UserRole, string> = { manager: '/sindico', provider: '/prestador', admin: '/admin' };

function RoleGuard({ role }: { role: UserRole }) {
  const { state } = usePrototype();
  if (!state.currentUser) return <Navigate to="/login" replace />;
  if (state.currentUser.role !== role) return <Navigate to={homeByRole[state.currentUser.role]} replace />;
  return <AppShell role={role} />;
}

export function AppRoutes() {
  const { state } = usePrototype();
  return (
    <Routes>
      <Route path="/login" element={state.currentUser ? <Navigate to={homeByRole[state.currentUser.role]} replace /> : <LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/cadastro/condominio" element={<ManagerRegistrationPage />} />
      <Route path="/cadastro/prestador" element={<ProviderStartPage />} />
      <Route path="/recuperar-senha" element={<RecoveryPage />} />

      <Route element={<RoleGuard role="manager" />}>
        <Route path="/sindico" element={<ManagerHomePage />} />
        <Route path="/sindico/prestadores" element={<ManagerProvidersPage />} />
        <Route path="/sindico/prestadores/:id" element={<ManagerProviderProfilePage />} />
        <Route path="/sindico/condominio" element={<ManagerCondominiumPage />} />
      </Route>
      <Route element={<RoleGuard role="provider" />}>
        <Route path="/prestador" element={<ProviderHomePage />} />
        <Route path="/prestador/situacao" element={<ProviderStatusPage />} />
        <Route path="/prestador/perfil" element={<ProviderProfilePage />} />
        <Route path="/prestador/assinatura" element={<ProviderSubscriptionPage />} />
        <Route path="/prestador/cadastro" element={<ProviderRegistrationPage />} />
      </Route>
      <Route element={<RoleGuard role="admin" />}>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/analises" element={<AdminAnalysesPage />} />
        <Route path="/admin/analises/:id" element={<AdminAnalysisDetailPage />} />
        <Route path="/admin/prestadores" element={<AdminProvidersPage />} />
        <Route path="/admin/condominios" element={<AdminCondominiumsPage />} />
        <Route path="/admin/categorias" element={<AdminCategoriesPage />} />
        <Route path="/admin/assinaturas" element={<AdminSubscriptionsPage />} />
        <Route path="/admin/pagamentos" element={<AdminPaymentEventsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={state.currentUser ? homeByRole[state.currentUser.role] : '/login'} replace />} />
    </Routes>
  );
}
