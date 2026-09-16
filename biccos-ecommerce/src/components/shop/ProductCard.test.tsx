import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { products } from '../../data/products'
import { ShopProvider, useShop } from '../../store/ShopContext'
import { ProductCard } from './ProductCard'

function CartCount() {
  const { itemCount } = useShop()
  return <output aria-label="Itens na sacola">{itemCount}</output>
}

describe('ProductCard', () => {
  beforeEach(() => window.localStorage.clear())

  it('quick-adds the selected product to the global cart', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ShopProvider>
          <ProductCard product={products[2]} />
          <CartCount />
        </ShopProvider>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /adicionar bicco's páprica/i }))
    expect(screen.getByLabelText(/itens na sacola/i)).toHaveTextContent('1')
    expect(screen.getByRole('button', { name: /adicionado/i })).toBeInTheDocument()
  })
})
