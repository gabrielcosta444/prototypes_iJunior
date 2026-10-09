# FS Intermedium Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a responsive, locally persisted FS Intermedium prototype whose three user environments demonstrate every core business workflow.

**Architecture:** A Vite React/TypeScript SPA uses a typed provider/reducer as the single source of truth and pure selectors for eligibility and filtering. Role-aware routes render reusable shells, cards, badges, forms, tables, dialogs and toast feedback.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Lucide React, Vitest, Testing Library, CSS modules via global layered styles

**Spec:** `intermedium/docs/superpowers/specs/2026-10-08-fs-intermedium-prototype-design.md`

## Global Constraints

- Login is a simple centered card without a split layout, large illustration, photo, or promotion.
- Only approved, actively subscribed, unblocked providers appear to condominium managers.
- The three roles share state persisted under one versioned `localStorage` key.
- All credentials and people are fictitious and the payment/email/document flows are explicitly simulations.
- No features listed as out of scope in the design are added.
- UI works at approximately 1440px, 768px, and 390px without horizontal scrolling.

## Review Focus

- Corrupt or outdated local storage falls back to valid seed data without crashing.
- Combined search filters never reveal ineligible providers.
- Role navigation cannot expose another environment's protected pages.
- Rejection requires a reason and resubmission returns the same provider to the admin queue.
- Subscription and blocking changes update search visibility without a manual reload.

---

### Task 1: Project foundation and domain rules

**Files:**
- Create: `intermedium/package.json`, TypeScript/Vite config, `index.html`, test setup
- Create: `intermedium/src/domain/types.ts`, `intermedium/src/data/seed.ts`, `intermedium/src/domain/rules.ts`
- Test: `intermedium/src/domain/rules.test.ts`

**Interfaces:**
- Produces: `DemoState`, `Provider`, `isProviderVisible(provider)`, `filterVisibleProviders(providers, filters)`, `createSeedState()`

- [ ] Write failing tests for visibility, combined filters, and fresh seed isolation.
- [ ] Run `npm test -- --run src/domain/rules.test.ts` and confirm missing-module failure.
- [ ] Implement typed models, eight providers, four condominiums, five categories, and rule selectors.
- [ ] Re-run the domain tests and confirm they pass.

### Task 2: Shared persistent state and mutations

**Files:**
- Create: `intermedium/src/app/PrototypeContext.tsx`
- Create: `intermedium/src/app/state.ts`
- Test: `intermedium/src/app/state.test.ts`

**Interfaces:**
- Consumes: `DemoState`, `createSeedState()`
- Produces: `prototypeReducer`, `loadDemoState`, `PrototypeProvider`, `usePrototype`, typed actions for auth, providers, categories, condominiums, subscriptions, events and reset

- [ ] Write failing reducer tests for approve/reject/resubmit, subscription visibility, blocking, editing and corrupt persistence fallback.
- [ ] Run the focused test and confirm expected missing behavior.
- [ ] Implement reducer, persistence loader, provider and actions.
- [ ] Re-run the focused test and full domain suite.

### Task 3: Brand system, authentication and routing

**Files:**
- Create: `intermedium/src/components/*`, `intermedium/src/layouts/AppShell.tsx`
- Create: `intermedium/src/pages/auth/AuthPages.tsx`, `intermedium/src/app/App.tsx`, `intermedium/src/main.tsx`
- Create: `intermedium/src/styles/index.css`
- Test: `intermedium/src/app/App.test.tsx`

**Interfaces:**
- Consumes: `usePrototype` auth/actions and typed state
- Produces: reusable logo, buttons, status badges, modal, toast, protected routes, role shells and minimal login

- [ ] Write failing integration tests for demo role login and cross-role route protection.
- [ ] Confirm the UI test fails before components exist.
- [ ] Implement the brand, login, registration/recovery, routing and responsive shell.
- [ ] Re-run the integration test and suites.

### Task 4: Condominium manager experience

**Files:**
- Create: `intermedium/src/pages/manager/ManagerPages.tsx`
- Create: `intermedium/src/components/ProviderCard.tsx`
- Test: `intermedium/src/pages/manager/ManagerPages.test.tsx`

**Interfaces:**
- Consumes: active categories, `filterVisibleProviders`, condominium actions
- Produces: manager home, filters/list, public profile, WhatsApp link and editable condominium page

- [ ] Write failing tests proving eligibility and combined filters in the rendered manager flow.
- [ ] Confirm red, implement pages, then confirm green.

### Task 5: Provider experience

**Files:**
- Create: `intermedium/src/pages/provider/ProviderPages.tsx`
- Test: `intermedium/src/pages/provider/ProviderPages.test.tsx`

**Interfaces:**
- Consumes: provider update, registration, resubmission and subscription actions
- Produces: dashboard, four-step registration, status, editable profile/portfolio and simulated checkout

- [ ] Write failing tests for resubmission and successful subscription activation.
- [ ] Confirm red, implement pages and actions, then confirm green.

### Task 6: Administrator experience

**Files:**
- Create: `intermedium/src/pages/admin/AdminPages.tsx`
- Test: `intermedium/src/pages/admin/AdminPages.test.tsx`

**Interfaces:**
- Consumes: all state and administrative mutations
- Produces: overview, analysis detail, provider blocking, condominium list, category CRUD, subscription filters and payment events

- [ ] Write failing tests for approval/rejection validation and provider blocking.
- [ ] Confirm red, implement all admin pages, then confirm green.

### Task 7: Responsive polish, documentation and final verification

**Files:**
- Modify: `intermedium/src/styles/index.css`
- Create: `intermedium/README.md`

**Interfaces:**
- Consumes: complete application
- Produces: presentation-ready desktop/tablet/mobile UI and handoff instructions

- [ ] Add final responsive states, focus treatments, loading/empty feedback and demo reset affordance.
- [ ] Document demo accounts, run instructions, feature scope and simulated integrations.
- [ ] Run `npm test -- --run`, `npm run typecheck`, and `npm run build`; inspect all output and fix any failure.
- [ ] Review the requirements and completed diff, then perform a final code review.
