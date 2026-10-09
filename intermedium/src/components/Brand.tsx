import { Link } from 'react-router-dom';

interface BrandProps {
  compact?: boolean;
  light?: boolean;
  linkTo?: string;
}

export function Brand({ compact = false, light = false, linkTo = '/' }: BrandProps) {
  const content = (
    <span className={`brand ${compact ? 'brand--compact' : ''} ${light ? 'brand--light' : ''}`} aria-label="FS Intermedium">
      <svg className="brand__mark" viewBox="0 0 72 78" role="img" aria-hidden="true">
        <path d="M36 3 67 21v36L36 75 5 57V21Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        <path d="M20 24h25l-5 8H28v8h14l-5 8h-9v13h-8V24Zm27 0h10l-5 8H42l5-8Zm-5 16h10c6 0 10 4 10 10s-4 11-11 11H33l6-8h12c2 0 3-1 3-3s-1-3-3-3H37l5-7Z" fill="currentColor" />
      </svg>
      {!compact && (
        <span className="brand__copy">
          <span className="brand__name">INTERMEDIUM</span>
          <span className="brand__tagline">SOLUÇÃO PARA SUA NECESSIDADE</span>
        </span>
      )}
    </span>
  );

  return linkTo ? <Link to={linkTo} className="brand-link">{content}</Link> : content;
}
