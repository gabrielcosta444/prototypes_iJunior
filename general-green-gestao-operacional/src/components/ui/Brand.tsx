import { Leaf } from 'lucide-react';

type BrandProps = { compact?: boolean; light?: boolean };

export function Brand({ compact = false, light = false }: BrandProps) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''} ${light ? 'brand--light' : ''}`} aria-label="General Green">
      <span className="brand__mark"><Leaf size={compact ? 18 : 22} strokeWidth={2.4} /></span>
      <span className="brand__wordmark">
        <strong>GENERAL</strong>
        {!compact && <strong>GREEN</strong>}
      </span>
    </div>
  );
}
