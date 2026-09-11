import { CalendarDays, Edit3, FileText, Map, MoreVertical, Plus, Ruler, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { calculateAreaSummary } from '../../features/plants/area';
import { PlantFormModal } from '../../features/plants/PlantFormModal';
import { usePlants, type PlantDraft } from '../../features/plants/PlantsContext';
import type { PlantMap } from '../../features/plants/types';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
}

export function PlantsPage() {
  const { plants, addPlant, updatePlant, deletePlant, storageError } = usePlants();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PlantMap | undefined>();
  const [menuPlant, setMenuPlant] = useState<string | null>(null);
  const totals = useMemo(() => plants.map((plant) => ({
    id: plant.id,
    area: calculateAreaSummary(plant.strokes, plant.sessions, plant.pages, plant.scale, plant.calibration),
  })), [plants]);

  const openCreate = () => { setEditing(undefined); setModalOpen(true); };
  const handleSubmit = (draft: PlantDraft) => {
    if (editing) updatePlant(editing.id, draft);
    else addPlant(draft);
  };

  return (
    <div className="plants-page">
      <PageHeader title="Plantas e Mapas" subtitle="Acompanhe visualmente a execução dos serviços nas plantas técnicas das UFVs." actions={<button className="button button--primary" onClick={openCreate}><Plus size={17} /> Adicionar planta</button>} />
      {storageError ? <div className="inline-alert" role="alert">{storageError}</div> : null}
      <section className="plants-overview">
        <article><span><FileText size={19} /></span><div><strong>{plants.length}</strong><small>Plantas cadastradas</small></div></article>
        <article><span><Map size={19} /></span><div><strong>{new Set(plants.map((plant) => plant.ufv)).size}</strong><small>UFVs monitoradas</small></div></article>
        <article><span><Ruler size={19} /></span><div><strong>{totals.reduce((sum, item) => sum + item.area.totalHa, 0).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ha</strong><small>Área total marcada</small></div></article>
      </section>
      <section className="plants-grid" aria-label="Plantas cadastradas">
        {plants.map((plant) => {
          const summary = totals.find((item) => item.id === plant.id)!.area;
          const completed = summary.byStatus.completed.ha;
          const progress = plant.expectedAreaHa ? Math.min(100, completed / plant.expectedAreaHa * 100) : undefined;
          return (
            <article className="plant-card" key={plant.id}>
              <header><span className="plant-card__icon"><FileText size={21} /></span><span className="status-badge status-badge--ativo"><i /> Ativa</span><div className="plant-card__menu"><button className="icon-button" aria-label={`Ações de ${plant.name}`} onClick={() => setMenuPlant(menuPlant === plant.id ? null : plant.id)}><MoreVertical size={18} /></button>{menuPlant === plant.id ? <div><button onClick={() => { setEditing(plant); setModalOpen(true); setMenuPlant(null); }}><Edit3 size={15} /> Editar informações</button><button className="danger" onClick={() => { if (window.confirm(`Excluir ${plant.name}?`)) deletePlant(plant.id); }}><Trash2 size={15} /> Excluir</button></div> : null}</div></header>
              <p className="eyebrow">{plant.ufv}</p>
              <h2>{plant.name}</h2>
              <p className="plant-card__project">{plant.project || 'Sem projeto relacionado'}</p>
              <dl><div><dt>Escala</dt><dd>1:{plant.scale}</dd></div><div><dt>Importada em</dt><dd>{formatDate(plant.importedAt)}</dd></div><div><dt>Área marcada</dt><dd>{summary.totalHa.toLocaleString('pt-BR', { maximumFractionDigits: 3 })} ha</dd></div><div><dt>Atualização</dt><dd>{formatDate(plant.updatedAt)}</dd></div></dl>
              {progress !== undefined ? <div className="plant-card__progress"><div><span>Execução concluída</span><strong>{progress.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</strong></div><span><i style={{ width: `${progress}%` }} /></span></div> : null}
              <footer><span><CalendarDays size={15} /> {plant.sessions.length} {plant.sessions.length === 1 ? 'sessão' : 'sessões'}</span><Link to={`/admin/plants/${plant.id}`}>Abrir planta</Link></footer>
            </article>
          );
        })}
        <button className="plant-add-card" onClick={openCreate}><span><Plus size={23} /></span><strong>Adicionar nova planta</strong><small>Importe um PDF técnico e configure a escala</small></button>
      </section>
      <PlantFormModal open={modalOpen} plant={editing} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
}
