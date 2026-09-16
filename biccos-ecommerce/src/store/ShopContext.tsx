import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { getProductBySlug } from '../data/products'
import { cartReducer, initialCartState, type CartItem } from './cartReducer'

const STORAGE_KEY = 'biccos-cart-v1'

interface ShopContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isCartOpen: boolean
  addItem: (slug: string, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  removeItem: (slug: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const ShopContext = createContext<ShopContextValue | null>(null)

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as { items?: CartItem[] }
    return Array.isArray(parsed.items) ? parsed.items : []
  } catch {
    return []
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () =>
    cartReducer(initialCartState, { type: 'hydrate', items: readStoredCart() }),
  )
  const [isCartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }))
  }, [state.items])

  useEffect(() => {
    document.body.classList.toggle('drawer-open', isCartOpen)
    return () => document.body.classList.remove('drawer-open')
  }, [isCartOpen])

  const value = useMemo<ShopContextValue>(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = state.items.reduce((sum, item) => {
      const product = getProductBySlug(item.slug)
      return sum + (product?.price ?? 0) * item.quantity
    }, 0)

    return {
      items: state.items,
      itemCount,
      subtotal,
      isCartOpen,
      addItem: (slug, quantity = 1) => {
        dispatch({ type: 'add', slug, quantity })
        setCartOpen(true)
      },
      setQuantity: (slug, quantity) => dispatch({ type: 'setQuantity', slug, quantity }),
      removeItem: (slug) => dispatch({ type: 'remove', slug }),
      clearCart: () => dispatch({ type: 'clear' }),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
    }
  }, [isCartOpen, state.items])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used inside ShopProvider')
  return context
}
