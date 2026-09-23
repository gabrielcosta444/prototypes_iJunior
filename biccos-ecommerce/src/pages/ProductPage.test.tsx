import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../app/App'
import { ShopProvider } from '../store/ShopContext'

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><ShopProvider><App /></ShopProvider></MemoryRouter>)
}

describe('ProductPage', () => {
  beforeEach(() => window.localStorage.clear())

  it('shows purchase details, comparison and reviews', () => {
    renderAt('/produto/paprica')
    expect(screen.getByRole('heading', { name: "Bicco's Páprica", level: 1 })).toBeInTheDocument()
    expect(screen.getByLabelText(/4.9 de 5 estrelas, 103 avaliações/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /adicionar 1.*sacola/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /bicco’s.*barrinha/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /opinião de quem já provou/i })).toBeInTheDocument()
  })

  it('renders a friendly not-found page for an invalid product', () => {
    renderAt('/produto/inexistente')
    expect(screen.getByRole('heading', { name: /este produto não está disponível/i })).toBeInTheDocument()
  })
})
