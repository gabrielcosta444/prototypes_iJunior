import Konva from 'konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useRef, useState } from 'react';
import { Circle, Layer, Line, Stage } from 'react-konva';
import { Document, Page, pdfjs } from 'react-pdf';
import type { NormalizedPoint, PaintStatus, PaintStroke, PaintTool, PlantMap, PlantPageSize } from './types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

function technicalFallback() {
  return (
    <svg className="technical-fallback" viewBox="0 0 1000 707" role="img" aria-label="Prévia esquemática da planta técnica">
      <defs><pattern id="minor-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#edf1ee" strokeWidth="1" /></pattern><pattern id="panels" width="76" height="28" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="68" height="20" rx="1" fill="#e7edef" stroke="#73848a" strokeWidth="1" /><path d="M19 2v20M36 2v20M53 2v20" stroke="#a7b2b5" strokeWidth=".7" /></pattern></defs>
      <rect width="1000" height="707" fill="#fff" /><rect x="28" y="28" width="944" height="651" fill="url(#minor-grid)" stroke="#9aa6a0" />
      <path d="M80 135L915 168 892 565 112 540Z" fill="none" stroke="#304d45" strokeWidth="3" /><path d="M95 245L904 270M104 390L897 420" stroke="#72837d" strokeWidth="8" opacity=".35" />
      <rect x="126" y="180" width="738" height="118" fill="url(#panels)" transform="rotate(2 495 239)" /><rect x="135" y="326" width="720" height="118" fill="url(#panels)" transform="rotate(3 495 385)" /><rect x="153" y="470" width="670" height="70" fill="url(#panels)" transform="rotate(2 488 505)" />
      <g fill="#40564f" fontFamily="Arial" fontSize="13"><text x="48" y="62">GENERAL GREEN — PLANTA DE IMPLANTAÇÃO</text><text x="766" y="654">ESCALA GRÁFICA</text><text x="52" y="662">UFV SOL DO CERRADO · SETOR NORTE</text></g>
      <path d="M780 630h140M780 625v10M850 625v10M920 625v10" stroke="#40564f" strokeWidth="2" />
    </svg>
  );
}

function toFlatPoints(points: NormalizedPoint[], width: number, height: number) {
  return points.flatMap((point) => [point.x * width, point.y * height]);
}

export function PlantCanvas({
  plant, page, width, tool, brushWidth, status, color, strokes, calibrationPoints,
  onStrokeComplete, onCalibrationPoint, onPageSize, onDocumentLoad,
}: {
  plant: PlantMap;
  page: number;
  width: number;
  tool: PaintTool;
  brushWidth: number;
  status: PaintStatus;
  color: string;
  strokes: PaintStroke[];
  calibrationPoints: NormalizedPoint[];
  onStrokeComplete: (stroke: PaintStroke) => void;
  onCalibrationPoint: (point: NormalizedPoint) => void;
  onPageSize: (page: number, size: PlantPageSize) => void;
  onDocumentLoad: (pages: number) => void;
}) {
  const [drawing, setDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<NormalizedPoint[]>([]);
  const stageRef = useRef<Konva.Stage>(null);
  const logicalSize = plant.pages[page] ?? plant.pages[1] ?? { widthPoints: 841.89, heightPoints: 595.28 };
  const height = width * logicalSize.heightPoints / logicalSize.widthPoints;

  const eventPoint = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const pointer = event.target.getStage()?.getPointerPosition();
    if (!pointer) return null;
    return { x: Math.max(0, Math.min(1, pointer.x / width)), y: Math.max(0, Math.min(1, pointer.y / height)) };
  };

  const start = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const point = eventPoint(event);
    if (!point || tool === 'move') return;
    if (tool === 'calibrate') {
      onCalibrationPoint(point);
      return;
    }
    setDrawing(true);
    setCurrentPoints([point]);
  };

  const move = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!drawing) return;
    const point = eventPoint(event);
    if (!point) return;
    setCurrentPoints((current) => [...current, point]);
  };

  const finish = () => {
    if (!drawing || currentPoints.length === 0 || (tool !== 'brush' && tool !== 'eraser')) return;
    onStrokeComplete({
      id: `stroke-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      page,
      points: currentPoints,
      brushWidth,
      tool,
      status,
      color,
      opacity: 0.42,
      createdAt: new Date().toISOString(),
      user: 'Tiago Oliveira',
      sessionId: '',
    });
    setDrawing(false);
    setCurrentPoints([]);
  };

  const pageStrokes = strokes.filter((stroke) => stroke.page === page);
  return (
    <div className={`plant-document ${tool === 'move' ? 'is-panning' : ''}`} style={{ width, height }}>
      {plant.pdfData ? <Document file={plant.pdfData} loading={<div className="pdf-loading">Carregando PDF…</div>} error={<div className="pdf-error">Não foi possível renderizar este PDF.</div>} onLoadSuccess={({ numPages }) => onDocumentLoad(numPages)}><Page pageNumber={page} width={width} renderTextLayer={false} renderAnnotationLayer={false} onLoadSuccess={(pdfPage) => { const viewport = pdfPage.getViewport({ scale: 1 }); onPageSize(page, { widthPoints: viewport.width, heightPoints: viewport.height }); }} /></Document> : technicalFallback()}
      <Stage ref={stageRef} className="paint-stage" width={width} height={height} onMouseDown={start} onMouseMove={move} onMouseUp={finish} onMouseLeave={finish} onTouchStart={start} onTouchMove={move} onTouchEnd={finish}>
        <Layer>
          {pageStrokes.map((stroke) => {
            const strokeWidth = stroke.brushWidth * Math.min(width, height);
            const composite = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
            return stroke.points.length === 1
              ? <Circle key={stroke.id} x={stroke.points[0].x * width} y={stroke.points[0].y * height} radius={strokeWidth / 2} fill={stroke.color} opacity={stroke.opacity} globalCompositeOperation={composite} />
              : <Line key={stroke.id} points={toFlatPoints(stroke.points, width, height)} stroke={stroke.color} strokeWidth={strokeWidth} opacity={stroke.opacity} lineCap="round" lineJoin="round" globalCompositeOperation={composite} />;
          })}
          {currentPoints.length > 0 ? <Line points={toFlatPoints(currentPoints, width, height)} stroke={tool === 'eraser' ? '#ffffff' : color} strokeWidth={brushWidth * Math.min(width, height)} opacity={tool === 'eraser' ? 0.75 : 0.42} lineCap="round" lineJoin="round" globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'} /> : null}
        </Layer>
        <Layer listening={false}>
          {calibrationPoints.length === 2 ? <Line points={toFlatPoints(calibrationPoints, width, height)} stroke="#3276e8" strokeWidth={2} dash={[8, 6]} /> : null}
          {calibrationPoints.map((point, index) => <Circle key={`${point.x}-${point.y}`} x={point.x * width} y={point.y * height} radius={6} fill="#3276e8" stroke="#fff" strokeWidth={2} />)}
          {plant.calibration?.page === page ? <><Line points={toFlatPoints([plant.calibration.start, plant.calibration.end], width, height)} stroke="#3276e8" strokeWidth={2} dash={[8, 6]} /><Circle x={plant.calibration.start.x * width} y={plant.calibration.start.y * height} radius={5} fill="#3276e8" /><Circle x={plant.calibration.end.x * width} y={plant.calibration.end.y * height} radius={5} fill="#3276e8" /></> : null}
        </Layer>
      </Stage>
    </div>
  );
}
