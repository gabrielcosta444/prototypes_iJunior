import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ShopProvider } from '../../store/ShopContext'
import { SiteShell } from './SiteShell'

describe('SiteShell scroll motion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('reveals marked content when it enters the viewport', () => {
    let notifyIntersection: IntersectionObserverCallback | undefined

    class FakeIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        notifyIntersection = callback
      }

      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return [] }
      root = null
      rootMargin = '0px'
      thresholds = [0]
    }

    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)

    render(
      <MemoryRouter initialEntries={['/']}>
        <ShopProvider>
          <Routes>
            <Route element={<SiteShell />}>
              <Route index element={<section data-reveal>Conteúdo animado</section>} />
            </Route>
          </Routes>
        </ShopProvider>
      </MemoryRouter>,
    )

    const section = screen.getByText('Conteúdo animado')
    const bounds = section.getBoundingClientRect()
    const entry: IntersectionObserverEntry = {
      boundingClientRect: bounds,
      intersectionRatio: 1,
      intersectionRect: bounds,
      isIntersecting: true,
      rootBounds: null,
      target: section,
      time: 0,
    }
    act(() => {
      notifyIntersection?.(
        [entry],
        {} as IntersectionObserver,
      )
    })

    expect(section).toHaveClass('is-visible')
  })
})
