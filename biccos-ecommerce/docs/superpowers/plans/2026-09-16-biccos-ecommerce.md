# Bicco's Ecommerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, visually rich Bicco's ecommerce prototype with Home, Catalog, Product Detail, Story and a functional client-side cart.

**Architecture:** A Vite/React single-page application uses React Router for page composition, a typed mock catalog as the future Shopify seam, and a context reducer for cart state. The visual system is implemented in focused CSS files with supplied brand assets, strong responsive behavior and reduced-motion support.

**Tech Stack:** React 19, TypeScript 5.7, Vite 6, React Router 7, Lucide React, Vitest, Testing Library, plain CSS

**Spec:** `biccos-ecommerce/docs/superpowers/specs/2026-09-16-biccos-ecommerce-design.md`

## Global Constraints

- Frontend-only prototype; no Shopify, authentication, backend or real checkout.
- Product and commercial data are illustrative and centralized in `src/data/products.ts`.
- Use brand colors exactly: `#9209CC`, `#FF5500`, `#33C136`, `#4B7EE2`, `#E02727`, `#EFE8DA`.
- Respect `prefers-reduced-motion` and provide visible keyboard focus.
- Home, Catalog, Product Detail and Story must work at desktop and mobile widths.
- The phrase "Green Energy" from the brand-book template must never appear.

---

### Task 1: Application foundation and typed catalog

**Files:**
- Create: `biccos-ecommerce/package.json`
- Create: `biccos-ecommerce/package-lock.json`
- Create: `biccos-ecommerce/index.html`
- Create: `biccos-ecommerce/vite.config.ts`
- Create: `biccos-ecommerce/tsconfig.json`
- Create: `biccos-ecommerce/tsconfig.app.json`
- Create: `biccos-ecommerce/tsconfig.node.json`
- Create: `biccos-ecommerce/src/main.tsx`
- Create: `biccos-ecommerce/src/app/App.tsx`
- Create: `biccos-ecommerce/src/types/catalog.ts`
- Create: `biccos-ecommerce/src/data/products.ts`
- Create: `biccos-ecommerce/src/data/reviews.ts`
- Create: `biccos-ecommerce/src/test/setup.ts`
- Test: `biccos-ecommerce/src/data/products.test.ts`

**Interfaces:**
- Produces: `Product`, `ProductFact`, `ProductCategory`, `Review`, `products`, `featuredProducts`, `getProductBySlug(slug: string): Product | undefined`.
- Consumes: nothing.

- [ ] **Step 1: Write the failing catalog test**

```ts
import { describe, expect, it } from 'vitest'
import { getProductBySlug, products } from './products'

describe('product catalog', () => {
  it('contains five flavors and two kits with unique slugs', () => {
    expect(products).toHaveLength(7)
    expect(new Set(products.map((product) => product.slug)).size).toBe(7)
    expect(products.filter((product) => product.category === 'sabor')).toHaveLength(5)
  })

  it('finds a product by slug', () => {
    expect(getProductBySlug('paprica')?.flavor).toBe('Páprica')
    expect(getProductBySlug('inexistente')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Install dependencies and run the test to verify failure**

Run: `cd biccos-ecommerce && npm install && npm run test:run -- src/data/products.test.ts`

Expected: FAIL because the catalog modules do not exist yet.

- [ ] **Step 3: Add the Vite configuration, typed models and complete seven-product mock catalog**

Implement `Product` with all fields specified by the design, export five flavors and two kits, and keep display strings in Portuguese. Add `App.tsx` with the router placeholders needed to render without a blank screen.

- [ ] **Step 4: Run the catalog test and typecheck**

Run: `npm run test:run -- src/data/products.test.ts && npm run typecheck`

Expected: both commands pass.

- [ ] **Step 5: Commit**

```bash
git add biccos-ecommerce
git commit -m "feat: scaffold biccos storefront catalog"
```

### Task 2: Brand assets and visual foundation

**Files:**
- Create: `biccos-ecommerce/public/assets/biccos-product-collage.png`
- Create: `biccos-ecommerce/public/assets/biccos-purple-pack.png`
- Create: `biccos-ecommerce/public/assets/biccos-orange-pack.png`
- Create: `biccos-ecommerce/public/assets/biccos-lifestyle.png`
- Create: `biccos-ecommerce/src/styles/tokens.css`
- Create: `biccos-ecommerce/src/styles/base.css`
- Create: `biccos-ecommerce/src/styles/layout.css`
- Create: `biccos-ecommerce/src/styles/components.css`
- Create: `biccos-ecommerce/src/styles/pages.css`
- Create: `biccos-ecommerce/src/styles/responsive.css`
- Create: `biccos-ecommerce/src/styles/index.css`
- Create: `biccos-ecommerce/src/components/ui/BrandMark.tsx`
- Create: `biccos-ecommerce/src/components/ui/Button.tsx`
- Test: `biccos-ecommerce/src/components/ui/BrandMark.test.tsx`

**Interfaces:**
- Consumes: brand colors and supplied brand-book imagery.
- Produces: `<BrandMark compact?: boolean />`, `<Button asChild?: boolean />`, global utility classes and responsive tokens.

- [ ] **Step 1: Write the failing brand test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandMark } from './BrandMark'

describe('BrandMark', () => {
  it('renders an accessible Bicco\'s home link', () => {
    render(<BrandMark />)
    expect(screen.getByRole('link', { name: /bicco's.*início/i })).toHaveAttribute('href', '/')
  })
})
```

- [ ] **Step 2: Run the component test to verify failure**

Run: `npm run test:run -- src/components/ui/BrandMark.test.tsx`

Expected: FAIL because `BrandMark` does not exist.

- [ ] **Step 3: Extract the four approved brand-book images and implement the visual foundation**

Place optimized 1200px previews in `public/assets`. Implement the cream canvas, ink outlines, color-field classes, display/body type stacks, focus treatment, buttons, shape utilities, marquee animation and reduced-motion override.

- [ ] **Step 4: Implement and test `BrandMark` and `Button`**

Run: `npm run test:run -- src/components/ui/BrandMark.test.tsx && npm run typecheck`

Expected: both commands pass.

- [ ] **Step 5: Commit**

```bash
git add biccos-ecommerce/public biccos-ecommerce/src/styles biccos-ecommerce/src/components/ui
git commit -m "feat: add biccos visual system"
```

### Task 3: Cart store and global shell

**Files:**
- Create: `biccos-ecommerce/src/store/ShopContext.tsx`
- Create: `biccos-ecommerce/src/store/cartReducer.ts`
- Create: `biccos-ecommerce/src/store/cartReducer.test.ts`
- Create: `biccos-ecommerce/src/components/layout/SiteHeader.tsx`
- Create: `biccos-ecommerce/src/components/layout/SiteFooter.tsx`
- Create: `biccos-ecommerce/src/components/layout/SiteShell.tsx`
- Create: `biccos-ecommerce/src/components/shop/CartDrawer.tsx`
- Test: `biccos-ecommerce/src/components/shop/CartDrawer.test.tsx`

**Interfaces:**
- Consumes: `Product`, `products`, `BrandMark` and shared CSS.
- Produces: `ShopProvider`, `useShop()`, `CartItem`, `CartState`, `cartReducer`, `SiteShell` and `CartDrawer`.

- [ ] **Step 1: Write failing reducer tests for add, update and remove**

```ts
import { describe, expect, it } from 'vitest'
import { cartReducer, initialCartState } from './cartReducer'

describe('cartReducer', () => {
  it('merges repeated products and updates quantity', () => {
    const once = cartReducer(initialCartState, { type: 'add', slug: 'paprica', quantity: 1 })
    const twice = cartReducer(once, { type: 'add', slug: 'paprica', quantity: 2 })
    expect(twice.items).toEqual([{ slug: 'paprica', quantity: 3 }])
  })

  it('removes items when quantity becomes zero', () => {
    const state = { items: [{ slug: 'paprica', quantity: 1 }] }
    expect(cartReducer(state, { type: 'setQuantity', slug: 'paprica', quantity: 0 }).items).toEqual([])
  })
})
```

- [ ] **Step 2: Run reducer tests to verify failure**

Run: `npm run test:run -- src/store/cartReducer.test.ts`

Expected: FAIL because the reducer does not exist.

- [ ] **Step 3: Implement reducer, context and safe localStorage hydration**

Expose totals derived from catalog prices and persist `{ items }` under `biccos-cart-v1`. Reject missing catalog slugs and non-positive quantities.

- [ ] **Step 4: Write and pass the cart-drawer interaction test**

Test that a provider-rendered drawer shows the product, increments quantity, updates subtotal, removes the item and closes on its close button.

Run: `npm run test:run -- src/store src/components/shop/CartDrawer.test.tsx`

Expected: all cart tests pass.

- [ ] **Step 5: Implement sticky header, promotional marquee, footer and route shell**

The header exposes desktop navigation, mobile menu and cart count. The footer includes prototype disclaimer and newsletter success feedback without making a network request.

- [ ] **Step 6: Commit**

```bash
git add biccos-ecommerce/src/store biccos-ecommerce/src/components/layout biccos-ecommerce/src/components/shop/CartDrawer*
git commit -m "feat: add storefront shell and cart"
```

### Task 4: Reusable commerce and editorial sections

**Files:**
- Create: `biccos-ecommerce/src/components/shop/ProductCard.tsx`
- Create: `biccos-ecommerce/src/components/shop/ProductGrid.tsx`
- Create: `biccos-ecommerce/src/components/shop/Rating.tsx`
- Create: `biccos-ecommerce/src/components/shop/QuantityControl.tsx`
- Create: `biccos-ecommerce/src/components/shop/ShippingCalculator.tsx`
- Create: `biccos-ecommerce/src/components/sections/ComparisonTable.tsx`
- Create: `biccos-ecommerce/src/components/sections/ReviewsSection.tsx`
- Create: `biccos-ecommerce/src/components/sections/BenefitsMarquee.tsx`
- Test: `biccos-ecommerce/src/components/shop/ProductCard.test.tsx`
- Test: `biccos-ecommerce/src/components/shop/ShippingCalculator.test.tsx`

**Interfaces:**
- Consumes: `Product`, `Review`, `useShop`, router links and visual utilities.
- Produces: reusable product cards/grids, rating, quantity, shipping, comparison, reviews and marquee components.

- [ ] **Step 1: Write the failing ProductCard behavior test**

Render a known product inside `ShopProvider`, click `Adicionar`, and assert that the global cart count changes to one and the button exposes success feedback.

- [ ] **Step 2: Run the ProductCard test to verify failure**

Run: `npm run test:run -- src/components/shop/ProductCard.test.tsx`

Expected: FAIL because `ProductCard` does not exist.

- [ ] **Step 3: Implement product commerce primitives and pass the test**

Product cards include flavor field, illustration, badges, rating, description, price, detail link and quick add. Quantity controls prevent values below one when used outside the cart.

- [ ] **Step 4: Write and pass shipping calculator tests**

Test invalid CEP feedback for fewer than eight digits and deterministic mock delivery feedback for `30140071`.

Run: `npm run test:run -- src/components/shop/ShippingCalculator.test.tsx`

Expected: shipping tests pass.

- [ ] **Step 5: Implement comparison, reviews and benefits marquee**

Use an accessible table on desktop, stacked comparison cards on mobile and three review cards sourced from `reviews.ts`.

- [ ] **Step 6: Commit**

```bash
git add biccos-ecommerce/src/components/shop biccos-ecommerce/src/components/sections
git commit -m "feat: add reusable storefront sections"
```

### Task 5: Home and Story pages

**Files:**
- Create: `biccos-ecommerce/src/pages/HomePage.tsx`
- Create: `biccos-ecommerce/src/pages/StoryPage.tsx`
- Test: `biccos-ecommerce/src/pages/HomePage.test.tsx`
- Modify: `biccos-ecommerce/src/app/App.tsx`
- Modify: `biccos-ecommerce/src/styles/pages.css`
- Modify: `biccos-ecommerce/src/styles/responsive.css`

**Interfaces:**
- Consumes: `featuredProducts`, shell, cards, comparison, reviews and brand assets.
- Produces: routed Home and Story experiences.

- [ ] **Step 1: Write the failing home-page test**

```tsx
it('presents the proposition, flavors, comparison and reviews', () => {
  renderAppAt('/')
  expect(screen.getByRole('heading', { name: /salgadinho proteico/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /escolha seu sabor/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /bicco's.*barrinha/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /quem prova/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the home test to verify failure**

Run: `npm run test:run -- src/pages/HomePage.test.tsx`

Expected: FAIL because the page is not implemented.

- [ ] **Step 3: Compose the complete Home page**

Build the hero, benefits ribbon, five-flavor grid, usage editorial, comparison, manifesto, reviews and kit banner in the order defined by the spec. Ensure primary and secondary CTAs navigate correctly.

- [ ] **Step 4: Implement the Story page and finish responsive page styling**

Build purpose, pillars, three-step product timeline and closing CTA. Verify headings and image alt text remain unique and useful.

- [ ] **Step 5: Run Home tests, typecheck and build**

Run: `npm run test:run -- src/pages/HomePage.test.tsx && npm run typecheck && npm run build`

Expected: all commands pass.

- [ ] **Step 6: Commit**

```bash
git add biccos-ecommerce/src/pages biccos-ecommerce/src/app biccos-ecommerce/src/styles
git commit -m "feat: build biccos home and story pages"
```

### Task 6: Catalog and Product Detail pages

**Files:**
- Create: `biccos-ecommerce/src/pages/CatalogPage.tsx`
- Create: `biccos-ecommerce/src/pages/ProductPage.tsx`
- Create: `biccos-ecommerce/src/pages/NotFoundPage.tsx`
- Create: `biccos-ecommerce/src/components/shop/ProductAccordion.tsx`
- Test: `biccos-ecommerce/src/pages/CatalogPage.test.tsx`
- Test: `biccos-ecommerce/src/pages/ProductPage.test.tsx`
- Modify: `biccos-ecommerce/src/app/App.tsx`
- Modify: `biccos-ecommerce/src/styles/pages.css`
- Modify: `biccos-ecommerce/src/styles/responsive.css`

**Interfaces:**
- Consumes: all catalog, cart, comparison, review and shipping interfaces.
- Produces: `/produtos`, `/produto/:slug`, invalid-route handling and complete purchase-detail flow.

- [ ] **Step 1: Write failing catalog filter and sort tests**

Assert that the `Kits` chip reduces the grid to two products and `Menor preço` orders visible price labels ascending.

- [ ] **Step 2: Run catalog tests to verify failure**

Run: `npm run test:run -- src/pages/CatalogPage.test.tsx`

Expected: FAIL because Catalog does not exist.

- [ ] **Step 3: Implement Catalog and pass its tests**

Keep filter and sort state local, include an empty-state guard and use semantic controls with visible selected state.

- [ ] **Step 4: Write failing Product Detail route tests**

Test that `/produto/paprica` shows rating, quantity CTA, comparison and reviews, and that `/produto/inexistente` renders the friendly not-found page.

- [ ] **Step 5: Implement Product Detail, accordion and mobile sticky purchase bar**

Flavor links change routes, gallery thumbnails change the dominant visual, and adding a selected quantity opens the cart with that quantity.

- [ ] **Step 6: Run route tests, full suite, typecheck and build**

Run: `npm run test:run && npm run typecheck && npm run build`

Expected: all commands pass without warnings from the application code.

- [ ] **Step 7: Commit**

```bash
git add biccos-ecommerce/src
git commit -m "feat: complete catalog and product journey"
```

### Task 7: End-to-end visual verification and handoff

**Files:**
- Create: `biccos-ecommerce/README.md`
- Create: `biccos-ecommerce/screenshots/home-desktop.png`
- Create: `biccos-ecommerce/screenshots/catalog-mobile.png`
- Create: `biccos-ecommerce/screenshots/product-desktop.png`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed application.
- Produces: reproducible run instructions and visual evidence.

- [ ] **Step 1: Start the production-like development server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite reports a local URL and no compilation error.

- [ ] **Step 2: Verify the desktop buying journey in a browser**

At 1440×1000, navigate Home → Catalog → Páprica Product, change quantity to two, add to cart, verify subtotal, decrement once and close the drawer. Confirm there are no browser console errors.

- [ ] **Step 3: Verify the mobile journey and responsive layout**

At 390×844, verify the header menu, hero CTA, horizontal content containment, catalog filters, product sticky purchase bar, cart drawer and keyboard focus order.

- [ ] **Step 4: Capture three representative screenshots**

Capture the files listed above after content settles and animation is disabled for deterministic images.

- [ ] **Step 5: Document setup and prototype boundaries**

`biccos-ecommerce/README.md` must include install, dev, test and build commands; routes; mock-data location; future Shopify seam; asset provenance; and the illustrative-data disclaimer. Add the project row to the repository root README.

- [ ] **Step 6: Run final verification**

Run: `npm run test:run && npm run typecheck && npm run build`

Expected: all tests pass, TypeScript reports no error, and Vite completes the production build.

- [ ] **Step 7: Commit**

```bash
git add README.md biccos-ecommerce
git commit -m "docs: finish biccos ecommerce prototype"
```
