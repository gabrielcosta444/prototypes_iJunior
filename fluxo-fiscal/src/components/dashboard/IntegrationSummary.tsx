import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialIntegrations } from '../../data/mockData';
import { StatusBadge } from '../ui/StatusBadge';

export function IntegrationSummary() {
  return (
    <section className="card dashboard-integrations">
      <div className="card__header"><div><h2>Integrações</h2><p>Saúde das fontes conectadas</p></div><span className="live-indicator"><i />Ao vivo</span></div>
      <div className="integration-summary">
        {initialIntegrations.slice(0, 5).map((integration) => (
          <div className="integration-summary__item" key={integration.id}>
            <span className="integration-logo" style={{ '--integration-accent': integration.accent } as React.CSSProperties}>{integration.shortName.slice(0, 2).toUpperCase()}</span>
            <div><strong>{integration.name}</strong><span>Última sincronização: {integration.id === 'nfse' ? 'há 38 min' : `há ${integration.id === 'outlook' ? 1 : integration.id === 'nomus' ? 3 : integration.id === 'nfe' ? 5 : 2} min`}</span></div>
            <StatusBadge status={integration.status} />
          </div>
        ))}
      </div>
      <Link className="card-link" to="/app/integracoes">Ver todas as integrações <ArrowUpRight size={14} /></Link>
    </section>
  );
}
