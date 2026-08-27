import { ArrowLeft, Download, Ellipsis, FileCode2, Files, History, ListChecks, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DocumentOverview } from '../../components/documents/DocumentOverview';
import { DocumentPipeline } from '../../components/documents/DocumentPipeline';
import { ProcessingTimeline } from '../../components/documents/ProcessingTimeline';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';

type Tab = 'visao-geral' | 'arquivos' | 'processamento' | 'historico';
const tabs: { id: Tab; label: string; icon: typeof Files }[] = [
  { id: 'visao-geral', label: 'Visão geral', icon: Files }, { id: 'arquivos', label: 'Arquivos', icon: FileCode2 },
  { id: 'processamento', label: 'Processamento', icon: ListChecks }, { id: 'historico', label: 'Histórico', icon: History },
];

export function DocumentDetailPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const initial = params.get('tab') === 'historico' ? 'historico' : 'visao-geral';
  const [tab, setTab] = useState<Tab>(initial);
  function changeTab(next: Tab) { setTab(next); setParams(next === 'visao-geral' ? {} : { tab: next }); }
  return (
    <div className="document-detail-page">
      <button className="back-link" onClick={() => navigate('/app/documentos')}><ArrowLeft size={15} />Voltar para documentos</button>
      <header className="document-detail-header">
        <div className="document-detail-title"><span className="document-type-icon"><FileCode2 size={21} /></span><div><span className="document-detail-eyebrow">Nota Fiscal Eletrônica</span><div><h1>NF-e 000145829</h1><StatusBadge status="Concluído" /></div><p>Saint-Gobain do Brasil <i /> CNPJ 12.345.678/0001-90</p></div></div>
        <div className="document-detail-actions"><Button variant="secondary" icon={<Download size={15} />}>Baixar XML</Button><Button variant="secondary" icon={<RotateCcw size={15} />}>Reprocessar</Button><button className="icon-button bordered" aria-label="Mais ações"><Ellipsis size={18} /></button></div>
      </header>
      <DocumentPipeline />
      <div className="document-tabs" role="tablist">{tabs.map(({ id, label, icon: Icon }) => <button role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} key={id} onClick={() => changeTab(id)}><Icon size={15} />{label}</button>)}</div>
      {tab === 'visao-geral' && <DocumentOverview />}
      {tab === 'arquivos' && <section className="files-panel card"><h2>Arquivos do documento</h2><div><span><FileCode2 size={20} /></span><div><strong>NFe_35260812345678000190550010001458291234567890.xml</strong><small>XML · 18 KB · Validado</small></div><Button variant="secondary" size="sm">Baixar</Button></div><div><span><Files size={20} /></span><div><strong>DANFE_NFE_145829.pdf</strong><small>PDF · 124 KB · Gerado automaticamente</small></div><Button variant="secondary" size="sm">Visualizar</Button></div></section>}
      {tab === 'processamento' && <section className="processing-summary card"><h2>Resumo do processamento</h2><div className="processing-summary__grid"><div><ListChecks size={18} /><strong>23 campos extraídos</strong><span>100% de confiança</span></div><div><RotateCcw size={18} /><strong>4 validações aplicadas</strong><span>Nenhuma divergência</span></div><div><Files size={18} /><strong>1 registro consolidado</strong><span>Nomus ERP</span></div></div></section>}
      {tab === 'historico' && <ProcessingTimeline />}
    </div>
  );
}
