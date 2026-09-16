import { describe, expect, it } from 'vitest'
import { cartReducer, initialCartState } from './cartReducer'

describe('cartReducer', () => {
  it('merges repeated products into one cart line', () => {
    const once = cartReducer(initialCartState, { type: 'add', slug: 'paprica', quantity: 1 })
    const twice = cartReducer(once, { type: 'add', slug: 'paprica', quantity: 2 })
    expect(twice.items).toEqual([{ slug: 'paprica', quantity: 3 }])
  })

  it('removes an item when its quantity becomes zero', () => {
    const state = { items: [{ slug: 'paprica', quantity: 1 }] }
    expect(cartReducer(state, { type: 'setQuantity', slug: 'paprica', quantity: 0 }).items).toEqual([])
  })

  it('ignores non-positive add quantities', () => {
    expect(cartReducer(initialCartState, { type: 'add', slug: 'paprica', quantity: 0 })).toEqual(initialCartState)
  })
})
