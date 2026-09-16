import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../app/App'
import { ShopProvider } from '../store/ShopContext'

function renderCatalog() {
  return render(<MemoryRouter initialEntries={['/produtos']}><ShopProvider><App /></ShopProvider></MemoryRouter>)
}

describe('CatalogPage', () => {
  beforeEach(() => window.localStorage.clear())

  it('filters the catalog to kits', async () => {
    const user = userEvent.setup()
    renderCatalog()
    await user.click(screen.getByRole('button', { name: 'Kits' }))
    const grid = screen.getByRole('region', { name: /lista de produtos/i })
    expect(within(grid).getAllByRole('article')).toHaveLength(2)
    expect(within(grid).getByRole('heading', { name: /kit descoberta/i })).toBeInTheDocument()
    expect(within(grid).queryByRole('heading', { name: /páprica/i })).not.toBeInTheDocument()
  })

  it('sorts products by descending price', async () => {
    const user = userEvent.setup()
    renderCatalog()
    await user.selectOptions(screen.getByLabelText(/ordenar produtos/i), 'price-desc')
    const grid = screen.getByRole('region', { name: /lista de produtos/i })
    expect(within(grid).getAllByRole('heading', { level: 3 })[0]).toHaveTextContent("Kit Galera Bicco's")
  })
})
