# Allebras Central de Documentos Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um protótipo SaaS B2B navegável e de alta fidelidade para demonstrar a orquestração documental da Allebras em uma reunião comercial.

**Architecture:** SPA em React com rotas locais, dois shells de navegação e estado de demonstração centralizado em `PrototypeProvider`. Dados fictícios ficam separados da apresentação; componentes visuais reutilizáveis sustentam dashboards, tabelas, status, timelines, drawers, modais e toasts.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Lucide React, Recharts, Vitest, Testing Library e CSS modular por responsabilidade.

**Spec:** `docs/superpowers/specs/2026-08-26-allebras-central-documentos-prototype-design.md`

## Global Constraints

- Conteúdo integralmente em português do Brasil, sem Lorem Ipsum.
- Otimização principal para desktop em 1440 px, com adaptação responsiva.
- Sem backend, autenticação real, persistência externa ou integrações reais.
- Domínio restrito a captura, validação, deduplicação, classificação, organização, arquivamento e rastreabilidade documental.
- Visual corporativo em azul, ciano, verde, âmbar, vermelho e neutros; sem gradientes chamativos.
- Microinterações curtas e discretas, com suporte a `prefers-reduced-motion`.
- O usuário dispensou operações de Git; não criar commits durante a implementação.

## File Map

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `index.html`: toolchain e scripts.
- `src/main.tsx`, `src/app/App.tsx`, `src/app/routes.tsx`: bootstrap e mapa de rotas.
- `src/app/PrototypeContext.tsx`: estado efêmero de pendências, regras, sincronização, upload, perfil e feedback.
- `src/data/mockData.ts`, `src/types/domain.ts`: contratos e dados realistas compartilhados.
- `src/styles/*.css`: tokens, base, layout, componentes e responsividade.
- `src/components/layout/*`: shells administrativo e fornecedor.
- `src/components/ui/*`: componentes visuais reutilizáveis.
- `src/components/dashboard/*`: gráficos e pipeline de orquestração.
- `src/components/documents/*`: pipeline, abas e painéis do documento.
- `src/pages/admin/*`: telas administrativas.
- `src/pages/supplier/*`: portal e upload do fornecedor.
- `src/test/*` e arquivos `*.test.tsx`: configuração e testes comportamentais.

---

### Task 1: Foundation, domain model and visual primitives

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`
- Create: `src/types/domain.ts`
- Create: `src/data/mockData.ts`
- Create: `src/components/ui/StatusBadge.tsx`
- Create: `src/components/ui/MetricCard.tsx`
- Create: `src/components/ui/PageHeader.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Toast.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/components.css`
- Test: `src/components/ui/StatusBadge.test.tsx`

**Interfaces:**
- Produces: `DocumentStatus`, `DocumentRecord`, `PendingItem`, `RuleRecord`, `IntegrationRecord`, `StatusBadge`, `MetricCard`, `PageHeader`, `Button` and mock data arrays.
- `StatusBadge` signature: `({ status }: { status: DocumentStatus | 'Operacional' | 'Atenção' | 'Ativo' }) => JSX.Element`.

- [ ] **Step 1: Create the toolchain and install dependencies**

Create `package.json` with scripts `dev`, `build`, `test`, `test:run` and `typecheck`; dependencies `react`, `react-dom`, `react-router-dom`, `lucide-react`, `recharts`; dev dependencies `typescript`, `vite`, `@vitejs/plugin-react`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` and React type packages. Run `npm install`.

- [ ] **Step 2: Write the failing status badge test**

```tsx
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

it('renders a semantic class for a completed document', () => {
  render(<StatusBadge status="Concluído" />);
  expect(screen.getByText('Concluído')).toHaveClass('status-badge--success');
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm run test:run -- src/components/ui/StatusBadge.test.tsx`
Expected: FAIL because `StatusBadge` does not exist.

- [ ] **Step 4: Define domain contracts and real mock data**

```ts
export type DocumentStatus = 'Concluído' | 'Processando' | 'Pendente' | 'Duplicado' | 'Erro';
export interface DocumentRecord {
  id: string; title: string; supplier: string; type: string; origin: string;
  issuedAt: string; value: string; category: string; status: DocumentStatus;
}
export interface PendingItem {
  id: string; document: string; supplier: string; reason: string; origin: string;
  date: string; priority: 'Alta' | 'Média' | 'Baixa'; action: 'Resolver' | 'Reprocessar';
}
export interface RuleRecord {
  priority: number; name: string; conditions: string[]; category: string;
  applications: number; active: boolean;
}
export interface IntegrationRecord {
  id: string; name: string; status: 'Operacional' | 'Atenção'; sync: string;
  volumeLabel: string; volume: string; detail?: string;
}
```

Populate `mockData.ts` with every document, pending item, rule, integration, supplier, audit event, chart point and processing event in the approved specification.

- [ ] **Step 5: Implement primitives and the corporate token system**

```tsx
const toneMap = {
  Concluído: 'success', Processando: 'info', Pendente: 'warning', Duplicado: 'duplicate',
  Erro: 'danger', Operacional: 'success', Atenção: 'warning', Ativo: 'success',
} as const;
export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${toneMap[status]}`}>{status}</span>;
}
```

Define CSS custom properties for background `#f4f7fb`, surface `#ffffff`, ink `#172033`, muted `#667085`, primary `#155eef`, cyan `#0891b2`, success `#15803d`, warning `#b54708`, danger `#b42318`, border `#e4e9f2`, radii and subtle shadows. Import Inter from Google Fonts with a system-font fallback.

- [ ] **Step 6: Verify GREEN and type safety**

Run: `npm run test:run -- src/components/ui/StatusBadge.test.tsx`
Expected: PASS.

Run: `npm run typecheck`
Expected: exit 0.

---

### Task 2: Application routing, authentication facade and navigation shells

**Files:**
- Create: `src/app/PrototypeContext.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/routes.tsx`
- Create: `src/components/layout/Brand.tsx`
- Create: `src/components/layout/AdminShell.tsx`
- Create: `src/components/layout/SupplierShell.tsx`
- Create: `src/components/layout/Topbar.tsx`
- Create: `src/pages/LoginPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/styles/layout.css`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: UI primitives and tokens from Task 1.
- Produces: `PrototypeProvider`, `usePrototype()`, admin routes under `/app/*`, supplier routes under `/fornecedor/*` and login at `/`.
- Context actions: `resolvePending(id, category, createRule)`, `syncIntegration(id)`, `submitSupplierDocument()`, `showToast(message, tone)`, `switchProfile(profile)`.

- [ ] **Step 1: Write the failing navigation test**

```tsx
it('logs in and navigates to the administrative dashboard', async () => {
  render(<App />, { wrapper: BrowserRouter });
  await userEvent.type(screen.getByLabelText('E-mail'), 'gabriel@allebras.com.br');
  await userEvent.type(screen.getByLabelText('Senha'), 'allebras');
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
  expect(await screen.findByRole('heading', { name: 'Visão Geral' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:run -- src/app/App.test.tsx`
Expected: FAIL because `App` and the login flow do not exist.

- [ ] **Step 3: Implement route map and prototype context**

Use `createBrowserRouter` with lazy page elements where useful. `PrototypeProvider` owns `pendingItems`, `rules`, `integrations`, `supplierUploadState`, `toast` and `profile`; actions update only in-memory state. The login submit calls `navigate('/app/dashboard')` after a 450 ms loading state.

- [ ] **Step 4: Implement login and both shells**

Admin navigation labels and routes:

```ts
const adminNav = [
  ['Visão Geral', '/app/dashboard'], ['Documentos', '/app/documentos'],
  ['Pendências', '/app/pendencias'], ['Fornecedores', '/app/fornecedores'],
  ['Regras', '/app/regras'], ['Integrações', '/app/integracoes'],
  ['Auditoria', '/app/auditoria'], ['Configurações', '/app/configuracoes'],
] as const;
```

Supplier navigation labels and routes:

```ts
const supplierNav = [
  ['Visão Geral', '/fornecedor'], ['Enviar Documento', '/fornecedor/enviar'],
  ['Meus Documentos', '/fornecedor/documentos'], ['Pendências', '/fornecedor/pendencias'],
  ['Minha Empresa', '/fornecedor/empresa'],
] as const;
```

The login ecosystem panel renders six source chips and the four-stage flow. Add a profile switch control in the admin topbar to enter the supplier portal and a return control in the supplier shell.

- [ ] **Step 5: Verify navigation GREEN**

Run: `npm run test:run -- src/app/App.test.tsx`
Expected: PASS.

Run: `npm run typecheck`
Expected: exit 0.

---

### Task 3: High-impact administrative dashboard

**Files:**
- Create: `src/pages/admin/DashboardPage.tsx`
- Create: `src/components/dashboard/VolumeChart.tsx`
- Create: `src/components/dashboard/OriginDonut.tsx`
- Create: `src/components/dashboard/ProcessingStatus.tsx`
- Create: `src/components/dashboard/OrchestrationFlow.tsx`
- Create: `src/components/dashboard/IntegrationSummary.tsx`
- Create: `src/components/dashboard/RecentPendencies.tsx`
- Create: `src/styles/dashboard.css`
- Test: `src/pages/admin/DashboardPage.test.tsx`

**Interfaces:**
- Consumes: `MetricCard`, mock chart/origin/status/integration/pending data and route links.
- Produces: dashboard at `/app/dashboard`; `OrchestrationFlow` reusable presentation component.

- [ ] **Step 1: Write the failing dashboard content test**

```tsx
it('shows the operational KPIs and orchestration stages', () => {
  renderWithRouter(<DashboardPage />);
  expect(screen.getByText('1.284')).toBeInTheDocument();
  expect(screen.getByText('1.167')).toBeInTheDocument();
  expect(screen.getByText('Captura')).toBeInTheDocument();
  expect(screen.getByText('SharePoint')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:run -- src/pages/admin/DashboardPage.test.tsx`
Expected: FAIL because `DashboardPage` does not exist.

- [ ] **Step 3: Build dashboard sections**

Render header and 30-day filter; four KPI cards with the exact values; responsive area chart for volume; donut legend with 38/24/18/12/6/2 percent values; processing status list with 1.067/52/43/32/8; five integrations; three recent pending rows; and the compact four-column pipeline.

`OrchestrationFlow` columns contain:

```ts
[
  { title: 'Captura', items: ['Outlook', 'Portal do Fornecedor', 'NF-e', 'CT-e', 'NFS-e', 'Nomus'] },
  { title: 'Processamento', items: ['Extração de dados', 'Validação', 'Deduplicação'] },
  { title: 'Organização', items: ['Fornecedor', 'Pedido de compra', 'Classificação', 'Renomeação'] },
  { title: 'Destino', items: ['SharePoint'] },
]
```

- [ ] **Step 4: Add visual hierarchy and microinteractions**

Use a 12-column CSS grid, 20–24 px gaps, compact chart tooltips, card hover lift of at most 2 px, animated chart entrance and neutral accessibility labels. Ensure the pipeline remains readable without hover.

- [ ] **Step 5: Verify dashboard GREEN**

Run: `npm run test:run -- src/pages/admin/DashboardPage.test.tsx`
Expected: PASS.

---

### Task 4: Document center, detail page and processing traceability

**Files:**
- Create: `src/pages/admin/DocumentsPage.tsx`
- Create: `src/pages/admin/DocumentDetailPage.tsx`
- Create: `src/components/documents/DocumentFilters.tsx`
- Create: `src/components/documents/DocumentTable.tsx`
- Create: `src/components/documents/DocumentPipeline.tsx`
- Create: `src/components/documents/DocumentOverview.tsx`
- Create: `src/components/documents/ProcessingTimeline.tsx`
- Create: `src/components/documents/ArchiveCard.tsx`
- Create: `src/components/documents/AddDocumentModal.tsx`
- Create: `src/styles/documents.css`
- Test: `src/pages/admin/DocumentsPage.test.tsx`
- Test: `src/pages/admin/DocumentDetailPage.test.tsx`

**Interfaces:**
- Consumes: `documents`, `processingEvents`, filters, badges and buttons.
- Produces: `/app/documentos`, `/app/documentos/:id`, query-aware detail tabs and add-document modal.

- [ ] **Step 1: Write failing search and detail navigation tests**

```tsx
it('filters documents by supplier', async () => {
  renderRoute('/app/documentos');
  await userEvent.type(screen.getByPlaceholderText(/Buscar por número/), 'Morganite');
  expect(screen.getByText('NF-e 000023781')).toBeInTheDocument();
  expect(screen.queryByText('Transportadora Atlas')).not.toBeInTheDocument();
});

it('opens the traceability history for a document', async () => {
  renderRoute('/app/documentos/nfe-145829');
  await userEvent.click(screen.getByRole('tab', { name: 'Histórico' }));
  expect(screen.getByText('Processamento concluído em 7 segundos')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run both tests and verify RED**

Run: `npm run test:run -- src/pages/admin/DocumentsPage.test.tsx src/pages/admin/DocumentDetailPage.test.tsx`
Expected: FAIL because the document pages do not exist.

- [ ] **Step 3: Implement the central table and filters**

Render the exact nine columns, six supplied document rows, seven visible filter controls, “Mais filtros”, search and pagination. Search case-insensitively across title, supplier, type, origin and category. Clicking the first row or its view action navigates to `/app/documentos/nfe-145829`.

- [ ] **Step 4: Implement the detail overview and archive card**

Show the four completed pipeline stages, fiscal data, classification data, SEFAZ capture source, Nomus consolidation notice and SharePoint archive card with file `2026_08_SAINT-GOBAIN_NFE_145829.xml` and destination `SharePoint / Fiscal / 2026 / Agosto / Matéria-prima / Saint-Gobain`.

- [ ] **Step 5: Implement tabs and history**

Use tab buttons with `role="tab"`. “Arquivos” shows XML and DANFE rows; “Processamento” shows extraction/validation summary; “Histórico” renders the ten events at 08:42:01–08:42:08 and a green result card. Support direct route `/app/documentos/nfe-145829?tab=historico`.

- [ ] **Step 6: Implement add-document modal**

The button opens a centered modal with drop area, origin selector and CTA. The CTA shows a visual-only success toast; no file IO is performed.

- [ ] **Step 7: Verify document flows GREEN**

Run: `npm run test:run -- src/pages/admin/DocumentsPage.test.tsx src/pages/admin/DocumentDetailPage.test.tsx`
Expected: PASS.

---

### Task 5: Pendencies, resolution drawer, classification rules and rule builder

**Files:**
- Create: `src/pages/admin/PendenciesPage.tsx`
- Create: `src/components/pendencies/ResolutionDrawer.tsx`
- Create: `src/pages/admin/RulesPage.tsx`
- Create: `src/pages/admin/NewRulePage.tsx`
- Create: `src/styles/pendencies.css`
- Create: `src/styles/rules.css`
- Test: `src/pages/admin/PendenciesPage.test.tsx`
- Test: `src/pages/admin/NewRulePage.test.tsx`

**Interfaces:**
- Consumes: `usePrototype().pendingItems`, `rules`, `resolvePending`, `showToast`.
- Produces: `/app/pendencias`, `/app/regras`, `/app/regras/nova`; `ResolutionDrawer` state changes shared context.

- [ ] **Step 1: Write the failing end-to-end exception test**

```tsx
it('turns a manual classification into a future rule', async () => {
  renderRoute('/app/pendencias');
  await userEvent.click(screen.getAllByRole('button', { name: 'Resolver' })[0]);
  await userEvent.selectOptions(screen.getByLabelText('Selecionar categoria'), 'Matéria-prima');
  await userEvent.click(screen.getByRole('button', { name: 'Classificar e continuar' }));
  expect(await screen.findByText('Documento classificado e processamento concluído')).toBeInTheDocument();
  expect(screen.getByText('Morganite — Matéria-prima')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:run -- src/pages/admin/PendenciesPage.test.tsx`
Expected: FAIL because the flow does not exist.

- [ ] **Step 3: Implement pendency KPIs, filters and table**

Show `43 Pendências abertas`, `12 Alta prioridade`, `Tempo médio de resolução: 2h 14min`; priority, reason and supplier filters; and the three supplied rows. “Reprocessar” displays a two-step loading/success state.

- [ ] **Step 4: Implement the resolution drawer and shared update**

The drawer includes the Morganite data, category select, checked automation checkbox and conditional rule preview:

```txt
SE Fornecedor = Morganite Brasil
E CFOP = 5101
ENTÃO Categoria = Matéria-prima
```

`resolvePending` removes the visible Morganite pending item, prepends a `RuleRecord` named `Morganite — Matéria-prima` when checked, closes the drawer and triggers the success toast plus a completion panel with links to document and rule.

- [ ] **Step 5: Implement rule list and drag affordance**

Render priority handle, names, condition chips, category arrow, applications, active badge and row menu. Add `+ Nova regra` link. Priority changes are represented visually; optional up/down controls may reorder in memory.

- [ ] **Step 6: Write failing new-rule form test**

```tsx
it('saves a visually configured classification rule', async () => {
  renderRoute('/app/regras/nova');
  await userEvent.type(screen.getByLabelText('Nome da regra'), 'Morganite — Matéria-prima');
  await userEvent.click(screen.getByRole('button', { name: 'Salvar regra' }));
  expect(await screen.findByText('Regra salva com sucesso')).toBeInTheDocument();
});
```

- [ ] **Step 7: Run new-rule test and verify RED**

Run: `npm run test:run -- src/pages/admin/NewRulePage.test.tsx`
Expected: FAIL because the rule builder does not exist.

- [ ] **Step 8: Implement the visual rule builder**

Render name input; first condition `[Fornecedor] [é igual a] [Morganite Brasil]`; add-condition button producing `[CFOP] [é igual a] [5101]`; result selects for category `Matéria-prima`, unit `Manter identificada`, destination `Automático`, priority `Alta`; cancel and save buttons. Save displays a toast and returns to `/app/regras` after 600 ms.

- [ ] **Step 9: Verify exception and rule flows GREEN**

Run: `npm run test:run -- src/pages/admin/PendenciesPage.test.tsx src/pages/admin/NewRulePage.test.tsx`
Expected: PASS.

---

### Task 6: Integrations, suppliers, audit and settings

**Files:**
- Create: `src/pages/admin/IntegrationsPage.tsx`
- Create: `src/components/integrations/IntegrationCard.tsx`
- Create: `src/components/integrations/IntegrationDetailDrawer.tsx`
- Create: `src/pages/admin/SuppliersPage.tsx`
- Create: `src/pages/admin/AuditPage.tsx`
- Create: `src/pages/admin/SettingsPage.tsx`
- Create: `src/styles/integrations.css`
- Create: `src/styles/secondary-pages.css`
- Test: `src/pages/admin/IntegrationsPage.test.tsx`

**Interfaces:**
- Consumes: `integrations`, `suppliers`, `auditEvents`, `syncIntegration`, status primitives.
- Produces: `/app/integracoes`, `/app/fornecedores`, `/app/auditoria`, `/app/configuracoes`.

- [ ] **Step 1: Write the failing synchronization test**

```tsx
it('shows feedback after synchronizing Nomus', async () => {
  renderRoute('/app/integracoes');
  await userEvent.click(screen.getByRole('button', { name: 'Sincronizar Nomus ERP' }));
  expect(await screen.findByText('Sincronização concluída')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:run -- src/pages/admin/IntegrationsPage.test.tsx`
Expected: FAIL because the integration page does not exist.

- [ ] **Step 3: Implement six integration cards and activity timeline**

Use exact status, sync and volume copy from the specification. Nomus sync changes button to spinner for 700 ms, updates last sync to “agora” and emits the success toast. Clicking Nomus, Outlook or NF-e opens a detail drawer with capture method, health checks and recent activity.

- [ ] **Step 4: Implement suppliers page**

Show 128 suppliers, 94 active accesses, 12 open pendencies and a table led by Saint-Gobain and Morganite. Each overflow menu contains “Ver detalhes”, “Ver documentos”, “Reenviar convite” and “Desativar acesso”. “+ Convidar fornecedor” opens a small visual modal.

- [ ] **Step 5: Implement audit page**

Render user, action type, period and document filters plus the five supplied events. Use distinct system/user avatars and columns for time, actor, action and affected record.

- [ ] **Step 6: Implement settings support page**

Render non-persistent cards for document naming pattern, notification recipients, default SharePoint destination and profile information. Controls display a success toast when saved.

- [ ] **Step 7: Verify integration GREEN**

Run: `npm run test:run -- src/pages/admin/IntegrationsPage.test.tsx`
Expected: PASS.

---

### Task 7: Supplier portal, upload success and duplicate-document demonstration

**Files:**
- Create: `src/pages/supplier/SupplierDashboardPage.tsx`
- Create: `src/pages/supplier/SupplierUploadPage.tsx`
- Create: `src/pages/supplier/SupplierDocumentsPage.tsx`
- Create: `src/pages/supplier/SupplierPendenciesPage.tsx`
- Create: `src/pages/supplier/SupplierCompanyPage.tsx`
- Create: `src/components/supplier/UploadDropzone.tsx`
- Create: `src/components/supplier/DuplicateDocumentModal.tsx`
- Create: `src/styles/supplier.css`
- Test: `src/pages/supplier/SupplierUploadPage.test.tsx`

**Interfaces:**
- Consumes: supplier shell, document/status primitives and `submitSupplierDocument`.
- Produces: supplier routes and duplicate modal opened by `?duplicado=1` or a secondary action.

- [ ] **Step 1: Write the failing upload success test**

```tsx
it('extracts the sample XML data and reaches a received state', async () => {
  renderRoute('/fornecedor/enviar');
  expect(screen.getByText('NFe_000023781.xml')).toBeInTheDocument();
  expect(screen.getByText('R$ 6.831,90')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Enviar documento' }));
  expect(await screen.findByText('Documento recebido')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:run -- src/pages/supplier/SupplierUploadPage.test.tsx`
Expected: FAIL because supplier upload does not exist.

- [ ] **Step 3: Implement supplier dashboard and support pages**

Dashboard copy: “Olá, Morganite Brasil”, 42 sent, 38 completed, 3 pending, 1 processing, recent documents table, prominent upload CTA and 3-document warning. Documents and pendencies pages reuse simplified tables. Company page shows CNPJ, contact and access status.

- [ ] **Step 4: Implement upload extraction and success states**

Initial loaded file is `NFe_000023781.xml` with success indicator. Show extracted NF-e number, supplier, CNPJ, issue date and value; purchase order defaults to `PC-2026-004945`; note is optional. Submit displays sequential “Validando XML”, “Verificando duplicidade”, “Documento recebido” states within 1.2 seconds and the approved explanatory message.

- [ ] **Step 5: Implement duplicate modal**

Modal content uses NF-e 000145829, first receipt at 18/08/2026 08:42, NF-e/SEFAZ as initial source and Portal do Fornecedor as new source. The emphasized note explains that no copy is created and the new origin joins the history. “Entendi” closes the modal.

- [ ] **Step 6: Verify supplier flow GREEN**

Run: `npm run test:run -- src/pages/supplier/SupplierUploadPage.test.tsx`
Expected: PASS.

---

### Task 8: Responsive polish, accessibility and full verification

**Files:**
- Create: `src/styles/responsive.css`
- Modify: `src/styles/base.css`
- Modify: `src/styles/layout.css`
- Modify: `src/app/App.tsx`
- Modify: affected components identified by browser review
- Test: all existing test files

**Interfaces:**
- Consumes: complete application from Tasks 1–7.
- Produces: presentation-ready 1440 px prototype with usable tablet/mobile fallback.

- [ ] **Step 1: Add responsive CSS rules**

At `max-width: 1180px`, reduce dashboard grids and make complex tables horizontally scrollable. At `max-width: 820px`, collapse sidebar into a toggleable drawer, stack page headers and transform two-column detail layouts into one column. At `max-width: 560px`, reduce card padding and keep primary actions full-width. Do not hide business-critical values.

- [ ] **Step 2: Add accessibility and reduced-motion safeguards**

Ensure icon-only buttons have `aria-label`, modal/drawer close buttons are keyboard reachable, active tabs expose `aria-selected`, focus rings are visible and form fields have labels. Add:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 3: Run the complete automated verification**

Run: `npm run test:run`
Expected: all tests PASS with zero failures.

Run: `npm run typecheck`
Expected: exit 0 with no TypeScript errors.

Run: `npm run build`
Expected: exit 0 and `dist/` generated.

- [ ] **Step 4: Run browser verification at 1440 px**

Start `npm run dev -- --host 127.0.0.1`. Inspect login, dashboard, documents, detail/history, pendency resolution, integrations and supplier upload at 1440 × 1000. Verify no clipping, overlap, horizontal page overflow, broken charts, missing icons or unreadable status badges.

- [ ] **Step 5: Exercise the four presentation flows**

Verify manually:

1. Login → Dashboard → Documentos → NF-e 000145829 → Histórico.
2. Dashboard → Pendências → Resolver → Matéria-prima → regra criada → documento concluído.
3. Dashboard → Integrações → Nomus → sincronizar → sucesso.
4. Portal do Fornecedor → Enviar Documento → processamento → Documento recebido → modal de duplicidade.

- [ ] **Step 6: Fix visual defects and repeat full verification**

For each defect, first add or adjust a behavioral regression test when applicable; then apply the smallest CSS/component correction. Re-run `npm run test:run`, `npm run typecheck` and `npm run build` after all corrections.

