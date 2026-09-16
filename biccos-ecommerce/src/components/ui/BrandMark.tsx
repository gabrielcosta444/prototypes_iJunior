interface BrandMarkProps {
  compact?: boolean
  inverse?: boolean
}

export function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  return (
    <a
      className={`brand-mark${compact ? ' brand-mark--compact' : ''}${inverse ? ' brand-mark--inverse' : ''}`}
      href="/"
      aria-label="Bicco's — ir para o início"
    >
      <span className="brand-mark__symbol" aria-hidden="true">
        <span>B</span>
      </span>
      {!compact && <span className="brand-mark__word">BICCO’S</span>}
    </a>
  )
}
