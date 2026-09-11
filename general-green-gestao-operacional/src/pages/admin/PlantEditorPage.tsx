import { ArrowLeft, ChevronLeft, ChevronRight, Info, Ruler, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { calculateAreaSummary, createCalibration } from '../../features/plants/area';
import { EditorToolbar } from '../../features/plants/EditorToolbar';
import { PlantCanvas } from '../../features/plants/PlantCanvas';
import { usePlants } from '../../features/plants/PlantsContext';
import { SessionPanel } from '../../features/plants/SessionPanel';
import { PAINT_STATUS_META, type NormalizedPoint, type PaintSession, type PaintStatus, type PaintStroke, type PaintTool, type PlantCalibration, type PlantPageSize } from '../../features/plants/types';

const BASE_PAGE_WIDTH = 1000;

function createSession(status: PaintStatus, color: string): PaintSession {
  const now = new Date();
  return {
    id: `session-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    label: `${now.toLocaleDateString('pt-BR')} — Nova sessão`,
    status,
    color,
    date: now.toISOString().slice(0, 10),
    owner: 'Tiago Oliveira',
    visible: true,
  };
}

export function PlantEditorPage() {
  const { id } = useParams();
  const { getPlant, updatePlant } = usePlants();
  const plant = id ? getPlant(id) : undefined;
  const [tool, setTool] = useState<PaintTool>('brush');
  const [brushWidth, setBrushWidth] = useState(0.045);
  const [status, setStatus] = useState<PaintStatus>('completed');
  const [color, setColor] = useState(PAINT_STATUS_META.completed.color);
  const [zoom, setZoom] = useState(0.82);
  const [page, setPage] = useState(1);
  const [strokes, setStrokes] = useState<PaintStroke[]>(() => plant?.strokes ?? []);
  const [redoStack, setRedoStack] = useState<PaintStroke[]>([]);
  const [sessions, setSessions] = useState<PaintSession[]>(() => plant?.sessions ?? []);
  const [activeSessionId, setActiveSessionId] = useState(plant?.sessions[plant.sessions.length - 1]?.id ?? '');
  const [pages, setPages] = useState<Record<number, PlantPageSize>>(() => plant?.pages ?? {});
  const [pageCount, setPageCount] = useState(plant?.pageCount ?? 1);
  const [calibration, setCalibration] = useState<PlantCalibration | undefined>(plant?.calibration);
  const [calibrationPoints, setCalibrationPoints] = useState<NormalizedPoint[]>([]);
  const [calibrationOpen, setCalibrationOpen] = useState(false);
  const [distance, setDistance] = useState('');
  const [savedNotice, setSavedNotice] = useState('');
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') return;
      event.preventDefault();
      if (event.shiftKey) setRedoStack((future) => {
        const next = future.at(-1);
        if (!next) return future;
        setStrokes((current) => [...current, next]);
        return future.slice(0, -1);
      });
      else setStrokes((current) => {
        const removed = current.at(-1);
        if (!removed) return current;
        setRedoStack((future) => [...future, removed]);
        return current.slice(0, -1);
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const summary = useMemo(() => plant
    ? calculateAreaSummary(strokes, sessions, pages, plant.scale, calibration)
    : null, [calibration, pages, plant, sessions, strokes]);
  const visibleSessionIds = useMemo(() => new Set(sessions.filter((session) => session.visible).map((session) => session.id)), [sessions]);
  const visibleStrokes = useMemo(() => strokes.filter((stroke) => visibleSessionIds.has(stroke.sessionId)), [strokes, visibleSessionIds]);

  if (!plant || !summary) {
    return <div><PageHeader title="Planta não encontrada" subtitle="O registro pode ter sido excluído ou não está mais disponível." /><Link className="button button--secondary" to="/admin/plants"><ArrowLeft size={17} /> Voltar para plantas</Link></div>;
  }

  const setActiveSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    const session = sessions.find((item) => item.id === sessionId);
    if (session) { setStatus(session.status); setColor(session.color); }
  };

  const addStroke = (stroke: PaintStroke) => {
    setStrokes((current) => [...current, { ...stroke, sessionId: activeSessionId }]);
    setRedoStack([]);
    setSavedNotice('');
  };

  const undo = () => setStrokes((current) => {
    const removed = current.at(-1);
    if (!removed) return current;
    setRedoStack((future) => [...future, removed]);
    return current.slice(0, -1);
  });
  const redo = () => setRedoStack((future) => {
    const restored = future.at(-1);
    if (!restored) return future;
    setStrokes((current) => [...current, restored]);
    return future.slice(0, -1);
  });

  const save = () => {
    updatePlant(plant.id, { strokes, sessions, pages, pageCount, calibration });
    setSavedNotice('Alterações salvas');
  };

  const fit = () => {
    const available = (viewportRef.current?.clientWidth ?? BASE_PAGE_WIDTH) - 64;
    setZoom(Math.max(0.5, Math.min(1.4, available / BASE_PAGE_WIDTH)));
    viewportRef.current?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((current) => Math.max(0.5, Math.min(2.5, current + (event.deltaY < 0 ? 0.1 : -0.1))));
  };

  const startPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (tool !== 'move' || !viewportRef.current) return;
    panRef.current = { x: event.clientX, y: event.clientY, left: viewportRef.current.scrollLeft, top: viewportRef.current.scrollTop };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const movePan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!panRef.current || !viewportRef.current) return;
    viewportRef.current.scrollLeft = panRef.current.left - (event.clientX - panRef.current.x);
    viewportRef.current.scrollTop = panRef.current.top - (event.clientY - panRef.current.y);
  };
  const stopPan = () => { panRef.current = null; };

  const selectCalibrationPoint = (point: NormalizedPoint) => {
    setCalibrationPoints((current) => {
      const next = current.length >= 2 ? [point] : [...current, point];
      if (next.length === 2) setCalibrationOpen(true);
      return next;
    });
  };
  const confirmCalibration = () => {
    const size = pages[page] ?? plant.pages[page];
    if (!size || calibrationPoints.length !== 2) return;
    try {
      setCalibration(createCalibration(page, calibrationPoints[0], calibrationPoints[1], Number(distance), size));
      setCalibrationOpen(false);
      setCalibrationPoints([]);
      setTool('brush');
      setSavedNotice('Calibração aplicada — salve para manter');
    } catch (reason) {
      setSavedNotice(reason instanceof Error ? reason.message : 'Não foi possível calibrar.');
    }
  };

  const exportView = () => {
    const root = document.querySelector('.plant-document');
    const base = root?.querySelector<HTMLCanvasElement>('.react-pdf__Page__canvas');
    const layers = root?.querySelectorAll<HTMLCanvasElement>('.konvajs-content canvas');
    const reference = base ?? layers?.[0];
    if (!reference) { setSavedNotice('A visualização ainda está sendo preparada.'); return; }
    const output = document.createElement('canvas');
    output.width = reference.width;
    output.height = reference.height;
    const context = output.getContext('2d');
    if (!context) return;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, output.width, output.height);
    if (base) context.drawImage(base, 0, 0, output.width, output.height);
    layers?.forEach((layer) => context.drawImage(layer, 0, 0, output.width, output.height));
    const link = document.createElement('a');
    link.download = `${plant.name.replace(/\s+/g, '-').toLowerCase()}-pagina-${page}.png`;
    link.href = output.toDataURL('image/png');
    link.click();
    setSavedNotice('Visualização exportada');
  };

  const createNewSession = () => {
    const session = createSession(status, color);
    setSessions((current) => [...current, session]);
    setActiveSessionId(session.id);
    setSessionModalOpen(false);
    setSavedNotice('Nova sessão criada — salve para manter');
  };

  return (
    <div className="plant-editor-page">
      <header className="plant-editor-header"><div><Link to="/admin/plants" aria-label="Voltar para plantas"><ArrowLeft size={19} /></Link><div><span className="eyebrow">{plant.ufv} · {plant.project || 'Sem projeto'}</span><h1>{plant.name}</h1></div></div><div><span><small>ESCALA</small><strong>1:{plant.scale}</strong></span>{calibration ? <span className="calibrated-badge"><Ruler size={15} /> Calibrada</span> : null}{savedNotice ? <span className="save-notice">{savedNotice}</span> : null}</div></header>
      <EditorToolbar tool={tool} onToolChange={(next) => { setTool(next); if (next === 'calibrate') setCalibrationPoints([]); }} brushWidth={brushWidth} onBrushWidthChange={setBrushWidth} status={status} onStatusChange={setStatus} color={color} onColorChange={setColor} zoom={zoom} onZoomChange={setZoom} onFit={fit} canUndo={strokes.length > 0} canRedo={redoStack.length > 0} onUndo={undo} onRedo={redo} onSave={save} onExport={exportView} />
      {tool === 'calibrate' ? <div className="calibration-guide"><Info size={17} /><span><strong>Calibração por distância conhecida</strong> Clique no ponto inicial e depois no ponto final da medida.</span><button onClick={() => { setTool('brush'); setCalibrationPoints([]); }}><X size={16} /></button></div> : null}
      <div className="plant-editor-layout">
        <section className="plant-workspace">
          <div className={`plant-viewport ${tool === 'move' ? 'pan-mode' : ''}`} ref={viewportRef} onWheel={handleWheel} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={stopPan} onPointerCancel={stopPan}>
            <div className="plant-page-wrap"><PlantCanvas plant={{ ...plant, pages, pageCount, calibration }} page={page} width={BASE_PAGE_WIDTH * zoom} tool={tool} brushWidth={brushWidth} status={status} color={color} strokes={visibleStrokes} calibrationPoints={calibrationPoints} onStrokeComplete={addStroke} onCalibrationPoint={selectCalibrationPoint} onPageSize={(pageNumber, size) => setPages((current) => ({ ...current, [pageNumber]: size }))} onDocumentLoad={setPageCount} /></div>
          </div>
          <footer className="plant-workspace-footer"><div className="page-switcher"><button aria-label="Página anterior" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft size={17} /></button><span>Página <strong>{page}</strong> de {pageCount}</span><button aria-label="Próxima página" disabled={page >= pageCount} onClick={() => setPage((current) => current + 1)}><ChevronRight size={17} /></button></div><span>Área atualmente marcada: <strong>{summary.totalHa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ha</strong></span><small>Scroll para zoom · Modo mover para navegar</small></footer>
        </section>
        <SessionPanel summary={summary} expectedAreaHa={plant.expectedAreaHa} sessions={sessions} activeSessionId={activeSessionId} onActiveSession={setActiveSession} onToggleSession={(sessionId) => setSessions((current) => current.map((session) => session.id === sessionId ? { ...session, visible: !session.visible } : session))} onAddSession={() => setSessionModalOpen(true)} onUpdateSession={(sessionId, changes) => { setSessions((current) => current.map((session) => session.id === sessionId ? { ...session, ...changes } : session)); setSavedNotice(''); }} />
      </div>
      {calibrationOpen ? <div className="modal-backdrop"><section className="modal calibration-modal" role="dialog" aria-modal="true" aria-labelledby="calibration-title"><header className="modal__header"><div><h2 id="calibration-title">Informar distância real</h2><p>Qual é a distância entre os dois pontos?</p></div><button className="icon-button" onClick={() => setCalibrationOpen(false)}><X size={18} /></button></header><div className="modal__body"><label className="field"><span>Distância real</span><div className="suffix-input"><input autoFocus inputMode="decimal" value={distance} onChange={(event) => setDistance(event.target.value)} /><b>metros</b></div></label></div><footer className="modal__footer"><button className="button button--secondary" onClick={() => setCalibrationOpen(false)}>Cancelar</button><button className="button button--primary" onClick={confirmCalibration}>Aplicar calibração</button></footer></section></div> : null}
      {sessionModalOpen ? <div className="modal-backdrop"><section className="modal session-modal" role="dialog" aria-modal="true" aria-labelledby="session-title"><header className="modal__header"><div><h2 id="session-title">Nova sessão de pintura</h2><p>Crie um registro para organizar os próximos traços.</p></div><button className="icon-button" onClick={() => setSessionModalOpen(false)}><X size={18} /></button></header><div className="modal__body"><p>A sessão será criada com o status <strong>{PAINT_STATUS_META[status].label}</strong>, na cor selecionada e vinculada ao usuário atual. Os dados operacionais podem ser editados posteriormente.</p></div><footer className="modal__footer"><button className="button button--secondary" onClick={() => setSessionModalOpen(false)}>Cancelar</button><button className="button button--primary" onClick={createNewSession}>Criar sessão</button></footer></section></div> : null}
    </div>
  );
}
