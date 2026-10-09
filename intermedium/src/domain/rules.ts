import type { Provider, ProviderFilters } from './types';

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();

export function isProviderVisible(provider: Provider): boolean {
  return provider.registrationStatus === 'approved' && provider.subscriptionStatus === 'active' && !provider.blocked;
}

export function filterVisibleProviders(providers: Provider[], filters: ProviderFilters): Provider[] {
  const query = normalize(filters.query);
  const region = normalize(filters.region);

  return providers.filter((provider) => {
    if (!isProviderVisible(provider)) return false;
    if (filters.categoryId && !provider.categoryIds.includes(filters.categoryId)) return false;
    if (filters.urgentOnly && !provider.urgent) return false;
    if (region && !provider.regions.some((item) => normalize(item) === region)) return false;
    if (query) {
      const searchable = normalize([provider.professionalName, provider.fullName, provider.description].join(' '));
      if (!searchable.includes(query)) return false;
    }
    return true;
  });
}
