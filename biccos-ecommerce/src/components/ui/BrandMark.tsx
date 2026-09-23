interface BrandMarkProps {
  compact?: boolean
  inverse?: boolean
}

export function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  const source = compact
    ? `/assets/biccos-symbol-${inverse ? 'light' : 'dark'}.svg`
    : `/assets/biccos-logo-${inverse ? 'light' : 'dark'}.svg`

  return (
    <a
      className={`brand-mark${compact ? ' brand-mark--compact' : ''}${inverse ? ' brand-mark--inverse' : ''}`}
      href="/"
      aria-label="Bicco's — ir para o início"
    >
      <img src={source} alt="Logo Bicco's" />
    </a>
  )
}
