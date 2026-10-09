import { describe, expect, it } from 'vitest';
import { createSeedState } from '../data/seed';
import { isProviderVisible } from '../domain/rules';
import { loadDemoState, prototypeReducer } from './state';

describe('prototype state transitions', () => {
  it('approves a pending provider and records the simulated email', () => {
    const next = prototypeReducer(createSeedState(), { type: 'APPROVE_PROVIDER', providerId: 'provider-3' });

    expect(next.providers.find((item) => item.id === 'provider-3')?.registrationStatus).toBe('approved');
    expect(next.notifications.at(-1)?.recipient).toBe('marcos@demo.fs');
  });

  it('rejects only when the administrator supplied a reason', () => {
    const initial = createSeedState();
    const unchanged = prototypeReducer(initial, { type: 'REJECT_PROVIDER', providerId: 'provider-3', reason: '  ' });
    const rejected = prototypeReducer(initial, { type: 'REJECT_PROVIDER', providerId: 'provider-3', reason: 'Documento vencido.' });

    expect(unchanged).toBe(initial);
    expect(rejected.providers.find((item) => item.id === 'provider-3')).toMatchObject({
      registrationStatus: 'rejected',
      rejectionReason: 'Documento vencido.',
    });
  });

  it('returns a rejected provider to the analysis queue on resubmission', () => {
    const next = prototypeReducer(createSeedState(), { type: 'RESUBMIT_PROVIDER', providerId: 'provider-5' });

    expect(next.providers.find((item) => item.id === 'provider-5')).toMatchObject({ registrationStatus: 'under_review', rejectionReason: undefined });
  });

  it('activates a subscription, records payment and immediately changes visibility', () => {
    const initial = createSeedState();
    const before = initial.providers.find((item) => item.id === 'provider-4')!;
    const next = prototypeReducer(initial, { type: 'SET_SUBSCRIPTION', providerId: 'provider-4', status: 'active' });
    const after = next.providers.find((item) => item.id === 'provider-4')!;

    expect(isProviderVisible(before)).toBe(false);
    expect(isProviderVisible(after)).toBe(true);
    expect(next.paymentEvents.at(0)?.type).toBe('confirmed');
  });

  it('records a reactivation event when a cancelled subscription becomes active', () => {
    const initial = createSeedState();
    initial.providers[0].subscriptionStatus = 'cancelled';

    const next = prototypeReducer(initial, { type: 'SET_SUBSCRIPTION', providerId: 'provider-1', status: 'active' });

    expect(next.paymentEvents.at(0)?.type).toBe('reactivated');
  });

  it('hides and restores an otherwise eligible provider through blocking', () => {
    const initial = createSeedState();
    const blocked = prototypeReducer(initial, { type: 'TOGGLE_BLOCK_PROVIDER', providerId: 'provider-1' });
    const restored = prototypeReducer(blocked, { type: 'TOGGLE_BLOCK_PROVIDER', providerId: 'provider-1' });

    expect(isProviderVisible(blocked.providers[0])).toBe(false);
    expect(isProviderVisible(restored.providers[0])).toBe(true);
  });

  it('updates the same provider record consumed by the public search', () => {
    const next = prototypeReducer(createSeedState(), {
      type: 'UPDATE_PROVIDER',
      providerId: 'provider-1',
      changes: { description: 'Nova descrição integrada.' },
    });

    expect(next.providers[0].description).toBe('Nova descrição integrada.');
  });
});

describe('persisted state loading', () => {
  it('falls back to a valid seed when storage contains invalid JSON', () => {
    expect(loadDemoState('{inválido').providers).toHaveLength(8);
  });

  it('falls back when the stored version is unsupported', () => {
    expect(loadDemoState(JSON.stringify({ version: 99, providers: [] })).providers).toHaveLength(8);
  });
});
