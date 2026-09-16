# Bicco's Ecommerce — Design Specification

## Objective

Build a polished, responsive ecommerce prototype for Bicco's that demonstrates the future storefront's visual direction and core buying journey. The prototype is frontend-only: product, pricing, rating, stock, shipping and review data are illustrative and live in a typed mock catalog. Shopify, checkout, authentication and persistence beyond the browser are explicitly outside this release.

## Product direction

Bicco's should feel like a snack brand first and a functional food second: energetic, flavorful and approachable, without looking like a clinical supplement store. The visual language combines oversized packaging, loud color fields, organic chickpea-inspired shapes, short kinetic copy and credible nutritional proof.

The experience borrows useful interaction patterns from Cafellow and Guday without reproducing either site. Cafellow informs the editorial rhythm, moving marquees and brand storytelling. Guday informs the long-form product page, comparison module, social proof and quantity-led merchandising.

## Source hierarchy

1. The supplied brand book defines logo behavior, color palette, typography intent, symbol, graphic language and slogan.
2. The owner's transcript defines desired motion, color, reviews, educational product content and the comparison with protein bars.
3. The current Bicco's storefront supplies the known flavors, product descriptions, kits and existing customer-language themes.
4. Prototype-only claims and commercial values must be visibly treated as illustrative. The interface must not invent medical outcomes or present uncertain nutrition values as independently verified facts.

The accidental "Green Energy" reference in the brand-book application section is unrelated template content and must never appear in the storefront.

## Audience and jobs

Primary audience: busy adults who want a practical savory snack with a more natural ingredient story, including students, professionals, travelers and active consumers.

The storefront must help a visitor:

- understand what Bicco's is in the first viewport;
- see why it is different from a generic protein bar or conventional snack;
- discover the five flavor personalities;
- choose between a single flavor and a discovery kit;
- validate the choice through reviews, ingredients and product facts;
- add items to a usable cart without leaving the prototype.

## Information architecture

### Global shell

- Promotional marquee with rotating messages.
- Sticky header with brand, Home, Sabores, Por que Bicco's, Nossa história, search affordance and cart count.
- Cart drawer shared across all pages.
- Footer with newsletter, navigation, social links and prototype disclaimer.

### Home `/`

1. Hero with slogan, short value proposition, primary CTA, secondary CTA and an oversized product composition.
2. Moving benefits ribbon.
3. Flavor collection with five product cards and quick-add actions.
4. "Snack do seu jeito" editorial block showing everyday usage occasions.
5. Bicco's versus protein bar comparison.
6. Brand manifesto explaining simple ingredients, roasting and portability.
7. Reviews with average rating and three customer stories.
8. Discovery-kit conversion banner.
9. Newsletter and footer.

### Catalog `/produtos`

- Editorial introduction.
- Category chips for all products, individual packs and kits.
- Sort control for featured, price ascending, rating and name.
- Responsive product grid.
- Quick add and direct product detail navigation.

### Product detail `/produto/:slug`

- Breadcrumbs.
- Image gallery with a dominant product visual and supporting flavor cards.
- Rating summary, title, sensory description, price and installment copy.
- Quantity selector and add-to-cart CTA.
- Shipping-calculator mock with deterministic feedback.
- Trust highlights for protein, fiber, baked preparation and portability; values are labeled illustrative in supporting copy.
- Accordion content for description, ingredients and nutrition.
- Flavor selector linking to sibling products.
- Comparison table.
- Review summary and review cards.
- Related products.
- Sticky mobile purchase bar.

### Story `/sobre`

- Founding story and purpose.
- Brand pillars.
- Visual timeline from chickpea to package.
- Closing product CTA.

## Visual system

### Brand colors

- Purple Heart `#9209CC`: primary brand field and strongest identity color.
- International Orange `#FF5500`: conversion moments and energetic contrast.
- Malachite `#33C136`: naturalness and fresh accent.
- Mariner `#4B7EE2`: flavor variation and balancing field.
- Alizarin Crimson `#E02727`: sparing alert or flavor accent.
- Satin Linen `#EFE8DA`: warm page background.
- Ink `#24162B`: accessible body text and outlines.

Color is applied in large, intentional fields. Cards use dark outlines and modest offset shadows to preserve a tactile, poster-like quality. Purple and orange remain dominant; green and blue create section-level changes rather than a rainbow effect in every component.

### Typography

Use a rounded display stack that approximates the supplied Heyam personality when the licensed font file is unavailable. Montserrat is represented by a local geometric sans fallback stack for body content to avoid a runtime font dependency. Display text is large, compact and playful; body text remains highly legible.

### Shape and image language

- Organic bean-shaped blobs inspired by the logo counterform.
- Circular windows that reference the transparent packaging window.
- Repeating outlined "B" and chickpea-dot patterns.
- Product packaging photographed or mocked against flat saturated backgrounds.
- Rounded corners are expressive, but interactive controls keep clear silhouettes and strong focus rings.

### Motion

- CSS marquees for promotional and benefit strips.
- Gentle floating and rotational motion on hero product art.
- Reveal transitions and card hover lift using transform and opacity only.
- `prefers-reduced-motion` disables continuous animation and reveals all content immediately.

## Content and data model

The typed `Product` model contains slug, name, flavor, category, color, price, compare-at price, rating, review count, short and long descriptions, ingredient list, facts, badges and asset references. `products.ts` is the only product-content source used by pages and components.

Five illustrative individual products represent Orégano, Cebola & Salsa, Páprica, Lemon Pepper and Barbecue. A discovery kit and a party-sized kit demonstrate bundle merchandising. Nutrition values and prices are explicitly mock content suitable for layout validation.

The comparison table contrasts Bicco's with a generic protein bar across format, dominant flavor profile, ingredient-list style, preparation, portability and consumption moment. It avoids definitive claims about all protein bars.

## State and interaction

`ShopProvider` owns cart items and drawer visibility. Cart actions expose `addItem`, `removeItem`, `setQuantity`, `clearCart`, `openCart` and `closeCart`. State is persisted to `localStorage` under a versioned key, with malformed stored data ignored safely.

Filtering and sorting are URL-independent local UI state. Route changes scroll to the top. The cart subtotal, free-shipping progress and quantity controls update immediately. Checkout remains a disabled explanatory action because Shopify integration is not part of this release.

## Accessibility and responsive behavior

- Semantic landmarks, headings, buttons and links.
- Keyboard-operable drawers, accordions, filters and quantity controls.
- Visible focus states using the ink color and cream offset.
- Text and controls meet WCAG AA contrast on their actual background.
- Images have useful Portuguese alt text; decorative graphics are hidden from assistive technology.
- Mobile layouts prioritize product imagery, pricing and add-to-cart actions.
- Breakpoints are content-driven around 720px and 1040px.
- Tap targets are at least 44px high.

## Architecture

Use React 19, TypeScript and Vite, matching the surrounding prototype repository. React Router provides route-level composition. Styling uses focused plain-CSS modules grouped into tokens, base, layout, components and page styles. Lucide supplies interface icons; brand graphics remain custom CSS and supplied raster assets.

Feature boundaries:

- `data/`: typed catalog and reviews;
- `store/`: cart state and derived totals;
- `components/layout/`: header, footer and route shell;
- `components/shop/`: reusable commerce components;
- `components/sections/`: editorial home and comparison sections;
- `pages/`: route composition only;
- `styles/`: design tokens and responsive styling.

This boundary allows a future Shopify repository to replace `products.ts` while preserving component contracts.

## Testing and verification

Automated tests cover catalog rendering, filtering/sorting, cart quantity math, drawer behavior, invalid product routing, shipping mock feedback and reduced-data fallbacks. Type checking and production builds must pass. Browser verification must cover desktop and mobile for Home, Catalog and Product Detail, including navigation and add-to-cart flow.

## Acceptance criteria

- The first viewport identifies Bicco's as a colorful roasted chickpea snack and exposes a purchase CTA.
- Home, Catalog, Product Detail and Story routes are complete and responsive.
- All five flavors plus two kits render from shared typed mock data.
- Comparison, ratings, reviews and educational product content are prominent.
- Quick-add, quantity adjustment and cart drawer interactions work.
- Continuous animation respects reduced-motion preferences.
- No Shopify credentials, backend calls or real checkout behavior exist.
- Example data is clearly distinguishable from legally validated product claims in supporting content.
