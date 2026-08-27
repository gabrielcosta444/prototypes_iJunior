import { ArrowRight, CheckCircle2, FileSearch2, FolderCheck, ScanText, Waypoints } from 'lucide-react';

const stages = [
  { title: 'Captura', subtitle: '6 fontes', icon: Waypoints, items: ['Outlook', 'Portal do Fornecedor', 'NF-e', 'CT-e', 'NFS-e', 'Nomus'] },
  { title: 'Processamento', subtitle: 'Automático', icon: ScanText, items: ['Extração de dados', 'Validação', 'Deduplicação'] },
  { title: 'Organização', subtitle: 'Regras Allebras', icon: FileSearch2, items: ['Fornecedor', 'Pedido de compra', 'Classificação', 'Renomeação'] },
  { title: 'Destino', subtitle: 'Arquivamento', icon: FolderCheck, items: ['SharePoint'] },
];

export function OrchestrationFlow() {
  return (
    <section className="orchestration card">
      <div className="card__header">
        <div><h2>Fluxo de orquestração documental</h2><p>Da captura ao arquivamento, sem intervenção manual.</p></div>
        <span className="automation-badge"><CheckCircle2 size={14} /> 90,9% automatizado</span>
      </div>
      <div className="orchestration__body">
        {stages.map(({ title, subtitle, icon: Icon, items }, index) => (
          <div className={`orchestration-stage orchestration-stage--${index + 1}`} key={title}>
            <div className="orchestration-stage__head"><span><Icon size={18} /></span><div><h3>{title}</h3><small>{subtitle}</small></div></div>
            <div className="orchestration-stage__items">{items.map((item) => <span key={item}>{item}</span>)}</div>
            {index < stages.length - 1 && <span className="orchestration-stage__arrow"><ArrowRight size={17} /></span>}
          </div>
        ))}
      </div>
    </section>
  );
}
