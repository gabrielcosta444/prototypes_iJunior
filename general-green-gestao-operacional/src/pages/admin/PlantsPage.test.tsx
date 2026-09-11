import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, expect, test } from 'vitest';
import { PlantsProvider } from '../../features/plants/PlantsContext';
import { PlantsPage } from './PlantsPage';

beforeEach(() => window.localStorage.clear());

test('cadastra uma planta PDF com escala personalizada e a inclui na listagem', async () => {
  render(
    <MemoryRouter>
      <PlantsProvider><PlantsPage /></PlantsProvider>
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /adicionar planta/i }));
  fireEvent.change(screen.getByLabelText('Nome da planta'), { target: { value: 'Setor Leste' } });
  fireEvent.change(screen.getByLabelText('UFV'), { target: { value: 'UFV Horizonte' } });
  fireEvent.change(screen.getByLabelText('Escala'), { target: { value: 'custom' } });
  fireEvent.change(screen.getByLabelText('Denominador da escala'), { target: { value: '750' } });
  fireEvent.change(screen.getByLabelText('Arquivo PDF'), {
    target: { files: [new File(['%PDF-1.4'], 'setor-leste.pdf', { type: 'application/pdf' })] },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Importar planta' }));

  await waitFor(() => expect(screen.getByRole('heading', { name: 'Setor Leste' })).toBeInTheDocument());
  expect(screen.getByText('UFV Horizonte')).toBeInTheDocument();
  expect(screen.getByText('1:750')).toBeInTheDocument();
});

test('mantém o modal aberto e informa os campos obrigatórios quando o cadastro está incompleto', () => {
  render(
    <MemoryRouter>
      <PlantsProvider><PlantsPage /></PlantsProvider>
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /adicionar planta/i }));
  fireEvent.submit(screen.getByRole('button', { name: 'Importar planta' }).closest('form')!);

  expect(screen.getByRole('alert')).toHaveTextContent('Preencha nome, UFV e selecione um PDF válido.');
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
