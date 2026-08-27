import { AlertTriangle, ArrowRight, Check, FileText, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { usePrototype } from '../../app/PrototypeContext';
import type { PendingItem } from '../../types/domain';
import { Button } from '../ui/Button';

const categories = ['Matéria-prima', 'Serviços', 'Fretes', 'Manutenção', 'Administrativo', 'Outros'];

export function ResolutionDrawer({ item, onClose, onResolved }: { item: PendingItem; onClose: () => void; onResolved: (ruleName?: string) => void }) {
  const { resolvePending, showToast } = usePrototype();
  const [category, setCategory] = useState('Matéria-prima');
  const [createRule, setCreateRule] = useState(true);
  const [loading, setLoading] = useState(false);
  function submit() {
    setLoading(true);
    window.setTimeout(() => {
      resolvePending(item.id, category, createRule);
      showToast('Documento classificado com sucesso');
      onResolved(createRule ? 'Morganite — Matéria-prima' : undefined);
    }, 450);
  }
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="resolution-drawer" role="dialog" aria-modal="true" aria-labelledby="resolution-title" onMouseDown={(event) => event.stopPropagation()}>
        <header><div><span className="drawer-eyebrow">Resolver pendência</span><h2 id="resolution-title">{item.document}</h2><p>{item.supplier}</p></div><button onClick={onClose} aria-label="Fechar"><X size={19} /></button></header>
        <div className="resolution-drawer__body">
          <div className="reason-alert"><AlertTriangle size={20} /><div><strong>Não foi possível determinar automaticamente a categoria deste documento.</strong><p>Revise os dados identificados e informe a classificação correta.</p></div></div>
          <section className="found-data"><div className="section-title"><FileText size={16} /><h3>Dados encontrados</h3></div><dl><div><dt>Fornecedor</dt><dd>Morganite Brasil</dd></div><div><dt>CFOP</dt><dd>5101</dd></div><div><dt>Valor</dt><dd>R$ 6.831,90</dd></div><div><dt>Pedido</dt><dd>PC-2026-004945</dd></div></dl></section>
          <label className="field-label">Selecionar categoria<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="automation-check"><input type="checkbox" checked={createRule} onChange={(event) => setCreateRule(event.target.checked)} /><span><Sparkles size={17} /></span><div><strong>Criar regra para documentos futuros semelhantes</strong><p>O sistema aplicará esta decisão automaticamente.</p></div></label>
          {createRule && <section className="rule-preview"><div className="rule-preview__head"><span><Sparkles size={14} />Nova regra</span><em>Será criada ao continuar</em></div><div className="rule-logic"><span>SE</span><div><p>Fornecedor <b>=</b> Morganite Brasil</p><p>CFOP <b>=</b> 5101</p></div><ArrowRight size={18} /><span className="then">ENTÃO</span><div><p>Categoria <b>=</b> {category}</p></div></div></section>}
        </div>
        <footer><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button loading={loading} icon={!loading && <Check size={16} />} onClick={submit}>Classificar e continuar</Button></footer>
      </aside>
    </div>
  );
}
