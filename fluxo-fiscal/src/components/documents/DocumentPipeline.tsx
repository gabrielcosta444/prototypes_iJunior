import { Check } from 'lucide-react';

const stages = [
  ['Recebido', '08:42:01'], ['Validado', '08:42:02'], ['Classificado', '08:42:05'], ['Arquivado', '08:42:08'],
];

export function DocumentPipeline() {
  return (
    <section className="document-pipeline" aria-label="Pipeline do documento">
      {stages.map(([stage, time], index) => (
        <div className="document-pipeline__stage" key={stage}>
          <span><Check size={14} /></span><div><strong>{stage}</strong><small>{time}</small></div>
          {index < stages.length - 1 && <i />}
        </div>
      ))}
    </section>
  );
}
