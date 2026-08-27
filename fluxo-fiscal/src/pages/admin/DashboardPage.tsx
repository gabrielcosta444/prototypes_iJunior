import { AlertTriangle, CalendarDays, CircleX, FileCheck2, Files } from 'lucide-react';
import { IntegrationSummary } from '../../components/dashboard/IntegrationSummary';
import { OriginDonut } from '../../components/dashboard/OriginDonut';
import { ProcessingStatus } from '../../components/dashboard/ProcessingStatus';
import { RecentPendencies } from '../../components/dashboard/RecentPendencies';
import { VolumeChart } from '../../components/dashboard/VolumeChart';
import { MetricCard } from '../../components/ui/MetricCard';
import { PageHeader } from '../../components/ui/PageHeader';

export function DashboardPage() {
  return (
    <div className="dashboard-page">
      <PageHeader title="Visão Geral" subtitle="Acompanhe a operação documental da Allebras em tempo real." actions={<button className="period-select"><CalendarDays size={15} />Últimos 30 dias<span>⌄</span></button>} />
      <section className="metrics-grid">
        <MetricCard label="Documentos recebidos" value="1.284" helper="12,4% em relação ao período anterior" icon={Files} tone="blue" trend="up" />
        <MetricCard label="Processados" value="1.167" helper="90,9% do total" icon={FileCheck2} tone="green" />
        <MetricCard label="Pendências" value="43" helper="12 aguardando ação" icon={AlertTriangle} tone="amber" />
        <MetricCard label="Erros" value="8" helper="3 integrações impactadas" icon={CircleX} tone="red" />
      </section>

      <section className="dashboard-primary-grid">
        <article className="card dashboard-volume">
          <div className="card__header"><div><h2>Volume de documentos</h2><p>Recebidos e processados nos últimos 30 dias</p></div><div className="chart-legend"><span><i className="legend-dot legend-dot--blue" />Recebidos</span><span><i className="legend-dot legend-dot--cyan" />Processados</span></div></div>
          <div className="card__body"><VolumeChart /></div>
        </article>
        <article className="card dashboard-origin">
          <div className="card__header"><div><h2>Documentos por origem</h2><p>Distribuição das fontes de captura</p></div></div>
          <div className="card__body"><OriginDonut /></div>
        </article>
      </section>

      <section className="dashboard-secondary-grid">
        <article className="card dashboard-processing"><div className="card__header"><div><h2>Status de processamento</h2><p>Distribuição atual da operação</p></div></div><div className="card__body"><ProcessingStatus /></div></article>
        <IntegrationSummary />
      </section>
      <RecentPendencies />
    </div>
  );
}
