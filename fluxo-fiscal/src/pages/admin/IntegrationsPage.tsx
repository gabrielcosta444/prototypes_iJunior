import { Activity, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { usePrototype } from '../../app/PrototypeContext';
import { IntegrationCard } from '../../components/integrations/IntegrationCard';
import { IntegrationDetailDrawer } from '../../components/integrations/IntegrationDetailDrawer';
import { PageHeader } from '../../components/ui/PageHeader';
import { integrationActivity } from '../../data/mockData';
import type { IntegrationRecord } from '../../types/domain';

export function IntegrationsPage() {
  const { integrations, syncIntegration, showToast } = usePrototype();
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<IntegrationRecord | null>(null);
  function sync(integration: IntegrationRecord) {
    setLoading(integration.id);
    window.setTimeout(() => { syncIntegration(integration.id); setLoading(null); showToast('Sincronização concluída'); }, 700);
  }
  return (
    <div>
      <PageHeader title="Integrações" subtitle="Acompanhe as fontes responsáveis pela captura e arquivamento dos documentos." actions={<span className="integration-global-health"><CheckCircle2 size={15} />5 de 6 operacionais</span>} />
      <section className="integration-grid">{integrations.map((integration) => <IntegrationCard key={integration.id} integration={integration} loading={loading === integration.id} onSync={() => sync(integration)} onDetails={() => setSelected(integration)} />)}</section>
      <section className="activity-card card"><div className="card__header"><div><h2>Atividade recente</h2><p>Eventos das fontes conectadas em tempo real</p></div><span className="live-indicator"><i />Ao vivo</span></div><div className="integration-activity">{integrationActivity.map(([time, source, message], index) => <div key={`${time}-${source}`}><time>{time}</time><span className={index === 4 ? 'warning' : ''}><Activity size={13} /></span><strong>{source}</strong><p>{message}</p></div>)}</div></section>
      {selected && <IntegrationDetailDrawer integration={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
