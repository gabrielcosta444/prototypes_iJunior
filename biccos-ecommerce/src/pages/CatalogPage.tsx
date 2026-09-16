import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductGrid } from '../components/shop/ProductGrid'
import { products } from '../data/products'
import type { ProductCategory } from '../types/catalog'

type Filter = 'all' | ProductCategory
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'

const filterOptions: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Tudo' },
  { value: 'sabor', label: 'Sabores' },
  { value: 'kit', label: 'Kits' },
]

export function CatalogPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [sort, setSort] = useState<Sort>('featured')

  const visibleProducts = useMemo(() => {
    const filtered = filter === 'all' ? [...products] : products.filter((product) => product.category === filter)
    return filtered.sort((left, right) => {
      if (sort === 'price-asc') return left.price - right.price
      if (sort === 'price-desc') return right.price - left.price
      if (sort === 'rating') return right.rating - left.rating
      if (sort === 'name') return left.name.localeCompare(right.name, 'pt-BR')
      return Number(right.featured) - Number(left.featured)
    })
  }, [filter, sort])

  return (
    <>
      <section className="catalog-hero">
        <div className="container catalog-hero__grid">
          <div>
            <span className="section-kicker">Todos os crocantes</span>
            <h1>Qual vai ser o seu <em>Bicco’s?</em></h1>
          </div>
          <p>Escolha um sabor, monte o estoque ou comece pelo kit que passeia por todos eles. Dados e preços são demonstrativos.</p>
        </div>
        <div className="catalog-hero__word" aria-hidden="true">CREC CREC CREC</div>
      </section>

      <section className="catalog-section section">
        <div className="container">
          <div className="catalog-toolbar">
            <div className="filter-chips" aria-label="Filtrar produtos">
              {filterOptions.map((option) => (
                <button
                  className={filter === option.value ? 'is-active' : ''}
                  aria-pressed={filter === option.value}
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                >{option.label}</button>
              ))}
            </div>
            <label className="catalog-sort">
              <SlidersHorizontal size={18} />
              <span>Ordenar produtos</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
                <option value="featured">Em destaque</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Mais bem avaliados</option>
                <option value="name">Nome A–Z</option>
              </select>
            </label>
          </div>
          <div role="region" aria-label="Lista de produtos">
            <ProductGrid products={visibleProducts} />
          </div>
          <p className="catalog-disclaimer">*Este é um protótipo visual. Preços, condições e dados nutricionais devem ser validados antes da publicação.</p>
        </div>
      </section>
    </>
  )
}
