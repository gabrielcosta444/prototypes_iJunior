import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { createSeedState } from '../data/seed';
import { PrototypeProvider } from './PrototypeContext';
import { STORAGE_KEY } from './state';
import { AppRoutes } from './App';

const renderAt = (path = '/login') => render(
  <PrototypeProvider>
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  </PrototypeProvider>,
);

describe('authentication and routing', () => {
  it('presents the deliberately simple login and enters the manager demo', async () => {
    const user = userEvent.setup();
    renderAt();

    expect(screen.getByRole('heading', { name: /bem-vindo/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /entrar como síndico/i }));

    expect(await screen.findByRole('heading', { name: /ambiente do condomínio/i })).toBeInTheDocument();
  });

  it('redirects a signed-in administrator away from provider routes', () => {
    const state = createSeedState();
    state.currentUser = { id: 'admin-1', name: 'Fernanda Souza', email: 'admin@demo.fs', role: 'admin' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    renderAt('/prestador');

    expect(screen.getByRole('heading', { name: /ambiente administrativo/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /ambiente do prestador/i })).not.toBeInTheDocument();
  });

  it('shows a validation error for unknown credentials', async () => {
    const user = userEvent.setup();
    renderAt();

    await user.type(screen.getByLabelText(/e-mail/i), 'naoexiste@demo.fs');
    await user.type(screen.getByLabelText(/^senha$/i), '123456');
    await user.click(screen.getByRole('button', { name: /^entrar$/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/conta demonstrativa não encontrada/i);
  });
});
