import type { Product } from '../../types/catalog'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="product-grid__empty"><h3>Nenhum crocante por aqui.</h3><p>Tente outra combinação de filtros.</p></div>
  }
  return <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
}
