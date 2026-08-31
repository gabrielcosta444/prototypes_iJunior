import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Download,
  Eye,
  FileCheck2,
  FileClock,
  FileText,
  LayoutTemplate,
  MoreHorizontal,
  Plus,
  Search,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MetricCard } from '../../components/ui/MetricCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { reports, reportTemplates } from '../../data/mockData';
import type { ReportStatus } from '../../domain/types';

const statusLabels: Record<ReportStatus, string> = {
  rascunho: 'Rascunho',
  gerado: 'Gerado',
  disponibilizado: 'Disponibilizado',
};

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'reports' | 'templates'>('reports');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'todos' | ReportStatus>('todos');
  const [client, setClient] = useState('todos');

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    return reports.filter((report) => {
      const matchesQuery = !normalizedQuery || [report.id, report.client, report.plant, report.project, report.service]
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(normalizedQuery));
      return matchesQuery
        && (status === 'todos' || report.status === status)
        && (client === 'todos' || report.client === client);
    });
  }, [client, query, status]);

  const clients = Array.from(new Set(reports.map((report) => report.client)));
  const draftCount = reports.filter((report) => report.status === 'rascunho').length;
  const generatedCount = reports.filter((report) => report.status === 'gerado').length;
  const publishedCount = reports.filter((report) => report.status === 'disponibilizado').length;

  return (
    <div className="reports-workspace">
      <PageHeader
        title="Relatórios"
        subtitle="Configure, confira e distribua entregas operacionais rastreáveis."
        actions={<Link className="button button--primary" to="/admin/reports/new"><Plus size={17} /> Gerar relatório</Link>}
      />

      <section className="metrics-grid report-metrics report-metrics--compact" aria-label="Resumo dos relatórios">
        <MetricCard label="Rascunhos" value={String(draftCount)} hint="Em preparação" icon={FileClock} tone="orange" />
        <MetricCard label="Gerados" value={String(generatedCount)} hint="Prontos para distribuir" icon={FileCheck2} tone="blue" />
        <MetricCard label="Disponibilizados" value={String(publishedCount)} hint="Publicados para clientes" icon={Send} />
      </section>

      <nav className="report-tabs" aria-label="Áreas da central de relatórios">
        <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}><FileText size={17} /> Relatórios <span>{reports.length}</span></button>
        <button className={activeTab === 'templates' ? 'active' : ''} onClick={() => setActiveTab('templates')}><LayoutTemplate size={17} /> Modelos <span>{reportTemplates.length}</span></button>
      </nav>

      {activeTab === 'reports' ? (
        <section className="panel report-library">
          <header className="report-section-header">
            <div><h2>Biblioteca de relatórios</h2><p>Versões geradas a partir de atividades revisadas e aprovadas.</p></div>
            <span><CheckCircle2 size={15} /> Histórico preservado</span>
          </header>

          <div className="report-toolbar">
            <label className="report-search"><Search size={17} /><span className="sr-only">Buscar relatórios</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar relatório, cliente, UFV ou projeto..." /></label>
            <label><span>Status do relatório</span><select aria-label="Status do relatório" value={status} onChange={(event) => setStatus(event.target.value as 'todos' | ReportStatus)}><option value="todos">Todos os status</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label><span>Cliente</span><select aria-label="Cliente" value={client} onChange={(event) => setClient(event.target.value)}><option value="todos">Todos os clientes</option>{clients.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>

          <div className="report-table-wrap">
            <table className="data-table report-table">
              <thead><tr><th>Relatório</th><th>Cliente / projeto</th><th>Período</th><th>Publicação</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>{filteredReports.map((report) => (
                <tr key={report.id}>
                  <td><strong>REL-{report.id}</strong><small>{report.template} · v{report.version}</small></td>
                  <td><strong>{report.client}</strong><small>{report.plant} · {report.project}</small></td>
                  <td>{report.period}<small>Gerado {report.generatedAt}</small></td>
                  <td>{report.publishedBy ? <><strong>Publicado por {report.publishedBy}</strong><small>{report.publishedAt}</small></> : <span className="report-pending">Ainda não publicado</span>}</td>
                  <td><span className={`report-status report-status--${report.status}`}><i />{statusLabels[report.status]}</span>{report.channels.length > 0 ? <small>{report.channels.join(' + ')}</small> : null}</td>
                  <td><div className="row-actions"><Link to="/admin/reports/preview" aria-label={`Visualizar REL-${report.id}`}><Eye size={17} /></Link><button aria-label={`Baixar REL-${report.id}`}><Download size={17} /></button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <footer className="report-library-footer"><span>{filteredReports.length} de {reports.length} relatórios</span><small>Versões disponibilizadas permanecem preservadas no histórico.</small></footer>
        </section>
      ) : (
        <section className="template-library">
          <header className="report-section-header panel">
            <div><h2>Modelos reutilizáveis</h2><p>Estruturas controladas pela General Green para clientes, projetos e serviços.</p></div>
            <button className="button button--secondary"><Plus size={16} /> Novo modelo</button>
          </header>
          <div className="report-template-grid">
            {reportTemplates.map((template) => (
              <article className="panel report-template-card" key={template.id}>
                <header><span><LayoutTemplate size={19} /></span><div>{template.isDefault ? <b><CheckCircle2 size={13} /> Padrão</b> : <b className="neutral">Alternativo</b>}<button aria-label={`Mais ações para ${template.name}`}><MoreHorizontal size={18} /></button></div></header>
                <span className="eyebrow">{template.service}</span>
                <h2>{template.name}</h2>
                <p>{template.description}</p>
                <div className="template-scope"><strong>{template.scope}</strong><small>{template.projects} projetos vinculados</small></div>
                <ul>{template.components.slice(0, 5).map((component) => <li key={component}>{component}</li>)}{template.components.length > 5 ? <li>+{template.components.length - 5}</li> : null}</ul>
                <footer><span><strong>{template.components.length} componentes</strong><small>Atualizado em {template.updatedAt}</small></span><div><button aria-label={`Duplicar ${template.name}`}><Copy size={16} /></button><Link to="/admin/reports/new">Usar modelo</Link></div></footer>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
