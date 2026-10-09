import type { Category, Condominium, DemoState, Provider } from '../domain/types';

const avatar = (image: number) => `https://i.pravatar.cc/360?img=${image}`;
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const categories: Category[] = [
  { id: 'hydraulics', name: 'Hidráulica', description: 'Vazamentos, tubulações, bombas e manutenção preventiva.', icon: 'droplets', active: true },
  { id: 'electrical', name: 'Elétrica', description: 'Instalações, quadros, iluminação e adequações elétricas.', icon: 'zap', active: true },
  { id: 'painting', name: 'Pintura', description: 'Pintura interna, externa e recuperação de fachadas.', icon: 'paintbrush', active: true },
  { id: 'maintenance', name: 'Manutenção geral', description: 'Pequenos reparos, montagem e conservação predial.', icon: 'wrench', active: true },
  { id: 'climate', name: 'Climatização', description: 'Instalação, limpeza e manutenção de ar-condicionado.', icon: 'snowflake', active: true },
];

const baseDocuments = (suffix: string) => [
  { id: `doc-id-${suffix}`, type: 'Documento de identificação', name: `documento-demonstrativo-${suffix}.pdf`, status: 'validated' as const },
  { id: `doc-cert-${suffix}`, type: 'Comprovante técnico', name: `certificado-demonstrativo-${suffix}.pdf`, status: 'validated' as const },
];

const providers: Provider[] = [
  {
    id: 'provider-1', accountEmail: 'prestador@demo.fs', fullName: 'Rafael Nogueira', cpf: '000.000.001-00', phone: '5531999991001',
    address: 'Rua das Acácias, 120', district: 'Savassi', city: 'Belo Horizonte', state: 'MG', professionalName: 'HidroPronto BH',
    description: 'Especialista em manutenção hidráulica de condomínios, caça-vazamentos e atendimento emergencial.', categoryIds: ['hydraulics', 'maintenance'],
    regions: ['Savassi', 'Funcionários', 'Lourdes'], urgent: true, registrationStatus: 'approved', subscriptionStatus: 'active',
    subscriptionActivatedAt: '2026-09-05', nextPaymentAt: '2026-11-05', blocked: false, avatar: avatar(12),
    portfolio: [photo('photo-1581244277943-fe4a9c777189'), photo('photo-1600566753190-17f0baa2a6c3')], documents: baseDocuments('rafael'), createdAt: '2026-08-12',
  },
  {
    id: 'provider-2', accountEmail: 'eletrica@demo.fs', fullName: 'Camila Prado', cpf: '000.000.002-00', phone: '5531999991002',
    address: 'Av. Brasil, 840', district: 'Santa Efigênia', city: 'Belo Horizonte', state: 'MG', professionalName: 'Eleva Elétrica Predial',
    description: 'Projetos, adequações e manutenção elétrica com foco em segurança para áreas comuns.', categoryIds: ['electrical'],
    regions: ['Centro', 'Santa Efigênia', 'Floresta'], urgent: true, registrationStatus: 'approved', subscriptionStatus: 'active',
    subscriptionActivatedAt: '2026-09-18', nextPaymentAt: '2026-11-18', blocked: false, avatar: avatar(47),
    portfolio: [photo('photo-1621905251189-08b45d6a269e'), photo('photo-1504917595217-d4dc5ebe6122')], documents: baseDocuments('camila'), createdAt: '2026-08-22',
  },
  {
    id: 'provider-3', accountEmail: 'marcos@demo.fs', fullName: 'Marcos Vieira', cpf: '000.000.003-00', phone: '5531999991003',
    address: 'Rua Pium-í, 310', district: 'Anchieta', city: 'Belo Horizonte', state: 'MG', professionalName: 'MV Manutenção Integrada',
    description: 'Manutenção preventiva e pequenos reparos para edifícios residenciais.', categoryIds: ['maintenance'], regions: ['Anchieta', 'Sion'],
    urgent: false, registrationStatus: 'under_review', subscriptionStatus: 'not_contracted', blocked: false, avatar: avatar(14), portfolio: [],
    documents: [{ id: 'doc-mv', type: 'Documento de identificação', name: 'identificacao-mv.pdf', status: 'sent' }], createdAt: '2026-10-02',
  },
  {
    id: 'provider-4', accountEmail: 'pintura@demo.fs', fullName: 'Júlia Campos', cpf: '000.000.004-00', phone: '5531999991004',
    address: 'Rua da Bahia, 1450', district: 'Lourdes', city: 'Belo Horizonte', state: 'MG', professionalName: 'Cores da Serra Pinturas',
    description: 'Pintura predial, revitalização de halls e fachadas com planejamento por etapas.', categoryIds: ['painting'], regions: ['Lourdes', 'Santo Agostinho'],
    urgent: false, registrationStatus: 'approved', subscriptionStatus: 'not_contracted', blocked: false, avatar: avatar(44),
    portfolio: [photo('photo-1562259949-e8e7689d7828')], documents: baseDocuments('julia'), createdAt: '2026-07-28',
  },
  {
    id: 'provider-5', accountEmail: 'clima@demo.fs', fullName: 'Fábio Martins', cpf: '000.000.005-00', phone: '5531999991005',
    address: 'Rua Alagoas, 420', district: 'Funcionários', city: 'Belo Horizonte', state: 'MG', professionalName: 'Clima Certo Serviços',
    description: 'Limpeza e manutenção de climatização para portarias e espaços compartilhados.', categoryIds: ['climate'], regions: ['Funcionários', 'Savassi'],
    urgent: false, registrationStatus: 'rejected', rejectionReason: 'Substitua o comprovante técnico por um documento legível e dentro da validade.',
    subscriptionStatus: 'not_contracted', blocked: false, avatar: avatar(33), portfolio: [],
    documents: [{ id: 'doc-clima', type: 'Comprovante técnico', name: 'comprovante-ilegivel.pdf', status: 'sent' }], createdAt: '2026-09-26',
  },
  {
    id: 'provider-6', accountEmail: 'predial@demo.fs', fullName: 'André Moreira', cpf: '000.000.006-00', phone: '5531999991006',
    address: 'Rua Padre Eustáquio, 560', district: 'Padre Eustáquio', city: 'Belo Horizonte', state: 'MG', professionalName: 'AM Predial',
    description: 'Equipe para manutenção corretiva e preventiva de edifícios.', categoryIds: ['maintenance', 'electrical'], regions: ['Padre Eustáquio', 'Carlos Prates'],
    urgent: true, registrationStatus: 'approved', subscriptionStatus: 'delinquent', nextPaymentAt: '2026-09-30', blocked: false, avatar: avatar(18),
    portfolio: [photo('photo-1504307651254-35680f356dfd')], documents: baseDocuments('andre'), createdAt: '2026-06-14',
  },
  {
    id: 'provider-7', accountEmail: 'segura@demo.fs', fullName: 'Patrícia Lopes', cpf: '000.000.007-00', phone: '5531999991007',
    address: 'Av. Cristiano Machado, 2090', district: 'Cidade Nova', city: 'Belo Horizonte', state: 'MG', professionalName: 'Segura Instalações',
    description: 'Instalações elétricas e hidráulicas para condomínios.', categoryIds: ['electrical', 'hydraulics'], regions: ['Cidade Nova', 'União'],
    urgent: true, registrationStatus: 'approved', subscriptionStatus: 'active', subscriptionActivatedAt: '2026-07-20', nextPaymentAt: '2026-10-20',
    blocked: true, avatar: avatar(45), portfolio: [photo('photo-1503387762-592deb58ef4e')], documents: baseDocuments('patricia'), createdAt: '2026-05-19',
  },
  {
    id: 'provider-8', accountEmail: 'frio@demo.fs', fullName: 'Luciana Reis', cpf: '000.000.008-00', phone: '5531999991008',
    address: 'Rua Grão Mogol, 680', district: 'Sion', city: 'Belo Horizonte', state: 'MG', professionalName: 'Ar & Conforto',
    description: 'Climatização eficiente, higienização e manutenção preventiva.', categoryIds: ['climate'], regions: ['Sion', 'Anchieta', 'Mangabeiras'],
    urgent: false, registrationStatus: 'approved', subscriptionStatus: 'active', subscriptionActivatedAt: '2026-08-11', nextPaymentAt: '2026-11-11',
    blocked: false, avatar: avatar(49), portfolio: [photo('photo-1631545806609-0c55cdd07945')], documents: baseDocuments('luciana'), createdAt: '2026-07-01',
  },
];

const condominiums: Condominium[] = [
  { id: 'condo-1', accountEmail: 'sindico@demo.fs', responsibleName: 'Beatriz Almeida', phone: '(31) 99991-2001', name: 'Residencial Alameda', address: 'Rua Pernambuco, 880', region: 'Savassi', createdAt: '2026-06-12' },
  { id: 'condo-2', accountEmail: 'gestao@mirante.demo', responsibleName: 'Ricardo Vasconcelos', phone: '(31) 99991-2002', name: 'Condomínio Mirante', address: 'Rua do Ouro, 440', region: 'Serra', createdAt: '2026-07-08' },
  { id: 'condo-3', accountEmail: 'contato@bosque.demo', responsibleName: 'Helena Fonseca', phone: '(31) 99991-2003', name: 'Edifício Bosque Azul', address: 'Av. Silva Lobo, 1220', region: 'Nova Suíça', createdAt: '2026-08-03' },
  { id: 'condo-4', accountEmail: 'admin@praca.demo', responsibleName: 'Gustavo Meireles', phone: '(31) 99991-2004', name: 'Residencial Praça Central', address: 'Rua dos Tamoios, 610', region: 'Centro', createdAt: '2026-09-15' },
];

export function createSeedState(): DemoState {
  return {
    version: 1,
    currentUser: null,
    providers: structuredClone(providers),
    condominiums: structuredClone(condominiums),
    categories: structuredClone(categories),
    paymentEvents: [
      { id: 'event-1', providerId: 'provider-1', type: 'confirmed', description: 'Pagamento demonstrativo confirmado', createdAt: '2026-10-05T14:20:00.000Z' },
      { id: 'event-2', providerId: 'provider-6', type: 'failed', description: 'Falha no pagamento demonstrativo', createdAt: '2026-09-30T11:10:00.000Z' },
      { id: 'event-3', providerId: 'provider-7', type: 'confirmed', description: 'Pagamento demonstrativo confirmado', createdAt: '2026-09-20T09:45:00.000Z' },
    ],
    notifications: [],
  };
}
