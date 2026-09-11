import { CalendarDays, ChevronDown, Eye, EyeOff, Layers3, Plus } from 'lucide-react';
import type { AreaSummary, PaintSession, PaintStatus } from './types';
import { PAINT_STATUS_META } from './types';

function formatArea(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function SessionPanel({ summary, expectedAreaHa, sessions, activeSessionId, onActiveSession, onToggleSession, onAddSession, onUpdateSession }: {
  summary: AreaSummary;
  expectedAreaHa?: number;
  sessions: PaintSession[];
  activeSessionId: string;
  onActiveSession: (id: string) => void;
  onToggleSession: (id: string) => void;
  onAddSession: () => void;
  onUpdateSession: (id: string, changes: Partial<PaintSession>) => void;
}) {
  const progress = expectedAreaHa ? Math.min(100, summary.byStatus.completed.ha / expectedAreaHa * 100) : undefined;
  const active = sessions.find((session) => session.id === activeSessionId);
  return (
    <aside className="plant-editor-aside">
      <section className="execution-summary">
        <header><div><span><Layers3 size={18} /></span><div><h2>Resumo da execução</h2><p>Áreas visíveis na planta</p></div></div></header>
        <div className="summary-total"><small>Área total pintada</small><strong>{formatArea(summary.totalHa)} <b>ha</b></strong><span>{Math.round(summary.totalM2).toLocaleString('pt-BR')} m²</span></div>
        <div className="status-area-list">{(Object.keys(PAINT_STATUS_META) as PaintStatus[]).map((status) => <div key={status}><i style={{ background: PAINT_STATUS_META[status].color }} /><span>{PAINT_STATUS_META[status].label}</span><strong>{formatArea(summary.byStatus[status].ha)} ha</strong></div>)}</div>
        {progress !== undefined ? <div className="expected-progress"><div><span>Progresso concluído</span><strong>{formatArea(progress)}%</strong></div><span><i style={{ width: `${progress}%` }} /></span><small>{formatArea(summary.byStatus.completed.ha)} de {formatArea(expectedAreaHa!)} ha previstos</small></div> : null}
      </section>
      <section className="paint-session-card">
        <header><div><h2>Sessão ativa</h2><p>Dados associados aos próximos traços</p></div><ChevronDown size={17} /></header>
        <label><span>Sessão</span><select aria-label="Sessão ativa" value={activeSessionId} onChange={(event) => onActiveSession(event.target.value)}>{sessions.map((session) => <option key={session.id} value={session.id}>{session.label}</option>)}</select></label>
        {active ? <div className="session-fields"><label><span>OS relacionada</span><input aria-label="OS relacionada" value={active.orderId ?? ''} onChange={(event) => onUpdateSession(active.id, { orderId: event.target.value })} placeholder="Ex.: OS-2026-0182" /></label><label><span>Atividade</span><input aria-label="Atividade relacionada" value={active.activity ?? ''} onChange={(event) => onUpdateSession(active.id, { activity: event.target.value })} placeholder="Ex.: Roçagem" /></label><label><span>Projeto</span><input aria-label="Projeto relacionado" value={active.project ?? ''} onChange={(event) => onUpdateSession(active.id, { project: event.target.value })} /></label><label><span>Data</span><input aria-label="Data da sessão" type="date" value={active.date} onChange={(event) => onUpdateSession(active.id, { date: event.target.value })} /></label><div className="session-owner"><span>Responsável</span><strong>{active.owner}</strong></div></div> : null}
      </section>
      <section className="paint-layers-card">
        <header><div><h2>Camadas e sessões</h2><p>{sessions.length} registros de pintura</p></div><button aria-label="Nova sessão" onClick={onAddSession}><Plus size={17} /></button></header>
        <div className="paint-layer-list">{sessions.map((session) => <button className={session.id === activeSessionId ? 'active' : ''} key={session.id} onClick={() => onActiveSession(session.id)}><i style={{ background: session.color }} /><span><strong>{session.label}</strong><small><CalendarDays size={12} /> {session.activity || PAINT_STATUS_META[session.status].label}</small></span><span role="button" tabIndex={0} aria-label={`${session.visible ? 'Ocultar' : 'Exibir'} ${session.label}`} onClick={(event) => { event.stopPropagation(); onToggleSession(session.id); }}>{session.visible ? <Eye size={16} /> : <EyeOff size={16} />}</span></button>)}</div>
      </section>
    </aside>
  );
}
