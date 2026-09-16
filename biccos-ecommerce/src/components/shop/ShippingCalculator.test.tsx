import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ShippingCalculator } from './ShippingCalculator'

describe('ShippingCalculator', () => {
  it('rejects an incomplete CEP', async () => {
    const user = userEvent.setup()
    render(<ShippingCalculator />)
    await user.type(screen.getByLabelText(/cep/i), '3014')
    await user.click(screen.getByRole('button', { name: /calcular/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/digite os 8 números/i)
  })

  it('returns deterministic prototype delivery options', async () => {
    const user = userEvent.setup()
    render(<ShippingCalculator />)
    await user.type(screen.getByLabelText(/cep/i), '30140071')
    await user.click(screen.getByRole('button', { name: /calcular/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/chega entre 3 e 5 dias úteis/i)
  })
})
