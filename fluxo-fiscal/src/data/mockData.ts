import type {
  AuditEvent,
  DocumentRecord,
  IntegrationRecord,
  PendingItem,
  ProcessingEvent,
  RuleRecord,
  SupplierRecord,
} from '../types/domain';

export const documents: DocumentRecord[] = [
  { id: 'nfe-145829', title: 'NF-e 000145829', supplier: 'Saint-Gobain do Brasil', type: 'NF-e', origin: 'SEFAZ', issuedAt: '18/08/2026', value: 'R$ 18.420,50', category: 'Matéria-prima', status: 'Concluído' },
  { id: 'nfe-23781', title: 'NF-e 000023781', supplier: 'Morganite Brasil', type: 'NF-e', origin: 'Outlook', issuedAt: '18/08/2026', value: 'R$ 6.831,90', category: 'Aguardando classificação', status: 'Pendente' },
  { id: 'cte-829174', title: 'CT-e 829174', supplier: 'Transportadora Atlas', type: 'CT-e', origin: 'SEFAZ', issuedAt: '17/08/2026', value: 'R$ 2.481,00', category: 'Frete', status: 'Concluído' },
  { id: 'nfse-98471', title: 'NFS-e 98471', supplier: 'Alpha Manutenção Industrial', type: 'NFS-e', origin: 'NFS-e Nacional', issuedAt: '17/08/2026', value: 'R$ 7.200,00', category: 'Serviços', status: 'Processando' },
  { id: 'recibo-2026-0817', title: 'Recibo 2026-0817', supplier: 'Fornecedor XPTO', type: 'Recibo', origin: 'Portal do Fornecedor', issuedAt: '16/08/2026', value: 'R$ 840,00', category: '—', status: 'Pendente' },
  { id: 'nfe-145829-dup', title: 'NF-e 000145829', supplier: 'Saint-Gobain do Brasil', type: 'NF-e', origin: 'Nomus', issuedAt: '18/08/2026', value: 'R$ 18.420,50', category: 'Matéria-prima', status: 'Duplicado' },
  { id: 'nfe-145911', title: 'NF-e 000145911', supplier: 'ArcelorMittal Brasil', type: 'NF-e', origin: 'SEFAZ', issuedAt: '19/08/2026', value: 'R$ 31.905,82', category: 'Matéria-prima', status: 'Concluído' },
  { id: 'nfse-55219', title: 'NFS-e 55219', supplier: 'Tecnosul Automação', type: 'NFS-e', origin: 'Outlook', issuedAt: '19/08/2026', value: 'R$ 4.750,00', category: 'Manutenção', status: 'Erro' },
];

export const pendingItems: PendingItem[] = [
  { id: 'pending-morganite', document: 'NF-e 000023781', supplier: 'Morganite Brasil', reason: 'Categoria não identificada', origin: 'Outlook', date: 'Hoje, 09:34', priority: 'Média', action: 'Resolver' },
  { id: 'pending-xpto', document: 'Recibo 2026-0817', supplier: 'Fornecedor XPTO', reason: 'Pedido de compra não informado', origin: 'Portal do Fornecedor', date: 'Hoje, 08:12', priority: 'Alta', action: 'Resolver' },
  { id: 'pending-alpha', document: 'NFS-e 98471', supplier: 'Alpha Manutenção', reason: 'Falha ao enviar ao SharePoint', origin: 'NFS-e Nacional', date: 'Ontem, 17:48', priority: 'Alta', action: 'Reprocessar' },
];

export const initialRules: RuleRecord[] = [
  { priority: 1, name: 'NF-e Saint-Gobain — Matéria-prima', conditions: ['Fornecedor = Saint-Gobain', 'CFOP = 5102'], category: 'Matéria-prima', applications: 342, active: true },
  { priority: 2, name: 'Transportadoras — Frete', conditions: ['Tipo = CT-e'], category: 'Fretes', applications: 189, active: true },
  { priority: 3, name: 'Serviços de manutenção', conditions: ['Tipo = NFS-e', 'Pedido começa com “MAN”'], category: 'Manutenção', applications: 84, active: true },
];

export const initialIntegrations: IntegrationRecord[] = [
  { id: 'nomus', name: 'Nomus ERP', shortName: 'Nomus', status: 'Operacional', sync: '14:32', volumeLabel: 'Documentos hoje', volume: '184', detail: 'Pedidos e registros fiscais sincronizados', accent: '#155eef' },
  { id: 'outlook', name: 'Microsoft Outlook', shortName: 'Outlook', status: 'Operacional', sync: '14:34', volumeLabel: 'Documentos hoje', volume: '63', detail: 'fiscal@allebras.com.br', accent: '#0f6cbd' },
  { id: 'nfe', name: 'NF-e / SEFAZ', shortName: 'NF-e', status: 'Operacional', sync: '14:31', volumeLabel: 'Documentos hoje', volume: '214', detail: 'Consulta automática por certificado digital', accent: '#0891b2' },
  { id: 'cte', name: 'CT-e', shortName: 'CT-e', status: 'Operacional', sync: '14:29', volumeLabel: 'Documentos hoje', volume: '28', detail: 'Conhecimentos de transporte capturados', accent: '#2563eb' },
  { id: 'nfse', name: 'NFS-e Nacional', shortName: 'NFS-e', status: 'Atenção', sync: '13:58', volumeLabel: 'Documentos hoje', volume: '41', detail: 'Serviço respondeu com lentidão na última consulta.', accent: '#d97706' },
  { id: 'sharepoint', name: 'SharePoint', shortName: 'SharePoint', status: 'Operacional', sync: 'há 1 minuto', volumeLabel: 'Arquivos enviados hoje', volume: '286', detail: 'Biblioteca Fiscal / Allebras', accent: '#038387' },
];

export const suppliers: SupplierRecord[] = [
  { name: 'Saint-Gobain do Brasil', cnpj: '12.345.678/0001-90', contact: 'financeiro@saintgobain.com.br', documents: 184, pendencies: 0, lastUpload: 'Hoje', status: 'Ativo' },
  { name: 'Morganite Brasil', cnpj: '98.765.432/0001-12', contact: 'fiscal@morganite.com.br', documents: 76, pendencies: 3, lastUpload: 'Hoje', status: 'Ativo' },
  { name: 'Transportadora Atlas', cnpj: '45.122.889/0001-44', contact: 'documentos@atlaslog.com.br', documents: 61, pendencies: 1, lastUpload: 'Ontem', status: 'Ativo' },
  { name: 'Alpha Manutenção Industrial', cnpj: '31.443.220/0001-05', contact: 'notas@alphaindustrial.com.br', documents: 39, pendencies: 2, lastUpload: 'Ontem', status: 'Ativo' },
  { name: 'Tecnosul Automação', cnpj: '08.741.932/0001-71', contact: 'faturamento@tecnosul.com.br', documents: 27, pendencies: 1, lastUpload: '18/08/2026', status: 'Ativo' },
];

export const auditEvents: AuditEvent[] = [
  { time: '14:32', actor: 'Sistema', actorType: 'system', action: 'Documento classificado automaticamente', record: 'NF-e 145829' },
  { time: '14:28', actor: 'Gabriel Martins', actorType: 'user', action: 'Regra “Morganite — Matéria-prima” criada', record: 'Regra #00042' },
  { time: '14:14', actor: 'Sistema', actorType: 'system', action: 'Integração Nomus sincronizada', record: 'Nomus ERP' },
  { time: '13:58', actor: 'Gabriel Martins', actorType: 'user', action: 'Documento reprocessado', record: 'NFS-e 98471' },
  { time: '13:42', actor: 'Sistema', actorType: 'system', action: 'Documento XML enviado ao SharePoint', record: 'NF-e 145804' },
];

export const processingEvents: ProcessingEvent[] = [
  { time: '08:42:01', title: 'Documento identificado pelo serviço NF-e.' },
  { time: '08:42:02', title: 'XML recebido e armazenado.' },
  { time: '08:42:02', title: 'Chave de acesso validada.' },
  { time: '08:42:03', title: 'Fornecedor identificado pelo CNPJ.' },
  { time: '08:42:03', title: 'Documento encontrado também no Nomus ERP.' },
  { time: '08:42:04', title: 'Pedido PC-2026-004812 associado automaticamente.' },
  { time: '08:42:04', title: 'Regra “NF-e Saint-Gobain / CFOP 5102” aplicada.' },
  { time: '08:42:05', title: 'Documento classificado como “Matéria-prima”.' },
  { time: '08:42:06', title: 'Arquivo renomeado segundo padrão Allebras.' },
  { time: '08:42:08', title: 'Documento enviado ao SharePoint.' },
];

export const volumeData = [
  { day: '01 ago', received: 34, processed: 29 }, { day: '04 ago', received: 47, processed: 43 },
  { day: '07 ago', received: 39, processed: 37 }, { day: '10 ago', received: 58, processed: 52 },
  { day: '13 ago', received: 51, processed: 49 }, { day: '16 ago', received: 68, processed: 59 },
  { day: '19 ago', received: 61, processed: 58 }, { day: '22 ago', received: 76, processed: 70 },
  { day: '25 ago', received: 72, processed: 67 }, { day: 'Hoje', received: 84, processed: 78 },
];

export const originData = [
  { name: 'NF-e / SEFAZ', value: 38, color: '#155eef' },
  { name: 'Outlook', value: 24, color: '#0ea5e9' },
  { name: 'Nomus', value: 18, color: '#06b6d4' },
  { name: 'Portal do Fornecedor', value: 12, color: '#14b8a6' },
  { name: 'NFS-e', value: 6, color: '#7c3aed' },
  { name: 'CT-e', value: 2, color: '#94a3b8' },
];

export const integrationActivity = [
  ['14:34', 'Outlook', '3 novos documentos encontrados'],
  ['14:32', 'Nomus', 'Sincronização concluída'],
  ['14:31', 'NF-e', '18 novos documentos encontrados'],
  ['14:30', 'SharePoint', '16 documentos arquivados'],
  ['13:58', 'NFS-e', 'Timeout de serviço externo'],
] as const;
