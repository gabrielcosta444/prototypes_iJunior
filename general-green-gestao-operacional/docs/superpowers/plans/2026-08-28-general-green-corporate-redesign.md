# General Green Corporate Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar uma linguagem corporativa simplificada e consistente aos ambientes gestor, cliente e técnico da General Green.

**Architecture:** Manter componentes, rotas e dados atuais, criando uma camada de estilos corporativos importada por último para consolidar tokens e padrões visuais. Alterar markup somente onde a simplificação exige remoção de elementos decorativos ou redundantes.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Recharts, CSS.

**Spec:** `docs/superpowers/specs/2026-08-28-general-green-corporate-redesign.md`

## Global Constraints

- Não alterar rotas, dados fictícios ou fluxos funcionais existentes.
- Não adicionar dependências.
- Não utilizar Git.
- Manter identidade e marca General Green.
- Corpo padrão de 16 px; textos auxiliares nunca menores que 12 px.

---

### Task 1: Contrato visual e regressão do dashboard

**Files:**
- Modify: `src/pages/admin/DashboardPage.test.tsx`
- Modify: `src/pages/admin/DashboardPage.tsx`

**Interfaces:**
- Consumes: dashboard administrativo atual.
- Produces: dashboard sem o bloco `operation-overview`, com a seção de operação diária após a grade principal.

- [ ] Alterar o teste para exigir que “Operação de hoje” apareça logo após a grade principal.
- [ ] Executar `npm run test:run -- src/pages/admin/DashboardPage.test.tsx --reporter=verbose` e confirmar falha causada pelo bloco “Fluxo operacional”.
- [ ] Remover o array `pipeline`, imports não usados e o bloco `operation-overview`.
- [ ] Reexecutar o teste e confirmar aprovação.

### Task 2: Fundação visual corporativa

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/base.css`
- Create: `src/styles/corporate.css`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: classes CSS atuais.
- Produces: tokens de cor, tipografia e superfície compartilhados pelos três ambientes.

- [ ] Atualizar tokens para fundo `#f5f5f5`, bordas neutras, raios de 4–6 px e sombras mínimas.
- [ ] Priorizar Segoe UI e escala tipográfica de apresentação.
- [ ] Criar `corporate.css` com overrides de botões, campos, cartões, badges, tabelas, modais e estados de foco.
- [ ] Importar `corporate.css` por último em `index.css`.
- [ ] Executar `npm run typecheck`.

### Task 3: Login e painel do gestor

**Files:**
- Modify: `src/styles/corporate.css`
- Modify: `src/pages/LoginPage.tsx`
- Modify: `src/components/layout/AdminShell.tsx`

**Interfaces:**
- Consumes: marca, autenticação demonstrativa e rotas atuais.
- Produces: login plano e shell administrativo corporativo.

- [ ] Remover do login os elementos decorativos `login-visual__grid` e `login-visual__solar`.
- [ ] Ajustar sidebar para 232 px, topbar para 64 px e navegação ativa plana.
- [ ] Padronizar métricas, painéis, gráficos, tabelas, formulários, abas e detalhes administrativos.
- [ ] Confirmar que links para aplicativo técnico e portal do cliente continuam acessíveis.

### Task 4: Portal do cliente e aplicativo técnico

**Files:**
- Modify: `src/styles/corporate.css`
- Modify: `src/components/layout/ClientShell.tsx`
- Modify: `src/components/layout/MobileShell.tsx`

**Interfaces:**
- Consumes: rotas `/client/*` e `/mobile/*` existentes.
- Produces: linguagem visual compartilhada, preservando navegação específica de cada perfil.

- [ ] Simplificar topbar, navegação, conta e conteúdo do portal do cliente.
- [ ] Reduzir moldura e efeitos externos do preview mobile.
- [ ] Padronizar cartões, botões, campos, listas, checklists e estados de sincronização.
- [ ] Verificar que a navegação inferior mobile continua legível e acessível.

### Task 5: Verificação integral

**Files:**
- Verify: `src/**/*`

**Interfaces:**
- Consumes: protótipo redesenhado.
- Produces: entrega navegável e compilável.

- [ ] Executar `npm run test:run -- --reporter=verbose` e confirmar todos os testes aprovados.
- [ ] Executar `npm run build` e confirmar saída de produção.
- [ ] Iniciar `npm run dev -- --host 127.0.0.1`.
- [ ] Revisar login, dashboard administrativo, ordens, portal do cliente e aplicativo técnico em navegador headless.
- [ ] Encerrar o servidor e remover somente artefatos temporários da revisão visual.

