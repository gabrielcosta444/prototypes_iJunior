import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../../app/App';
import { PrototypeProvider } from '../../app/PrototypeContext';
import { STORAGE_KEY } from '../../app/state';
import { createSeedState } from '../../data/seed';

const renderManager = () => {
  const state = createSeedState();
  state.currentUser = { id: 'manager-1', name: 'Beatriz Almeida', email: 'sindico@demo.fs', role: 'manager', entityId: 'condo-1' };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return render(<PrototypeProvider><MemoryRouter initialEntries={['/sindico/prestadores']}><AppRoutes /></MemoryRouter></PrototypeProvider>);
};

describe('manager provider search', () => {
  it('renders only providers that satisfy every eligibility rule', () => {
    renderManager();

    expect(screen.getByText('HidroPronto BH')).toBeInTheDocument();
    expect(screen.getByText('Eleva Elétrica Predial')).toBeInTheDocument();
    expect(screen.getByText('Ar & Conforto')).toBeInTheDocument();
    expect(screen.queryByText('Cores da Serra Pinturas')).not.toBeInTheDocument();
    expect(screen.queryByText('Segura Instalações')).not.toBeInTheDocument();
  });

  it('combines text, category, region and urgency filters and supports clearing', async () => {
    const user = userEvent.setup();
    renderManager();

    await user.type(screen.getByLabelText(/buscar por nome/i), 'hidro');
    await user.selectOptions(screen.getByLabelText(/^categoria$/i), 'hydraulics');
    await user.selectOptions(screen.getByLabelText(/bairro ou região/i), 'Savassi');
    await user.click(screen.getByLabelText(/somente urgências/i));

    expect(screen.getByText('HidroPronto BH')).toBeInTheDocument();
    expect(screen.queryByText('Eleva Elétrica Predial')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /limpar filtros/i }));
    expect(screen.getByText('Eleva Elétrica Predial')).toBeInTheDocument();
  });
});
