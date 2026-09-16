import { Minus, Plus } from 'lucide-react'

interface QuantityControlProps {
  value: number
  onChange: (value: number) => void
  label?: string
}

export function QuantityControl({ value, onChange, label = 'produto' }: QuantityControlProps) {
  return (
    <div className="quantity-control">
      <button aria-label={`Diminuir quantidade de ${label}`} onClick={() => onChange(Math.max(1, value - 1))}><Minus size={17} /></button>
      <span aria-live="polite">{value}</span>
      <button aria-label={`Aumentar quantidade de ${label}`} onClick={() => onChange(value + 1)}><Plus size={17} /></button>
    </div>
  )
}
