import {
  AlertCircle, ArrowRight, BadgeCheck, BriefcaseBusiness, Check, CheckCircle2, ClipboardCheck,
  CreditCard, FileCheck2, FileText, ImagePlus, LoaderCircle, RefreshCcw, ShieldAlert, Trash2, Upload, UserRound, XCircle,
} from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { Brand } from '../../components/Brand';
import { Button, EmptyState, InlineAlert, Modal, PageHeader, StatusBadge } from '../../components/ui';
import type { Provider, RegistrationStatus, SubscriptionStatus } from '../../domain/types';

const registrationLabels: Record<RegistrationStatus, string> = { draft: 'Rascunho', under_review: 'Em análise', approved: 'Aprovado', rejected: 'Reprovado', inactive: 'Inativo' };
const subscriptionLabels: Record<SubscriptionStatus, string> = { not_contracted: 'Não contratada', pending: 'Pagamento pendente', active: 'Ativa', delinquent: 'Inadimplente', cancelled: 'Cancelada' };
const registrationTone = (status: RegistrationStatus) => status === 'approved' ? 'success' : status === 'rejected' || status === 'inactive' ? 'danger' : status === 'under_review' ? 'warning' : 'neutral';
const subscriptionTone = (status: SubscriptionStatus) => status === 'active' ? 'success' : status === 'delinquent' ? 'danger' : status === 'pending' ? 'warning' : 'neutral';

function useCurrentProvider() {
  const { state, dispatch } = usePrototype();
  const provider = state.providers.find((item) => item.id === state.currentUser?.entityId) ?? state.providers[0];
  return { state, dispatch, provider };
}

export function ProviderStartPage() {
  const { loginDemo } = usePrototype();
  const navigate = useNavigate();
  const start = () => { loginDemo('provider'); navigate('/prestador/cadastro'); };
  return (
    <main className="auth-page"><section className="auth-card">
      <div className="auth-card__brand"><Brand linkTo="/login" /></div>
      <div className="auth-card__heading"><h1>Cadastro de prestador</h1><p>Conheça o fluxo demonstrativo de validação profissional.</p></div>
      <div className="provider-start-list">
        <span><UserRound /><div><strong>Dados pessoais</strong><small>Contato e endereço.</small></div></span>
        <span><BriefcaseBusiness /><div><strong>Atuação profissional</strong><small>Serviços e regiões.</small></div></span>
        <span><FileCheck2 /><div><strong>Documentação</strong><small>Arquivos demonstrativos.</small></div></span>
      </div>
      <InlineAlert tone="info">Este protótipo usará a conta fictícia do prestador para apresentar todo o fluxo.</InlineAlert>
      <Button className="button--full" onClick={start}>Começar cadastro demonstrativo <ArrowRight size={18} /></Button>
      <Link to="/cadastro" className="text-link text-link--center">Voltar</Link>
    </section></main>
  );
}

export function ProviderHomePage() {
  const { provider } = useCurrentProvider();
  const approved = provider.registrationStatus === 'approved';
  const subscribed = provider.subscriptionStatus === 'active';
  const visible = approved && subscribed && !provider.blocked;
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Visão geral" title={`Olá, ${provider.fullName.split(' ')[0]}`} description={`Acompanhe o que falta para ${provider.professionalName} ficar visível aos condomínios.`} />
      <section className={`readiness-banner readiness-banner--${visible ? 'success' : 'pending'}`}>
        <span>{visible ? <CheckCircle2 /> : <LoaderCircle />}</span>
        <div><p className="eyebrow">Visibilidade do perfil</p><h2>{visible ? 'Seu perfil está visível nas buscas' : 'Seu perfil ainda não aparece nas buscas'}</h2><p>{visible ? 'Condomínios autenticados já podem consultar o seu perfil e iniciar contato.' : 'Conclua os itens abaixo para liberar sua presença na plataforma.'}</p></div>
      </section>
      <div className="status-grid">
        <article className="status-card"><div><span className="status-card__icon"><ClipboardCheck /></span><StatusBadge tone={registrationTone(provider.registrationStatus)}>{registrationLabels[provider.registrationStatus]}</StatusBadge></div><h3>Situação cadastral</h3><p>{approved ? 'Cadastro validado pela FS Intermedium.' : 'Acompanhe a análise e corrija pendências.'}</p><Link to="/prestador/situacao">Ver situação <ArrowRight size={16} /></Link></article>
        <article className="status-card"><div><span className="status-card__icon"><CreditCard /></span><StatusBadge tone={subscriptionTone(provider.subscriptionStatus)}>{subscriptionLabels[provider.subscriptionStatus]}</StatusBadge></div><h3>Assinatura</h3><p>{subscribed ? 'Assinatura demonstrativa em dia.' : 'Ative após a aprovação para aparecer nas buscas.'}</p><Link to="/prestador/assinatura">Gerenciar assinatura <ArrowRight size={16} /></Link></article>
        <article className="status-card"><div><span className="status-card__icon"><BriefcaseBusiness /></span><StatusBadge tone="info">{provider.portfolio.length} fotos</StatusBadge></div><h3>Perfil profissional</h3><p>Atualize sua descrição, regiões e portfólio.</p><Link to="/prestador/perfil">Editar perfil <ArrowRight size={16} /></Link></article>
      </div>
      <section className="surface-card next-steps"><div><h2>Próximos passos</h2><p>Sua presença depende de três critérios simples.</p></div><ul><li className={approved ? 'done' : ''}><span>{approved ? <Check /> : '1'}</span> Cadastro aprovado</li><li className={subscribed ? 'done' : ''}><span>{subscribed ? <Check /> : '2'}</span> Assinatura ativa</li><li className={!provider.blocked ? 'done' : ''}><span>{!provider.blocked ? <Check /> : '3'}</span> Perfil sem bloqueios</li></ul></section>
    </div>
  );
}

export function ProviderStatusPage() {
  const { provider, dispatch } = useCurrentProvider();
  const [sent, setSent] = useState(false);
  const resubmit = () => { dispatch({ type: 'RESUBMIT_PROVIDER', providerId: provider.id }); setSent(true); };
  const content = {
    under_review: { icon: <LoaderCircle />, title: 'Cadastro em análise', description: 'A equipe da FS Intermedium está revisando seus dados e documentos.', tone: 'warning' as const },
    approved: { icon: <CheckCircle2 />, title: 'Cadastro aprovado', description: 'Sua validação foi concluída. Agora você pode contratar a assinatura demonstrativa.', tone: 'success' as const },
    rejected: { icon: <XCircle />, title: 'Cadastro precisa de ajustes', description: 'Leia a justificativa, corrija os dados e envie novamente.', tone: 'danger' as const },
    inactive: { icon: <ShieldAlert />, title: 'Cadastro inativo', description: 'Seu perfil está temporariamente indisponível. Entre em contato com a FS Intermedium.', tone: 'danger' as const },
    draft: { icon: <FileText />, title: 'Cadastro não enviado', description: 'Conclua as quatro etapas para iniciar a análise.', tone: 'info' as const },
  }[provider.registrationStatus];
  return (
    <div className="page-stack page-stack--narrow">
      <PageHeader eyebrow="Validação profissional" title="Situação cadastral" description="Acompanhe o andamento da sua aprovação." />
      {sent && <InlineAlert tone="success">Cadastro reenviado e devolvido à fila administrativa.</InlineAlert>}
      {provider.blocked && <InlineAlert tone="danger"><strong>Perfil bloqueado:</strong> mesmo com cadastro e assinatura válidos, o perfil não aparece nas buscas até a liberação administrativa.</InlineAlert>}
      <section className={`status-detail status-detail--${content.tone}`}><span>{content.icon}</span><div><StatusBadge tone={content.tone}>{registrationLabels[provider.registrationStatus]}</StatusBadge><h2>{content.title}</h2><p>{content.description}</p></div></section>
      {provider.registrationStatus === 'rejected' && (
        <section className="surface-card rejection-card"><p className="eyebrow">Motivo informado pela análise</p><h3>Ajuste necessário</h3><p>{provider.rejectionReason}</p><div><Link to="/prestador/cadastro" className="button button--secondary">Corrigir informações</Link><Button onClick={resubmit}>Reenviar para análise</Button></div></section>
      )}
      {provider.registrationStatus === 'approved' && <section className="surface-card approved-action"><div><CreditCard /><div><h3>Pronto para o próximo passo</h3><p>Ative sua assinatura para liberar o perfil nas buscas.</p></div></div><Link className="button button--primary" to="/prestador/assinatura">Gerenciar assinatura</Link></section>}
      {provider.registrationStatus === 'draft' && <Link className="button button--primary" to="/prestador/cadastro">Continuar cadastro</Link>}
    </div>
  );
}

export function ProviderProfilePage() {
  const { provider, state, dispatch } = useCurrentProvider();
  const [form, setForm] = useState({ professionalName: provider.professionalName, description: provider.description, phone: provider.phone, regions: provider.regions.join(', '), urgent: provider.urgent, categoryIds: provider.categoryIds });
  const [saved, setSaved] = useState(false);
  const [portfolio, setPortfolio] = useState(provider.portfolio);
  const toggleCategory = (id: string) => setForm({ ...form, categoryIds: form.categoryIds.includes(id) ? form.categoryIds.filter((item) => item !== id) : [...form.categoryIds, id] });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_PROVIDER', providerId: provider.id, changes: { ...form, regions: form.regions.split(',').map((item) => item.trim()).filter(Boolean), portfolio } });
    setSaved(true);
  };
  const addImages = (event: ChangeEvent<HTMLInputElement>) => {
    Array.from(event.target.files ?? []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setPortfolio((current) => [...current, String(reader.result)]);
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="page-stack page-stack--narrow">
      <PageHeader eyebrow="Apresentação pública" title="Meu perfil profissional" description="As alterações aparecem imediatamente para os síndicos quando seu perfil estiver habilitado." />
      {saved && <InlineAlert tone="success">Perfil atualizado e salvo neste navegador.</InlineAlert>}
      <form className="page-stack" onSubmit={submit}>
        <section className="surface-card form-card">
          <div className="form-grid">
            <label className="field field--span-2"><span>Nome profissional ou comercial</span><input required value={form.professionalName} onChange={(event) => { setSaved(false); setForm({ ...form, professionalName: event.target.value }); }} /></label>
            <label className="field field--span-2"><span>Descrição profissional</span><textarea required value={form.description} onChange={(event) => { setSaved(false); setForm({ ...form, description: event.target.value }); }} /></label>
            <label className="field"><span>Telefone / WhatsApp</span><input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
            <label className="field"><span>Regiões atendidas</span><input required value={form.regions} onChange={(event) => setForm({ ...form, regions: event.target.value })} /><small>Separe as regiões por vírgula.</small></label>
            <fieldset className="choice-group field--span-2"><legend>Categorias atendidas</legend><div>{state.categories.filter((item) => item.active).map((category) => <label key={category.id}><input type="checkbox" checked={form.categoryIds.includes(category.id)} onChange={() => toggleCategory(category.id)} /> {category.name}</label>)}</div></fieldset>
            <label className="check-card field--span-2"><input type="checkbox" checked={form.urgent} onChange={(event) => setForm({ ...form, urgent: event.target.checked })} /><SirenIcon /><span><strong>Atendo serviços de urgência</strong><small>Essa informação será destacada no seu perfil.</small></span></label>
          </div>
        </section>
        <section className="surface-card form-card">
          <div className="section-heading"><div><p className="eyebrow">Portfólio</p><h2>Fotos dos serviços</h2></div><label className="button button--secondary file-button"><ImagePlus size={18} /> Adicionar fotos<input type="file" accept="image/*" multiple onChange={addImages} /></label></div>
          {portfolio.length ? <div className="editable-gallery">{portfolio.map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`Pré-visualização ${index + 1}`} /><button type="button" aria-label={`Excluir foto ${index + 1}`} onClick={() => setPortfolio(portfolio.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={17} /></button></figure>)}</div> : <EmptyState icon={<ImagePlus />} title="Adicione seus melhores trabalhos" description="Use imagens em JPG ou PNG. Vídeos não são permitidos." />}
        </section>
        <div className="form-actions"><Button type="submit">Salvar perfil</Button></div>
      </form>
    </div>
  );
}

function SirenIcon() { return <AlertCircle size={20} />; }

export function ProviderSubscriptionPage() {
  const { provider, dispatch } = useCurrentProvider();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const approved = provider.registrationStatus === 'approved';
  const setStatus = (status: SubscriptionStatus) => { dispatch({ type: 'SET_SUBSCRIPTION', providerId: provider.id, status }); setCheckoutOpen(false); };
  return (
    <div className="page-stack page-stack--narrow">
      <PageHeader eyebrow="Visibilidade na plataforma" title="Minha assinatura" description="Gerencie o plano mensal único para aparecer nas buscas dos condomínios." />
      {!approved && <InlineAlert tone="warning">A contratação fica disponível somente depois que o cadastro for aprovado.</InlineAlert>}
      <section className={`subscription-card subscription-card--${provider.subscriptionStatus}`}>
        <div className="subscription-card__status"><span><CreditCard /></span><div><p className="eyebrow">Situação atual</p><h2>Assinatura {subscriptionLabels[provider.subscriptionStatus].toLowerCase()}</h2><StatusBadge tone={subscriptionTone(provider.subscriptionStatus)}>{subscriptionLabels[provider.subscriptionStatus]}</StatusBadge></div></div>
        <div className="subscription-card__plan"><span>Plano mensal único</span><strong>Valor a definir</strong><small>Condição comercial provisória</small></div>
        {provider.nextPaymentAt && <div className="subscription-card__date"><span>Próxima referência</span><strong>{new Date(`${provider.nextPaymentAt}T12:00:00`).toLocaleDateString('pt-BR')}</strong></div>}
        <div className="subscription-card__actions">
          {['not_contracted', 'delinquent'].includes(provider.subscriptionStatus) && <Button disabled={!approved} onClick={() => setCheckoutOpen(true)}>Contratar assinatura</Button>}
          {provider.subscriptionStatus === 'active' && <Button variant="secondary" onClick={() => setStatus('cancelled')}>Cancelar assinatura</Button>}
          {provider.subscriptionStatus === 'cancelled' && <Button disabled={!approved} onClick={() => setCheckoutOpen(true)}>Reativar assinatura</Button>}
          {provider.subscriptionStatus === 'pending' && <Button onClick={() => setCheckoutOpen(true)}>Continuar pagamento</Button>}
        </div>
      </section>
      <InlineAlert tone="info"><strong>Simulação:</strong> nenhuma cobrança será realizada. Os botões abaixo demonstram os retornos que um gateway de pagamento enviaria ao sistema definitivo.</InlineAlert>
      <Modal open={checkoutOpen} title="Checkout demonstrativo" onClose={() => setCheckoutOpen(false)} footer={<Button variant="ghost" onClick={() => setCheckoutOpen(false)}>Voltar</Button>}>
        <div className="checkout-demo"><span><CreditCard /></span><h3>Simulação de pagamento</h3><p>Escolha um resultado para demonstrar como a assinatura e os eventos administrativos são atualizados.</p><Button onClick={() => setStatus('active')}><CheckCircle2 size={18} /> Simular pagamento aprovado</Button><Button variant="secondary" onClick={() => setStatus('pending')}><LoaderCircle size={18} /> Simular pagamento pendente</Button><Button variant="secondary" onClick={() => setStatus('delinquent')}><XCircle size={18} /> Simular falha de pagamento</Button></div>
      </Modal>
    </div>
  );
}

const stepLabels = ['Dados pessoais', 'Atuação profissional', 'Documentação', 'Revisão e envio'];

export function ProviderRegistrationPage() {
  const { provider, state, dispatch } = useCurrentProvider();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ ...provider, regionsText: provider.regions.join(', ') });
  const activeCategories = state.categories.filter((item) => item.active);
  const update = (changes: Partial<typeof form>) => setForm({ ...form, ...changes });
  const persist = () => {
    const { regionsText, ...providerChanges } = form;
    dispatch({ type: 'UPDATE_PROVIDER', providerId: provider.id, changes: { ...providerChanges, regions: regionsText.split(',').map((item) => item.trim()).filter(Boolean) } });
  };
  const next = () => {
    setError('');
    if (step === 1 && (!form.fullName || !form.cpf || !form.accountEmail || !form.phone)) return setError('Preencha os dados pessoais obrigatórios.');
    if (step === 2 && (!form.professionalName || !form.description || !form.categoryIds.length || !form.regionsText)) return setError('Preencha a atuação profissional e selecione ao menos uma categoria.');
    if (step === 3 && !form.documents.length) return setError('Selecione ao menos um documento demonstrativo.');
    persist();
    setStep((current) => Math.min(4, current + 1));
  };
  const submit = () => { persist(); dispatch({ type: 'SET_PROVIDER_STATUS', providerId: provider.id, status: 'under_review' }); setStep(4); };
  const addDocuments = (event: ChangeEvent<HTMLInputElement>) => update({ documents: [...form.documents, ...Array.from(event.target.files ?? []).map((file, index) => ({ id: `doc-${Date.now()}-${index}`, type: 'Documento demonstrativo', name: file.name, status: 'selected' as const }))] });
  return (
    <div className="page-stack page-stack--narrow">
      <PageHeader eyebrow="Cadastro profissional" title="Cadastro e documentação" description="Preencha as etapas com calma. Os arquivos são apenas demonstrativos." />
      <ol className="stepper">{stepLabels.map((label, index) => <li key={label} className={`${step > index + 1 ? 'done' : ''} ${step === index + 1 ? 'active' : ''}`}><span>{step > index + 1 ? <Check size={15} /> : index + 1}</span><small>{label}</small></li>)}</ol>
      {error && <InlineAlert tone="danger">{error}</InlineAlert>}
      <section className="surface-card form-card wizard-card">
        {step === 1 && <><div className="wizard-title"><span>1</span><div><h2>Dados pessoais</h2><p>Informações do responsável pelo cadastro.</p></div></div><div className="form-grid">{Object.entries({ fullName: 'Nome completo', cpf: 'CPF', accountEmail: 'E-mail', phone: 'Telefone / WhatsApp', address: 'Endereço', district: 'Bairro', city: 'Cidade', state: 'Estado' }).map(([key, label]) => <label className={`field ${key === 'address' ? 'field--span-2' : ''}`} key={key}><span>{label}</span><input required value={String(form[key as keyof typeof form])} onChange={(event) => update({ [key]: event.target.value })} /></label>)}</div></>}
        {step === 2 && <><div className="wizard-title"><span>2</span><div><h2>Atuação profissional</h2><p>Explique como e onde você atende.</p></div></div><div className="form-grid"><label className="field field--span-2"><span>Nome profissional ou comercial</span><input value={form.professionalName} onChange={(event) => update({ professionalName: event.target.value })} /></label><label className="field field--span-2"><span>Descrição dos serviços</span><textarea value={form.description} onChange={(event) => update({ description: event.target.value })} /></label><fieldset className="choice-group field--span-2"><legend>Categorias atendidas</legend><div>{activeCategories.map((category) => <label key={category.id}><input type="checkbox" checked={form.categoryIds.includes(category.id)} onChange={() => update({ categoryIds: form.categoryIds.includes(category.id) ? form.categoryIds.filter((item) => item !== category.id) : [...form.categoryIds, category.id] })} /> {category.name}</label>)}</div></fieldset><label className="field field--span-2"><span>Bairros ou regiões atendidas</span><input value={form.regionsText} onChange={(event) => update({ regionsText: event.target.value })} /></label><label className="check-card field--span-2"><input type="checkbox" checked={form.urgent} onChange={(event) => update({ urgent: event.target.checked })} /><AlertCircle size={20} /><span><strong>Atendo serviços de urgência</strong><small>Destaque opcional no perfil público.</small></span></label></div></>}
        {step === 3 && <><div className="wizard-title"><span>3</span><div><h2>Documentação</h2><p>Envie imagens ou PDFs fictícios para demonstrar o fluxo.</p></div></div><label className="upload-zone"><Upload /><strong>Selecionar documentos</strong><span>PDF, JPG ou PNG • apenas para demonstração</span><input type="file" accept=".pdf,image/*" multiple onChange={addDocuments} /></label><div className="document-list">{form.documents.map((document) => <div key={document.id}><FileText /><span><strong>{document.name}</strong><small>{document.type} • {document.status === 'validated' ? 'Validado' : 'Pronto para envio'}</small></span><button type="button" aria-label={`Remover ${document.name}`} onClick={() => update({ documents: form.documents.filter((item) => item.id !== document.id) })}><Trash2 size={17} /></button></div>)}</div></>}
        {step === 4 && <><div className="wizard-title"><span>4</span><div><h2>Revisão e envio</h2><p>Confira o resumo antes de enviar para análise.</p></div></div>{provider.registrationStatus === 'under_review' ? <div className="submission-success"><CheckCircle2 /><h3>Cadastro enviado para análise</h3><p>O administrador já consegue localizar este cadastro na fila.</p><Link className="button button--secondary" to="/prestador/situacao">Acompanhar situação</Link></div> : <div className="review-grid"><div><span>Profissional</span><strong>{form.professionalName}</strong><small>{form.fullName}</small></div><div><span>Categorias</span><strong>{form.categoryIds.map((id) => state.categories.find((item) => item.id === id)?.name).filter(Boolean).join(', ')}</strong></div><div><span>Regiões</span><strong>{form.regionsText}</strong></div><div><span>Documentos</span><strong>{form.documents.length} arquivo(s)</strong></div></div>}</>}
        {provider.registrationStatus !== 'under_review' && <div className="wizard-actions">{step > 1 && <Button variant="ghost" onClick={() => { setError(''); setStep(step - 1); }}>Voltar</Button>}<div />{step < 4 ? <Button onClick={next}>Continuar <ArrowRight size={17} /></Button> : <Button onClick={submit}>Enviar cadastro para análise</Button>}</div>}
      </section>
    </div>
  );
}
