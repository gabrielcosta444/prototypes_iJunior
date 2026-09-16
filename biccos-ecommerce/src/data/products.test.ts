import { describe, expect, it } from 'vitest'
import { getProductBySlug, products } from './products'

describe('product catalog', () => {
  it('contains five flavors and two kits with unique slugs', () => {
    expect(products).toHaveLength(7)
    expect(new Set(products.map((product) => product.slug)).size).toBe(7)
    expect(products.filter((product) => product.category === 'sabor')).toHaveLength(5)
  })

  it('finds a product by slug', () => {
    expect(getProductBySlug('paprica')?.flavor).toBe('Páprica')
    expect(getProductBySlug('inexistente')).toBeUndefined()
  })
})
