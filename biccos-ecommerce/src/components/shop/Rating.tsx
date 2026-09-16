import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  count?: number
  compact?: boolean
}

export function Rating({ value, count, compact = false }: RatingProps) {
  return (
    <div className={`rating${compact ? ' rating--compact' : ''}`} aria-label={`${value} de 5 estrelas${count ? `, ${count} avaliações` : ''}`}>
      <span className="rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={compact ? 13 : 16} fill={index < Math.round(value) ? 'currentColor' : 'none'} />
        ))}
      </span>
      <strong>{value.toFixed(1)}</strong>
      {count !== undefined && <span>({count})</span>}
    </div>
  )
}
