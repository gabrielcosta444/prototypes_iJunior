# FS Intermedium Prototype Design

## Product intent

Build a presentation-ready, responsive SaaS prototype that demonstrates how condominium managers, service providers, and platform administrators share one coherent workflow. The prototype must prove the core business rule: a provider is visible to condominium managers only when approved, subscribed, and not blocked.

## Experience and visual system

- Reconstruct the supplied FS Intermedium mark as a reusable SVG/CSS brand component: navy geometric shield, gold outline and FS monogram, white INTERMEDIUM wordmark, and the gold signature “SOLUÇÃO PARA SUA NECESSIDADE”.
- Use navy (`#101B2D`, `#19283D`) for navigation, white and warm gray for work areas, and gold (`#D6AA63`, `#E7C78D`) for identity and high-value actions.
- Prefer Inter/Arial-style sans serif typography, restrained borders and shadows, 12–18px radii, and Lucide icons.
- Keep the login deliberately simple: centered card, logo, title, email, password with visibility control, submit, recovery and account links, and a discreet demo-access section. Do not use a split hero, photography, or promotional art.

## Architecture

The application is a Vite React + TypeScript single-page app. `PrototypeProvider` owns one normalized `DemoState`, persists it to `localStorage`, and exposes typed mutations used by every environment. React Router protects routes by current demo role and redirects authenticated users to the correct home.

The data layer contains all categories, providers, condominiums, payment events, simulated notifications, and demo credentials. Pure business-rule selectors decide provider eligibility and search results. Uploads store only display-safe object URLs and filenames for the current browser; no sensitive files or credentials are persisted.

## Navigation and screens

### Authentication

- `/login`: shared login with email/password validation, recovery flow, registration links, and one-click demo access for manager, provider, and administrator.
- `/cadastro`: choose condominium or provider. Condominium registration is a concise form; provider registration uses the four-step flow.
- `/recuperar-senha`: simulated email confirmation.

### Condominium manager

- `/sindico`: welcome, trust explanation, search shortcut, and active categories loaded from state.
- `/sindico/prestadores`: live combined filters for text, category, region, and urgency; only eligible providers appear.
- `/sindico/prestadores/:id`: approved provider profile, portfolio, regions, specialties, urgency and WhatsApp deep link.
- `/sindico/condominio`: editable condominium profile persisted locally.

### Provider

- `/prestador`: clear readiness summary and shortcuts.
- `/prestador/cadastro`: four-step personal, professional, documents, and review flow.
- `/prestador/situacao`: analysis/approved/rejected/inactive states, rejection reason and resubmission.
- `/prestador/perfil`: professional fields and portfolio management; changes share the same provider record used by search.
- `/prestador/assinatura`: a clearly labeled demonstration checkout with success/failure, cancel and reactivate states.

### Administrator

- `/admin`: operational overview without analytics charts.
- `/admin/analises` and `/admin/analises/:id`: pending registrations and detailed approval/rejection with required reason.
- `/admin/prestadores`: provider registry with blocking controls.
- `/admin/condominios`: read-only condominium registry.
- `/admin/categorias`: demonstration create/edit/activate/deactivate interface.
- `/admin/assinaturas`: filterable subscription registry.
- `/admin/pagamentos`: simulated gateway event history.

## State and cross-environment flows

All role views consume the same provider records. Approvals, rejection reasons, resubmissions, subscription events, block changes, profile edits, categories, and condominium edits are persisted immediately. Demo reset replaces the entire stored state with the seeded data.

The seed includes at least eight providers, four condominiums, five categories, varied regions, urgency coverage, portfolio photos, safe demonstration documents, and every requested registration/subscription/block state.

## Error handling and feedback

Client validation prevents empty required submissions. Destructive or high-impact demonstration actions require a modal confirmation. Success and failure use consistent inline alerts and toasts. Listings provide loading, no-results, and empty states. Unauthorized routes redirect to login or the signed-in role home.

## Responsive behavior

At desktop sizes, authenticated areas use a navy sidebar with a compact top bar. Below 920px the sidebar becomes a drawer. Forms collapse to one column and table rows become stacked information cards below 720px. Controls remain touch-friendly and no page requires horizontal scrolling.

## Out of scope

No backend, real authentication, real payment, email sending, document storage, internal chat, ratings, favorites, hiring history, proposals, maps, service payment, condominium billing, native app, push, social integration, advanced analytics, video upload, or Figma file is created.

## Acceptance

The five approval, subscription, rejection, blocking, and profile-edit flows from the source brief must work within one browser session and after refresh. Automated tests cover core business rules and representative cross-environment UI flows. Type-check and production build must pass.
