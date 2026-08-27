import { CheckCircle2, CopyCheck, FileSearch2, LoaderCircle, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DuplicateDocumentModal } from '../../components/supplier/DuplicateDocumentModal';
import { UploadDropzone } from '../../components/supplier/UploadDropzone';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';

const extracted = [['Tipo', 'NF-e'], ['Número', '000023781'], ['Fornecedor', 'Morganite Brasil'], ['CNPJ', '98.765.432/0001-12'], ['Emissão', '24/08/2026'], ['Valor', 'R$ 6.831,90']];
export function SupplierUploadPage() {
  const [params] = useSearchParams();
  const [stage, setStage] = useState<'ready' | 'validating' | 'dedupe' | 'success'>('ready');
  const [duplicate, setDuplicate] = useState(params.get('duplicado') === '1');
  function submit() { setStage('validating'); window.setTimeout(() => setStage('dedupe'), 400); window.setTimeout(() => setStage('success'), 950); }
  if (stage === 'success') return <div className="upload-success"><span><CheckCircle2 size={34} /></span><h1>Documento recebido</h1><p>Estamos processando as informações. Você pode acompanhar o andamento pela área Meus Documentos.</p><div className="success-file"><FileSearch2 size={20} /><div><strong>NF-e 000023781</strong><span>Processamento iniciado · agora</span></div><b>Processando</b></div><div className="upload-success__actions"><Button variant="secondary" onClick={() => setStage('ready')}>Enviar outro documento</Button><Button icon={<CopyCheck size={15} />} onClick={() => setDuplicate(true)}>Demonstrar deduplicação</Button></div>{duplicate && <DuplicateDocumentModal onClose={() => setDuplicate(false)} />}</div>;
  return <div className="supplier-upload"><PageHeader title="Enviar documento" subtitle="Envie arquivos fiscais ou administrativos para a Allebras." /><div className="supplier-upload__grid"><div><UploadDropzone /><section className="complementary-info card"><h2>Informações complementares</h2><p>Ajude a Allebras a relacionar este documento à operação correta.</p><div><label>Pedido de compra<input defaultValue="PC-2026-004945" /></label><label>Observação<textarea placeholder="Campo opcional" rows={3} /></label></div></section></div><aside><section className="extracted-card card"><header><span><ShieldCheck size={17} /></span><div><h2>Dados extraídos</h2><p>Identificados automaticamente no XML</p></div><b><CheckCircle2 size={13} />Validado</b></header><dl>{extracted.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><div className="upload-security"><ShieldCheck size={17} /><p>Seus arquivos são enviados por uma conexão segura e ficam acessíveis apenas para a sua empresa e a Allebras.</p></div><Button loading={stage !== 'ready'} icon={stage === 'ready' ? <Send size={16} /> : <LoaderCircle size={16} />} onClick={submit}>{stage === 'validating' ? 'Validando XML...' : stage === 'dedupe' ? 'Verificando duplicidade...' : 'Enviar documento'}</Button><button className="duplicate-demo" onClick={() => setDuplicate(true)}><CopyCheck size={14} />Simular documento duplicado</button></aside></div>{duplicate && <DuplicateDocumentModal onClose={() => setDuplicate(false)} />}</div>;
}
