import { AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, ClipboardList, Gauge, MapPinned, Plus, RefreshCcw, Target, Tractor, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MetricCard } from '../../components/ui/MetricCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { orders, productionSeries, projects } from '../../data/mockData';

const pipeline = [
  { label: 'Programadas', value: 12, icon: CalendarDays, tone: 'neutral' },
  { label: 'Em campo', value: 8, icon: Tractor, tone: 'blue' },
  { label: 'Em revisão', value: 5, icon: ClipboardList, tone: 'orange' },
  { label: 'Concluídas', value: 94, icon: CheckCircle2, tone: 'green' },
];

export function DashboardPage() {
  return (
    <div className="dashboard-page">
      <PageHeader
        title="Visão Geral"
        subtitle="Acompanhe a operação da General Green em tempo real."
        actions={<><button className="select-button"><CalendarDays size={17} /> Agosto de 2026</button><Link className="button button--primary" to="/admin/orders/new"><Plus size={18} /> Nova Ordem de Serviço</Link></>}
      />

      <section className="metrics-grid">
        <MetricCard label="Ordens em andamento" value="8" hint="3 equipes em campo agora" icon={Tractor} tone="blue" />
        <MetricCard label="Produção no mês" value="152 ha" hint="84,4% da meta planejada" icon={Gauge} />
        <MetricCard label="Aguardando revisão" value="5" hint="2 com prazo para hoje" icon={ClipboardList} tone="orange" />
        <MetricCard label="Equipes ativas" value="3 / 4" hint="21 profissionais mobilizados" icon={UsersRound} tone="violet" />
      </section>

      <section className="dashboard-grid dashboard-grid--primary">
        <article className="panel chart-panel">
          <div className="panel__header"><div><h2>Produção acumulada</h2><p>Realizado x planejado · Agosto</p></div><span className="trend-positive">↗ 8,6% vs. julho</span></div>
          <div className="chart-legend"><span><i className="actual" /> Realizado</span><span><i className="planned" /> Planejado</span></div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionSeries} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <defs><linearGradient id="productionFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#168c43" stopOpacity={0.24} /><stop offset="100%" stopColor="#168c43" stopOpacity={0.01} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="#e8eee9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7b8b83', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7b8b83', fontSize: 11 }} />
                <Tooltip contentStyle={{ border: '1px solid #dfe7e1', borderRadius: 10, boxShadow: '0 8px 24px rgba(12,42,29,.08)', fontSize: 12 }} />
                <Area type="monotone" dataKey="planned" name="Planejado" stroke="#a8b4ae" strokeDasharray="5 5" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" name="Realizado" stroke="#168c43" fill="url(#productionFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel project-highlight">
          <div className="panel__header"><div><h2>Projeto em destaque</h2><p>Contrato com maior mobilização</p></div><MapPinned size={20} /></div>
          <span className="project-highlight__client">SOLARIS ENERGIA</span>
          <h3>{projects[0].plant}</h3>
          <p>{projects[0].name}</p>
          <div className="progress-heading"><span>Avanço contratual</span><strong>{projects[0].progress}%</strong></div>
          <div className="progress-bar"><i style={{ width: `${projects[0].progress}%` }} /></div>
          <div className="project-highlight__stats"><span><small>Produção</small><strong>{projects[0].production}</strong></span><span><small>Meta</small><strong>{projects[0].target}</strong></span><span><small>OS emitidas</small><strong>{projects[0].orders}</strong></span></div>
          <Link to="/admin/projects/sol-do-cerrado">Ver detalhes do projeto <ArrowRight size={15} /></Link>
        </article>
      </section>

      <section className="panel operation-overview">
        <div className="panel__header"><div><h2>Fluxo operacional</h2><p>Da programação à comprovação do serviço</p></div><Link to="/admin/operations">Abrir operações <ArrowRight size={15} /></Link></div>
        <div className="pipeline">
          {pipeline.map(({ label, value, icon: Icon, tone }, index) => <div className={`pipeline__item pipeline__item--${tone}`} key={label}><span><Icon size={20} /></span><div><strong>{value}</strong><small>{label}</small></div>{index < pipeline.length - 1 && <ArrowRight className="pipeline__arrow" size={17} />}</div>)}
        </div>
      </section>

      <section className="dashboard-grid dashboard-grid--lower">
        <article className="panel">
          <div className="panel__header"><div><h2>Operação de hoje</h2><p>Atividades de 26 de agosto</p></div><Link to="/admin/orders">Ver todas <ArrowRight size={15} /></Link></div>
          <div className="compact-table">
            {orders.slice(0, 4).map((order) => <Link to={`/admin/orders/${order.id}`} className="compact-row" key={order.id}><span className="order-symbol">OS</span><span><strong>#{order.id.slice(-4)} · {order.service}</strong><small>{order.plant} · {order.team}</small></span><span className="mini-progress"><i style={{ width: `${order.progress}%` }} /></span><StatusBadge status={order.status} /><ArrowRight size={16} /></Link>)}
          </div>
        </article>
        <article className="panel attention-panel">
          <div className="panel__header"><div><h2>Pontos de atenção</h2><p>Itens que precisam da gestão</p></div><AlertTriangle size={20} /></div>
          <div className="attention-list">
            <Link to="/admin/review/2026-0147"><span className="attention-icon attention-icon--orange"><ClipboardList size={18} /></span><span><strong>2 atividades aguardam revisão</strong><small>Prazo de validação até 18:00</small></span><ArrowRight size={16} /></Link>
            <Link to="/admin/orders/2026-0149"><span className="attention-icon attention-icon--violet"><RefreshCcw size={18} /></span><span><strong>1 dispositivo sem sincronizar</strong><small>Último contato há 2h 18min</small></span><ArrowRight size={16} /></Link>
            <Link to="/admin/projects/sol-do-cerrado"><span className="attention-icon attention-icon--green"><Target size={18} /></span><span><strong>Meta mensal em 84,4%</strong><small>28 ha restantes para o período</small></span><ArrowRight size={16} /></Link>
          </div>
        </article>
      </section>
    </div>
  );
}
