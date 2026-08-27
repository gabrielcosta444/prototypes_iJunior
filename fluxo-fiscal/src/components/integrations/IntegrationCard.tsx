import { ArrowUpRight, Clock3, RefreshCw } from 'lucide-react';
import type { IntegrationRecord } from '../../types/domain';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';

export function IntegrationCard({ integration, loading, onSync, onDetails }: { integration: IntegrationRecord; loading: boolean; onSync: () => void; onDetails: () => void }) {
  return (
    <article className={`integration-card ${integration.status === 'Atenção' ? 'integration-card--attention' : ''}`} style={{ '--integration-accent': integration.accent } as React.CSSProperties}>
      <header><span className="integration-card__logo">{integration.shortName.slice(0, 2).toUpperCase()}</span><StatusBadge status={integration.status} /></header>
      <div className="integration-card__title"><h2>{integration.name}</h2><button onClick={onDetails} aria-label={`Ver detalhes de ${integration.name}`}><ArrowUpRight size={16} /></button></div>
      <div className="integration-card__stats"><div><span>Última sincronização</span><strong><Clock3 size={13} />{integration.sync}</strong></div><div><span>{integration.volumeLabel}</span><strong>{integration.volume}</strong></div></div>
      {integration.detail && <p className="integration-card__detail">{integration.detail}</p>}
      <Button variant="secondary" size="sm" loading={loading} icon={!loading && <RefreshCw size={14} />} aria-label={`Sincronizar ${integration.name}`} onClick={onSync}>Sincronizar agora</Button>
    </article>
  );
}
