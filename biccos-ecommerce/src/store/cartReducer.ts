import { getProductBySlug } from '../data/products'

export interface CartItem {
  slug: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'add'; slug: string; quantity: number }
  | { type: 'setQuantity'; slug: string; quantity: number }
  | { type: 'remove'; slug: string }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartItem[] }

export const initialCartState: CartState = { items: [] }

export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === 'clear') return initialCartState

  if (action.type === 'hydrate') {
    return {
      items: action.items.filter(
        (item) => Boolean(getProductBySlug(item.slug)) && Number.isInteger(item.quantity) && item.quantity > 0,
      ),
    }
  }

  if (action.type === 'remove') {
    return { items: state.items.filter((item) => item.slug !== action.slug) }
  }

  if (action.type === 'setQuantity') {
    if (action.quantity <= 0) {
      return { items: state.items.filter((item) => item.slug !== action.slug) }
    }
    return {
      items: state.items.map((item) =>
        item.slug === action.slug ? { ...item, quantity: Math.floor(action.quantity) } : item,
      ),
    }
  }

  if (action.quantity <= 0 || !getProductBySlug(action.slug)) return state
  const existing = state.items.find((item) => item.slug === action.slug)
  if (existing) {
    return {
      items: state.items.map((item) =>
        item.slug === action.slug ? { ...item, quantity: item.quantity + Math.floor(action.quantity) } : item,
      ),
    }
  }
  return { items: [...state.items, { slug: action.slug, quantity: Math.floor(action.quantity) }] }
}
