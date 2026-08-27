# General Green Gestão de Operações Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar um protótipo comercial navegável que demonstre a operação da General Green da emissão da OS à consulta do relatório pelo cliente.

**Architecture:** Uma SPA React/TypeScript/Vite conterá três shells independentes — Gestor, Técnico Mobile e Cliente — ligados por rotas e por um contexto de estado demonstrativo. Dados, arquivos, geolocalização, sincronização e aprovações serão simulados no cliente; não haverá backend.

**Tech Stack:** React 19, TypeScript 5.7, Vite 6, React Router 7, Recharts 2, Lucide React, Vitest, Testing Library e CSS modularizado por domínio.

**Spec:** `general-green-gestao-operacional/docs/superpowers/specs/2026-08-26-general-green-gestao-operacional-prototype-design.md`

## Global Constraints

- Protótipo visual independente, sem backend, banco de dados ou autenticação real.
- Todos os textos em português brasileiro e sem Lorem Ipsum.
- Desktop otimizado para 1440 px; aplicativo técnico validado em 390 × 844 px.
- Identidade verde da General Green com cards brancos e tipografia de apresentação legível.
- Sem integrações externas, cálculo automático de área, rastreamento contínuo, IA operacional ou editor livre de relatórios.
- Informações do Portal do Cliente representam apenas dados aprovados.
- Não executar comandos Git, conforme solicitação do usuário.
- Componentes puramente visuais estão dispensados de TDD; rotas e interações demonstráveis exigem teste automatizado.

---

## File Map

```text
prototipos/
├── allebras-central-documentos/        # projeto existente preservado
└── general-green-gestao-operacional/
    ├── public/assets/                   # logo e evidências locais
    ├── src/app/                         # rotas e estado demonstrativo
    ├── src/components/                  # UI, gráficos, layout, OS e mobile
    ├── src/data/                        # fixtures realistas
    ├── src/domain/                      # tipos compartilhados
    ├── src/pages/admin/                 # experiência do gestor
    ├── src/pages/client/                # portal do cliente
    ├── src/pages/mobile/                # aplicativo do técnico
    ├── src/styles/                      # tokens e estilos por domínio
    └── src/test/                        # configuração dos testes
```

### Task 1: Organizar o workspace e criar o projeto independente

**Files:**
- Move: arquivos atuais da raiz para `allebras-central-documentos/`
- Preserve: `general-green-gestao-operacional/docs/**`
- Create: `general-green-gestao-operacional/package.json`
- Create: `general-green-gestao-operacional/index.html`
- Create: `general-green-gestao-operacional/vite.config.ts`
- Create: `general-green-gestao-operacional/tsconfig.json`
- Create: `general-green-gestao-operacional/tsconfig.app.json`
- Create: `general-green-gestao-operacional/tsconfig.node.json`
- Create: `general-green-gestao-operacional/src/main.tsx`
- Create: `general-green-gestao-operacional/src/test/setup.ts`

**Interfaces:**
- Produces: dois projetos Node independentes e executáveis.

- [ ] **Step 1: Verificar os destinos antes de mover**

Run:

```powershell
$workspace = (Resolve-Path 'C:\Users\gabri\OneDrive\Área de Trabalho\iJunior\prototipos').Path
$allebras = Join-Path $workspace 'allebras-central-documentos'
$generalGreen = Join-Path $workspace 'general-green-gestao-operacional'
@($workspace, $allebras, $generalGreen) | ForEach-Object { Write-Output $_ }
```

Expected: os três caminhos começam com o caminho absoluto de `prototipos`.

- [ ] **Step 2: Criar a pasta Allebras e mover somente o projeto existente**

Mover com `Move-Item -LiteralPath` os itens `src`, `dist`, `docs`, `node_modules`, `index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json` e `tsconfig.node.json`. Não mover `.git`, `.agents`, `.codex` nem `general-green-gestao-operacional`.

- [ ] **Step 3: Criar a configuração do novo Vite**

`package.json` deve usar o nome `general-green-gestao-operacional`, os scripts `dev`, `build`, `typecheck`, `test` e `test:run`, e as mesmas versões verificadas no protótipo Allebras para React, Router, Recharts, Lucide, Vite, TypeScript, Vitest e Testing Library.

- [ ] **Step 4: Criar o ponto de entrada mínimo**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>,
);
```

- [ ] **Step 5: Instalar dependências e confirmar o scaffold**

Run: `npm install`

Run: `npm run typecheck`

Expected: ambos finalizam com exit code 0.

### Task 2: Definir domínio, fixtures, estado e rotas

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/data/mockData.ts`
- Create: `src/app/PrototypeContext.tsx`
- Create: `src/app/App.test.tsx`
- Create: `src/app/App.tsx`
- Create: `src/pages/LoginPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`

**Interfaces:**
- Produces: `PrototypeProvider`, `usePrototype()`, `Order`, `Project`, `Activity`, `Team`, `Report` e todas as rotas da demonstração.

- [ ] **Step 1: Escrever o teste de rotas antes da aplicação**

```tsx
test.each([
  ['/login', 'Gestão de Operações'],
  ['/admin/dashboard', 'Visão Geral'],
  ['/admin/orders', 'Ordens de Serviço'],
  ['/mobile', 'Bom dia, Carlos'],
  ['/client/dashboard', 'Visão Geral'],
])('renderiza %s', async (path, heading) => {
  window.history.pushState({}, '', path);
  render(<App />);
  expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
});
```

- [ ] **Step 2: Executar o teste e observar a falha por ausência de `App`/rotas**

Run: `npm run test:run -- src/app/App.test.tsx`

Expected: FAIL porque as rotas ainda não existem.

- [ ] **Step 3: Criar tipos e fixtures realistas**

Definir `OrderStatus` como `programada | em-execucao | aguardando-sincronizacao | aguardando-revisao | devolvida | concluida` e fixtures para OS #2026-0145 a #2026-0154, projetos, equipes, checklist, evidências, relatórios e timeline fornecidos no briefing.

- [ ] **Step 4: Criar o contexto demonstrativo**

```ts
type PrototypeState = {
  connectivity: 'online' | 'offline';
  activityStatus: 'idle' | 'running' | 'review' | 'approved' | 'returned';
  checklistCompleted: number[];
  queuedPhotos: number;
};
```

Expor `setConnectivity`, `startActivity`, `toggleChecklistItem`, `queueEvidence`, `syncActivity`, `submitForReview`, `approveActivity` e `returnActivity`.

- [ ] **Step 5: Implementar o mapa completo de rotas**

Rotas obrigatórias: `/login`, `/admin/dashboard`, `/admin/orders`, `/admin/orders/new`, `/admin/orders/:id`, `/admin/operations`, `/admin/review/:id`, `/admin/projects`, `/admin/projects/:id`, `/admin/clients`, `/admin/teams`, `/admin/checklists`, `/admin/checklists/:id`, `/admin/reports`, `/admin/reports/new`, `/admin/reports/preview`, `/admin/history`, `/admin/users`, `/admin/settings`, `/mobile`, `/mobile/orders/:id`, `/mobile/activity/:id`, `/mobile/checklist/:id`, `/mobile/productivity/:id`, `/mobile/evidence/:id`, `/mobile/sync`, `/mobile/review/:id`, `/mobile/returned/:id`, `/client/dashboard`, `/client/projects/:id` e `/client/reports`. Cada rota deve renderizar desde já seu shell correto e o título final da página, permitindo que o smoke test valide a arquitetura antes do refinamento do conteúdo.

- [ ] **Step 6: Executar o teste até ficar verde**

Run: `npm run test:run -- src/app/App.test.tsx`

Expected: 5 testes PASS.

### Task 3: Criar design system, shells e Login

**Files:**
- Create: `src/components/ui/Brand.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/StatusBadge.tsx`
- Create: `src/components/ui/MetricCard.tsx`
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/Toast.tsx`
- Create: `src/components/layout/AdminShell.tsx`
- Create: `src/components/layout/MobileShell.tsx`
- Create: `src/components/layout/ClientShell.tsx`
- Modify: `src/pages/LoginPage.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/components.css`
- Create: `src/styles/layout.css`
- Create: `src/styles/responsive.css`
- Create: `src/styles/index.css`

**Interfaces:**
- Produces: componentes compartilhados e shells usados por todas as páginas.

- [ ] **Step 1: Criar tokens visuais**

Definir `--gg-green-900: #103d2f`, `--gg-green-700: #176b46`, `--gg-green-500: #2edb25`, `--gg-green-100: #eafbe8`, `--surface: #ffffff`, `--canvas: #f5f7f4`, `--text: #13251e`, raios de 10–16 px, sombras sutis e escala tipográfica base de 16 px.

- [ ] **Step 2: Criar o logo vetorial local**

`Brand` deve renderizar o bloco verde inclinado, o wordmark `GENERAL GREEN` em duas linhas e a variação compacta para sidebar/mobile, sem carregar recurso externo.

- [ ] **Step 3: Implementar shells**

`AdminShell` inclui sidebar, topbar, notificação e usuário Lucas Martins. `MobileShell` inclui frame de 390 px e bottom navigation. `ClientShell` inclui apenas Visão Geral, Projetos e Relatórios.

- [ ] **Step 4: Implementar o Login de apresentação**

Adicionar formulário, fluxo visual Planejamento/Campo/Validação/Resultado e ação `Entrar` navegando para `/admin/dashboard`.

- [ ] **Step 5: Executar testes e typecheck**

Run: `npm run test:run && npm run typecheck`

Expected: exit code 0.

### Task 4: Dashboard do Gestor

**Files:**
- Create: `src/pages/admin/DashboardPage.test.tsx`
- Create: `src/pages/admin/DashboardPage.tsx`
- Create: `src/components/dashboard/ProductionChart.tsx`
- Create: `src/components/dashboard/ProjectProgress.tsx`
- Create: `src/components/dashboard/OperationToday.tsx`
- Create: `src/components/dashboard/OperationPipeline.tsx`
- Create: `src/components/dashboard/AttentionTable.tsx`
- Create: `src/styles/dashboard.css`

**Interfaces:**
- Consumes: fixtures e `AdminShell`.
- Produces: links para criação da OS, revisão e operação completa.

- [ ] **Step 1: Escrever teste dos atalhos principais**

```tsx
test('abre criação de OS e revisão a partir do dashboard', async () => {
  renderAt('/admin/dashboard');
  await userEvent.click(screen.getByRole('link', { name: /nova ordem/i }));
  expect(screen.getByRole('heading', { name: 'Nova Ordem de Serviço' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Confirmar a falha do teste**

Run: `npm run test:run -- src/pages/admin/DashboardPage.test.tsx`

Expected: FAIL porque o dashboard final e o atalho não existem.

- [ ] **Step 3: Implementar dashboard completo**

Renderizar quatro métricas, Operação hoje, gráfico planejado x realizado, avanço de três projetos, tabela de atenção e pipeline Planejamento → Campo → Sincronização → Validação → Resultado.

- [ ] **Step 4: Executar o teste até ficar verde**

Run: `npm run test:run -- src/pages/admin/DashboardPage.test.tsx`

Expected: PASS.

### Task 5: Fluxo de Ordens de Serviço

**Files:**
- Create: `src/pages/admin/OrdersPage.tsx`
- Create: `src/pages/admin/NewOrderPage.test.tsx`
- Create: `src/pages/admin/NewOrderPage.tsx`
- Create: `src/pages/admin/OrderDetailPage.tsx`
- Create: `src/components/orders/OrderTable.tsx`
- Create: `src/components/orders/OrderStepper.tsx`
- Create: `src/components/orders/OrderPipeline.tsx`
- Create: `src/styles/orders.css`

**Interfaces:**
- Produces: criação simulada da OS #2026-0149 e detalhe navegável da OS #2026-0148.

- [ ] **Step 1: Escrever teste do stepper**

```tsx
test('avança pelas quatro etapas e emite a ordem', async () => {
  renderAt('/admin/orders/new');
  for (const label of ['Continuar', 'Continuar', 'Continuar']) {
    await userEvent.click(screen.getByRole('button', { name: label }));
  }
  await userEvent.click(screen.getByRole('button', { name: 'Emitir Ordem de Serviço' }));
  expect(screen.getByText('Ordem de Serviço #OS-2026-0149 criada')).toBeInTheDocument();
});
```

- [ ] **Step 2: Confirmar RED**

Run: `npm run test:run -- src/pages/admin/NewOrderPage.test.tsx`

Expected: FAIL no primeiro botão ausente.

- [ ] **Step 3: Implementar lista, filtros e indicadores**

Tabela com OS, Cliente/UFV, Serviço, Data, Equipe, Progresso e Status, além de cards `38 abertas`, `8 em execução`, `7 em revisão` e `124 concluídas no mês`.

- [ ] **Step 4: Implementar stepper e modal de emissão**

Preencher previamente os dados Solaris/UFV Sol do Cerrado/Contrato O&M/Roçagem/Equipe Norte e permitir voltar/continuar entre etapas.

- [ ] **Step 5: Implementar detalhe e abas**

Exibir pipeline, 11,7/18 ha, 65%, 4h36, seis colaboradores, sincronização e conteúdo de Resumo, Execução, Checklist, Evidências e Histórico.

- [ ] **Step 6: Confirmar GREEN e regressão**

Run: `npm run test:run -- src/pages/admin/NewOrderPage.test.tsx && npm run typecheck`

Expected: exit code 0.

### Task 6: Operações, revisão, correção e aprovação

**Files:**
- Create: `src/pages/admin/OperationsPage.tsx`
- Create: `src/pages/admin/ReviewActivityPage.test.tsx`
- Create: `src/pages/admin/ReviewActivityPage.tsx`
- Create: `src/components/review/EvidenceGallery.tsx`
- Create: `src/components/review/LocationEvidence.tsx`
- Create: `src/components/review/CorrectionModal.tsx`
- Create: `src/components/review/ApprovalModal.tsx`
- Create: `src/styles/operations.css`
- Create: `src/styles/review.css`

**Interfaces:**
- Consumes: `approveActivity()` e `returnActivity()`.
- Produces: estado aprovado/devolvido e navegação para relatório.

- [ ] **Step 1: Escrever testes de correção e aprovação**

```tsx
test('solicita correção com motivo e descrição', async () => {
  renderAt('/admin/review/2026-0147');
  await userEvent.click(screen.getByRole('button', { name: 'Solicitar correção' }));
  await userEvent.click(screen.getByRole('button', { name: 'Devolver ao técnico' }));
  expect(screen.getByText(/correção enviada/i)).toBeInTheDocument();
});

test('aprova e oferece gerar relatório', async () => {
  renderAt('/admin/review/2026-0147');
  await userEvent.click(screen.getByRole('button', { name: 'Aprovar atividade' }));
  expect(screen.getByText('Deseja gerar o relatório agora?')).toBeInTheDocument();
});
```

- [ ] **Step 2: Confirmar RED**

Run: `npm run test:run -- src/pages/admin/ReviewActivityPage.test.tsx`

Expected: dois testes FAIL por ausência dos controles.

- [ ] **Step 3: Implementar Kanban e alternância de visão**

Criar seis colunas com os cards do briefing, progresso, offline, motivo da devolução e links para detalhe/revisão.

- [ ] **Step 4: Implementar revisão de alta fidelidade**

Criar duas colunas com execução, meta, equipe, clima, checklist 6/6, galeria Antes/Durante/Depois, coordenadas e precisão do mapa conceitual.

- [ ] **Step 5: Implementar os dois modais**

Correção usa motivo `Evidência ausente` e descrição predefinida. Aprovação mostra Lucas Martins, 26/08/2026, 17:42 e botões `Gerar relatório`/`Continuar depois`.

- [ ] **Step 6: Confirmar GREEN**

Run: `npm run test:run -- src/pages/admin/ReviewActivityPage.test.tsx`

Expected: 2 testes PASS.

### Task 7: Projetos e cadastros operacionais

**Files:**
- Create: `src/pages/admin/ProjectsPage.tsx`
- Create: `src/pages/admin/ProjectDetailPage.tsx`
- Create: `src/pages/admin/ClientsPage.tsx`
- Create: `src/pages/admin/TeamsPage.tsx`
- Create: `src/pages/admin/ChecklistsPage.tsx`
- Create: `src/pages/admin/ChecklistEditorPage.tsx`
- Create: `src/pages/admin/HistoryPage.tsx`
- Create: `src/pages/admin/UsersPage.tsx`
- Create: `src/pages/admin/SettingsPage.tsx`
- Create: `src/styles/secondary.css`

**Interfaces:**
- Consumes: fixtures de projetos, clientes, equipes e histórico.
- Produces: telas secundárias navegáveis sem novas regras de estado.

- [ ] **Step 1: Implementar projetos e detalhe**

Exibir cards de contratos, progresso, produção e OS; no detalhe, mostrar 144/200 ha, evolução planejada x realizada, produção semanal e divisão Equipe Norte/Equipe Sul.

- [ ] **Step 2: Implementar Clientes & UFVs e Equipes**

Usar as tabelas e cards definidos no briefing, com ações visuais e estados Ativo/Em operação/Disponível.

- [ ] **Step 3: Implementar modelos e editor de checklist**

Renderizar os dois modelos e editor estruturado de seis itens com drag handles visuais, badges Obrigatório, Foto necessária e Localização necessária.

- [ ] **Step 4: Implementar histórico, usuários e configurações**

Histórico deve usar a timeline fornecida; Usuários e Configurações terão conteúdo demonstrativo consistente e sem funcionalidades administrativas reais.

- [ ] **Step 5: Executar smoke tests e typecheck**

Run: `npm run test:run && npm run typecheck`

Expected: exit code 0.

### Task 8: Relatórios e Portal do Cliente

**Files:**
- Create: `src/pages/admin/ReportsPage.tsx`
- Create: `src/pages/admin/ReportBuilderPage.tsx`
- Create: `src/pages/admin/ReportPreviewPage.tsx`
- Create: `src/pages/client/ClientDashboardPage.tsx`
- Create: `src/pages/client/ClientProjectPage.tsx`
- Create: `src/pages/client/ClientReportsPage.tsx`
- Create: `src/styles/reports.css`
- Create: `src/styles/client.css`

**Interfaces:**
- Produces: fluxo `Gerar relatório → Prévia → Portal do Cliente`.

- [ ] **Step 1: Implementar central e gerador controlado**

Criar indicadores, tabela de relatórios e seleção dos 13 componentes permitidos. O botão `Visualizar prévia` navega para `/admin/reports/preview`.

- [ ] **Step 2: Implementar prévia A4**

Renderizar uma folha branca com logo, título, operação, resumo, 72%, gráfico, evidências, mapa e checklist, além de ações externas `Voltar` e `Gerar PDF`.

- [ ] **Step 3: Implementar Portal do Cliente**

Dashboard Solaris Energia com quatro métricas, evolução do projeto e card UFV Sol do Cerrado; detalhe com dados aprovados e relatórios recentes; página de relatórios com visualizar/baixar simulados.

- [ ] **Step 4: Verificar navegação de resultado**

Run: `npm run test:run && npm run typecheck`

Expected: exit code 0.

### Task 9: Aplicativo mobile e fluxo offline

**Files:**
- Create: `src/pages/mobile/MobileHomePage.tsx`
- Create: `src/pages/mobile/MobileOrderPage.tsx`
- Create: `src/pages/mobile/MobileActivityPage.tsx`
- Create: `src/pages/mobile/MobileChecklistPage.tsx`
- Create: `src/pages/mobile/MobileProductivityPage.tsx`
- Create: `src/pages/mobile/MobileEvidencePage.tsx`
- Create: `src/pages/mobile/MobileSyncPage.test.tsx`
- Create: `src/pages/mobile/MobileSyncPage.tsx`
- Create: `src/pages/mobile/MobileReviewPage.tsx`
- Create: `src/pages/mobile/MobileReturnedPage.tsx`
- Create: `src/styles/mobile.css`

**Interfaces:**
- Consumes: todo o estado e ações de `usePrototype()`.
- Produces: fluxo mobile navegável com persistência simulada offline.

- [ ] **Step 1: Escrever teste offline/sincronização**

```tsx
test('preserva dados offline e sincroniza quando a conexão retorna', async () => {
  renderAt('/mobile/sync');
  expect(screen.getByText('4 fotos aguardando sincronização')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Tentar sincronizar' }));
  expect(await screen.findByText('Sincronização concluída')).toBeInTheDocument();
});
```

- [ ] **Step 2: Confirmar RED**

Run: `npm run test:run -- src/pages/mobile/MobileSyncPage.test.tsx`

Expected: FAIL por ausência da página/ação.

- [ ] **Step 3: Implementar início, OS e atividade**

Criar cards de hoje, detalhe da OS, cronômetro visual, produção, checklist, evidências e localização com CTAs grandes.

- [ ] **Step 4: Implementar formulários operacionais**

Checklist 4/6, produtividade 11,7 ha, seis pessoas, clima ensolarado e observação; evidências Antes/Durante/Depois com coordenadas e precisão.

- [ ] **Step 5: Implementar offline e sincronização**

Mostrar banner offline, itens salvos, quatro fotos na fila e atividade pendente. `Tentar sincronizar` apresenta loading curto e o estado final `Sincronização concluída`.

- [ ] **Step 6: Implementar revisão e atividade devolvida**

Revisão exibe todos os campos obrigatórios completos e envia ao gestor. Atividade devolvida destaca somente a fotografia final do setor B e permite reenviar.

- [ ] **Step 7: Confirmar GREEN**

Run: `npm run test:run -- src/pages/mobile/MobileSyncPage.test.tsx`

Expected: PASS.

### Task 10: Assets, refinamento e verificação final

**Files:**
- Create: `public/assets/evidence-before.webp`
- Create: `public/assets/evidence-during.webp`
- Create: `public/assets/evidence-after.webp`
- Modify: estilos e componentes das telas prioritárias após inspeção visual

**Interfaces:**
- Produces: protótipo autocontido e pronto para apresentação.

- [ ] **Step 1: Criar evidências visuais locais**

Gerar três imagens coerentes da mesma usina solar brasileira: vegetação antes da operação, equipe realizando lavagem/roçagem e módulos limpos após a execução. Não incluir logotipos de terceiros nem texto dentro das imagens.

- [ ] **Step 2: Executar verificação automatizada completa**

Run: `npm run test:run`

Expected: todos os testes PASS e zero falhas.

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0 e `dist/` gerado.

- [ ] **Step 3: Iniciar o servidor e verificar no navegador**

Run: `npm run dev -- --host 127.0.0.1`

Com agent-browser, abrir `/admin/dashboard`, `/admin/orders`, `/admin/orders/new`, `/admin/review/2026-0147`, `/admin/reports/preview`, `/mobile`, `/mobile/sync` e `/client/dashboard`.

Expected para cada rota: conteúdo significativo, ausência de `.vite-error-overlay`, ausência de overflow horizontal não intencional e controles principais presentes.

- [ ] **Step 4: Validar viewports**

Capturar dashboard/revisão em 1440 × 1000 e mobile/atividade/offline em 390 × 844. Ajustar apenas diferenças concretas encontradas nas capturas.

- [ ] **Step 5: Repetir verificações após ajustes**

Run: `npm run test:run && npm run typecheck && npm run build`

Expected: exit code 0 em todos os comandos.

- [ ] **Step 6: Conferir critérios do spec**

Confirmar, rota por rota, os quatro fluxos principais, os três ambientes, a organização das pastas, os dez destaques visuais e a ausência de funcionalidades fora do escopo.
