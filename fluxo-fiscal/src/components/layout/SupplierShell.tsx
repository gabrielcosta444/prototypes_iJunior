import { AlertTriangle, Building2, FileStack, LayoutDashboard, LogOut, UploadCloud } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Brand } from './Brand';
import { Button } from '../ui/Button';

const supplierNav = [
  { label: 'Visão Geral', to: '/fornecedor', icon: LayoutDashboard, end: true },
  { label: 'Enviar Documento', to: '/fornecedor/enviar', icon: UploadCloud },
  { label: 'Meus Documentos', to: '/fornecedor/documentos', icon: FileStack },
  { label: 'Pendências', to: '/fornecedor/pendencias', icon: AlertTriangle, count: 3 },
  { label: 'Minha Empresa', to: '/fornecedor/empresa', icon: Building2 },
];

export function SupplierShell() {
  const navigate = useNavigate();
  return (
    <div className="app-shell app-shell--supplier">
      <aside className="sidebar sidebar--supplier">
        <div className="sidebar__brand"><Brand inverse /></div>
        <div className="supplier-company">
          <span className="supplier-company__mark">M</span>
          <div><strong>Morganite Brasil</strong><span>Portal do Fornecedor</span></div>
        </div>
        <nav className="sidebar__nav" aria-label="Navegação do fornecedor">
          <span className="sidebar__section-label">Sua empresa</span>
          {supplierNav.map(({ label, to, icon: Icon, count, end }) => (
            <NavLink aria-label={label} key={to} end={end} to={to} className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}>
              <Icon size={18} /><span>{label}</span>{count && <em>{count}</em>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__supplier-footer">
          <Button variant="ghost" icon={<LogOut size={16} />} onClick={() => navigate('/app/dashboard')}>Voltar ao administrativo</Button>
        </div>
      </aside>
      <div className="app-shell__main">
        <header className="supplier-topbar">
          <div><span className="status-dot" /> Canal seguro com a Allebras</div>
          <div className="supplier-topbar__profile"><span className="avatar avatar--small">MB</span><strong>Morganite Brasil</strong></div>
        </header>
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}
