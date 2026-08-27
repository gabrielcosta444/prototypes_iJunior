import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminShell } from '../components/layout/AdminShell';
import { SupplierShell } from '../components/layout/SupplierShell';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { DocumentDetailPage } from '../pages/admin/DocumentDetailPage';
import { DocumentsPage } from '../pages/admin/DocumentsPage';
import { NewRulePage } from '../pages/admin/NewRulePage';
import { PendenciesPage } from '../pages/admin/PendenciesPage';
import { RulesPage } from '../pages/admin/RulesPage';
import { AuditPage } from '../pages/admin/AuditPage';
import { IntegrationsPage } from '../pages/admin/IntegrationsPage';
import { SettingsPage } from '../pages/admin/SettingsPage';
import { SuppliersPage } from '../pages/admin/SuppliersPage';
import { SupplierCompanyPage } from '../pages/supplier/SupplierCompanyPage';
import { SupplierDashboardPage } from '../pages/supplier/SupplierDashboardPage';
import { SupplierDocumentsPage } from '../pages/supplier/SupplierDocumentsPage';
import { SupplierPendenciesPage } from '../pages/supplier/SupplierPendenciesPage';
import { SupplierUploadPage } from '../pages/supplier/SupplierUploadPage';
import { PrototypeProvider } from './PrototypeContext';

export function App() {
  return (
    <PrototypeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/app" element={<AdminShell />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="documentos" element={<DocumentsPage />} />
            <Route path="documentos/:id" element={<DocumentDetailPage />} />
            <Route path="pendencias" element={<PendenciesPage />} />
            <Route path="fornecedores" element={<SuppliersPage />} />
            <Route path="regras" element={<RulesPage />} />
            <Route path="regras/nova" element={<NewRulePage />} />
            <Route path="integracoes" element={<IntegrationsPage />} />
            <Route path="auditoria" element={<AuditPage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
          </Route>
          <Route path="/fornecedor" element={<SupplierShell />}>
            <Route index element={<SupplierDashboardPage />} />
            <Route path="enviar" element={<SupplierUploadPage />} />
            <Route path="documentos" element={<SupplierDocumentsPage />} />
            <Route path="pendencias" element={<SupplierPendenciesPage />} />
            <Route path="empresa" element={<SupplierCompanyPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </PrototypeProvider>
  );
}
