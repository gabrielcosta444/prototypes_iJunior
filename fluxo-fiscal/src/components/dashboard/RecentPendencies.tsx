import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pendingItems } from '../../data/mockData';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';

export function RecentPendencies() {
  const navigate = useNavigate();
  return (
    <section className="card recent-pendencies">
      <div className="card__header"><div><h2>Pendências recentes</h2><p>Itens que precisam da sua atenção</p></div><span className="attention-count"><AlertTriangle size={13} /> 12 prioritárias</span></div>
      <div className="recent-pendencies__list">
        {pendingItems.map((item) => (
          <div className="recent-pendencies__item" key={item.id}>
            <div><strong>{item.document}</strong><span>{item.supplier}</span></div>
            <p>{item.reason}</p>
            <StatusBadge status={item.priority} />
            <Button variant="secondary" size="sm" onClick={() => navigate('/app/pendencias')}>{item.action}</Button>
          </div>
        ))}
      </div>
      <button className="recent-pendencies__all" onClick={() => navigate('/app/pendencias')}>Ver todas as pendências <ArrowRight size={14} /></button>
    </section>
  );
}
