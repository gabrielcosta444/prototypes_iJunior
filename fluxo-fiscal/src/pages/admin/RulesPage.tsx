import { ArrowRight, ChevronDown, Ellipsis, GripVertical, Plus, Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

export function RulesPage() {
  const { rules } = usePrototype();
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Regras de Classificação" subtitle="Automatize a organização dos documentos com regras baseadas nos dados identificados pelo sistema." actions={<Button icon={<Plus size={16} />} onClick={() => navigate('/app/regras/nova')}>Nova regra</Button>} />
      <section className="rules-toolbar card"><label><Search size={15} /><input placeholder="Buscar regra..." /></label><button>Status<ChevronDown size={13} /></button><p><GripVertical size={13} />Arraste para alterar a prioridade</p></section>
      <section className="data-card"><div className="table-scroll"><table className="data-table rules-table"><thead><tr><th>Prioridade</th><th>Nome da regra</th><th>Condições</th><th>Categoria</th><th>Aplicações</th><th>Status</th><th>Ações</th></tr></thead><tbody>{rules.map((rule) => <tr key={`${rule.name}-${rule.priority}`}><td><div className="priority-cell"><GripVertical size={15} /><span>{rule.priority}</span></div></td><td><strong>{rule.name}</strong></td><td><div className="condition-chips">{rule.conditions.map((condition) => <span key={condition}>{condition}</span>)}</div></td><td><span className="category-arrow"><ArrowRight size={13} />{rule.category}</span></td><td><strong>{rule.applications}</strong> <small>aplicações</small></td><td><StatusBadge status="Ativo" /></td><td><button className="table-action" aria-label={`Ações de ${rule.name}`}><Ellipsis size={17} /></button></td></tr>)}</tbody></table></div></section>
    </div>
  );
}
