import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../app/App';
import { PrototypeProvider } from '../../app/PrototypeContext';
import { STORAGE_KEY } from '../../app/state';
import { createSeedState } from '../../data/seed';

const renderProvider = (providerId: string, path: string) => {
  const state = createSeedState();
  const provider = state.providers.find((item) => item.id === providerId)!;
  state.currentUser = { id: `user-${provider.id}`, name: provider.fullName, email: provider.accountEmail, role: 'provider', entityId: provider.id };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return render(<PrototypeProvider><MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter></PrototypeProvider>);
};

describe('provider lifecycle', () => {
  it('resubmits a rejected registration to the admin analysis queue', async () => {
    const user = userEvent.setup();
    renderProvider('provider-5', '/prestador/situacao');

    expect(screen.getByText(/substitua o comprovante técnico/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /reenviar para análise/i }));

    expect(screen.getByText(/cadastro em análise/i)).toBeInTheDocument();
  });

  it('activates an approved provider through the simulated checkout', async () => {
    const user = userEvent.setup();
    renderProvider('provider-4', '/prestador/assinatura');

    await user.click(screen.getByRole('button', { name: /contratar assinatura/i }));
    expect(screen.getByRole('dialog', { name: /checkout demonstrativo/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /simular pagamento aprovado/i }));

    expect(screen.getByText(/assinatura ativa/i)).toBeInTheDocument();
  });
});
