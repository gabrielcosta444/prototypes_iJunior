import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ClientReportsPage } from './ClientReportsPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ClientReportsPage />
    </MemoryRouter>,
  );
}

test('exibe somente o histórico disponibilizado ao cliente', () => {
  renderPage();

  expect(screen.getByRole('heading', { name: 'Histórico de relatórios' })).toBeInTheDocument();
  expect(screen.getByText('4 documentos disponíveis')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Visualizar REL-238' })).toBeInTheDocument();
  expect(screen.getAllByText('Disponível')).toHaveLength(4);
});

test('filtra os documentos por projeto', async () => {
  const user = userEvent.setup();
  renderPage();

  await user.selectOptions(screen.getByRole('combobox', { name: 'Projeto' }), 'serra-azul');

  expect(screen.getByText('REL-238')).toBeInTheDocument();
  expect(screen.queryByText('REL-232')).not.toBeInTheDocument();
  expect(screen.getByText('1 documento encontrado')).toBeInTheDocument();
});
