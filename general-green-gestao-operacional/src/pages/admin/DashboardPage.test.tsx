import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { PrototypeProvider } from '../../app/PrototypeContext';
import { DashboardPage } from './DashboardPage';

function CurrentPath() {
  return <output>{useLocation().pathname}</output>;
}

test('leva o gestor do dashboard para a criação de uma ordem', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/admin/dashboard']}>
      <PrototypeProvider><DashboardPage /><CurrentPath /></PrototypeProvider>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Visão Geral' })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: /nova ordem de serviço/i }));
  expect(screen.getByText('/admin/orders/new')).toBeInTheDocument();
});
