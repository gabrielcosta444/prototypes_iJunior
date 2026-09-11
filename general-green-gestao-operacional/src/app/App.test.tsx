import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

test.each([
  ['/login', 'Acessar sua conta'],
  ['/admin/dashboard', 'Visão Geral'],
  ['/admin/orders', 'Ordens de Serviço'],
  ['/admin/plants', 'Plantas e Mapas'],
  ['/mobile', 'Bom dia, Carlos'],
  ['/client/dashboard', 'Visão Geral'],
])('renderiza a experiência correta em %s', async (path, heading) => {
  renderAt(path);
  expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
});
