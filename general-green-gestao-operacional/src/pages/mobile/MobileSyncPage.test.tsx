import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrototypeProvider } from '../../app/PrototypeContext';
import { MobileSyncPage } from './MobileSyncPage';

test('preserva os dados offline e sincroniza quando solicitado', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><PrototypeProvider><MobileSyncPage /></PrototypeProvider></MemoryRouter>);
  expect(screen.getByText('4 fotos aguardando sincronização')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Tentar sincronizar' }));
  expect(await screen.findByText('Sincronização concluída')).toBeInTheDocument();
});
