# Fluxo Fiscal Power Apps Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renomear o produto para Fluxo Fiscal e redesenhar o protótipo para representar com fidelidade uma Canvas App moderna e viável no Power Apps.

**Architecture:** A SPA React existente manterá rotas, fixtures e estado demonstrativo. A mudança será feita por uma nova fundação visual Fluent-like, seguida de simplificação dos shells e páginas, sem alterar o domínio funcional.

**Tech Stack:** React 19, TypeScript 5.7, React Router 7, Recharts 2, Lucide React, Vitest, Testing Library e CSS.

**Spec:** `docs/superpowers/specs/2026-08-27-fluxo-fiscal-power-apps-redesign.md`

## Global Constraints

- Nome do produto: **Fluxo Fiscal**.
- Allebras permanece somente como empresa/ambiente/dado operacional.
- Aparência baseada em Power Apps Canvas, controles modernos e Fluent 2.
- Fonte Segoe UI, corpo 16 px e dados de gallery/tabela com no mínimo 14 px.
- Cards planos com borda; sem gradientes e sem sombras decorativas.
- Preservar todas as rotas, dados, estados e fluxos atuais.
- Não usar Git.

---

### Task 1: Rebranding e contrato visual

**Files:**
- Modify: `src/app/App.test.tsx`
- Modify: `src/components/layout/Brand.tsx`
- Modify: `src/pages/LoginPage.tsx`
- Modify: `index.html`
- Modify: `package.json`
- Modify: `src/pages/**/*.tsx`
- Modify: `src/components/**/*.tsx`

**Interfaces:**
- Produces: marca `Fluxo Fiscal`, subtítulo `Gestão e automação documental` e contexto `Ambiente Allebras`.

- [ ] Atualizar o smoke test para exigir a marca Fluxo Fiscal no login.
- [ ] Executar `npm run test:run -- src/app/App.test.tsx` e confirmar RED.
- [ ] Atualizar Brand, login, metadata e package name.
- [ ] Substituir somente usos de Allebras que representam o nome do sistema; preservar textos empresariais e e-mails.
- [ ] Executar o teste até ficar verde.

### Task 2: Fundação Fluent e shells

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/base.css`
- Modify: `src/styles/components.css`
- Modify: `src/styles/layout.css`
- Modify: `src/styles/responsive.css`
- Modify: `src/styles/typography.css`
- Modify: `src/components/layout/AdminShell.tsx`
- Modify: `src/components/layout/Topbar.tsx`
- Modify: `src/components/layout/SupplierShell.tsx`

**Interfaces:**
- Produces: tokens Fluent, sidebar 232 px, header 64 px, controles de 40 px e tipografia legível.

- [ ] Trocar os tokens para azul Fluent `#0F6CBD`, fundo `#F5F5F5`, borda `#D1D1D1`, texto `#242424` e raio máximo de 8 px.
- [ ] Aplicar `Segoe UI` e corpo de 16 px.
- [ ] Remover sombras, gradientes e transformações de hover decorativas.
- [ ] Simplificar sidebar, topbar e shell do fornecedor com containers convencionais.
- [ ] Redesenhar o login como split-screen simples.

### Task 3: Dashboard e documentos prioritários

**Files:**
- Modify: `src/pages/admin/DashboardPage.tsx`
- Modify: `src/components/dashboard/*.tsx`
- Modify: `src/pages/admin/DocumentsPage.tsx`
- Modify: `src/components/documents/*.tsx`
- Modify: `src/pages/admin/DocumentDetailPage.tsx`
- Modify: `src/styles/dashboard.css`
- Modify: `src/styles/documents.css`

**Interfaces:**
- Produces: cards planos, gráfico principal, galleries legíveis, filtros modernos e detalhe em tela própria.

- [ ] Reduzir o dashboard a quatro métricas, um gráfico, listas de status/integrações e pipeline simples.
- [ ] Converter a central de documentos para seis colunas principais e linha de 58–64 px.
- [ ] Manter dados secundários acessíveis no detalhe.
- [ ] Simplificar abas, pipeline e arquivamento no detalhe.
- [ ] Atualizar os testes de dashboard, documentos e detalhe e executá-los.

### Task 4: Pendências, regras e integrações

**Files:**
- Modify: `src/pages/admin/PendenciesPage.tsx`
- Modify: `src/components/pendencies/ResolutionDrawer.tsx`
- Modify: `src/pages/admin/RulesPage.tsx`
- Modify: `src/pages/admin/NewRulePage.tsx`
- Modify: `src/pages/admin/IntegrationsPage.tsx`
- Modify: `src/components/integrations/*.tsx`
- Modify: `src/styles/pendencies.css`
- Modify: `src/styles/rules.css`
- Modify: `src/styles/integrations.css`

**Interfaces:**
- Produces: galleries operacionais, formulário Se/E/Então e cards padronizados.

- [ ] Simplificar a lista e resolução de pendências.
- [ ] Substituir indicação de drag-and-drop por prioridade numérica e botões de ordenação.
- [ ] Organizar nova regra em formulário vertical.
- [ ] Padronizar cards de integração e atividade recente.
- [ ] Executar testes das três áreas.

### Task 5: Portal do fornecedor e páginas secundárias

**Files:**
- Modify: `src/pages/supplier/*.tsx`
- Modify: `src/components/supplier/*.tsx`
- Modify: `src/pages/admin/SuppliersPage.tsx`
- Modify: `src/pages/admin/AuditPage.tsx`
- Modify: `src/pages/admin/SettingsPage.tsx`
- Modify: `src/styles/supplier.css`
- Modify: `src/styles/secondary-pages.css`

**Interfaces:**
- Produces: portal externo com o mesmo tema Fluent, upload plausível e diálogos simples.

- [ ] Aplicar os novos controles e a marca Fluxo Fiscal ao portal.
- [ ] Simplificar upload, duplicidade, fornecedores, auditoria e configurações.
- [ ] Manter Allebras onde ela representa a empresa destinatária.
- [ ] Executar os testes do fornecedor.

### Task 6: Renomear, verificar e entregar

**Files:**
- Move: `allebras-central-documentos/` → `fluxo-fiscal/`
- Modify: `README.md` na raiz do workspace
- Modify: `fluxo-fiscal/README.md`

**Interfaces:**
- Produces: projeto independente em `prototipos/fluxo-fiscal`.

- [ ] Executar `npm run test:run` e exigir todos os testes verdes.
- [ ] Executar `npm run typecheck`.
- [ ] Executar `npm run build`.
- [ ] Iniciar o Vite e verificar login, dashboard, documentos, detalhe, pendências, integrações e fornecedor em 1440 px.
- [ ] Verificar uma largura compacta e corrigir overflow.
- [ ] Renomear a pasta após validar seu destino absoluto.
- [ ] Atualizar os READMEs e repetir `npm run build` na pasta final.
