import {
  ArrowLeft, ArrowRight, BadgeCheck, Building2, Droplets, MapPin, MessageCircle, Paintbrush,
  Search, ShieldCheck, Siren, Snowflake, Wrench, Zap,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { usePrototype } from '../../app/PrototypeContext';
import { ProviderCard } from '../../components/ProviderCard';
import { Button, EmptyState, InlineAlert, PageHeader, StatusBadge } from '../../components/ui';
import { filterVisibleProviders, isProviderVisible } from '../../domain/rules';
import type { Category, ProviderFilters } from '../../domain/types';

const categoryIcons = { droplets: Droplets, zap: Zap, paintbrush: Paintbrush, wrench: Wrench, snowflake: Snowflake, shield: ShieldCheck };

function CategoryIcon({ category }: { category: Category }) {
  const Icon = categoryIcons[category.icon];
  return <Icon size={25} strokeWidth={1.7} />;
}

export function ManagerHomePage() {
  const { state } = usePrototype();
  const categories = state.categories.filter((item) => item.active);
  const visibleCount = state.providers.filter(isProviderVisible).length;
  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div className="welcome-panel__content">
          <p className="eyebrow">Profissionais avaliados. Decisões mais seguras.</p>
          <h1>Encontre o profissional certo para o seu condomínio.</h1>
          <p>Consulte prestadores analisados pela FS Intermedium e fale diretamente pelo WhatsApp.</p>
          <Link to="/sindico/prestadores" className="button button--primary">Encontrar profissionais <ArrowRight size={18} /></Link>
        </div>
        
      </section>

      <section>
        <div className="section-heading"><div><p className="eyebrow">Categorias</p><h2>Qual serviço você precisa?</h2></div><Link to="/sindico/prestadores">Ver todos <ArrowRight size={16} /></Link></div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} to={`/sindico/prestadores?categoria=${category.id}`} className="category-card">
              <span className="category-card__icon"><CategoryIcon category={category} /></span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="category-card__action">Buscar profissionais <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="how-it-works">
        <div><span>01</span><h3>Escolha o serviço</h3><p>Use categorias e filtros para chegar aos profissionais adequados.</p></div>
        <div><span>02</span><h3>Consulte o perfil</h3><p>Veja especialidades, regiões e trabalhos realizados.</p></div>
        <div><span>03</span><h3>Converse diretamente</h3><p>Inicie o contato pelo WhatsApp e combine o serviço fora da plataforma.</p></div>
      </section>
    </div>
  );
}

const emptyFilters: ProviderFilters = { query: '', categoryId: '', region: '', urgentOnly: false };

export function ManagerProvidersPage() {
  const { state } = usePrototype();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') ?? '';
  const [filters, setFilters] = useState<ProviderFilters>({ ...emptyFilters, categoryId: initialCategory });
  const activeCategories = state.categories.filter((item) => item.active);
  const regions = useMemo(() => Array.from(new Set(state.providers.filter(isProviderVisible).flatMap((item) => item.regions))).sort(), [state.providers]);
  const providers = useMemo(() => filterVisibleProviders(state.providers, filters), [state.providers, filters]);
  const selectedCategory = activeCategories.find((item) => item.id === filters.categoryId);

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Rede de profissionais" title={selectedCategory?.name ?? 'Encontrar profissionais'} description="Filtre por especialidade, região ou disponibilidade para urgências." />
      <section className="filter-panel" aria-label="Filtros de busca">
        <label className="filter-field filter-field--search"><span>Buscar por nome</span><span><Search size={18} /><input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder="Nome ou serviço" /></span></label>
        <label className="filter-field"><span>Categoria</span><select value={filters.categoryId} onChange={(event) => setFilters({ ...filters, categoryId: event.target.value })}><option value="">Todas</option>{activeCategories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label className="filter-field"><span>Bairro ou região</span><select value={filters.region} onChange={(event) => setFilters({ ...filters, region: event.target.value })}><option value="">Todas</option>{regions.map((region) => <option key={region}>{region}</option>)}</select></label>
        <label className="check-field"><input type="checkbox" checked={filters.urgentOnly} onChange={(event) => setFilters({ ...filters, urgentOnly: event.target.checked })} /><span>Somente urgências</span></label>
        <Button variant="ghost" onClick={() => setFilters(emptyFilters)}>Limpar filtros</Button>
      </section>

      <div className="result-heading"><p><strong>{providers.length}</strong> {providers.length === 1 ? 'profissional encontrado' : 'profissionais encontrados'}</p><span>Resultados atualizados automaticamente</span></div>
      {providers.length > 0 ? (
        <div className="provider-grid">{providers.map((provider) => <ProviderCard key={provider.id} provider={provider} categories={state.categories} />)}</div>
      ) : (
        <div className="surface-card"><EmptyState icon={<Search />} title="Nenhum profissional encontrado" description="Tente remover um filtro ou buscar por outra especialidade ou região." action={<Button variant="secondary" onClick={() => setFilters(emptyFilters)}>Limpar filtros</Button>} /></div>
      )}
    </div>
  );
}

export function ManagerProviderProfilePage() {
  const { id } = useParams();
  const { state } = usePrototype();
  const provider = state.providers.find((item) => item.id === id && isProviderVisible(item));
  if (!provider) return <div className="surface-card"><EmptyState icon={<Search />} title="Perfil indisponível" description="Este profissional não está disponível para consulta no momento." action={<Link className="button button--secondary" to="/sindico/prestadores">Voltar à busca</Link>} /></div>;
  const categoryNames = provider.categoryIds.map((categoryId) => state.categories.find((item) => item.id === categoryId)?.name).filter(Boolean);
  const whatsappMessage = encodeURIComponent('Olá! Encontrei seu perfil na FS Intermedium e gostaria de conversar sobre um serviço para meu condomínio.');
  const whatsappUrl = `https://wa.me/${provider.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;
  return (
    <div className="page-stack">
      <Link className="back-link" to="/sindico/prestadores"><ArrowLeft size={17} /> Voltar aos resultados</Link>
      <section className="profile-hero surface-card">
        <img className="profile-hero__avatar" src={provider.avatar} alt={`Foto de ${provider.professionalName}`} />
        <div className="profile-hero__main">
          <div className="provider-card__badges"><StatusBadge tone="success"><BadgeCheck size={13} /> Aprovado pela FS Intermedium</StatusBadge>{provider.urgent && <StatusBadge tone="warning"><Siren size={13} /> Atende urgências</StatusBadge>}</div>
          <h1>{provider.professionalName}</h1>
          <p className="profile-hero__specialties">{categoryNames.join(' • ')}</p>
          <p className="profile-hero__description">{provider.description}</p>
          <div className="profile-hero__meta"><MapPin size={17} /><span>Atende em {provider.regions.join(', ')}</span></div>
        </div>
        <div className="profile-hero__contact">
          <p>A negociação e o pagamento do serviço acontecem diretamente com o profissional.</p>
          <a className="button whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Entrar em contato pelo WhatsApp</a>
        </div>
      </section>
      <section>
        <div className="section-heading"><div><p className="eyebrow">Portfólio</p><h2>Serviços realizados</h2></div></div>
        {provider.portfolio.length ? <div className="portfolio-grid">{provider.portfolio.map((image, index) => <img key={image} src={image} alt={`Serviço realizado por ${provider.professionalName} — foto ${index + 1}`} />)}</div> : <div className="surface-card"><EmptyState title="Portfólio em atualização" description="Este profissional ainda não adicionou fotos de serviços." /></div>}
      </section>
    </div>
  );
}

export function ManagerCondominiumPage() {
  const { state, dispatch } = usePrototype();
  const condominium = state.condominiums.find((item) => item.id === state.currentUser?.entityId) ?? state.condominiums[0];
  const [form, setForm] = useState(condominium);
  const [saved, setSaved] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_CONDOMINIUM', condominiumId: condominium.id, changes: form });
    setSaved(true);
  };
  return (
    <div className="page-stack page-stack--narrow">
      <PageHeader eyebrow="Dados cadastrais" title="Meu condomínio" description="Mantenha os dados de contato e localização atualizados." />
      {saved && <InlineAlert tone="success">Dados salvos com sucesso neste navegador.</InlineAlert>}
      <section className="surface-card form-card">
        <div className="form-card__title"><span><Building2 /></span><div><h2>{condominium.name}</h2><p>As alterações ficam disponíveis após atualizar a página.</p></div></div>
        <form className="form-grid" onSubmit={submit}>
          {Object.entries({ responsibleName: 'Nome do responsável', accountEmail: 'E-mail', phone: 'Telefone', name: 'Nome do condomínio', address: 'Endereço', region: 'Bairro / região' }).map(([key, label]) => (
            <label className={`field ${(key === 'name' || key === 'address') ? 'field--span-2' : ''}`} key={key}><span>{label}</span><input required value={String(form[key as keyof typeof form])} onChange={(event) => { setSaved(false); setForm({ ...form, [key]: event.target.value }); }} /></label>
          ))}
          <div className="form-actions field--span-2"><Button type="submit">Salvar alterações</Button></div>
        </form>
      </section>
    </div>
  );
}
