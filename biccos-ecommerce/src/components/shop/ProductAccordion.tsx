import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'

export function ProductAccordion({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="product-accordion" open={open}>
      <summary><span>{title}</span><Plus size={20} aria-hidden="true" /></summary>
      <div className="product-accordion__content">{children}</div>
    </details>
  )
}
