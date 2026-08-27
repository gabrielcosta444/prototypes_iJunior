import {
  Activity, Boxes, Cable, ChevronUp, CircleUserRound, FileClock, FileStack,
  LayoutDashboard, LogOut, Settings, ShieldCheck, SlidersHorizontal, UsersRound,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { Brand } from './Brand';
import { Topbar } from './Topbar';

const navigation = [
  { label: 'Visão Geral', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Documentos', to: '/app/documentos', icon: FileStack },
  { label: 'Pendências', to: '/app/pendencias', icon: FileClock, count: 43 },
  { label: 'Fornecedores', to: '/app/fornecedores', icon: UsersRound },
  { label: 'Regras', to: '/app/regras', icon: SlidersHorizontal },
  { label: 'Integrações', to: '/app/integracoes', icon: Cable },
  { label: 'Auditoria', to: '/app/auditoria', icon: ShieldCheck },
  { label: 'Configurações', to: '/app/configuracoes', icon: Settings },
];

export function AdminShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand"><Brand inverse /></div>
        <div className="sidebar__context"><Boxes size={15} /><span>Ambiente Allebras</span><ChevronUp size={14} /></div>
        <nav className="sidebar__nav" aria-label="Navegação principal">
          <span className="sidebar__section-label">Menu principal</span>
          {navigation.map(({ label, to, icon: Icon, count }) => (
            <NavLink aria-label={label} key={to} to={to} className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
              {count && <em>{count}</em>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__user">
          <span className="avatar">GM</span>
          <div><strong>Gabriel Martins</strong><span>Administrador</span></div>
          <button type="button" aria-label="Opções da conta"><CircleUserRound size={17} /></button>
        </div>
        <button className="sidebar__logout" type="button"><LogOut size={16} /> Sair</button>
      </aside>
      <div className="app-shell__main">
        <Topbar />
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}
