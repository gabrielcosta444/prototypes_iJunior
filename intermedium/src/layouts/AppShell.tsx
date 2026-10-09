import {
  BarChart3, BriefcaseBusiness, Building2, ChevronDown, ClipboardCheck, CreditCard, FileCheck2,
  FolderCog, Home, Layers3, LogOut, Menu, ReceiptText, RefreshCcw, Search, UserRound, Users, X,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { usePrototype } from '../app/PrototypeContext';
import { Brand } from '../components/Brand';
import { Button, Modal } from '../components/ui';
import type { UserRole } from '../domain/types';

const navByRole = {
  manager: [
    { to: '/sindico', label: 'Início', icon: Home, end: true },
    { to: '/sindico/prestadores', label: 'Encontrar profissionais', icon: Search },
    { to: '/sindico/condominio', label: 'Meu condomínio', icon: Building2 },
  ],
  provider: [
    { to: '/prestador', label: 'Início', icon: Home, end: true },
    { to: '/prestador/situacao', label: 'Situação cadastral', icon: ClipboardCheck },
    { to: '/prestador/perfil', label: 'Perfil profissional', icon: BriefcaseBusiness },
    { to: '/prestador/assinatura', label: 'Minha assinatura', icon: CreditCard },
    { to: '/prestador/cadastro', label: 'Cadastro e documentos', icon: FileCheck2 },
  ],
  admin: [
    { to: '/admin', label: 'Visão geral', icon: BarChart3, end: true },
    { to: '/admin/analises', label: 'Análise de cadastros', icon: ClipboardCheck },
    { to: '/admin/prestadores', label: 'Prestadores', icon: Users },
    { to: '/admin/condominios', label: 'Condomínios', icon: Building2 },
    { to: '/admin/categorias', label: 'Categorias', icon: FolderCog },
    { to: '/admin/assinaturas', label: 'Assinaturas', icon: Layers3 },
    { to: '/admin/pagamentos', label: 'Eventos de pagamento', icon: ReceiptText },
  ],
} satisfies Record<UserRole, Array<{ to: string; label: string; icon: typeof Home; end?: boolean }>>;

const roleLabels: Record<UserRole, string> = {
  manager: 'Ambiente do condomínio',
  provider: 'Ambiente do prestador',
  admin: 'Ambiente administrativo',
};

export function AppShell({ role }: { role: UserRole }) {
  const { state, logout, resetDemo } = usePrototype();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  const leave = () => {
    logout();
    navigate('/login');
  };

  const reset = () => {
    resetDemo();
    setResetOpen(false);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand"><Brand light /></div>
        <button className="sidebar__close" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X /></button>
        <p className="sidebar__role">{roleLabels[role]}</p>
        <nav className="sidebar__nav" aria-label="Navegação principal">
          {navByRole[role].map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}>
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <button className="sidebar__utility" onClick={() => setResetOpen(true)}><RefreshCcw size={17} /> Restaurar dados demo</button>
          <span>Protótipo demonstrativo</span>
        </div>
      </aside>
      {menuOpen && <button className="drawer-backdrop" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
      <div className="app-shell__body">
        <header className="topbar">
          <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}><Menu /></button>
          <div className="topbar__mobile-brand"><Brand compact /></div>
          <div className="topbar__spacer" />
          <div className="profile-menu">
            <button className="profile-menu__trigger" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen}>
              <span className="profile-menu__avatar"><UserRound size={18} /></span>
              <span className="profile-menu__copy"><strong>{state.currentUser?.name}</strong><small>{roleLabels[role]}</small></span>
              <ChevronDown size={16} />
            </button>
            {profileOpen && (
              <div className="profile-menu__dropdown">
                <span>{state.currentUser?.email}</span>
                <button onClick={leave}><LogOut size={16} /> Sair</button>
              </div>
            )}
          </div>
        </header>
        <main className="main-content"><Outlet /></main>
      </div>
      <Modal
        open={resetOpen}
        title="Restaurar dados de demonstração?"
        onClose={() => setResetOpen(false)}
        footer={<><Button variant="ghost" onClick={() => setResetOpen(false)}>Cancelar</Button><Button variant="danger" onClick={reset}>Restaurar dados</Button></>}
      >
        <p>Todas as alterações feitas nesta demonstração serão removidas. Você voltará à tela de acesso.</p>
      </Modal>
    </div>
  );
}
