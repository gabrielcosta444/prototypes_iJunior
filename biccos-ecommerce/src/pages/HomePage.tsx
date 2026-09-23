import { ArrowRight, BriefcaseBusiness, Dumbbell, GraduationCap, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProducts, products } from '../data/products'
import { BenefitsMarquee } from '../components/sections/BenefitsMarquee'
import { ComparisonTable } from '../components/sections/ComparisonTable'
import { ReviewsSection } from '../components/sections/ReviewsSection'
import { ProductGrid } from '../components/shop/ProductGrid'

const moments = [
  { icon: BriefcaseBusiness, label: 'entre reuniões', color: 'orange' },
  { icon: GraduationCap, label: 'no corre da faculdade', color: 'purple' },
  { icon: Dumbbell, label: 'depois do treino', color: 'green' },
]

export function HomePage() {
  const discoveryKit = products.find((product) => product.slug === 'kit-descoberta')!

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__pattern" aria-hidden="true" />
        <img className="home-hero__floating-symbol" src="/assets/biccos-symbol-light.svg" alt="" aria-hidden="true" />
        <div className="container home-hero__grid">
          <div className="home-hero__copy" data-reveal>
            
            <h1>O 1º salgadinho proteico <em>100% natural.</em></h1>
            <p>Grão-de-bico assado com azeite e temperos. Um snack salgado, prático e com ingredientes simples.</p>
            <div className="home-hero__actions">
              <Link className="button-link button-link--dark" to="/produtos">Quero provar <ArrowRight size={18} /></Link>
              <Link className="text-link" to="/#comparacao">Por que Bicco’s?</Link>
            </div>
            <div className="hero-proof">
              <span><strong>4.9</strong> avaliação média*</span>
              <span><strong>5</strong> sabores para escolher</span>
            </div>
          </div>
          <div className="home-hero__visual" data-reveal data-reveal-delay="2">
            <span className="brand-orbit brand-orbit--one" aria-hidden="true" />
            <span className="brand-orbit brand-orbit--two" aria-hidden="true" />
            <div className="hero-stamp hero-stamp--top">100%<br /><small>crocante</small></div>
            <img src="/assets/biccos-product-collage.png" alt="Pacotes coloridos de Bicco's em diversos sabores" />
            <div className="hero-stamp hero-stamp--bottom"><Leaf size={22} /><small>grão-de-bico assado</small></div>
          </div>
        </div>
      </section>

      <BenefitsMarquee />

      <section className="flavors-section section" data-reveal>
        <div className="container">
          <div className="flavors-heading">
            <div>
              <span className="section-kicker">Um pacote, muita personalidade</span>
              <h2 className="section-title">Escolha seu sabor de hoje.</h2>
            </div>
            <div>
              <p>Do herbal ao defumado, tem um Bicco’s para cada tipo de fome.</p>
              <Link className="text-link" to="/produtos">Ver todos os produtos <ArrowRight size={16} /></Link>
            </div>
          </div>
          <ProductGrid products={featuredProducts.slice(0, 3)} />
        </div>
      </section>

      <section className="moments-section section" data-reveal>
        <div className="container moments-grid">
          <div className="moments-photo">
            <img src="/assets/biccos-lifestyle.png" alt="Bicco's em uma rotina ativa e colorida" />
            <span>pronto para levar →</span>
          </div>
          <div className="moments-copy">
            <span className="section-kicker">Para diferentes momentos</span>
            <h2>Um snack prático para a rotina.</h2>
            <p>Não precisa de preparo ou refrigeração. O pacote pode acompanhar o trabalho, a faculdade ou o pós-treino.</p>
            <div className="moments-list">
              {moments.map(({ icon: Icon, label, color }) => (
                <div className={`moment-item moment-item--${color}`} key={label}><span><Icon /></span>{label}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      <section className="manifesto-section section" data-reveal>
        <div className="container manifesto-grid">
          <div className="manifesto-title">
            <span className="section-kicker">A base da receita</span>
            <h2>Grão-de-bico, azeite e temperos.</h2>
          </div>
          <div className="manifesto-body">
            <p className="manifesto-lead">Uma receita curta para um snack salgado, assado e fácil de levar.</p>
            <p>O grão-de-bico é assado com azeite e recebe combinações de temperos para cada sabor da linha.</p>
            <div className="manifesto-facts">
              <span><strong>01</strong> grão-de-bico</span>
              <span><strong>02</strong> azeite</span>
              <span><strong>03</strong> temperos</span>
            </div>
            <Link className="button-link button-link--secondary" to="/sobre">Conheça a história <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="kit-banner section" data-reveal>
        <div className="container kit-banner__card">
          <div className="kit-banner__copy">
            <span className="section-kicker">Kit Descoberta</span>
            <h2>Os cinco sabores em um só kit.</h2>
            <p>Uma seleção completa para conhecer a linha e decidir quais sabores entram na próxima compra.</p>
            <div className="kit-banner__price"><s>R$ 74,50</s><strong>R$ 67,90*</strong></div>
            <Link className="button-link button-link--dark" to={`/produto/${discoveryKit.slug}`}>Conhecer o kit <ArrowRight size={18} /></Link>
          </div>
          <div className="kit-banner__visual">
            <span className="kit-banner__burst">5 sabores<br /><strong>1 kit</strong></span>
            <img src={discoveryKit.image} alt="Seleção de pacotes do Kit Descoberta Bicco's" />
          </div>
        </div>
      </section>
    </>
  )
}
