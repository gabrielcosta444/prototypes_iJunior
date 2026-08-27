import { Bell, LogOut } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brand } from '../ui/Brand';
import { Toast } from '../ui/Toast';

export function ClientShell({ children }: PropsWithChildren) {
  return (
    <div className="client-layout">
      <header className="client-topbar">
        <Link to="/client/dashboard"><Brand /></Link>
        <nav>
          <NavLink to="/client/dashboard">Visão Geral</NavLink>
          <NavLink to="/client/projects/sol-do-cerrado">Projetos</NavLink>
          <NavLink to="/client/reports">Relatórios</NavLink>
        </nav>
        <div className="client-topbar__account"><button className="icon-button"><Bell size={19} /></button><span className="avatar">SE</span><span><strong>Solaris Energia</strong><small>Portal do Cliente</small></span><Link to="/login"><LogOut size={18} /></Link></div>
      </header>
      <main className="client-content">{children}</main>
      <Toast />
    </div>
  );
}
