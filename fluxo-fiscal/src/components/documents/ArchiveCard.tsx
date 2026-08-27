import { CheckCircle2, ExternalLink, FileCode2, FolderOpen } from 'lucide-react';
import { usePrototype } from '../../app/PrototypeContext';
import { Button } from '../ui/Button';

export function ArchiveCard() {
  const { showToast } = usePrototype();
  return (
    <section className="archive-card">
      <div className="archive-card__head"><span><FolderOpen size={18} /></span><div><h2>Arquivamento</h2><p>Destino final do documento</p></div></div>
      <div className="archive-success"><CheckCircle2 size={18} /><div><strong>Arquivado com sucesso</strong><span>18/08/2026 às 08:42:08</span></div></div>
      <dl>
        <div><dt>Arquivo final</dt><dd><FileCode2 size={14} />2026_08_SAINT-GOBAIN_NFE_145829.xml</dd></div>
        <div><dt>Destino</dt><dd>SharePoint / Fiscal / 2026 / Agosto / Matéria-prima / Saint-Gobain</dd></div>
      </dl>
      <Button variant="secondary" icon={<ExternalLink size={15} />} onClick={() => showToast('Abrindo local do arquivo no SharePoint', 'info')}>Abrir no SharePoint</Button>
    </section>
  );
}
