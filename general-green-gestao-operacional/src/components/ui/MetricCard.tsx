import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function MetricCard({ label, value, hint, icon: Icon, tone = 'green', footer }: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone?: 'green' | 'blue' | 'orange' | 'violet';
  footer?: ReactNode;
}) {
  return (
    <article className="metric-card">
      <div className={`metric-card__icon metric-card__icon--${tone}`}><Icon size={21} /></div>
      <div className="metric-card__body">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{hint}</small>
        {footer}
      </div>
    </article>
  );
}
