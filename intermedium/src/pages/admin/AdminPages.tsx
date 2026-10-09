import {
  ArrowLeft, ArrowRight, BadgeCheck, Ban, Building2, CheckCircle2, ClipboardCheck, CreditCard,
  FileText, FolderCog, Mail, Plus, ReceiptText, Search, ShieldCheck, Users, XCircle,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { Button, EmptyState, InlineAlert, Modal, PageHeader, StatusBadge } from '../../components/ui';
import type { Category, RegistrationStatus, SubscriptionStatus } from '../../domain/types';

const registrationLabels: Record<RegistrationStatus, string> = { draft: 'Rascunho', under_review: 'Em análise', approved: 'Aprovado', rejected: 'Reprovado', inactive: 'Inativo' };
const subscriptionLabels: Record<SubscriptionStatus, string> = { not_contracted: 'Não contratada', pending: 'Pendente', active: 'Ativa', delinquent: 'Inadimplente', cancelled: 'Cancelada' };
const statusTone = (status: string) => ['approved', 'active'].includes(status) ? 'success' : ['rejected', 'inactive', 'delinquent'].includes(status) ? 'danger' : ['under_review', 'pending'].includes(status) ? 'warning' : 'neutral';
const formatDate = (date?: string) => date ? new Date(`${date.includes('T') ? date : `${date}T12:00:00`}`).toLocaleDateString('pt-BR') : '—';

export function AdminHomePage() {
  const { state } = usePrototype();
  const pending = state.providers.filter((item) => item.registrationStatus === 'under_review');
  const activeSubscriptions = state.providers.filter((item) => item.subscriptionStatus === 'active').length;
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Operação" title="Visão geral" description="Acompanhe as prioridades da plataforma sem indicadores financeiros." actions={<Link className="button button--primary" to="/admin/analises">Ver fila de análise</Link>} />
      <div className="admin-metrics">
        <article><span><ClipboardCheck /></span><div><strong>{pending.length}</strong><small>Aguardando análise</small></div></article>
        <article><span><Users /></span><div><strong>{state.providers.length}</strong><small>Prestadores cadastrados</small></div></article>
        <article><span><Building2 /></span><div><strong>{state.condominiums.length}</strong><small>Condomínios</small></div></article>
        <article><span><CreditCard /></span><div><strong>{activeSubscriptions}</strong><small>Assinaturas ativas</small></div></article>
      </div>
      <section className="surface-card admin-panel">
        <div className="panel-heading"><div><h2>Solicitações pendentes</h2><p>Cadastros que precisam de uma decisão da equipe.</p></div><Link to="/admin/analises">Ver todas <ArrowRight size={16} /></Link></div>
        {pending.length ? <div className="compact-list">{pending.slice(0, 4).map((provider) => <div key={provider.id}><img src={provider.avatar} alt="" /><span><strong>{provider.professionalName}</strong><small>Cadastrado em {formatDate(provider.createdAt)}</small></span><StatusBadge tone="warning">Em análise</StatusBadge><Link className="button button--secondary" to={`/admin/analises/${provider.id}`}>Analisar</Link></div>)}</div> : <EmptyState icon={<CheckCircle2 />} title="Fila em dia" description="Não há cadastros aguardando análise." />}
      </section>
      <div className="admin-shortcuts"><Link to="/admin/prestadores"><Users /><span><strong>Prestadores</strong><small>Consultar, bloquear e desbloquear</small></span><ArrowRight /></Link><Link to="/admin/condominios"><Building2 /><span><strong>Condomínios</strong><small>Consultar cadastros</small></span><ArrowRight /></Link><Link to="/admin/assinaturas"><CreditCard /><span><strong>Assinaturas</strong><small>Acompanhar situações</small></span><ArrowRight /></Link></div>
    </div>
  );
}

export function AdminAnalysesPage() {
  const { state } = usePrototype();
  const pending = state.providers.filter((item) => item.registrationStatus === 'under_review');
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Validação" title="Análise de cadastros" description="Revise dados e documentos antes de aprovar um profissional." />
      <section className="surface-card table-card">
        {pending.length ? <table className="data-table"><thead><tr><th>Prestador</th><th>Categoria principal</th><th>Data do cadastro</th><th>Situação</th><th><span className="sr-only">Ações</span></th></tr></thead><tbody>{pending.map((provider) => <tr key={provider.id}><td data-label="Prestador"><div className="table-person"><img src={provider.avatar} alt="" /><span><strong>{provider.professionalName}</strong><small>{provider.fullName}</small></span></div></td><td data-label="Categoria">{state.categories.find((item) => item.id === provider.categoryIds[0])?.name}</td><td data-label="Cadastro">{formatDate(provider.createdAt)}</td><td data-label="Situação"><StatusBadge tone="warning">Em análise</StatusBadge></td><td data-label="Ação"><Link className="button button--secondary button--small" to={`/admin/analises/${provider.id}`}>Analisar</Link></td></tr>)}</tbody></table> : <EmptyState icon={<CheckCircle2 />} title="Nenhum cadastro pendente" description="Todos os cadastros recebidos já foram analisados." />}
      </section>
    </div>
  );
}

export function AdminAnalysisDetailPage() {
  const { id } = useParams();
  const { state, dispatch } = usePrototype();
  const provider = state.providers.find((item) => item.id === id);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [previewDocument, setPreviewDocument] = useState<{ name: string; type: string } | null>(null);
  if (!provider) return <div className="surface-card"><EmptyState icon={<Search />} title="Cadastro não encontrado" description="O registro solicitado não está disponível." /></div>;
  const categories = provider.categoryIds.map((categoryId) => state.categories.find((item) => item.id === categoryId)?.name).filter(Boolean);
  const approve = () => { dispatch({ type: 'APPROVE_PROVIDER', providerId: provider.id }); setApproveOpen(false); setFeedback('Cadastro aprovado. Uma notificação de e-mail foi registrada como simulação.'); };
  const reject = () => {
    if (!reason.trim()) { setError('Informe o motivo da reprovação.'); return; }
    dispatch({ type: 'REJECT_PROVIDER', providerId: provider.id, reason }); setRejectOpen(false); setFeedback('Cadastro reprovado. O motivo já está disponível no ambiente do prestador.');
  };
  return (
    <div className="page-stack">
      <Link className="back-link" to="/admin/analises"><ArrowLeft size={17} /> Voltar à fila</Link>
      <PageHeader eyebrow="Detalhamento" title={provider.professionalName} description={`Cadastro realizado em ${formatDate(provider.createdAt)}`} actions={<StatusBadge tone={statusTone(provider.registrationStatus)}>{registrationLabels[provider.registrationStatus]}</StatusBadge>} />
      {feedback && <InlineAlert tone="success">{feedback}</InlineAlert>}
      <div className="detail-layout">
        <div className="page-stack">
          <section className="surface-card detail-section"><div className="detail-section__title"><UserDetailIcon /><div><h2>Dados pessoais</h2><p>Informações privadas do cadastro</p></div></div><dl className="detail-grid"><div><dt>Nome completo</dt><dd>{provider.fullName}</dd></div><div><dt>CPF demonstrativo</dt><dd>{provider.cpf}</dd></div><div><dt>E-mail</dt><dd>{provider.accountEmail}</dd></div><div><dt>Telefone</dt><dd>{provider.phone}</dd></div><div className="detail-grid__wide"><dt>Endereço</dt><dd>{provider.address}, {provider.district} — {provider.city}/{provider.state}</dd></div></dl></section>
          <section className="surface-card detail-section"><div className="detail-section__title"><ShieldCheck /><div><h2>Atuação profissional</h2><p>Dados exibidos no perfil após habilitação</p></div></div><dl className="detail-grid"><div className="detail-grid__wide"><dt>Descrição</dt><dd>{provider.description}</dd></div><div><dt>Categorias</dt><dd>{categories.join(', ')}</dd></div><div><dt>Regiões</dt><dd>{provider.regions.join(', ')}</dd></div><div><dt>Urgências</dt><dd>{provider.urgent ? 'Disponível' : 'Não disponível'}</dd></div></dl></section>
          <section className="surface-card detail-section"><div className="detail-section__title"><FileText /><div><h2>Documentos enviados</h2><p>Pré-visualização demonstrativa, restrita ao administrador</p></div></div><div className="admin-documents">{provider.documents.map((document) => <div key={document.id}><span><FileText /></span><div><strong>{document.name}</strong><small>{document.type}</small></div><StatusBadge tone={document.status === 'validated' ? 'success' : 'info'}>{document.status === 'validated' ? 'Validado' : 'Enviado'}</StatusBadge><button aria-label={`Pré-visualizar ${document.name}`} onClick={() => setPreviewDocument(document)}>Pré-visualizar</button></div>)}</div></section>
        </div>
        <aside className="decision-card surface-card"><p className="eyebrow">Decisão</p><h2>Concluir análise</h2><p>Confirme os dados e documentos antes de registrar sua decisão.</p><Button onClick={() => setApproveOpen(true)}><BadgeCheck size={18} /> Aprovar cadastro</Button><Button variant="danger" onClick={() => setRejectOpen(true)}><XCircle size={18} /> Reprovar cadastro</Button><small>Uma notificação de e-mail simulada será registrada.</small></aside>
      </div>
      <Modal open={approveOpen} title="Aprovar este cadastro?" onClose={() => setApproveOpen(false)} footer={<><Button variant="ghost" onClick={() => setApproveOpen(false)}>Cancelar</Button><Button onClick={approve}>Confirmar aprovação</Button></>}><p>O prestador será aprovado, mas só aparecerá nas buscas após ativar a assinatura.</p></Modal>
      <Modal open={rejectOpen} title="Reprovar este cadastro?" onClose={() => { setRejectOpen(false); setError(''); }} footer={<><Button variant="ghost" onClick={() => setRejectOpen(false)}>Cancelar</Button><Button variant="danger" onClick={reject}>Confirmar reprovação</Button></>}><div className="form-stack">{error && <InlineAlert tone="danger">{error}</InlineAlert>}<label className="field"><span>Motivo da reprovação</span><textarea value={reason} onChange={(event) => { setReason(event.target.value); setError(''); }} placeholder="Explique o que precisa ser corrigido" /></label></div></Modal>
      <Modal open={Boolean(previewDocument)} title="Pré-visualização demonstrativa" onClose={() => setPreviewDocument(null)} footer={<Button variant="secondary" onClick={() => setPreviewDocument(null)}>Fechar</Button>}>
        <div className="document-preview"><FileText /><span>DOCUMENTO FICTÍCIO</span><h3>{previewDocument?.type}</h3><p>{previewDocument?.name}</p><small>Sem dados pessoais reais • uso exclusivo na demonstração</small></div>
      </Modal>
    </div>
  );
}

function UserDetailIcon() { return <Users />; }

export function AdminProvidersPage() {
  const { state, dispatch } = usePrototype();
  const [query, setQuery] = useState('');
  const [targetId, setTargetId] = useState<string | null>(null);
  const providers = state.providers.filter((item) => `${item.professionalName} ${item.fullName}`.toLowerCase().includes(query.toLowerCase()));
  const target = state.providers.find((item) => item.id === targetId);
  const toggle = () => { if (target) dispatch({ type: 'TOGGLE_BLOCK_PROVIDER', providerId: target.id }); setTargetId(null); };
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Cadastros" title="Prestadores" description="Consulte a situação e controle bloqueios de visibilidade." />
      <label className="standalone-search"><Search size={18} /><input aria-label="Buscar prestador" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome" /></label>
      <section className="surface-card table-card"><table className="data-table"><thead><tr><th>Prestador</th><th>Especialidade</th><th>Cadastro</th><th>Assinatura</th><th>Bloqueio</th><th><span className="sr-only">Ações</span></th></tr></thead><tbody>{providers.map((provider) => <tr key={provider.id}><td data-label="Prestador"><div className="table-person"><img src={provider.avatar} alt="" /><span><strong>{provider.professionalName}</strong><small>{provider.fullName}</small></span></div></td><td data-label="Especialidade">{state.categories.find((item) => item.id === provider.categoryIds[0])?.name}</td><td data-label="Cadastro"><StatusBadge tone={statusTone(provider.registrationStatus)}>{registrationLabels[provider.registrationStatus]}</StatusBadge></td><td data-label="Assinatura"><StatusBadge tone={statusTone(provider.subscriptionStatus)}>{subscriptionLabels[provider.subscriptionStatus]}</StatusBadge></td><td data-label="Bloqueio"><StatusBadge tone={provider.blocked ? 'danger' : 'success'}>{provider.blocked ? 'Bloqueado' : 'Liberado'}</StatusBadge></td><td data-label="Ações"><div className="table-actions"><Link to={`/admin/analises/${provider.id}`}>Detalhes</Link><Button variant={provider.blocked ? 'secondary' : 'danger'} className="button--small" onClick={() => setTargetId(provider.id)}>{provider.blocked ? 'Desbloquear' : 'Bloquear'}</Button></div></td></tr>)}</tbody></table></section>
      <Modal open={Boolean(target)} title={`${target?.blocked ? 'Desbloquear' : 'Bloquear'} prestador?`} onClose={() => setTargetId(null)} footer={<><Button variant="ghost" onClick={() => setTargetId(null)}>Cancelar</Button><Button variant={target?.blocked ? 'primary' : 'danger'} onClick={toggle}>Confirmar {target?.blocked ? 'desbloqueio' : 'bloqueio'}</Button></>}><p>{target?.blocked ? 'Se os demais critérios estiverem atendidos, o perfil voltará às buscas.' : 'O perfil deixará de aparecer imediatamente para os síndicos.'}</p></Modal>
    </div>
  );
}

export function AdminCondominiumsPage() {
  const { state } = usePrototype();
  return <div className="page-stack"><PageHeader eyebrow="Cadastros" title="Condomínios" description="Consulta dos condomínios que utilizam a plataforma gratuitamente." /><section className="surface-card table-card"><table className="data-table"><thead><tr><th>Condomínio</th><th>Responsável</th><th>E-mail</th><th>Bairro / região</th><th>Cadastro</th></tr></thead><tbody>{state.condominiums.map((condo) => <tr key={condo.id}><td data-label="Condomínio"><strong>{condo.name}</strong></td><td data-label="Responsável">{condo.responsibleName}</td><td data-label="E-mail">{condo.accountEmail}</td><td data-label="Região">{condo.region}</td><td data-label="Cadastro">{formatDate(condo.createdAt)}</td></tr>)}</tbody></table></section></div>;
}

const emptyCategory: Category = { id: '', name: '', description: '', icon: 'wrench', active: true };

export function AdminCategoriesPage() {
  const { state, dispatch } = usePrototype();
  const [editing, setEditing] = useState<Category | null>(null);
  const save = (event: FormEvent) => { event.preventDefault(); if (!editing) return; const id = editing.id || editing.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); dispatch({ type: 'UPSERT_CATEGORY', category: { ...editing, id } }); setEditing(null); };
  return (
    <div className="page-stack"><PageHeader eyebrow="Configuração" title="Categorias" description="As alterações refletem nas buscas e no cadastro profissional." actions={<Button onClick={() => setEditing({ ...emptyCategory })}><Plus size={17} /> Nova categoria</Button>} />
      <div className="category-admin-grid">{state.categories.map((category) => <article key={category.id} className="surface-card"><div><span><FolderCog /></span><StatusBadge tone={category.active ? 'success' : 'neutral'}>{category.active ? 'Ativa' : 'Inativa'}</StatusBadge></div><h2>{category.name}</h2><p>{category.description}</p><footer><Button variant="ghost" onClick={() => setEditing(category)}>Editar</Button><Button variant="secondary" onClick={() => dispatch({ type: 'TOGGLE_CATEGORY', categoryId: category.id })}>{category.active ? 'Desativar' : 'Reativar'}</Button></footer></article>)}</div>
      <Modal open={Boolean(editing)} title={editing?.id ? 'Editar categoria' : 'Nova categoria'} onClose={() => setEditing(null)} footer={undefined}>{editing && <form className="form-stack" onSubmit={save}><label className="field"><span>Nome</span><input required value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} /></label><label className="field"><span>Descrição breve</span><textarea required value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} /></label><label className="field"><span>Ícone</span><select value={editing.icon} onChange={(event) => setEditing({ ...editing, icon: event.target.value as Category['icon'] })}><option value="wrench">Manutenção</option><option value="droplets">Hidráulica</option><option value="zap">Elétrica</option><option value="paintbrush">Pintura</option><option value="snowflake">Climatização</option><option value="shield">Segurança</option></select></label><div className="form-actions"><Button variant="ghost" type="button" onClick={() => setEditing(null)}>Cancelar</Button><Button type="submit">Salvar categoria</Button></div></form>}</Modal>
    </div>
  );
}

export function AdminSubscriptionsPage() {
  const { state } = usePrototype();
  const [status, setStatus] = useState('');
  const providers = state.providers.filter((item) => !status || item.subscriptionStatus === status);
  return <div className="page-stack"><PageHeader eyebrow="Acompanhamento" title="Assinaturas" description="Consulte o estado das assinaturas demonstrativas, sem cobrança manual." /><label className="compact-filter"><span>Filtrar por status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todos os status</option>{Object.entries(subscriptionLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><section className="surface-card table-card"><table className="data-table"><thead><tr><th>Prestador</th><th>Situação</th><th>Ativação</th><th>Próxima referência</th><th>Detalhes</th></tr></thead><tbody>{providers.map((provider) => <tr key={provider.id}><td data-label="Prestador"><strong>{provider.professionalName}</strong></td><td data-label="Situação"><StatusBadge tone={statusTone(provider.subscriptionStatus)}>{subscriptionLabels[provider.subscriptionStatus]}</StatusBadge></td><td data-label="Ativação">{formatDate(provider.subscriptionActivatedAt)}</td><td data-label="Próxima referência">{formatDate(provider.nextPaymentAt)}</td><td data-label="Detalhes"><Link to={`/admin/analises/${provider.id}`}>Consultar</Link></td></tr>)}</tbody></table></section></div>;
}

const eventLabels = { confirmed: 'Pagamento confirmado', pending: 'Pagamento pendente', failed: 'Falha de pagamento', cancelled: 'Assinatura cancelada', reactivated: 'Assinatura reativada' };

export function AdminPaymentEventsPage() {
  const { state } = usePrototype();
  return <div className="page-stack"><PageHeader eyebrow="Gateway demonstrativo" title="Eventos de pagamento" description="Histórico gerado pelas simulações de assinatura do protótipo." /><InlineAlert tone="info">Esta tela é apenas de acompanhamento. Nenhuma cobrança real ou ação financeira manual está disponível.</InlineAlert><section className="surface-card table-card">{state.paymentEvents.length ? <table className="data-table"><thead><tr><th>Evento</th><th>Prestador</th><th>Descrição</th><th>Data e hora</th></tr></thead><tbody>{state.paymentEvents.map((event) => <tr key={event.id}><td data-label="Evento"><StatusBadge tone={event.type === 'confirmed' || event.type === 'reactivated' ? 'success' : event.type === 'failed' ? 'danger' : 'warning'}>{eventLabels[event.type]}</StatusBadge></td><td data-label="Prestador">{state.providers.find((item) => item.id === event.providerId)?.professionalName}</td><td data-label="Descrição">{event.description}</td><td data-label="Data">{new Date(event.createdAt).toLocaleString('pt-BR')}</td></tr>)}</tbody></table> : <EmptyState icon={<ReceiptText />} title="Nenhum evento registrado" description="As simulações de assinatura aparecerão aqui." />}</section></div>;
}
