import { describe, expect, it } from 'vitest';
import { createSeedState } from '../data/seed';
import { filterVisibleProviders, isProviderVisible } from './rules';

describe('provider visibility', () => {
  it('shows only approved, active and unblocked providers', () => {
    const state = createSeedState();
    const visible = state.providers.filter(isProviderVisible);

    expect(visible.map((provider) => provider.id)).toEqual(['provider-1', 'provider-2', 'provider-8']);
  });

  it('combines name, category, region and urgency filters', () => {
    const state = createSeedState();
    const filtered = filterVisibleProviders(state.providers, {
      query: 'hidro',
      categoryId: 'hydraulics',
      region: 'Savassi',
      urgentOnly: true,
    });

    expect(filtered.map((provider) => provider.professionalName)).toEqual(['HidroPronto BH']);
  });

  it('never leaks an ineligible provider even when every text filter matches', () => {
    const state = createSeedState();
    const filtered = filterVisibleProviders(state.providers, {
      query: 'Clima',
      categoryId: 'climate',
      region: 'Funcionários',
      urgentOnly: false,
    });

    expect(filtered).toEqual([]);
  });

  it('returns independent fresh seed objects', () => {
    const first = createSeedState();
    const second = createSeedState();
    first.providers[0].professionalName = 'Alterado';

    expect(second.providers[0].professionalName).toBe('HidroPronto BH');
  });
});
