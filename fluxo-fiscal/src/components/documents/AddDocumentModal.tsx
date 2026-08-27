import { FileUp, UploadCloud, X } from 'lucide-react';
import { usePrototype } from '../../app/PrototypeContext';
import { Button } from '../ui/Button';

export function AddDocumentModal({ onClose }: { onClose: () => void }) {
  const { showToast } = usePrototype();
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-document-title" onMouseDown={(event) => event.stopPropagation()}>
        <header><span><FileUp size={18} /></span><div><h2 id="add-document-title">Adicionar documento</h2><p>Inclua um arquivo manualmente na central.</p></div><button onClick={onClose} aria-label="Fechar"><X size={18} /></button></header>
        <div className="modal__body">
          <div className="mini-dropzone"><UploadCloud size={28} /><strong>Arraste o arquivo para cá</strong><span>XML, PDF ou outro formato permitido</span><Button variant="secondary" size="sm">Selecionar arquivo</Button></div>
          <label>Origem do documento<select defaultValue="manual"><option value="manual">Upload manual</option><option>Outlook</option><option>Portal do Fornecedor</option></select></label>
        </div>
        <footer><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button onClick={() => { showToast('Documento adicionado à fila de processamento'); onClose(); }}>Adicionar documento</Button></footer>
      </section>
    </div>
  );
}
