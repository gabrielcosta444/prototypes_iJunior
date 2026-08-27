import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminShell } from '../components/layout/AdminShell';
import { ClientShell } from '../components/layout/ClientShell';
import { MobileShell } from '../components/layout/MobileShell';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { NewOrderPage } from '../pages/admin/NewOrderPage';
import { OrderDetailPage } from '../pages/admin/OrderDetailPage';
import { OrdersPage } from '../pages/admin/OrdersPage';
import { OperationsPage } from '../pages/admin/OperationsPage';
import { ReviewPage } from '../pages/admin/ReviewPage';
import { ChecklistEditorPage } from '../pages/admin/ChecklistEditorPage';
import { ChecklistsPage } from '../pages/admin/ChecklistsPage';
import { ClientsPage } from '../pages/admin/ClientsPage';
import { HistoryPage } from '../pages/admin/HistoryPage';
import { ProjectDetailPage } from '../pages/admin/ProjectDetailPage';
import { ProjectsPage } from '../pages/admin/ProjectsPage';
import { SettingsPage } from '../pages/admin/SettingsPage';
import { TeamsPage } from '../pages/admin/TeamsPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { ReportBuilderPage } from '../pages/admin/ReportBuilderPage';
import { ReportPreviewPage } from '../pages/admin/ReportPreviewPage';
import { ReportsPage } from '../pages/admin/ReportsPage';
import { ClientDashboardPage } from '../pages/client/ClientDashboardPage';
import { ClientProjectPage } from '../pages/client/ClientProjectPage';
import { ClientReportsPage } from '../pages/client/ClientReportsPage';
import { MobileActivityPage } from '../pages/mobile/MobileActivityPage';
import { MobileChecklistPage } from '../pages/mobile/MobileChecklistPage';
import { MobileEvidencePage } from '../pages/mobile/MobileEvidencePage';
import { MobileHomePage } from '../pages/mobile/MobileHomePage';
import { MobileOrderPage } from '../pages/mobile/MobileOrderPage';
import { MobileProductivityPage } from '../pages/mobile/MobileProductivityPage';
import { MobileReturnedPage } from '../pages/mobile/MobileReturnedPage';
import { MobileReviewPage } from '../pages/mobile/MobileReviewPage';
import { MobileSyncPage } from '../pages/mobile/MobileSyncPage';
import { PrototypeProvider } from './PrototypeContext';

function RouteScaffold({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <main>
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h1>{title}</h1>
    </main>
  );
}

const admin = (title: string, eyebrow?: string) => <AdminShell><RouteScaffold title={title} eyebrow={eyebrow} /></AdminShell>;
const mobile = (title: string, eyebrow?: string) => <MobileShell><RouteScaffold title={title} eyebrow={eyebrow} /></MobileShell>;
const client = (title: string, eyebrow?: string) => <ClientShell><RouteScaffold title={title} eyebrow={eyebrow} /></ClientShell>;

export function App() {
  return (
    <PrototypeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminShell><DashboardPage /></AdminShell>} />
        <Route path="/admin/orders" element={<AdminShell><OrdersPage /></AdminShell>} />
        <Route path="/admin/orders/new" element={<AdminShell><NewOrderPage /></AdminShell>} />
        <Route path="/admin/orders/:id" element={<AdminShell><OrderDetailPage /></AdminShell>} />
        <Route path="/admin/operations" element={<AdminShell><OperationsPage /></AdminShell>} />
        <Route path="/admin/review/:id" element={<AdminShell><ReviewPage /></AdminShell>} />
        <Route path="/admin/projects" element={<AdminShell><ProjectsPage /></AdminShell>} />
        <Route path="/admin/projects/:id" element={<AdminShell><ProjectDetailPage /></AdminShell>} />
        <Route path="/admin/clients" element={<AdminShell><ClientsPage /></AdminShell>} />
        <Route path="/admin/teams" element={<AdminShell><TeamsPage /></AdminShell>} />
        <Route path="/admin/checklists" element={<AdminShell><ChecklistsPage /></AdminShell>} />
        <Route path="/admin/checklists/:id" element={<AdminShell><ChecklistEditorPage /></AdminShell>} />
        <Route path="/admin/reports" element={<AdminShell><ReportsPage /></AdminShell>} />
        <Route path="/admin/reports/new" element={<AdminShell><ReportBuilderPage /></AdminShell>} />
        <Route path="/admin/reports/preview" element={<ReportPreviewPage />} />
        <Route path="/admin/history" element={<AdminShell><HistoryPage /></AdminShell>} />
        <Route path="/admin/users" element={<AdminShell><UsersPage /></AdminShell>} />
        <Route path="/admin/settings" element={<AdminShell><SettingsPage /></AdminShell>} />
        <Route path="/mobile" element={<MobileShell><MobileHomePage /></MobileShell>} />
        <Route path="/mobile/orders/:id" element={<MobileShell><MobileOrderPage /></MobileShell>} />
        <Route path="/mobile/activity/:id" element={<MobileShell><MobileActivityPage /></MobileShell>} />
        <Route path="/mobile/checklist/:id" element={<MobileShell><MobileChecklistPage /></MobileShell>} />
        <Route path="/mobile/productivity/:id" element={<MobileShell><MobileProductivityPage /></MobileShell>} />
        <Route path="/mobile/evidence/:id" element={<MobileShell><MobileEvidencePage /></MobileShell>} />
        <Route path="/mobile/sync" element={<MobileShell><MobileSyncPage /></MobileShell>} />
        <Route path="/mobile/review/:id" element={<MobileShell><MobileReviewPage /></MobileShell>} />
        <Route path="/mobile/returned/:id" element={<MobileShell><MobileReturnedPage /></MobileShell>} />
        <Route path="/mobile/profile" element={mobile('Perfil')} />
        <Route path="/client/dashboard" element={<ClientShell><ClientDashboardPage /></ClientShell>} />
        <Route path="/client/projects/:id" element={<ClientShell><ClientProjectPage /></ClientShell>} />
        <Route path="/client/reports" element={<ClientShell><ClientReportsPage /></ClientShell>} />
        <Route path="*" element={<RouteScaffold title="Página não encontrada" />} />
      </Routes>
    </PrototypeProvider>
  );
}
