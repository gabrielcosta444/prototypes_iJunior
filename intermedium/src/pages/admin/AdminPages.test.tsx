import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../app/App';
import { PrototypeProvider } from '../../app/PrototypeContext';
import { STORAGE_KEY } from '../../app/state';
import { createSeedState } from '../../data/seed';

const renderAdmin = (path: string) => {
  const state = createSeedState();
  state.currentUser = { id: 'admin-1', name: 'Fernanda Souza', email: 'admin@demo.fs', role: 'admin' };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return render(<PrototypeProvider><MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter></PrototypeProvider>);
};

describe('administrator workflows', () => {
  it('requires a rejection reason before completing the analysis', async () => {
    const user = userEvent.setup();
    renderAdmin('/admin/analises/provider-3');

    await user.click(screen.getByRole('button', { name: /reprovar cadastro/i }));
    await user.click(screen.getByRole('button', { name: /confirmar reprovação/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/informe o motivo/i);

    await user.type(screen.getByLabelText(/motivo da reprovação/i), 'Documento técnico vencido.');
    await user.click(screen.getByRole('button', { name: /confirmar reprovação/i }));
    expect(screen.getByText(/cadastro reprovado/i)).toBeInTheDocument();
  });

  it('approves a pending provider after confirmation', async () => {
    const user = userEvent.setup();
    renderAdmin('/admin/analises/provider-3');

    await user.click(screen.getByRole('button', { name: /aprovar cadastro/i }));
    await user.click(screen.getByRole('button', { name: /confirmar aprovação/i }));

    expect(screen.getByText(/cadastro aprovado/i)).toBeInTheDocument();
  });

  it('blocks an active provider from the management list', async () => {
    const user = userEvent.setup();
    renderAdmin('/admin/prestadores');
    const row = screen.getByRole('row', { name: /hidropronto bh/i });

    await user.click(within(row).getByRole('button', { name: /^bloquear$/i }));
    await user.click(screen.getByRole('button', { name: /confirmar bloqueio/i }));

    expect(within(row).getByText('Bloqueado')).toBeInTheDocument();
  });

  it('opens a safe demonstration preview for private documents', async () => {
    const user = userEvent.setup();
    renderAdmin('/admin/analises/provider-3');

    await user.click(screen.getByRole('button', { name: /pré-visualizar identificacao-mv.pdf/i }));

    expect(screen.getByRole('dialog', { name: /pré-visualização demonstrativa/i })).toBeInTheDocument();
  });
});
