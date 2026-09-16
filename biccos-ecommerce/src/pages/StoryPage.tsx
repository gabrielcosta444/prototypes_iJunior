import { ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const pillars = [
  { icon: Leaf, title: 'Naturalmente simples', text: 'Ingredientes reconhecíveis, temperos de verdade e uma receita que não precisa de malabarismo.' },
  { icon: Sparkles, title: 'Crocância com graça', text: 'Porque comer bem não deveria significar abrir mão de textura, sabor ou diversão.' },
  { icon: Heart, title: 'Feito para a vida real', text: 'Um pacote que cabe na bolsa, na mochila e nos intervalos que aparecem sem avisar.' },
]

export function StoryPage() {
  return (
    <>
      <section className="story-hero section">
        <div className="container story-hero__grid">
          <div>
            <span className="section-kicker">Nossa história</span>
            <h1>Uma ideia que começou com fome de mudança.</h1>
          </div>
          <div className="story-hero__side">
            <p>Chega de escolher entre o salgadinho gostoso e o lanche que acompanha seus objetivos. Bicco’s nasceu para ocupar justamente esse espaço.</p>
            <div className="story-hero__signature">Bicco’s <span>desde 2024</span></div>
          </div>
        </div>
      </section>

      <section className="story-image container">
        <img src="/assets/biccos-lifestyle.png" alt="Universo visual vibrante da marca Bicco's" />
        <div className="story-image__quote">“Comida simples.<br />Crocância gigante.”</div>
      </section>

      <section className="story-pillars section">
        <div className="container">
          <span className="section-kicker">O que guia a gente</span>
          <div className="story-pillars__grid">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <span className="story-pillar__number">0{index + 1}</span>
                <Icon size={34} />
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-process section">
        <div className="container">
          <div className="story-process__heading">
            <span className="section-kicker">Do grão ao crec</span>
            <h2>Três passos. Zero tédio.</h2>
          </div>
          <div className="process-line">
            <div><strong>01</strong><h3>Escolhe</h3><p>Grãos que aguentam o tranco e entregam textura.</p></div>
            <div><strong>02</strong><h3>Tempera</h3><p>Combinações marcantes, do herbal ao defumado.</p></div>
            <div><strong>03</strong><h3>Assa</h3><p>Calor, tempo e atenção para chegar naquele crec.</p></div>
          </div>
        </div>
      </section>

      <section className="story-cta section">
        <div className="container">
          <span>Fim da história?</span>
          <h2>Só depois do primeiro pacote.</h2>
          <Link className="button-link button-link--dark" to="/produtos">Escolher meu sabor <ArrowRight /></Link>
        </div>
      </section>
    </>
  )
}
