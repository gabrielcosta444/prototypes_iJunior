import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ReportBuilderPage } from './ReportBuilderPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ReportBuilderPage />
    </MemoryRouter>,
  );
}

test('guia a geração da origem até a distribuição', async () => {
  const user = userEvent.setup();
  renderPage();

  expect(screen.getByRole('heading', { name: 'Origem dos dados' })).toBeInTheDocument();
  expect(screen.getByText('12 atividades aprovadas')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Próximo' }));
  expect(screen.getByRole('heading', { name: 'Escolha do modelo' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Próximo' }));
  expect(screen.getByRole('heading', { name: 'Personalização do conteúdo' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Próximo' }));
  expect(screen.getByRole('heading', { name: 'Conferência dos dados' })).toBeInTheDocument();
  expect(screen.getByText('Nenhuma inconsistência encontrada')).toBeInTheDocument();
  expect(screen.getByText('Responsável pela geração')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Próximo' }));
  expect(screen.getByRole('heading', { name: 'Distribuição' })).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'Disponibilizar no portal do cliente' })).toBeChecked();
  expect(screen.getByText(/versão final e preservada/i)).toBeInTheDocument();
});

test('permite ocultar componentes disponibilizados pelo modelo', async () => {
  const user = userEvent.setup();
  renderPage();

  await user.click(screen.getByRole('button', { name: 'Próximo' }));
  await user.click(screen.getByRole('button', { name: 'Próximo' }));
  await user.click(screen.getByRole('checkbox', { name: 'Condições climáticas' }));

  expect(screen.getByText('9 de 10 componentes')).toBeInTheDocument();
});
