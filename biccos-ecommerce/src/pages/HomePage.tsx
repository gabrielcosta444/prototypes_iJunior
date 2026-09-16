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
        <div className="home-hero__pattern" aria-hidden="true">B B B B B B</div>
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <span className="hero-pill"><Sparkles size={15} /> Proteína sem cara de suplemento</span>
            <h1>O salgadinho proteico que faz <em>crec.</em></h1>
            <p>Grão-de-bico assado, temperado e muito crocante. Um snack salgado para quem já cansou da barrinha de sempre.</p>
            <div className="home-hero__actions">
              <Link className="button-link button-link--dark" to="/produtos">Quero provar <ArrowRight size={18} /></Link>
              <Link className="text-link" to="/#comparacao">Por que Bicco’s?</Link>
            </div>
            <div className="hero-proof">
              <span><strong>4.9</strong> avaliação média*</span>
              <span><strong>5</strong> sabores para escolher</span>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="hero-stamp hero-stamp--top">100%<br /><small>crocante</small></div>
            <img src="/assets/biccos-product-collage.png" alt="Pacotes coloridos de Bicco's em diversos sabores" />
            <div className="hero-stamp hero-stamp--bottom"><Leaf size={22} /><small>grão-de-bico assado</small></div>
          </div>
        </div>
      </section>

      <BenefitsMarquee />

      <section className="flavors-section section">
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

      <section className="moments-section section">
        <div className="container moments-grid">
          <div className="moments-photo">
            <img src="/assets/biccos-lifestyle.png" alt="Bicco's em uma rotina ativa e colorida" />
            <span>vai com você →</span>
          </div>
          <div className="moments-copy">
            <span className="section-kicker">Snack do seu jeito</span>
            <h2>Da mochila ao sofá, sem cerimônia.</h2>
            <p>Não precisa de shaker, colher nem geladeira. Só abrir o pacote e encontrar uma pausa gostosa no meio da rotina.</p>
            <div className="moments-list">
              {moments.map(({ icon: Icon, label, color }) => (
                <div className={`moment-item moment-item--${color}`} key={label}><span><Icon /></span>{label}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />

      <section className="manifesto-section section">
        <div className="container manifesto-grid">
          <div className="manifesto-title">
            <span className="section-kicker">Pouca complicação. Muito sabor.</span>
            <h2>O grão-de-bico saiu da salada.</h2>
          </div>
          <div className="manifesto-body">
            <p className="manifesto-lead">A gente queria um lanche salgado que fosse prático como um salgadinho e honesto como comida de verdade.</p>
            <p>Então assamos o grão-de-bico com azeite, colocamos temperos cheios de personalidade e deixamos a crocância fazer o resto.</p>
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

      <section className="kit-banner section">
        <div className="container kit-banner__card">
          <div className="kit-banner__copy">
            <span className="section-kicker">Não sabe por onde começar?</span>
            <h2>Faça o tour completo da crocância.</h2>
            <p>O Kit Descoberta reúne os cinco sabores para você provar sem precisar escolher favorito antes da hora.</p>
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
