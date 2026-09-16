import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage({ product = false }: { product?: boolean }) {
  return (
    <section className="not-found section">
      <div className="container not-found__card">
        <span className="not-found__code">{product ? '404g' : '404'}</span>
        <span className="section-kicker">Cadê o pacote?</span>
        <h1>{product ? 'Esse sabor escapou da prateleira.' : 'Essa página fez crec e sumiu.'}</h1>
        <p>Volte para a seleção completa e encontre um crocante que existe de verdade.</p>
        <Link className="button-link button-link--dark" to="/produtos"><ArrowLeft size={18} /> Ver produtos</Link>
      </div>
    </section>
  )
}
