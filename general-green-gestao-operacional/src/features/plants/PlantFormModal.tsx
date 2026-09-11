import { FileText, Info, Upload, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import type { PlantDraft } from './PlantsContext';
import type { PlantMap } from './types';

const scaleOptions = [500, 750, 1000, 1500, 2000];

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Não foi possível ler o PDF.'));
    reader.readAsDataURL(file);
  });
}

export function PlantFormModal({ open, plant, onClose, onSubmit }: {
  open: boolean;
  plant?: PlantMap;
  onClose: () => void;
  onSubmit: (draft: PlantDraft) => void;
}) {
  const [name, setName] = useState('');
  const [ufv, setUfv] = useState('');
  const [project, setProject] = useState('');
  const [scaleOption, setScaleOption] = useState('1000');
  const [customScale, setCustomScale] = useState('');
  const [expectedArea, setExpectedArea] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(plant?.name ?? '');
    setUfv(plant?.ufv ?? '');
    setProject(plant?.project ?? '');
    const isPreset = plant ? scaleOptions.includes(plant.scale) : true;
    setScaleOption(isPreset ? String(plant?.scale ?? 1000) : 'custom');
    setCustomScale(isPreset ? '' : String(plant?.scale ?? ''));
    setExpectedArea(plant?.expectedAreaHa ? String(plant.expectedAreaHa) : '');
    setFile(null);
    setError('');
  }, [open, plant]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const scale = Number(scaleOption === 'custom' ? customScale : scaleOption);
    const validFile = plant || (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')));
    if (!name.trim() || !ufv.trim() || !validFile) {
      setError('Preencha nome, UFV e selecione um PDF válido.');
      return;
    }
    if (!Number.isFinite(scale) || scale <= 0) {
      setError('Informe uma escala válida.');
      return;
    }

    setSubmitting(true);
    try {
      const pdfData = file ? await fileToDataUrl(file) : plant?.pdfData;
      onSubmit({
        name: name.trim(),
        ufv: ufv.trim(),
        project: project.trim() || undefined,
        scale,
        expectedAreaHa: Number(expectedArea) > 0 ? Number(expectedArea) : undefined,
        pdfName: file?.name ?? plant?.pdfName ?? '',
        pdfData,
      });
      onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Não foi possível importar o PDF.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop plant-modal-backdrop" role="presentation">
      <section className="modal plant-form-modal" role="dialog" aria-modal="true" aria-labelledby="plant-modal-title">
        <header className="modal__header">
          <div><span className="modal-icon"><FileText size={20} /></span><div><h2 id="plant-modal-title">{plant ? 'Editar planta' : 'Adicionar planta'}</h2><p>{plant ? 'Atualize os dados de identificação e medição.' : 'Importe o PDF e configure sua escala de medição.'}</p></div></div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="modal__body plant-form-grid">
            {error ? <p className="form-alert" role="alert">{error}</p> : null}
            <label className="field field--wide"><span>Nome da planta</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Planta geral — Setor Norte" /></label>
            <label className="field"><span>UFV</span><input value={ufv} onChange={(event) => setUfv(event.target.value)} placeholder="Ex.: UFV Sol do Cerrado" /></label>
            <label className="field"><span>Projeto/contrato <small>Opcional</small></span><input value={project} onChange={(event) => setProject(event.target.value)} placeholder="Selecione ou digite" /></label>
            <label className="field"><span>Escala</span><select value={scaleOption} onChange={(event) => setScaleOption(event.target.value)}>{scaleOptions.map((scale) => <option value={scale} key={scale}>1:{scale}</option>)}<option value="custom">Personalizada</option></select></label>
            {scaleOption === 'custom' ? <label className="field"><span>Denominador da escala</span><div className="scale-input"><b>1 :</b><input aria-label="Denominador da escala" inputMode="numeric" value={customScale} onChange={(event) => setCustomScale(event.target.value)} /></div></label> : <label className="field"><span>Área prevista <small>Opcional</small></span><div className="suffix-input"><input aria-label="Área prevista" inputMode="decimal" value={expectedArea} onChange={(event) => setExpectedArea(event.target.value)} /><b>ha</b></div></label>}
            {scaleOption === 'custom' ? <label className="field field--wide"><span>Área prevista <small>Opcional</small></span><div className="suffix-input"><input inputMode="decimal" value={expectedArea} onChange={(event) => setExpectedArea(event.target.value)} /><b>ha</b></div></label> : null}
            <div className="scale-hint field--wide"><Info size={17} /><p>Na escala 1:{scaleOption === 'custom' ? customScale || 'N' : scaleOption}, cada unidade medida na planta representa {scaleOption === 'custom' ? customScale || 'N' : scaleOption} unidades no ambiente real.</p></div>
            <label className="pdf-dropzone field--wide"><input aria-label="Arquivo PDF" type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /><Upload size={24} /><span><strong>{file?.name ?? (plant?.pdfName || 'Selecione ou arraste o arquivo PDF')}</strong><small>PDF técnico da planta · armazenado sem alterações</small></span></label>
          </div>
          <footer className="modal__footer"><button type="button" className="button button--secondary" onClick={onClose}>Cancelar</button><button type="submit" className="button button--primary" disabled={submitting}>{submitting ? 'Importando…' : plant ? 'Salvar alterações' : 'Importar planta'}</button></footer>
        </form>
      </section>
    </div>
  );
}
