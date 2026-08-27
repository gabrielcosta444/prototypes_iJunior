import { AlertTriangle, CheckCircle2, ChevronDown, Clock3, FileWarning, Search, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { ResolutionDrawer } from '../../components/pendencies/ResolutionDrawer';
import { Button } from '../../components/ui/Button';
import { MetricCard } from '../../components/ui/MetricCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { PendingItem } from '../../types/domain';

export function PendenciesPage() {
  const { pendingItems, showToast } = usePrototype();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PendingItem | null>(null);
  const [completion, setCompletion] = useState<string | null>(null);
  const [reprocessing, setReprocessing] = useState<string | null>(null);
  function reprocess(item: PendingItem) { setReprocessing(item.id); window.setTimeout(() => { setReprocessing(null); showToast('Documento reprocessado e enviado ao SharePoint'); }, 700); }
  return (
    <div className="pendencies-page">
      <PageHeader title="Pendências" subtitle="Documentos que precisam de intervenção antes de concluir o processamento." />
      <section className="pendency-metrics"><MetricCard label="Pendências abertas" value="43" helper="8,7% a menos que ontem" icon={FileWarning} tone="amber" trend="up" /><MetricCard label="Alta prioridade" value="12" helper="4 requerem ação imediata" icon={ShieldAlert} tone="red" /><MetricCard label="Tempo médio de resolução" value="2h 14min" helper="Dentro da meta de 4 horas" icon={Clock3} tone="blue" /></section>
      {completion && <section className="completion-banner"><span><CheckCircle2 size={22} /></span><div><strong>Documento classificado e processamento concluído</strong><p>A decisão manual foi aplicada e a nova automação já está ativa.</p><button onClick={() => navigate('/app/regras')}>{completion}</button></div><Button variant="secondary" size="sm" onClick={() => navigate('/app/documentos/nfe-23781')}>Ver documento</Button></section>}
      <section className="pendency-filters card"><label><Search size={15} /><input placeholder="Buscar documento ou fornecedor..." /></label>{['Prioridade', 'Motivo', 'Fornecedor'].map((filter) => <button key={filter}>{filter}<ChevronDown size={13} /></button>)}</section>
      <section className="data-card"><div className="table-scroll"><table className="data-table pendency-table"><thead><tr><th>Documento</th><th>Fornecedor</th><th>Motivo</th><th>Origem</th><th>Data</th><th>Prioridade</th><th>Ação</th></tr></thead><tbody>{pendingItems.map((item) => <tr key={item.id}><td><strong>{item.document}</strong></td><td>{item.supplier}</td><td><div className="reason-cell"><AlertTriangle size={14} />{item.reason}</div></td><td>{item.origin}</td><td>{item.date}</td><td><StatusBadge status={item.priority} /></td><td><Button size="sm" variant={item.action === 'Resolver' ? 'secondary' : 'primary'} loading={reprocessing === item.id} onClick={() => item.action === 'Resolver' ? setSelected(item) : reprocess(item)}>{item.action}</Button></td></tr>)}</tbody></table></div><footer className="table-footer"><span>Mostrando {pendingItems.length} de 43 pendências</span><span>Atualizado agora</span></footer></section>
      {selected && <ResolutionDrawer item={selected} onClose={() => setSelected(null)} onResolved={(rule) => { setSelected(null); setCompletion(rule ?? 'Classificação manual'); }} />}
    </div>
  );
}
