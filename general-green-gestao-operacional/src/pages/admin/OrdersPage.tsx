import { CalendarDays, ChevronDown, Download, Filter, MoreHorizontal, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { orders } from '../../data/mockData';

export function OrdersPage() {
  return (
    <div>
      <PageHeader title="Ordens de Serviço" subtitle="Planeje, distribua e acompanhe todas as atividades de campo." actions={<><button className="button button--secondary"><Download size={17} /> Exportar</button><Link className="button button--primary" to="/admin/orders/new"><Plus size={18} /> Nova OS</Link></>} />
      <section className="order-summary-strip"><span><strong>119</strong><small>Total no mês</small></span><span><strong>12</strong><small>Programadas</small></span><span><strong>8</strong><small>Em execução</small></span><span><strong>5</strong><small>Em revisão</small></span><span><strong>94</strong><small>Concluídas</small></span></section>
      <section className="panel table-panel">
        <div className="table-toolbar">
          <div className="search-box"><Search size={18} /><input placeholder="Buscar por OS, cliente, UFV ou equipe..." /></div>
          <button className="filter-button"><CalendarDays size={16} /> 01/08 — 31/08 <ChevronDown size={15} /></button>
          <button className="filter-button"><Filter size={16} /> Status <ChevronDown size={15} /></button>
          <button className="filter-button"><SlidersHorizontal size={16} /> Mais filtros</button>
        </div>
        <div className="data-table-wrap">
          <table className="data-table orders-table"><thead><tr><th>Ordem</th><th>Cliente / Unidade</th><th>Serviço</th><th>Data</th><th>Equipe</th><th>Progresso</th><th>Status</th><th /></tr></thead>
            <tbody>{orders.map((order) => <tr key={order.id}><td><Link to={`/admin/orders/${order.id}`}><strong>OS #{order.id}</strong><small>Emitida por Lucas Martins</small></Link></td><td><strong>{order.client}</strong><small>{order.plant}</small></td><td>{order.service}</td><td>{order.date}</td><td>{order.team}</td><td><div className="table-progress"><span><i style={{ width: `${order.progress}%` }} /></span><small>{order.progress}%</small></div></td><td><StatusBadge status={order.status} /></td><td><button className="row-action" aria-label={`Ações da OS ${order.id}`}><MoreHorizontal size={19} /></button></td></tr>)}</tbody>
          </table>
        </div>
        <footer className="table-footer"><span>Mostrando 1–9 de 119 ordens</span><div><button disabled>Anterior</button><button className="active">1</button><button>2</button><button>3</button><button>Próxima</button></div></footer>
      </section>
    </div>
  );
}
