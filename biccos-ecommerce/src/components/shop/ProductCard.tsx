import { ArrowUpRight, Check } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/catalog'
import { useShop } from '../../store/ShopContext'
import { Rating } from './Rating'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useShop()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product.slug)
    setAdded(true)
  }

  return (
    <article className={`product-card theme-${product.theme}`}>
      <Link className="product-card__visual" to={`/produto/${product.slug}`} aria-label={`Ver ${product.name}`}>
        <div className="product-card__badges">
          {product.badges.slice(0, 2).map((badge) => <span className="badge" key={badge}>{badge}</span>)}
        </div>
        <img src={product.image} alt={`Embalagem do ${product.name}`} />
        <span className="product-card__arrow" aria-hidden="true"><ArrowUpRight /></span>
      </Link>
      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="eyebrow">{product.eyebrow}</span>
          <Rating value={product.rating} count={product.reviewCount} compact />
        </div>
        <Link to={`/produto/${product.slug}`}><h3>{product.name}</h3></Link>
        <p>{product.shortDescription}</p>
        <div className="product-card__footer">
          <div className="product-price">
            {product.compareAtPrice && <s>{currency.format(product.compareAtPrice)}</s>}
            <strong>{currency.format(product.price)}</strong>
          </div>
          <button
            className={`quick-add${added ? ' quick-add--added' : ''}`}
            aria-label={added ? `${product.name} adicionado` : `Adicionar ${product.name}`}
            onClick={handleAdd}
          >
            {added ? <><Check size={18} /> Adicionado</> : <>+ Adicionar</>}
          </button>
        </div>
      </div>
    </article>
  )
}
