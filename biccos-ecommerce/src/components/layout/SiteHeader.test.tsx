import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ShopProvider } from '../../store/ShopContext'
import { SiteHeader } from './SiteHeader'

describe('SiteHeader', () => {
  it('opens and closes the mobile navigation', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><ShopProvider><SiteHeader /></ShopProvider></MemoryRouter>)

    expect(screen.getByRole('button', { name: /sacola, 0 itens/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /abrir menu/i }))
    expect(screen.getByRole('dialog', { name: /menu principal/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /fechar menu/i }))
    expect(screen.queryByRole('dialog', { name: /menu principal/i })).not.toBeInTheDocument()
  })
})
