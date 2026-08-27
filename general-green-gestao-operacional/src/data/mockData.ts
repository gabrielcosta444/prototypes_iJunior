import type { ChecklistItem, Evidence, Order, Project, Report, Team, TimelineEntry } from '../domain/types';

export const orders: Order[] = [
  { id: '2026-0148', client: 'Solaris Energia', plant: 'UFV Sol do Cerrado', service: 'Roçagem', date: '26/08/2026', team: 'Equipe Norte', progress: 65, status: 'em-execucao', production: '11,7 ha', target: '18 ha' },
  { id: '2026-0147', client: 'Lumina Power', plant: 'UFV Serra Azul', service: 'Lavagem de módulos', date: '26/08/2026', team: 'Equipe 03', progress: 100, status: 'aguardando-revisao', production: '12.480 módulos', target: '11.500 módulos' },
  { id: '2026-0146', client: 'Atlas Renewables', plant: 'UFV Horizonte', service: 'Roçagem', date: '25/08/2026', team: 'Equipe Sul', progress: 100, status: 'concluida', production: '18 ha', target: '18 ha' },
  { id: '2026-0145', client: 'Lumina Power', plant: 'UFV Serra Azul', service: 'Lavagem', date: '25/08/2026', team: 'Equipe 03', progress: 90, status: 'devolvida', production: '10.400 módulos', target: '11.500 módulos' },
  { id: '2026-0149', client: 'Horizonte Solar', plant: 'UFV Três Lagoas', service: 'Roçagem', date: '26/08/2026', team: 'Carlos Oliveira', progress: 82, status: 'aguardando-sincronizacao', production: '14,8 ha', target: '18 ha' },
  { id: '2026-0150', client: 'Solaris Energia', plant: 'UFV Boa Vista', service: 'Lavagem de módulos', date: '26/08/2026', team: 'Equipe Sul', progress: 34, status: 'em-execucao', production: '4.080 módulos', target: '12.000 módulos' },
  { id: '2026-0151', client: 'Solaris Energia', plant: 'UFV Sol do Cerrado', service: 'Roçagem', date: '27/08/2026', team: 'Equipe Norte', progress: 0, status: 'programada', production: '0 ha', target: '16 ha' },
  { id: '2026-0152', client: 'Atlas Renewables', plant: 'UFV Horizonte', service: 'Roçagem', date: '27/08/2026', team: 'Equipe Sul', progress: 0, status: 'programada', production: '0 ha', target: '14 ha' },
  { id: '2026-0154', client: 'Lumina Power', plant: 'UFV Serra Azul', service: 'Lavagem', date: '27/08/2026', team: 'Equipe 03', progress: 0, status: 'programada', production: '0 módulos', target: '12.000 módulos' },
];

export const projects: Project[] = [
  { id: 'sol-do-cerrado', name: 'Contrato O&M — Solaris Energia', client: 'Solaris Energia', plant: 'UFV Sol do Cerrado', service: 'Roçagem', period: 'Ago — Dez 2026', progress: 72, production: '144 ha', target: '200 ha', orders: 24 },
  { id: 'serra-azul', name: 'Lavagem Preventiva — Lumina Power', client: 'Lumina Power', plant: 'UFV Serra Azul', service: 'Lavagem de módulos', period: 'Jul — Nov 2026', progress: 61, production: '73.200 módulos', target: '120.000 módulos', orders: 16 },
  { id: 'horizonte', name: 'Manutenção de Vegetação — Atlas', client: 'Atlas Renewables', plant: 'UFV Horizonte', service: 'Roçagem', period: 'Jun — Set 2026', progress: 92, production: '110 ha', target: '120 ha', orders: 18 },
];

export const teams: Team[] = [
  { id: 'norte', name: 'Equipe Norte', leader: 'Carlos Oliveira', members: 6, status: 'em-operacao', currentOrder: 'OS #0148', plant: 'UFV Sol do Cerrado' },
  { id: '03', name: 'Equipe 03', leader: 'Marcos Pereira', members: 8, status: 'disponivel' },
  { id: 'sul', name: 'Equipe Sul', leader: 'Rafael Souza', members: 7, status: 'em-operacao', currentOrder: 'OS #0150', plant: 'UFV Boa Vista' },
];

export const checklistItems: ChecklistItem[] = [
  { id: 1, label: 'Realizar APR', required: true },
  { id: 2, label: 'Confirmar isolamento da área', required: true },
  { id: 3, label: 'Registrar fotografia inicial', required: true, photo: true, location: true },
  { id: 4, label: 'Verificar equipamentos', required: true },
  { id: 5, label: 'Registrar produção final', required: true },
  { id: 6, label: 'Registrar fotografia final', required: true, photo: true, location: true },
];

export const evidences: Evidence[] = [
  { id: 'before', stage: 'Antes', time: '08:02', coordinates: '-19.912341, -44.082394', image: '/assets/evidence-before.png' },
  { id: 'during', stage: 'Durante', time: '11:43', coordinates: '-19.912318, -44.082401', image: '/assets/evidence-during.png' },
  { id: 'after', stage: 'Depois', time: '16:31', coordinates: '-19.912355, -44.082376', image: '/assets/evidence-after.png' },
];

export const reports: Report[] = [
  { id: '238', client: 'Solaris Energia', project: 'Roçagem — Sol do Cerrado', period: '26/08/2026', status: 'disponivel', generatedAt: '26/08/2026 — 17:48' },
  { id: '237', client: 'Lumina Power', project: 'Lavagem — Serra Azul', period: '26/08/2026', status: 'rascunho', generatedAt: '26/08/2026 — 17:12' },
  { id: '236', client: 'Atlas Renewables', project: 'Roçagem — Horizonte', period: '25/08/2026', status: 'disponivel', generatedAt: '25/08/2026 — 18:04' },
];

export const historyEntries: TimelineEntry[] = [
  { time: '17:42', actor: 'Lucas Martins', action: 'aprovou a OS #0147.' },
  { time: '17:38', actor: 'Equipe 03', action: 'enviou a correção da OS #0147.' },
  { time: '16:54', actor: 'Lucas Martins', action: 'devolveu a OS #0147 para correção.' },
  { time: '16:32', actor: 'Aplicativo de campo', action: 'sincronizou a OS #0147.' },
  { time: '07:54', actor: 'Marcos Pereira', action: 'iniciou a OS #0147.' },
  { time: '07:41', actor: 'Aplicativo de campo', action: 'sincronizou a OS #0147 no dispositivo.' },
  { time: '25/08 — 16:22', actor: 'Lucas Martins', action: 'emitiu a OS #0147.' },
];

export const productionSeries = [
  { day: '01 Ago', planned: 18, actual: 14 },
  { day: '05 Ago', planned: 42, actual: 38 },
  { day: '10 Ago', planned: 68, actual: 61 },
  { day: '15 Ago', planned: 96, actual: 87 },
  { day: '20 Ago', planned: 124, actual: 112 },
  { day: '25 Ago', planned: 151, actual: 139 },
  { day: '31 Ago', planned: 180, actual: 152 },
];
