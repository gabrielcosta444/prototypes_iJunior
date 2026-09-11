# Plantas e Mapas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar cadastro, visualização, pintura livre e cálculo de área real para plantas PDF no painel administrativo.

**Architecture:** `PlantsProvider` persiste documentos e marcações; `react-pdf` renderiza o documento e `react-konva` projeta strokes normalizados. Um rasterizador de máscara puro e determinístico calcula união e precedência por status em resolução fixa.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, react-pdf/PDF.js, react-konva/Konva, CSS existente.

**Spec:** `docs/superpowers/specs/2026-09-10-plants-maps-design.md`

## Global Constraints

- Não criar commits; o usuário controla o Git.
- Não modificar o PDF original.
- Coordenadas e cálculo nunca dependem dos pixels visíveis ou do zoom.
- Preservar shell, tokens, componentes e linguagem visual existentes.
- Evitar refatorações fora da seção Plantas e Mapas.

---

### Task 1: Domínio e máscara de área

**Files:**
- Create: `src/features/plants/types.ts`
- Create: `src/features/plants/area.ts`
- Test: `src/features/plants/area.test.ts`

**Interfaces:**
- Produces: `calculateAreaSummary(strokes, sessions, pages, scale, calibration)` e tipos de planta, sessão, stroke e calibração.

- [ ] Escrever testes que comprovem escala nominal, calibração prioritária, união sem duplicidade, último status prevalecendo, borracha e invariância a viewport/zoom.
- [ ] Executar o teste e confirmar falha por módulo inexistente.
- [ ] Implementar máscara fixa normalizada por página e conversões de área.
- [ ] Executar testes e manter o módulo puro, sem APIs do browser.

### Task 2: Persistência e CRUD

**Files:**
- Create: `src/features/plants/storage.ts`
- Create: `src/features/plants/PlantsContext.tsx`
- Test: `src/features/plants/PlantsContext.test.tsx`

**Interfaces:**
- Consumes: tipos da Task 1.
- Produces: `usePlants()` com adicionar, atualizar, excluir, salvar strokes/sessões/calibração e reidratar do armazenamento.

- [ ] Escrever teste de criação e reidratação de uma planta.
- [ ] Confirmar falha antes da implementação.
- [ ] Implementar provider com planta demonstrativa e persistência local versionada.
- [ ] Executar o teste e validar tratamento de storage indisponível/quota.

### Task 3: Listagem e importação

**Files:**
- Create: `src/pages/admin/PlantsPage.tsx`
- Create: `src/features/plants/PlantFormModal.tsx`
- Test: `src/pages/admin/PlantsPage.test.tsx`
- Modify: `src/app/App.tsx`
- Modify: `src/components/layout/AdminShell.tsx`

**Interfaces:**
- Consumes: `usePlants()`.
- Produces: rota `/admin/plants`, tabela responsiva, modal de cadastro/edição e exclusão.

- [ ] Escrever testes de rota, campos obrigatórios, escala personalizada e inclusão na listagem.
- [ ] Confirmar as falhas esperadas.
- [ ] Implementar listagem, ações e leitura de PDF como data URL.
- [ ] Executar testes de interface.

### Task 4: Canvas e controles do editor

**Files:**
- Create: `src/features/plants/PlantCanvas.tsx`
- Create: `src/features/plants/EditorToolbar.tsx`
- Create: `src/features/plants/SessionPanel.tsx`
- Create: `src/pages/admin/PlantEditorPage.tsx`
- Test: `src/pages/admin/PlantEditorPage.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: plantas/sessões/strokes e cálculo da Tasks 1–2.
- Produces: editor com desenho, borracha, histórico, zoom/pan, fit, páginas, calibração e exportação.

- [ ] Escrever testes do resumo, seleção de ferramenta, undo/redo e persistência ao salvar.
- [ ] Confirmar falhas antes de criar componentes.
- [ ] Implementar PDF + Konva, normalização dos ponteiros e projeção de strokes.
- [ ] Implementar toolbar, sessões, atalhos, calibração e exportação da página atual.
- [ ] Executar testes de interface.

### Task 5: Integração visual e responsividade

**Files:**
- Create: `src/styles/plants.css`
- Modify: `src/styles/index.css`
- Modify: `src/styles/responsive.css`

**Interfaces:**
- Consumes: classes dos componentes das Tasks 3–4.
- Produces: listagem e editor consistentes com o design General Green em desktop e viewport estreita.

- [ ] Adicionar layout, estados interativos, overlay, toolbar, viewport e painel lateral usando os tokens existentes.
- [ ] Executar typecheck e build para detectar seletores/estrutura inválidos.

### Task 6: Verificação integral

**Files:**
- Modify: `src/app/App.test.tsx`

- [ ] Cobrir a nova rota no smoke test global.
- [ ] Rodar toda a suíte Vitest.
- [ ] Rodar `npm run typecheck` e `npm run build`.
- [ ] Abrir listagem e editor no navegador, testar desenho/zoom e verificar console e responsividade.
- [ ] Corrigir qualquer regressão encontrada e repetir a verificação.
