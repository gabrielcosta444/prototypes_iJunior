import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';

export function NewRulePage() {
  const navigate = useNavigate();
  const { addRule, showToast } = usePrototype();
  const [name, setName] = useState('Morganite — Matéria-prima');
  const [secondCondition, setSecondCondition] = useState(true);
  function save() {
    addRule({ priority: 1, name: name || 'Morganite — Matéria-prima', conditions: ['Fornecedor = Morganite Brasil', ...(secondCondition ? ['CFOP = 5101'] : [])], category: 'Matéria-prima', applications: 0, active: true });
    showToast('Regra salva com sucesso');
    window.setTimeout(() => navigate('/app/regras'), 650);
  }
  return (
    <div className="new-rule-page">
      <button className="back-link" onClick={() => navigate('/app/regras')}><ArrowLeft size={15} />Voltar para regras</button>
      <PageHeader title="Nova Regra de Classificação" subtitle="Defina as condições que o sistema usará para classificar documentos automaticamente." />
      <section className="rule-builder-layout">
        <div className="rule-builder card">
          <div className="rule-builder__section"><span className="builder-step">1</span><div><h2>Identificação da regra</h2><p>Use um nome que facilite encontrar esta automação.</p><label className="field-label">Nome da regra<input value={name} onChange={(event) => setName(event.target.value)} /></label></div></div>
          <div className="rule-builder__divider" />
          <div className="rule-builder__section"><span className="builder-step">2</span><div><h2>Se</h2><p>Defina quando esta regra deve ser aplicada.</p><div className="condition-row"><select aria-label="Campo da primeira condição"><option>Fornecedor</option></select><select aria-label="Operador da primeira condição"><option>é igual a</option></select><select aria-label="Valor da primeira condição"><option>Morganite Brasil</option></select></div>{secondCondition && <><span className="and-chip">E</span><div className="condition-row"><select><option>CFOP</option></select><select><option>é igual a</option></select><input defaultValue="5101" /><button aria-label="Remover condição" onClick={() => setSecondCondition(false)}><Trash2 size={15} /></button></div></>} {!secondCondition && <Button variant="secondary" size="sm" icon={<Plus size={14} />} onClick={() => setSecondCondition(true)}>Adicionar condição</Button>}</div></div>
          <div className="rule-builder__divider" />
          <div className="rule-builder__section"><span className="builder-step builder-step--then"><ArrowRight size={14} /></span><div><h2>Então</h2><p>Escolha como documentos correspondentes serão organizados.</p><div className="result-grid"><label>Categoria<select><option>Matéria-prima</option></select></label><label>Unidade<select><option>Manter identificada</option></select></label><label>Destino<select><option>Automático</option></select></label><label>Prioridade<select><option>Alta</option></select></label></div></div></div>
          <footer><Button variant="secondary" onClick={() => navigate('/app/regras')}>Cancelar</Button><Button icon={<CheckCircle2 size={16} />} onClick={save}>Salvar regra</Button></footer>
        </div>
        <aside className="rule-simulator"><div className="rule-simulator__head"><Sparkles size={17} /><div><h3>Prévia da automação</h3><p>Como o sistema interpretará esta regra</p></div></div><div className="simulator-flow"><span>Documento recebido</span><ArrowRight size={14} /><div><small>SE</small><strong>Morganite Brasil</strong><strong>CFOP 5101</strong></div><ArrowRight size={14} /><div className="simulator-result"><small>ENTÃO</small><strong>Matéria-prima</strong></div></div><p><CheckCircle2 size={14} />Esta regra tem alta especificidade e terá precedência sobre regras genéricas.</p></aside>
      </section>
    </div>
  );
}
