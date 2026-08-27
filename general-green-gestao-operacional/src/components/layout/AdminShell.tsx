import { Bell, BookOpenCheck, Building2, ClipboardList, FileBarChart, History, LayoutDashboard, LogOut, Settings, ShieldCheck, Users, UsersRound, Workflow } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brand } from '../ui/Brand';
import { Toast } from '../ui/Toast';

const primary = [
  ['/admin/dashboard', 'Visão Geral', LayoutDashboard],
  ['/admin/orders', 'Ordens de Serviço', ClipboardList],
  ['/admin/operations', 'Operações', Workflow],
  ['/admin/projects', 'Projetos', FileBarChart],
  ['/admin/clients', 'Clientes & UFVs', Building2],
  ['/admin/teams', 'Equipes', UsersRound],
  ['/admin/checklists', 'Checklists', BookOpenCheck],
  ['/admin/reports', 'Relatórios', FileBarChart],
  ['/admin/history', 'Histórico', History],
] as const;

const secondary = [
  ['/admin/users', 'Usuários', Users],
  ['/admin/settings', 'Configurações', Settings],
] as const;

export function AdminShell({ children }: PropsWithChildren) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <Link to="/admin/dashboard" className="sidebar__brand"><Brand light /></Link>
        <div className="sidebar__context"><ShieldCheck size={15} /><span>Gestão de Operações</span></div>
        <nav className="sidebar__nav" aria-label="Navegação principal">
          {primary.map(([to, label, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={19} /><span>{label}</span></NavLink>)}
          <div className="sidebar__divider" />
          {secondary.map(([to, label, Icon]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={19} /><span>{label}</span></NavLink>)}
        </nav>
        <div className="sidebar__profile">
          <span className="avatar">LM</span>
          <span><strong>Lucas Martins</strong><small>Gestor Operacional</small></span>
          <LogOut size={18} />
        </div>
      </aside>
      <section className="admin-main">
        <header className="topbar">
          <span className="topbar__breadcrumb">General Green <b>/</b> Operação</span>
          <div className="topbar__actions">
            <Link to="/mobile" className="environment-link">App técnico</Link>
            <Link to="/client/dashboard" className="environment-link">Portal do cliente</Link>
            <button className="icon-button topbar__bell" aria-label="Notificações"><Bell size={20} /><i /></button>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </section>
      <Toast />
    </div>
  );
}
