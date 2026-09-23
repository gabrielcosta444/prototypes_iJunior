import { ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const pillars = [
  { icon: Leaf, title: 'Ingredientes simples', text: 'Grão-de-bico, azeite e combinações de temperos para cada sabor.' },
  { icon: Sparkles, title: 'Textura crocante', text: 'O processo de forno transforma o grão-de-bico em um snack salgado e crocante.' },
  { icon: Heart, title: 'Pronto para levar', text: 'Um pacote prático para a bolsa, a mochila ou a gaveta do trabalho.' },
]

export function StoryPage() {
  return (
    <>
      <section className="story-hero section" data-reveal>
        <div className="container story-hero__grid">
          <div>
            <span className="section-kicker">Nossa história</span>
            <h1>Um salgadinho feito de grão-de-bico.</h1>
          </div>
          <div className="story-hero__side">
            <p>A Bicco’s combina uma base vegetal, preparo assado e sabores marcantes em um produto simples de consumir.</p>
            <div className="story-hero__signature">Bicco’s <span>desde 2024</span></div>
          </div>
        </div>
      </section>

      <section className="story-image container" data-reveal>
        <img src="/assets/biccos-lifestyle.png" alt="Universo visual vibrante da marca Bicco's" />
        <div className="story-image__quote">Grão-de-bico.<br />Azeite. Temperos.</div>
      </section>

      <section className="story-pillars section" data-reveal>
        <div className="container">
          <span className="section-kicker">O que guia a gente</span>
          <div className="story-pillars__grid">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <article data-reveal data-reveal-delay={index + 1} key={title}>
                <span className="story-pillar__number">0{index + 1}</span>
                <Icon size={34} />
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-process section" data-reveal>
        <div className="container">
          <div className="story-process__heading">
            <span className="section-kicker">Do grão-de-bico ao pacote</span>
            <h2>Como o produto ganha textura e sabor.</h2>
          </div>
          <div className="process-line">
            <div data-reveal data-reveal-delay="1"><strong>01</strong><h3>Seleciona</h3><p>Grãos escolhidos para manter tamanho e textura consistentes.</p></div>
            <div data-reveal data-reveal-delay="2"><strong>02</strong><h3>Tempera</h3><p>Azeite e combinações que definem cada sabor.</p></div>
            <div data-reveal data-reveal-delay="3"><strong>03</strong><h3>Assa</h3><p>Tempo e temperatura controlados para chegar à textura crocante.</p></div>
          </div>
        </div>
      </section>

      <section className="story-cta section" data-reveal>
        <div className="container">
          <span>Conheça a linha</span>
          <h2>Encontre o sabor que combina com a sua rotina.</h2>
          <Link className="button-link button-link--dark" to="/produtos">Escolher meu sabor <ArrowRight /></Link>
        </div>
      </section>
    </>
  )
}
