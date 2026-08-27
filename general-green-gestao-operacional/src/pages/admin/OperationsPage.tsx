import { AlertTriangle, ChevronRight, Filter, Map, MapPin, RefreshCcw, Search, Signal, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { orders } from '../../data/mockData';

const lanes = [
  { status: 'programada', title: 'Programadas', accent: 'neutral' },
  { status: 'em-execucao', title: 'Em execução', accent: 'blue' },
  { status: 'aguardando-revisao', title: 'Em revisão', accent: 'orange' },
  { status: 'concluida', title: 'Concluídas', accent: 'green' },
] as const;

export function OperationsPage() {
  return (
    <div>
      <PageHeader title="Operações" subtitle="Visão operacional das equipes e atividades em campo." actions={<button className="button button--secondary"><Map size={17} /> Visão no mapa</button>} />
      <div className="operation-toolbar"><div className="search-box"><Search size={17} /><input placeholder="Buscar OS, equipe ou UFV..." /></div><button className="filter-button"><Filter size={16} /> Todos os projetos</button><div className="sync-summary"><Signal size={15} /><span><strong>3 equipes online</strong><small>Atualizado agora</small></span></div></div>
      <section className="kanban">
        {lanes.map((lane) => { const laneOrders = orders.filter((order) => order.status === lane.status).slice(0, 3); return <div className={`kanban__lane kanban__lane--${lane.accent}`} key={lane.status}><header><span><i />{lane.title}</span><strong>{laneOrders.length}</strong></header><div className="kanban__cards">{laneOrders.map((order) => <Link className="kanban-card" to={order.status === 'aguardando-revisao' ? `/admin/review/${order.id}` : `/admin/orders/${order.id}`} key={order.id}><div className="kanban-card__top"><strong>OS #{order.id.slice(-4)}</strong><StatusBadge status={order.status} /></div><h3>{order.service}</h3><p><MapPin size={14} />{order.plant}</p><div className="kanban-card__team"><span className="avatar">{order.team === 'Equipe Norte' ? 'EN' : order.team === 'Equipe Sul' ? 'ES' : 'E3'}</span><span><strong>{order.team}</strong><small>{order.date}</small></span></div><div className="kanban-card__progress"><span><i style={{ width: `${order.progress}%` }} /></span><small>{order.progress}%</small></div><footer><span>{order.production} / {order.target}</span><ChevronRight size={15} /></footer></Link>)}</div></div>; })}
      </section>
      <section className="operations-footer"><span><RefreshCcw size={16} /> Atualização automática a cada 2 minutos</span><span><UsersRound size={16} /> 21 profissionais mobilizados</span><span><AlertTriangle size={16} /> 1 atividade com atenção</span></section>
    </div>
  );
}
