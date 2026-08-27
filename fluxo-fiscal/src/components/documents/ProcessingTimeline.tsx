import { CheckCircle2 } from 'lucide-react';
import { processingEvents } from '../../data/mockData';

export function ProcessingTimeline() {
  return (
    <section className="history-card card">
      <div className="card__header"><div><h2>Histórico de processamento</h2><p>Registro completo e imutável de cada etapa da automação.</p></div><span className="trace-id">ID: PROC-20260818-084201</span></div>
      <div className="processing-timeline">
        {processingEvents.map((event, index) => <div className="processing-event" key={`${event.time}-${index}`}><time>{event.time}</time><span><CheckCircle2 size={13} /></span><div><strong>{event.title}</strong>{event.description && <p>{event.description}</p>}</div></div>)}
      </div>
      <div className="processing-result"><span><CheckCircle2 size={22} /></span><div><strong>Processamento concluído em 7 segundos</strong><p>Todas as etapas foram executadas automaticamente e o documento está disponível no SharePoint.</p></div><small>100% automatizado</small></div>
    </section>
  );
}
