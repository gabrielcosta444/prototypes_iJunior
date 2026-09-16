export type ProductCategory = 'sabor' | 'kit'
export type ProductTheme = 'purple' | 'orange' | 'blue' | 'green' | 'red'

export interface ProductFact {
  value: string
  label: string
}

export interface Product {
  slug: string
  name: string
  flavor: string
  category: ProductCategory
  theme: ProductTheme
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  eyebrow: string
  shortDescription: string
  longDescription: string
  ingredients: string
  facts: ProductFact[]
  badges: string[]
  image: string
  gallery: string[]
  packageCount: number
  featured: boolean
}

export interface Review {
  id: string
  author: string
  role: string
  rating: number
  title: string
  body: string
  product: string
  initials: string
}
