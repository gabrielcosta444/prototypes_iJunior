import { ArrowRight, BadgeCheck, MapPin, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Category, Provider } from '../domain/types';
import { StatusBadge } from './ui';

export function ProviderCard({ provider, categories }: { provider: Provider; categories: Category[] }) {
  const specialtyNames = provider.categoryIds.map((id) => categories.find((item) => item.id === id)?.name).filter(Boolean);
  return (
    <article className="provider-card">
      <div className="provider-card__top">
        <img src={provider.avatar} alt={`Foto de ${provider.professionalName}`} />
        <div className="provider-card__identity">
          <div className="provider-card__badges">
            <StatusBadge tone="success"><BadgeCheck size={13} /> Aprovado pela FS</StatusBadge>
            {provider.urgent && <StatusBadge tone="warning"><Siren size={13} /> Urgências</StatusBadge>}
          </div>
          <h2>{provider.professionalName}</h2>
          <p>{specialtyNames.join(' • ')}</p>
        </div>
      </div>
      <p className="provider-card__description">{provider.description}</p>
      <div className="provider-card__regions"><MapPin size={16} /><span>{provider.regions.join(', ')}</span></div>
      <Link className="provider-card__link" to={`/sindico/prestadores/${provider.id}`}>Ver perfil <ArrowRight size={17} /></Link>
    </article>
  );
}
