import { useState } from 'react';
import { CalendarDays, Download, Eye, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';

const clientReports = [
  {
    id: 'REL-238',
    activity: 'Lavagem de Módulos',
    project: 'UFV Serra Azul',
    projectId: 'serra-azul',
    period: '01 a 26/08/2026',
    publishedAt: '26/08/2026 às 17:48',
    template: 'Lavagem de Módulos',
    version: 3,
  },
  {
    id: 'REL-232',
    activity: 'Roçagem — Blocos B04 a B09',
    project: 'UFV Sol do Cerrado',
    projectId: 'sol-do-cerrado',
    period: '18 a 22/08/2026',
    publishedAt: '22/08/2026 às 18:10',
    template: 'Roçagem O&M',
    version: 2,
  },
  {
    id: 'REL-228',
    activity: 'Inspeção Operacional',
    project: 'UFV Sol do Cerrado',
    projectId: 'sol-do-cerrado',
    period: '18/08/2026',
    publishedAt: '18/08/2026 às 16:54',
    template: 'Diário Compacto',
    version: 1,
  },
  {
    id: 'REL-221',
    activity: 'Roçagem — Blocos B01 a B03',
    project: 'UFV Sol do Cerrado',
    projectId: 'sol-do-cerrado',
    period: '08 a 12/08/2026',
    publishedAt: '12/08/2026 às 17:22',
    template: 'Roçagem O&M',
    version: 1,
  },
];

export function ClientReportsPage() {
  const [query, setQuery] = useState('');
  const [project, setProject] = useState('all');
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const filteredReports = clientReports.filter((report) => {
    const matchesProject = project === 'all' || report.projectId === project;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [report.id, report.activity, report.project, report.template].some((value) =>
        value.toLocaleLowerCase('pt-BR').includes(normalizedQuery),
      );
    return matchesProject && matchesQuery;
  });

  return (
    <div className="client-reports-page">
      <PageHeader
        title="Relatórios"
        subtitle="Consulte os documentos finais disponibilizados para sua empresa."
      />

      <section className="client-report-overview" aria-label="Resumo dos relatórios">
        <article>
          <span>
            <FileText aria-hidden="true" size={20} />
          </span>
          <div>
            <small>DOCUMENTOS DISPONÍVEIS</small>
            <strong>4 documentos disponíveis</strong>
            <p>Todos com versão e data de publicação registradas.</p>
          </div>
        </article>
        <article>
          <span>
            <CalendarDays aria-hidden="true" size={20} />
          </span>
          <div>
            <small>ÚLTIMA PUBLICAÇÃO</small>
            <strong>26 de agosto de 2026</strong>
            <p>REL-238 · Lavagem de Módulos</p>
          </div>
        </article>
      </section>

      <section className="panel client-report-library">
        <header>
          <div>
            <h2>Histórico de relatórios</h2>
            <p>Versões disponibilizadas permanecem preservadas para consulta e download.</p>
          </div>
          <span>{filteredReports.length === 1 ? '1 documento encontrado' : `${filteredReports.length} documentos encontrados`}</span>
        </header>

        <div className="client-report-toolbar">
          <label className="client-report-search">
            <span className="sr-only">Buscar relatório</span>
            <Search aria-hidden="true" size={17} />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por relatório, atividade ou modelo..."
              type="search"
              value={query}
            />
          </label>
          <label>
            <span>Projeto</span>
            <select onChange={(event) => setProject(event.target.value)} value={project}>
              <option value="all">Todos os projetos</option>
              <option value="serra-azul">UFV Serra Azul</option>
              <option value="sol-do-cerrado">UFV Sol do Cerrado</option>
            </select>
          </label>
          <label>
            <span>Período</span>
            <select defaultValue="august">
              <option value="august">Agosto de 2026</option>
              <option value="july">Julho de 2026</option>
            </select>
          </label>
        </div>

        <div className="client-report-table-wrap">
          <table className="data-table client-report-table">
            <thead>
              <tr>
                <th>Relatório</th>
                <th>Atividade e projeto</th>
                <th>Modelo</th>
                <th>Período</th>
                <th>Publicação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <span className="client-report-file">
                      <FileText aria-hidden="true" size={18} />
                    </span>
                    <span>
                      <strong>{report.id}</strong>
                      <small>Versão {report.version}</small>
                    </span>
                  </td>
                  <td>
                    <strong>{report.activity}</strong>
                    <small>{report.project}</small>
                  </td>
                  <td>{report.template}</td>
                  <td>{report.period}</td>
                  <td>{report.publishedAt}</td>
                  <td>
                    <span className="report-status report-status--disponibilizado">
                      <i />
                      Disponível
                    </span>
                  </td>
                  <td>
                    <div className="client-report-actions">
                      <Link aria-label={`Visualizar ${report.id}`} to="/admin/reports/preview">
                        <Eye aria-hidden="true" size={16} />
                        Visualizar
                      </Link>
                      <button aria-label={`Baixar PDF ${report.id}`} type="button">
                        <Download aria-hidden="true" size={16} />
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="client-report-empty">
            <FileText aria-hidden="true" size={24} />
            <strong>Nenhum relatório encontrado</strong>
            <p>Tente ajustar o projeto ou o termo da busca.</p>
          </div>
        )}
      </section>
    </div>
  );
}
