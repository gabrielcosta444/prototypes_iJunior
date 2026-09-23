import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Button } from '../ui/Button'
import { ShopProvider, useShop } from '../../store/ShopContext'
import { CartDrawer } from './CartDrawer'

function Harness() {
  const { addItem } = useShop()
  return (
    <>
      <Button onClick={() => addItem('paprica')}>Adicionar páprica</Button>
      <CartDrawer />
    </>
  )
}

describe('CartDrawer', () => {
  it('updates quantity, subtotal and removes a cart line', async () => {
    const user = userEvent.setup()
    render(<ShopProvider><Harness /></ShopProvider>)

    await user.click(screen.getByRole('button', { name: /adicionar páprica/i }))
    expect(screen.getByRole('dialog', { name: /sua sacola/i })).toBeInTheDocument()
    expect(screen.getByText("Bicco's Páprica")).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /aumentar quantidade de bicco's páprica/i }))
    expect(screen.getByText('R$ 29,80')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remover bicco's páprica/i }))
    expect(screen.getByText(/sua sacola está vazia/i)).toBeInTheDocument()
  })

  it('closes from its close button', async () => {
    const user = userEvent.setup()
    render(<ShopProvider><Harness /></ShopProvider>)
    await user.click(screen.getByRole('button', { name: /adicionar páprica/i }))
    await user.click(screen.getByRole('button', { name: /fechar sacola/i }))
    expect(screen.queryByRole('dialog', { name: /sua sacola/i })).not.toBeInTheDocument()
  })
})
