import { render, screen, within } from '@testing-library/react';
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

test('prioriza a operação de hoje logo após o resumo principal', () => {
  render(
    <MemoryRouter initialEntries={['/admin/dashboard']}>
      <PrototypeProvider><DashboardPage /></PrototypeProvider>
    </MemoryRouter>,
  );

  const productionHeading = screen.getByRole('heading', { name: 'Produção acumulada' });
  const primarySummary = productionHeading.closest('.dashboard-grid--primary');
  const nextSection = primarySummary?.nextElementSibling as HTMLElement | null;

  expect(nextSection).not.toBeNull();
  expect(within(nextSection!).getByRole('heading', { name: 'Operação de hoje' })).toBeInTheDocument();
});
