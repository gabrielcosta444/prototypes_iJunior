import { ClipboardList, Home, RefreshCw, UserRound } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brand } from '../ui/Brand';
import { Toast } from '../ui/Toast';

export function MobileShell({ children }: PropsWithChildren) {
  return (
    <div className="mobile-stage">
      <div className="mobile-preview-tools">
        <Link to="/admin/dashboard">← Voltar ao painel do gestor</Link>
        <span>Aplicativo do Técnico · 390 × 844</span>
      </div>
      <section className="mobile-device">
        <header className="mobile-topbar"><Brand compact /><span className="mobile-topbar__signal">5G</span></header>
        <main className="mobile-content">{children}</main>
        <nav className="mobile-bottom" aria-label="Navegação do aplicativo">
          <NavLink to="/mobile" end><Home size={20} /><span>Início</span></NavLink>
          <NavLink to="/mobile/orders/2026-0148"><ClipboardList size={20} /><span>Atividades</span></NavLink>
          <NavLink to="/mobile/sync"><RefreshCw size={20} /><span>Sincronização</span></NavLink>
          <NavLink to="/mobile/profile"><UserRound size={20} /><span>Perfil</span></NavLink>
        </nav>
      </section>
      <Toast />
    </div>
  );
}
