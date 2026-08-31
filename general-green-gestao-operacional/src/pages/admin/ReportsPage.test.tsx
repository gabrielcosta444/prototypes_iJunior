import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '../../styles/index.css';
import { ReportsPage } from './ReportsPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ReportsPage />
    </MemoryRouter>,
  );
}

test('mantém a célula de cliente no fluxo da tabela', () => {
  renderPage();

  const clientCell = screen.getByRole('cell', { name: /UFV Sol do Cerrado/ });

  expect(getComputedStyle(clientCell).display).toBe('table-cell');
});

test('mantém a tabela enxuta e apresenta a rastreabilidade da publicação', () => {
  renderPage();

  const table = screen.getByRole('table');
  const reportRow = screen.getByRole('row', { name: /REL-238/ });

  expect(within(table).getAllByRole('columnheader')).toHaveLength(6);
  expect(screen.queryByRole('columnheader', { name: 'Aprovação' })).not.toBeInTheDocument();
  expect(reportRow).toHaveTextContent('Roçagem O&M');
  expect(reportRow).toHaveTextContent('v3');
  expect(reportRow).toHaveTextContent('Publicado por Lucas Martins');
  expect(reportRow).toHaveTextContent('Disponibilizado');
});

test('resume os relatórios sem criar uma segunda etapa de aprovação', () => {
  renderPage();

  const summary = screen.getByRole('region', { name: 'Resumo dos relatórios' });

  expect(within(summary).getByText('Rascunhos')).toBeInTheDocument();
  expect(within(summary).getByText('Gerados')).toBeInTheDocument();
  expect(within(summary).getByText('Disponibilizados')).toBeInTheDocument();
  expect(within(summary).queryByText('Aprovados')).not.toBeInTheDocument();
  expect(within(summary).queryByText('Em conferência')).not.toBeInTheDocument();
});

test('permite consultar os modelos reutilizáveis', async () => {
  const user = userEvent.setup();
  renderPage();

  await user.click(screen.getByRole('button', { name: /^Modelos/ }));

  expect(screen.getByRole('heading', { name: 'Roçagem O&M' })).toBeInTheDocument();
  expect(screen.getByText('10 componentes')).toBeInTheDocument();
});

test('filtra a biblioteca por relatórios gerados ainda não publicados', async () => {
  const user = userEvent.setup();
  renderPage();

  await user.selectOptions(screen.getByRole('combobox', { name: 'Status do relatório' }), 'gerado');

  expect(screen.getByText('REL-236')).toBeInTheDocument();
  expect(screen.getByText('REL-235')).toBeInTheDocument();
  expect(screen.queryByText('REL-238')).not.toBeInTheDocument();
  expect(screen.queryByText('REL-237')).not.toBeInTheDocument();
});
