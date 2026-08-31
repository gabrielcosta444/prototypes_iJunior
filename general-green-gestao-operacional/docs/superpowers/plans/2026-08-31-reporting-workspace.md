# Reporting Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma central de relatórios configurável, rastreável e alinhada ao fluxo operacional aprovado da General Green.

**Architecture:** Estender o domínio e os dados locais para representar modelos, versões e publicação; manter as interações nas páginas React existentes; concentrar a linguagem visual do módulo em `reports.css`. Cada página permanece independente e consome os mesmos registros simulados.

**Tech Stack:** React 19, TypeScript, React Router, Lucide React, Recharts, Vitest e Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-31-reporting-workspace-design.md`

## Global Constraints

- Não adicionar dependências.
- Usar apenas atividades aprovadas como origem de relatório.
- Manter modelos restritos ao ambiente administrativo.
- Não implementar editor livre, assinatura digital, IA ou geoprocessamento.
- Preservar as rotas existentes.

---

### Task 1: Domínio e dados do módulo

**Files:**
- Modify: `src/domain/types.ts`
- Modify: `src/data/mockData.ts`
- Create: `src/vite-env.d.ts`

**Interfaces:**
- Produces: `Report`, `ReportTemplate`, `ReportStatus`, `reportTemplates` e registros de relatório enriquecidos.

- [ ] Escrever um teste de página que exija modelo, versão e rastreabilidade da publicação, sem uma aprovação separada do relatório.
- [ ] Executar o teste e confirmar falha porque os dados ainda não existem.
- [ ] Estender os tipos e os fixtures com os campos exigidos pela central.
- [ ] Adicionar a referência `vite/client` para imports de CSS reconhecidos pelo editor.
- [ ] Executar o teste focado novamente.

### Task 2: Central administrativa

**Files:**
- Modify: `src/pages/admin/ReportsPage.tsx`
- Modify: `src/pages/admin/ReportsPage.test.tsx`
- Modify: `src/styles/reports.css`

**Interfaces:**
- Consumes: `reports` e `reportTemplates`.
- Produces: abas `Relatórios` e `Modelos`, busca, filtros, KPIs, tabela operacional e cartões de modelo.

- [ ] Escrever testes para alternância de abas e filtragem por status.
- [ ] Executar e observar as falhas esperadas.
- [ ] Implementar estado de aba, busca e filtros com controles acessíveis.
- [ ] Implementar a tabela enriquecida e os cartões de modelos.
- [ ] Executar novamente os testes da central.

### Task 3: Construtor guiado

**Files:**
- Modify: `src/pages/admin/ReportBuilderPage.tsx`
- Create: `src/pages/admin/ReportBuilderPage.test.tsx`
- Modify: `src/styles/reports.css`

**Interfaces:**
- Consumes: `reportTemplates` e atividades aprovadas simuladas.
- Produces: etapas `Origem`, `Modelo`, `Conteúdo`, `Conferência` e `Distribuição`.

- [ ] Escrever um teste que percorra as etapas e personalize um bloco.
- [ ] Executar e confirmar que a navegação guiada ainda não existe.
- [ ] Implementar o stepper, os painéis de origem e modelo e a seleção de blocos.
- [ ] Implementar controles de ordenação, conferência e opções de distribuição.
- [ ] Executar o teste focado e corrigir somente as falhas do fluxo.

### Task 4: Prévia e portal do cliente

**Files:**
- Modify: `src/pages/admin/ReportPreviewPage.tsx`
- Modify: `src/pages/client/ClientReportsPage.tsx`
- Modify: `src/styles/reports.css`
- Modify: `src/styles/client.css`

**Interfaces:**
- Consumes: dados aprovados e evidências simuladas.
- Produces: prévia operacional completa e biblioteca de documentos disponibilizados no portal.

- [ ] Escrever testes para os blocos essenciais da prévia e para o histórico do cliente.
- [ ] Executar e observar a ausência dos novos elementos.
- [ ] Implementar cabeçalho, resumo, produção diária, avanço, evidências, observações e validação.
- [ ] Implementar busca, filtro por projeto e ações explícitas no portal do cliente.
- [ ] Executar os testes focados.

### Task 5: Verificação integral

**Files:**
- Review: all files modified above.

- [ ] Executar `npm run test:run` e confirmar zero falhas.
- [ ] Executar `npm run typecheck` e confirmar zero erros.
- [ ] Executar `npm run build` e confirmar saída com código zero.
- [ ] Iniciar o Vite e verificar `/admin/reports`, `/admin/reports/new`, `/admin/reports/preview` e `/client/reports` em navegador.
- [ ] Verificar responsividade, ausência de overlay de erro e interações principais.
- [ ] Revisar o diff final para garantir que não há alterações fora do módulo.
