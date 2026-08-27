import { Building2, CheckCircle2, Database, FileKey2, Info, Link2, Radio, WandSparkles } from 'lucide-react';
import { ArchiveCard } from './ArchiveCard';

const fiscalFields = [
  ['Chave de acesso', '3526 0812 3456 7800 0190 5500 1000 1458 2912 3456 7890'],
  ['CNPJ', '12.345.678/0001-90'], ['Número', '145829'], ['Série', '1'], ['Emissão', '18/08/2026'], ['Valor', 'R$ 18.420,50'], ['CFOP', '5102'],
];
const classificationFields = [
  ['Categoria', 'Matéria-prima'], ['Unidade', 'Allebras — Contagem'], ['Pedido relacionado', 'PC-2026-004812'], ['Regra aplicada', 'NF-e / Saint-Gobain / CFOP 5102'],
];

function InfoCard({ title, icon: Icon, fields }: { title: string; icon: typeof FileKey2; fields: string[][] }) {
  return <section className="info-card card"><div className="info-card__title"><span><Icon size={17} /></span><h2>{title}</h2></div><dl>{fields.map(([label, value], index) => <div className={index === 0 && value.length > 40 ? 'info-field--wide' : ''} key={label}><dt>{label}</dt><dd>{label === 'Pedido relacionado' ? <a href="#">{value}</a> : value}</dd></div>)}</dl></section>;
}

export function DocumentOverview() {
  return (
    <div className="document-overview">
      <div className="document-overview__main">
        <InfoCard title="Dados fiscais" icon={FileKey2} fields={fiscalFields} />
        <InfoCard title="Classificação" icon={WandSparkles} fields={classificationFields} />
        <section className="source-card card">
          <div className="info-card__title"><span><Radio size={17} /></span><h2>Origem do documento</h2></div>
          <div className="source-entry"><span className="source-entry__icon">NF</span><div><strong>SEFAZ</strong><p>Capturado automaticamente em 18/08/2026 às 08:42</p></div><span className="source-auto"><CheckCircle2 size={13} />Captura automática</span></div>
          <div className="consolidation-note"><Database size={18} /><div><strong>Documento também identificado no Nomus ERP</strong><p>O registro foi consolidado automaticamente para evitar duplicidade.</p></div><Link2 size={16} /></div>
        </section>
      </div>
      <aside className="document-overview__aside">
        <ArchiveCard />
        <section className="security-note"><Info size={17} /><div><strong>Rastreabilidade garantida</strong><p>Todos os eventos e origens deste documento permanecem registrados para auditoria.</p></div></section>
      </aside>
    </div>
  );
}
