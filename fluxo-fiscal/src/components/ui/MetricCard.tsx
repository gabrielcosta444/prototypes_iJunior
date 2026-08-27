import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  tone?: 'blue' | 'cyan' | 'amber' | 'red' | 'green';
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ label, value, helper, icon: Icon, tone = 'blue', trend = 'neutral' }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`} aria-label={label}>
      <div className="metric-card__top">
        <span className="metric-card__label">{label}</span>
        <span className="metric-card__icon"><Icon size={19} /></span>
      </div>
      <strong className="metric-card__value">{value}</strong>
      <span className={`metric-card__helper metric-card__helper--${trend}`}>
        {trend === 'up' && <ArrowUpRight size={14} />}
        {trend === 'down' && <ArrowDownRight size={14} />}
        {helper}
      </span>
    </article>
  );
}
