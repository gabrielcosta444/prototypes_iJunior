import { Bell, Building2, ChevronDown, HelpCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Topbar() {
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <label className="topbar__search">
        <Search size={17} />
        <input aria-label="Busca global" placeholder="Buscar documento, fornecedor ou pedido..." />
        <kbd>Ctrl K</kbd>
      </label>
      <div className="topbar__actions">
        <Button variant="ghost" size="sm" icon={<Building2 size={16} />} onClick={() => navigate('/fornecedor')}>
          Portal do fornecedor
        </Button>
        <button className="icon-button" aria-label="Ajuda"><HelpCircle size={18} /></button>
        <button className="icon-button icon-button--notified" aria-label="Notificações"><Bell size={18} /></button>
        <button className="topbar__profile" type="button">
          <span className="avatar avatar--small">GM</span>
          <span>Gabriel</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
}
