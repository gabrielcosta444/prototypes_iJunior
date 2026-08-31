import { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  LayoutTemplate,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { reportTemplates } from '../../data/mockData';

const steps = [
  'Origem dos dados',
  'Escolha do modelo',
  'Personalização do conteúdo',
  'Conferência dos dados',
  'Distribuição',
];

const sourceActivities = [
  { label: 'Roçagem mecanizada', quantity: '86,4 ha' },
  { label: 'Roçagem manual', quantity: '42,1 ha' },
  { label: 'Acabamento e limpeza', quantity: '15,5 ha' },
];

const friendlyComponentName = (component: string) =>
  component === 'Clima' ? 'Condições climáticas' : component;

type ReportSection = {
  label: string;
  enabled: boolean;
};

export function ReportBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState(reportTemplates[0].id);
  const [sections, setSections] = useState<ReportSection[]>(
    reportTemplates[0].components.map((component) => ({
      label: friendlyComponentName(component),
      enabled: true,
    })),
  );
  const [publishToPortal, setPublishToPortal] = useState(true);
  const [sendByEmail, setSendByEmail] = useState(true);

  const selectedTemplate =
    reportTemplates.find((template) => template.id === selectedTemplateId) ?? reportTemplates[0];
  const enabledCount = sections.filter((section) => section.enabled).length;

  function chooseTemplate(templateId: string) {
    const template = reportTemplates.find((item) => item.id === templateId);
    if (!template) return;

    setSelectedTemplateId(templateId);
    setSections(
      template.components.map((component) => ({
        label: friendlyComponentName(component),
        enabled: true,
      })),
    );
  }

  function toggleSection(label: string) {
    setSections((current) =>
      current.map((section) =>
        section.label === label ? { ...section, enabled: !section.enabled } : section,
      ),
    );
  }

  function moveSection(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    setSections((current) => {
      const reordered = [...current];
      [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
      return reordered;
    });
  }

  return (
    <main className="report-builder-page">
      <header className="report-builder-header">
        <div>
          <Link className="back-link" to="/admin/reports">
            <ArrowLeft aria-hidden="true" size={16} />
            Voltar para relatórios
          </Link>
          <span className="eyebrow">Novo relatório operacional</span>
          <h1>Gerar relatório operacional</h1>
          <p>
            Monte o documento a partir dos registros aprovados, mantendo o padrão definido para o
            cliente.
          </p>
        </div>
        <span className="builder-draft-badge">Rascunho salvo automaticamente</span>
      </header>

      <nav className="report-stepper" aria-label="Etapas da criação do relatório">
        {steps.map((step, index) => (
          <button
            className={index === currentStep ? 'active' : index < currentStep ? 'complete' : ''}
            key={step}
            onClick={() => setCurrentStep(index)}
            type="button"
          >
            <span>{index < currentStep ? <Check aria-hidden="true" size={14} /> : index + 1}</span>
            {step}
          </button>
        ))}
      </nav>

      <div className="report-builder-grid">
        <section className="builder-workspace">
          {currentStep === 0 && (
            <div className="builder-panel">
              <div className="builder-panel-heading">
                <div>
                  <span className="eyebrow">Etapa 1 de 5</span>
                  <h2>Origem dos dados</h2>
                  <p>Defina o recorte que será consolidado no relatório.</p>
                </div>
                <ClipboardCheck aria-hidden="true" size={24} />
              </div>

              <div className="builder-form-grid">
                <label>
                  Cliente
                  <select defaultValue="solaris">
                    <option value="solaris">Solaris Energia</option>
                    <option value="lumina">Lumina Power</option>
                    <option value="atlas">Atlas Renewables</option>
                  </select>
                </label>
                <label>
                  Projeto
                  <select defaultValue="cerrado">
                    <option value="cerrado">Roçagem — Sol do Cerrado</option>
                    <option value="serra">Lavagem — Serra Azul</option>
                  </select>
                </label>
                <label>
                  Unidade
                  <select defaultValue="ufv-cerrado">
                    <option value="ufv-cerrado">UFV Sol do Cerrado</option>
                  </select>
                </label>
                <label>
                  Período
                  <input defaultValue="01/08/2026 a 26/08/2026" />
                </label>
              </div>

              <div className="source-summary">
                <div>
                  <span className="source-summary-icon">
                    <CheckCircle2 aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <strong>12 atividades aprovadas</strong>
                    <p>Os apontamentos foram validados pela equipe responsável.</p>
                  </div>
                </div>
                <strong>144 ha executados</strong>
              </div>

              <div className="source-activities">
                {sourceActivities.map((activity) => (
                  <div key={activity.label}>
                    <span>{activity.label}</span>
                    <strong>{activity.quantity}</strong>
                    <small>Dados aprovados</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="builder-panel">
              <div className="builder-panel-heading">
                <div>
                  <span className="eyebrow">Etapa 2 de 5</span>
                  <h2>Escolha do modelo</h2>
                  <p>Use um padrão salvo para preservar a identidade e a estrutura do relatório.</p>
                </div>
                <LayoutTemplate aria-hidden="true" size={24} />
              </div>

              <div className="builder-template-options">
                {reportTemplates.map((template) => (
                  <label
                    className={template.id === selectedTemplateId ? 'selected' : ''}
                    key={template.id}
                  >
                    <input
                      checked={template.id === selectedTemplateId}
                      name="report-template"
                      onChange={() => chooseTemplate(template.id)}
                      type="radio"
                    />
                    <span className="template-option-icon">
                      <FileText aria-hidden="true" size={22} />
                    </span>
                    <span>
                      <strong>{template.name}</strong>
                      <small>{template.description}</small>
                      <em>
                        {template.components.length} componentes · {template.scope}
                      </em>
                    </span>
                    {template.isDefault && <b>Padrão</b>}
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="builder-panel">
              <div className="builder-panel-heading">
                <div>
                  <span className="eyebrow">Etapa 3 de 5</span>
                  <h2>Personalização do conteúdo</h2>
                  <p>Ative e ordene os blocos permitidos pelo modelo selecionado.</p>
                </div>
                <span className="component-counter">
                  {enabledCount} de {sections.length} componentes
                </span>
              </div>

              <div className="builder-section-list">
                {sections.map((section, index) => (
                  <div className={section.enabled ? '' : 'disabled'} key={section.label}>
                    <label>
                      <input
                        aria-label={section.label}
                        checked={section.enabled}
                        onChange={() => toggleSection(section.label)}
                        type="checkbox"
                      />
                      <span>
                        <strong>{section.label}</strong>
                        <small>{section.enabled ? 'Será incluído no PDF' : 'Oculto neste relatório'}</small>
                      </span>
                    </label>
                    <span className="section-order-actions">
                      <button
                        aria-label={`Mover ${section.label} para cima`}
                        disabled={index === 0}
                        onClick={() => moveSection(index, -1)}
                        type="button"
                      >
                        <ArrowUp aria-hidden="true" size={15} />
                      </button>
                      <button
                        aria-label={`Mover ${section.label} para baixo`}
                        disabled={index === sections.length - 1}
                        onClick={() => moveSection(index, 1)}
                        type="button"
                      >
                        <ArrowDown aria-hidden="true" size={15} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
              <p className="builder-help-text">
                A estrutura é controlada: textos, checklist, gráficos, fotos e demais blocos seguem
                o padrão aprovado para a operação.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="builder-panel">
              <div className="builder-panel-heading">
                <div>
                  <span className="eyebrow">Etapa 4 de 5</span>
                  <h2>Conferência dos dados</h2>
                  <p>Revise a consolidação antes de gerar a versão final.</p>
                </div>
                <ShieldCheck aria-hidden="true" size={24} />
              </div>

              <div className="validation-success">
                <CheckCircle2 aria-hidden="true" size={24} />
                <div>
                  <strong>Nenhuma inconsistência encontrada</strong>
                  <p>O documento está pronto para revisão visual e geração.</p>
                </div>
              </div>

              <div className="validation-grid">
                <article>
                  <span>Atividades</span>
                  <strong>12 de 12 aprovadas</strong>
                  <small>Sem lançamentos pendentes</small>
                </article>
                <article>
                  <span>Totais consolidados</span>
                  <strong>144 ha</strong>
                  <small>Compatível com o período</small>
                </article>
                <article>
                  <span>Evidências</span>
                  <strong>18 fotos válidas</strong>
                  <small>Antes, durante e depois</small>
                </article>
              </div>

              <div className="review-summary">
                <div>
                  <span>Modelo</span>
                  <strong>{selectedTemplate.name}</strong>
                </div>
                <div>
                  <span>Conteúdo</span>
                  <strong>{enabledCount} componentes ativos</strong>
                </div>
                <div>
                  <span>Responsável pela geração</span>
                  <strong>Marina Costa</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="builder-panel">
              <div className="builder-panel-heading">
                <div>
                  <span className="eyebrow">Etapa 5 de 5</span>
                  <h2>Distribuição</h2>
                  <p>Defina como o cliente receberá a versão final e preservada.</p>
                </div>
                <FileCheck2 aria-hidden="true" size={24} />
              </div>

              <div className="distribution-options">
                <label>
                  <input
                    aria-label="Disponibilizar no portal do cliente"
                    checked={publishToPortal}
                    onChange={(event) => setPublishToPortal(event.target.checked)}
                    type="checkbox"
                  />
                  <span className="distribution-icon">
                    <MapPin aria-hidden="true" size={20} />
                  </span>
                  <span>
                    <strong>Disponibilizar no portal do cliente</strong>
                    <small>O PDF entra no histórico da Solaris Energia.</small>
                  </span>
                </label>
                <label>
                  <input
                    aria-label="Enviar por e-mail"
                    checked={sendByEmail}
                    onChange={(event) => setSendByEmail(event.target.checked)}
                    type="checkbox"
                  />
                  <span className="distribution-icon">
                    <Mail aria-hidden="true" size={20} />
                  </span>
                  <span>
                    <strong>Enviar por e-mail</strong>
                    <small>3 destinatários cadastrados receberão o documento.</small>
                  </span>
                </label>
              </div>

              <div className="final-version-card">
                <div>
                  <span>Versão a gerar</span>
                  <strong>REL-239 · Versão 1</strong>
                  <small>PDF com registro de geração e data de publicação.</small>
                </div>
                <Link className="secondary-button" to="/admin/reports/preview">
                  Visualizar prévia
                </Link>
              </div>
            </div>
          )}

          <footer className="builder-navigation">
            <button
              className="secondary-button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Voltar
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                className="primary-button"
                onClick={() => setCurrentStep((step) => Math.min(steps.length - 1, step + 1))}
                type="button"
              >
                Próximo
                <ArrowRight aria-hidden="true" size={16} />
              </button>
            ) : (
              <button className="primary-button" type="button">
                <FileCheck2 aria-hidden="true" size={16} />
                Gerar relatório final
              </button>
            )}
          </footer>
        </section>

        <aside className="builder-summary">
          <span className="eyebrow">Resumo do relatório</span>
          <h2>Roçagem — Sol do Cerrado</h2>
          <dl>
            <div>
              <dt>Cliente</dt>
              <dd>Solaris Energia</dd>
            </div>
            <div>
              <dt>Período</dt>
              <dd>01 a 26/08/2026</dd>
            </div>
            <div>
              <dt>Modelo</dt>
              <dd>{selectedTemplate.name}</dd>
            </div>
            <div>
              <dt>Conteúdo</dt>
              <dd>{enabledCount} blocos ativos</dd>
            </div>
          </dl>
          <div className="summary-progress">
            <span>
              <strong>{currentStep + 1} de 5</strong>
              etapas concluídas
            </span>
            <div>
              <i style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
          <p>A versão publicada ficará registrada no histórico e não poderá ser alterada.</p>
        </aside>
      </div>
    </main>
  );
}
