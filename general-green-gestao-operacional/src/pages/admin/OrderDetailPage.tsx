import { AlertCircle, ArrowLeft, CalendarDays, Check, ChevronRight, ClipboardCheck, Clock3, FileText, MapPin, MessageSquareText, MoreHorizontal, Smartphone, Target, UsersRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { orders } from '../../data/mockData';

export function OrderDetailPage() {
  const { id = '2026-0148' } = useParams();
  const order = orders.find((item) => item.id === id) ?? orders[0];
  return (
    <div>
      <PageHeader title={`OS #${order.id}`} subtitle={`${order.service} · ${order.plant}`} actions={<><Link to="/admin/orders" className="button button--secondary"><ArrowLeft size={17} /> Ordens</Link><button className="icon-button"><MoreHorizontal size={19} /></button></>} />
      <section className="detail-hero panel"><div><StatusBadge status={order.status} /><span className="detail-hero__client">{order.client}</span><h2>{order.service}</h2><p><MapPin size={15} /> {order.plant} · Paracatu, MG</p></div><div className="detail-progress"><div><span>Progresso da execução</span><strong>{order.progress}%</strong></div><span><i style={{ width: `${order.progress}%` }} /></span><small>{order.production} realizados de {order.target}</small></div></section>
      <section className="order-pipeline"><div className="done"><span><Check /></span><strong>Emitida</strong><small>25 ago. · 16:22</small></div><ChevronRight /><div className="done"><span><Check /></span><strong>Recebida</strong><small>26 ago. · 07:41</small></div><ChevronRight /><div className="active"><span><Smartphone /></span><strong>Em execução</strong><small>Iniciada às 07:54</small></div><ChevronRight /><div><span><ClipboardCheck /></span><strong>Revisão</strong><small>Aguardando envio</small></div><ChevronRight /><div><span><FileText /></span><strong>Relatório</strong><small>Após aprovação</small></div></section>
      <div className="detail-grid">
        <section className="panel"><div className="panel__header"><div><h2>Dados da atividade</h2><p>Planejamento e mobilização da equipe</p></div></div><div className="info-grid"><div><CalendarDays /><span><small>Data programada</small><strong>{order.date}</strong></span></div><div><UsersRound /><span><small>Equipe responsável</small><strong>{order.team}</strong></span></div><div><Target /><span><small>Meta planejada</small><strong>{order.target}</strong></span></div><div><Clock3 /><span><small>Janela de execução</small><strong>07:30 — 17:00</strong></span></div></div><div className="detail-description"><small>ESCOPO</small><p>Executar roçagem da vegetação entre as fileiras de módulos dos blocos B04 a B09, preservando canaletas, sinalizações e ativos elétricos.</p></div></section>
        <aside className="panel live-card"><div className="panel__header"><div><h2>Equipe em campo</h2><p>Última atualização há 3 min</p></div><span className="live-dot">AO VIVO</span></div><div className="team-person"><span className="avatar">CO</span><span><strong>Carlos Oliveira</strong><small>Líder · Equipe Norte</small></span></div><div className="location-preview"><MapPin size={22} /><span><strong>Bloco B07</strong><small>-17.195832, -46.864107</small></span></div><Link to="/admin/operations">Acompanhar operação <ChevronRight size={16} /></Link></aside>
        <section className="panel checklist-overview"><div className="panel__header"><div><h2>Checklist operacional</h2><p>4 de 6 itens concluídos</p></div><strong>67%</strong></div><div className="progress-bar"><i style={{ width: '67%' }} /></div>{['Realizar APR', 'Confirmar isolamento da área', 'Registrar fotografia inicial', 'Verificar equipamentos'].map((item) => <div className="check-row done" key={item}><Check size={15} /><span>{item}</span></div>)}{['Registrar produção final', 'Registrar fotografia final'].map((item) => <div className="check-row" key={item}><span /><span>{item}</span></div>)}</section>
        <aside className="panel note-card"><div className="panel__header"><div><h2>Observações</h2><p>Comunicação com a equipe</p></div><MessageSquareText size={19} /></div><div className="note"><span>CO</span><p><strong>Carlos Oliveira · 11:48</strong>Área do bloco B08 com vegetação mais densa. Mantida execução dentro do prazo previsto.</p></div><button className="button button--secondary"><MessageSquareText size={16} /> Adicionar observação</button><div className="safety-note"><AlertCircle size={17} /><span>APR registrada e validada às 07:52.</span></div></aside>
      </div>
    </div>
  );
}
