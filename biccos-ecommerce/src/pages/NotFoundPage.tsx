import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage({ product = false }: { product?: boolean }) {
  return (
    <section className="not-found section" data-reveal>
      <div className="container not-found__card">
        <span className="not-found__code">{product ? '404g' : '404'}</span>
        <span className="section-kicker">Página não encontrada</span>
        <h1>{product ? 'Este produto não está disponível.' : 'Não encontramos esta página.'}</h1>
        <p>Volte para a seleção completa de produtos Bicco’s.</p>
        <Link className="button-link button-link--dark" to="/produtos"><ArrowLeft size={18} /> Ver produtos</Link>
      </div>
    </section>
  )
}
