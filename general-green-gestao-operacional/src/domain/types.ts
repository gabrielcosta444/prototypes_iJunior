export type OrderStatus =
  | 'programada'
  | 'em-execucao'
  | 'aguardando-sincronizacao'
  | 'aguardando-revisao'
  | 'devolvida'
  | 'concluida';

export type ActivityStatus = 'idle' | 'running' | 'review' | 'approved' | 'returned';

export type Order = {
  id: string;
  client: string;
  plant: string;
  service: string;
  date: string;
  team: string;
  progress: number;
  status: OrderStatus;
  production: string;
  target: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  plant: string;
  service: string;
  period: string;
  progress: number;
  production: string;
  target: string;
  orders: number;
};

export type Team = {
  id: string;
  name: string;
  leader: string;
  members: number;
  status: 'em-operacao' | 'disponivel';
  currentOrder?: string;
  plant?: string;
};

export type ChecklistItem = {
  id: number;
  label: string;
  required: boolean;
  photo?: boolean;
  location?: boolean;
};

export type Evidence = {
  id: string;
  stage: 'Antes' | 'Durante' | 'Depois';
  time: string;
  coordinates: string;
  image: string;
};

export type ReportStatus = 'rascunho' | 'gerado' | 'disponibilizado';

export type Report = {
  id: string;
  client: string;
  plant: string;
  project: string;
  service: string;
  period: string;
  status: ReportStatus;
  templateId: string;
  template: string;
  version: number;
  activityCount: number;
  publishedBy?: string;
  generatedAt: string;
  publishedAt?: string;
  channels: Array<'Portal' | 'E-mail'>;
};

export type ReportTemplate = {
  id: string;
  name: string;
  description: string;
  service: string;
  scope: string;
  components: string[];
  projects: number;
  updatedAt: string;
  isDefault?: boolean;
};

export type TimelineEntry = {
  time: string;
  actor: string;
  action: string;
};
