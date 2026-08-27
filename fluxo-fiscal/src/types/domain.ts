export type DocumentStatus = 'Concluído' | 'Processando' | 'Pendente' | 'Duplicado' | 'Erro';
export type Priority = 'Alta' | 'Média' | 'Baixa';
export type IntegrationStatus = 'Operacional' | 'Atenção';

export interface DocumentRecord {
  id: string;
  title: string;
  supplier: string;
  type: string;
  origin: string;
  issuedAt: string;
  value: string;
  category: string;
  status: DocumentStatus;
}

export interface PendingItem {
  id: string;
  document: string;
  supplier: string;
  reason: string;
  origin: string;
  date: string;
  priority: Priority;
  action: 'Resolver' | 'Reprocessar';
}

export interface RuleRecord {
  priority: number;
  name: string;
  conditions: string[];
  category: string;
  applications: number;
  active: boolean;
}

export interface IntegrationRecord {
  id: string;
  name: string;
  shortName: string;
  status: IntegrationStatus;
  sync: string;
  volumeLabel: string;
  volume: string;
  detail?: string;
  accent: string;
}

export interface SupplierRecord {
  name: string;
  cnpj: string;
  contact: string;
  documents: number;
  pendencies: number;
  lastUpload: string;
  status: 'Ativo' | 'Inativo';
}

export interface AuditEvent {
  time: string;
  actor: string;
  actorType: 'system' | 'user';
  action: string;
  record: string;
}

export interface ProcessingEvent {
  time: string;
  title: string;
  description?: string;
}
