import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { NewOrderPage } from './NewOrderPage';

test('confirma a emissão da ordem de serviço', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><NewOrderPage /></MemoryRouter>);
  expect(screen.getByText('1. Escopo')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /continuar/i }));
  await user.click(screen.getByRole('button', { name: /continuar/i }));
  await user.click(screen.getByRole('button', { name: /emitir ordem de serviço/i }));
  expect(await screen.findByRole('heading', { name: 'Ordem de Serviço emitida' })).toBeInTheDocument();
});
