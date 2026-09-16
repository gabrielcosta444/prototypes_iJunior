import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../app/App'
import { ShopProvider } from '../store/ShopContext'

describe('HomePage', () => {
  beforeEach(() => window.localStorage.clear())

  it('presents the proposition, flavors, comparison and reviews', () => {
    render(<MemoryRouter initialEntries={['/']}><ShopProvider><App /></ShopProvider></MemoryRouter>)

    expect(screen.getByRole('heading', { name: /salgadinho proteico/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /escolha seu sabor/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /bicco’s.*barrinha/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /quem prova/i })).toBeInTheDocument()
  })
})
