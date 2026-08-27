import { Layers3 } from 'lucide-react';

export function Brand({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <div className={`brand ${inverse ? 'brand--inverse' : ''} ${compact ? 'brand--compact' : ''}`}>
      <span className="brand__mark"><Layers3 size={21} strokeWidth={2.2} /></span>
      {!compact && (
        <span className="brand__copy">
          <strong>Fluxo Fiscal</strong>
          <small>Gestão e automação documental</small>
        </span>
      )}
    </div>
  );
}
