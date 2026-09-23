import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandMark } from './BrandMark'

describe('BrandMark', () => {
  it("renders an accessible Bicco's home link", () => {
    render(<BrandMark />)
    const link = screen.getByRole('link', { name: /bicco's.*início/i })
    expect(link).toHaveAttribute('href', '/')
    expect(screen.getByRole('img', { name: /logo bicco's/i })).toHaveAttribute('src', '/assets/biccos-logo-dark.svg')
  })
})
