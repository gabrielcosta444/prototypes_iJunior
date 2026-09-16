import { ArrowUpRight, Instagram } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../ui/BrandMark'

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__newsletter">
        <div className="container newsletter-grid">
          <div>
            <span className="section-kicker">Clube dos crocantes</span>
            <h2>Novidades que fazem <em>crec.</em></h2>
          </div>
          {subscribed ? (
            <div className="newsletter-success" role="status">Pronto! Você entrou para a turma. ✦</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label>
              <input id="newsletter-email" type="email" placeholder="seu melhor e-mail" required />
              <button type="submit" aria-label="Cadastrar e-mail"><ArrowUpRight /></button>
            </form>
          )}
        </div>
      </div>
      <div className="site-footer__main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <BrandMark inverse />
            <p>Grão-de-bico assado, crocante e com muita personalidade.</p>
            <a href="https://www.instagram.com/bicco.ss/" aria-label="Bicco's no Instagram"><Instagram /> @bicco.ss</a>
          </div>
          <nav aria-label="Produtos">
            <strong>Escolha seu Bicco’s</strong>
            <Link to="/produtos">Todos os produtos</Link>
            <Link to="/produto/kit-descoberta">Kit Descoberta</Link>
            <Link to="/produto/paprica">Mais pedido</Link>
          </nav>
          <nav aria-label="Institucional">
            <strong>Por dentro</strong>
            <Link to="/sobre">Nossa história</Link>
            <Link to="/#comparacao">Por que Bicco’s</Link>
            <a href="mailto:oi@biccos.com.br">Fale com a gente</a>
          </nav>
        </div>
        <div className="container site-footer__legal">
          <span>© 2026 Bicco’s</span>
          <span>Protótipo visual — dados comerciais e nutricionais ilustrativos.</span>
        </div>
      </div>
    </footer>
  )
}
