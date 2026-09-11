import { Brush, Download, Eraser, Hand, Minus, Plus, Redo2, Ruler, Save, Scan, Undo2 } from 'lucide-react';
import type { PaintStatus, PaintTool } from './types';
import { PAINT_STATUS_META } from './types';

export function EditorToolbar({
  tool, onToolChange, brushWidth, onBrushWidthChange, status, onStatusChange, color, onColorChange,
  zoom, onZoomChange, onFit, canUndo, canRedo, onUndo, onRedo, onSave, onExport,
}: {
  tool: PaintTool;
  onToolChange: (tool: PaintTool) => void;
  brushWidth: number;
  onBrushWidthChange: (width: number) => void;
  status: PaintStatus;
  onStatusChange: (status: PaintStatus) => void;
  color: string;
  onColorChange: (color: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onFit: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
}) {
  const selectStatus = (next: PaintStatus) => {
    onStatusChange(next);
    onColorChange(PAINT_STATUS_META[next].color);
  };
  return (
    <div className="plant-toolbar" aria-label="Ferramentas da planta">
      <div className="tool-group tool-group--modes">
        <button aria-label="Mover" className={tool === 'move' ? 'active' : ''} onClick={() => onToolChange('move')}><Hand size={17} /><span>Mover</span></button>
        <button aria-label="Pincel" className={tool === 'brush' ? 'active' : ''} onClick={() => onToolChange('brush')}><Brush size={17} /><span>Pincel</span></button>
        <button aria-label="Borracha" className={tool === 'eraser' ? 'active' : ''} onClick={() => onToolChange('eraser')}><Eraser size={17} /><span>Borracha</span></button>
        <button aria-label="Calibrar distância" className={tool === 'calibrate' ? 'active' : ''} onClick={() => onToolChange('calibrate')}><Ruler size={17} /><span>Calibrar</span></button>
      </div>
      <span className="toolbar-divider" />
      <div className="tool-group brush-size-control"><small>Tamanho</small><button aria-label="Diminuir pincel" onClick={() => onBrushWidthChange(Math.max(0.012, brushWidth - 0.012))}><Minus size={15} /></button><i style={{ width: `${Math.max(8, brushWidth * 240)}px`, height: `${Math.max(8, brushWidth * 240)}px` }} /><button aria-label="Aumentar pincel" onClick={() => onBrushWidthChange(Math.min(0.14, brushWidth + 0.012))}><Plus size={15} /></button></div>
      <div className="tool-group status-control"><label><small>Status</small><select aria-label="Status da pintura" value={status} onChange={(event) => selectStatus(event.target.value as PaintStatus)}>{Object.entries(PAINT_STATUS_META).map(([key, meta]) => <option key={key} value={key}>{meta.label}</option>)}</select></label><label className="color-control" title="Cor da pintura"><span style={{ background: color }} /><input aria-label="Cor da pintura" type="color" value={color} onChange={(event) => onColorChange(event.target.value)} /></label></div>
      <span className="toolbar-spacer" />
      <div className="tool-group tool-group--compact"><button aria-label="Desfazer" disabled={!canUndo} onClick={onUndo}><Undo2 size={17} /></button><button aria-label="Refazer" disabled={!canRedo} onClick={onRedo}><Redo2 size={17} /></button></div>
      <div className="tool-group zoom-control"><button aria-label="Diminuir zoom" onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}><Minus size={16} /></button><span>{Math.round(zoom * 100)}%</span><button aria-label="Aumentar zoom" onClick={() => onZoomChange(Math.min(2.5, zoom + 0.1))}><Plus size={16} /></button><button aria-label="Ajustar à tela" title="Ajustar à tela" onClick={onFit}><Scan size={17} /></button></div>
      <button className="toolbar-export" onClick={onExport}><Download size={16} /> Exportar</button>
      <button className="toolbar-save" aria-label="Salvar alterações" onClick={onSave}><Save size={16} /> Salvar</button>
    </div>
  );
}
