import {
  ArrowLeft,
  CalendarDays,
  Check,
  CloudSun,
  Download,
  FileCheck2,
  LocateFixed,
  MapPin,
  Printer,
  Share2,
  Target,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../../components/ui/Brand';

const productionRows = [
  { date: '05/08/2026', front: 'Blocos B01–B03', team: 'Equipe Alfa', produced: '24,8 ha' },
  { date: '11/08/2026', front: 'Blocos B04–B06', team: 'Equipe Alfa', produced: '27,2 ha' },
  { date: '17/08/2026', front: 'Blocos B07–B09', team: 'Equipe Beta', produced: '31,5 ha' },
  { date: '22/08/2026', front: 'Blocos C01–C04', team: 'Equipe Beta', produced: '28,6 ha' },
  { date: '26/08/2026', front: 'Blocos C05–C08', team: 'Equipe Alfa', produced: '31,9 ha' },
];

const productionBars = [62, 68, 79, 72, 80];

export function ReportPreviewPage() {
  return (
    <div className="report-preview-page">
      <header className="report-preview-toolbar">
        <Link className="button button--secondary" to="/admin/reports">
          <ArrowLeft aria-hidden="true" size={17} />
          Voltar
        </Link>
        <span>Pré-visualização · REL-238</span>
        <div>
          <button className="button button--secondary" type="button">
            <Share2 aria-hidden="true" size={17} />
            Disponibilizar
          </button>
          <button className="button button--primary" type="button">
            <Download aria-hidden="true" size={17} />
            Gerar PDF
          </button>
        </div>
      </header>

      <main className="report-paper">
        <header className="report-cover">
          <Brand />
          <span>RELATÓRIO OPERACIONAL · ROÇAGEM</span>
          <h1>Controle de execução e avanço físico</h1>
          <p>UFV Sol do Cerrado · 01 a 26 de agosto de 2026</p>
          <div className="report-client">
            <small>PREPARADO PARA</small>
            <strong>Solaris Energia</strong>
            <em>Versão 3 · Publicada</em>
          </div>
        </header>

        <section className="report-summary-block" aria-label="Resumo do relatório">
          <div>
            <FileCheck2 aria-hidden="true" />
            <span>
              <small>ATIVIDADES CONSOLIDADAS</small>
              <strong>12 aprovadas</strong>
            </span>
          </div>
          <div>
            <Target aria-hidden="true" />
            <span>
              <small>PRODUÇÃO REALIZADA</small>
              <strong>144 ha</strong>
            </span>
          </div>
          <div>
            <UsersRound aria-hidden="true" />
            <span>
              <small>EQUIPE MÉDIA</small>
              <strong>11 profissionais</strong>
            </span>
          </div>
          <div>
            <CalendarDays aria-hidden="true" />
            <span>
              <small>PERÍODO</small>
              <strong>26 dias</strong>
            </span>
          </div>
        </section>

        <section className="report-section">
          <div className="report-section__heading">
            <span>01</span>
            <div>
              <h2>Avanço físico</h2>
              <p>Produção acumulada em relação à área contratada</p>
            </div>
          </div>
          <div className="report-progress-layout">
            <div className="report-progress-donut">
              <span>
                <strong>72%</strong>
                <small>concluído</small>
              </span>
            </div>
            <div className="report-progress-copy">
              <span className="report-positive">Dentro do planejamento</span>
              <h3>144 ha executados</h3>
              <p>
                O avanço considera somente serviços conferidos e aprovados pela gestão operacional
                no período selecionado.
              </p>
              <div className="report-progress-metrics">
                <span>
                  <small>PLANEJADO</small>
                  <strong>200 ha</strong>
                </span>
                <span>
                  <small>EXECUTADO</small>
                  <strong>144 ha</strong>
                </span>
                <span>
                  <small>RESTANTE</small>
                  <strong>56 ha</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="report-section">
          <div className="report-section__heading">
            <span>02</span>
            <div>
              <h2>Produção diária</h2>
              <p>Consolidação das frentes executadas e aprovadas</p>
            </div>
          </div>
          <div className="report-production-chart" aria-label="Gráfico da produção diária">
            {productionBars.map((height, index) => (
              <span key={productionRows[index].date}>
                <i style={{ height: `${height}%` }} />
                <small>{productionRows[index].date.slice(0, 5)}</small>
              </span>
            ))}
          </div>
          <table className="report-production-table" aria-label="Produção diária consolidada">
            <thead>
              <tr>
                <th>Data</th>
                <th>Frente de serviço</th>
                <th>Equipe</th>
                <th>Produção</th>
              </tr>
            </thead>
            <tbody>
              {productionRows.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td>{row.front}</td>
                  <td>{row.team}</td>
                  <td>{row.produced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="report-section">
          <div className="report-section__heading">
            <span>03</span>
            <div>
              <h2>Condições da execução</h2>
              <p>Equipe, jornada e condições registradas em campo</p>
            </div>
          </div>
          <div className="report-conditions">
            <article>
              <UsersRound aria-hidden="true" size={18} />
              <span>
                <small>EQUIPE MOBILIZADA</small>
                <strong>1 encarregado · 10 auxiliares</strong>
                <p>Equipe Alfa e Equipe Beta</p>
              </span>
            </article>
            <article>
              <CalendarDays aria-hidden="true" size={18} />
              <span>
                <small>JORNADA MÉDIA</small>
                <strong>07:30 às 16:40</strong>
                <p>1h de intervalo</p>
              </span>
            </article>
            <article>
              <CloudSun aria-hidden="true" size={18} />
              <span>
                <small>CONDIÇÃO PREDOMINANTE</small>
                <strong>Ensolarado · 28 °C</strong>
                <p>Sem interrupções climáticas</p>
              </span>
            </article>
          </div>
        </section>

        <section className="report-section">
          <div className="report-section__heading">
            <span>04</span>
            <div>
              <h2>Evidências da execução</h2>
              <p>Registros com data, hora e localização validados</p>
            </div>
          </div>
          <div className="report-evidences">
            {['Antes', 'Durante', 'Depois'].map((stage, index) => (
              <article key={stage}>
                <div
                  aria-label={`Foto ${stage.toLowerCase()} da execução`}
                  className={`report-photo report-photo--${index}`}
                  role="img"
                />
                <strong>{stage}</strong>
                <small>
                  <LocateFixed aria-hidden="true" size={12} />
                  26/08/2026 · {['07:42', '11:35', '16:28'][index]}
                </small>
              </article>
            ))}
          </div>
        </section>

        <section className="report-observations">
          <small>OBSERVAÇÕES DE CAMPO</small>
          <p>
            Serviço concluído sem intercorrências. Os acessos permaneceram desobstruídos e o
            descarte do material vegetal seguiu o procedimento operacional do cliente.
          </p>
        </section>

        <section className="report-section report-final">
          <div>
            <MapPin aria-hidden="true" />
            <span>
              <small>LOCAL DA EXECUÇÃO</small>
              <strong>UFV Sol do Cerrado · Blocos B01 a C08</strong>
              <p>-17.221540, -46.872410 · Paracatu/MG</p>
            </span>
          </div>
          <div>
            <Check aria-hidden="true" />
            <span>
              <small>PUBLICADO POR</small>
              <strong>Marina Costa</strong>
              <p>Gestora Operacional · 26/08/2026 às 17:48</p>
            </span>
          </div>
        </section>

        <footer className="report-paper-footer">
          <Brand compact />
          <span>Relatório REL-238 · Versão 3</span>
          <span>General Green · Operação com evidência</span>
        </footer>
      </main>

      <button className="floating-print" type="button">
        <Printer aria-hidden="true" size={18} />
        Imprimir prévia
      </button>
    </div>
  );
}
