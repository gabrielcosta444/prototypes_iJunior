import { CheckCircle2, FileCode2, UploadCloud, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function UploadDropzone() {
  return (
    <section className="supplier-dropzone">
      <span className="supplier-dropzone__icon"><UploadCloud size={29} /></span>
      <h2>Arraste seus documentos para cá</h2><p>ou selecione os arquivos diretamente do seu computador</p>
      <Button variant="secondary" size="sm">Selecionar arquivos</Button>
      <small>XML, PDF e outros documentos permitidos pela Allebras · Máx. 20 MB</small>
      <div className="loaded-file"><span><FileCode2 size={20} /></span><div><strong>NFe_000023781.xml</strong><p><CheckCircle2 size={12} />Arquivo lido com sucesso · 18 KB</p></div><button aria-label="Remover arquivo"><X size={16} /></button></div>
    </section>
  );
}
