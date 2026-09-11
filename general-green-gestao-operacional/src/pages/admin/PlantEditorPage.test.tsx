import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, expect, test, vi } from 'vitest';
import { PlantsProvider } from '../../features/plants/PlantsContext';
import { PlantEditorPage } from './PlantEditorPage';

vi.mock('../../features/plants/PlantCanvas', () => ({
  PlantCanvas: () => <div aria-label="Área de desenho da planta" />,
}));

function renderEditor() {
  return render(
    <MemoryRouter initialEntries={['/admin/plants/plant-sol-do-cerrado']}>
      <PlantsProvider>
        <Routes><Route path="/admin/plants/:id" element={<PlantEditorPage />} /></Routes>
      </PlantsProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => window.localStorage.clear());

test('mostra ferramentas de pintura e o resumo calculado por status', () => {
  renderEditor();

  expect(screen.getByRole('heading', { name: 'Planta geral — Setor Norte' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Pincel' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Borracha' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Calibrar/ })).toBeInTheDocument();
  const summary = screen.getByText('Resumo da execução').closest('section')!;
  expect(within(summary).getByText('Concluído')).toBeInTheDocument();
  expect(within(summary).getByText('Em execução')).toBeInTheDocument();
  expect(within(summary).getByText(/m²/)).toBeInTheDocument();
});

test('desfaz, refaz e salva mudanças nas marcações', () => {
  renderEditor();
  const undo = screen.getByRole('button', { name: 'Desfazer' });
  const redo = screen.getByRole('button', { name: 'Refazer' });

  expect(undo).toBeEnabled();
  expect(redo).toBeDisabled();
  fireEvent.click(undo);
  expect(redo).toBeEnabled();
  fireEvent.click(redo);
  expect(redo).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }));
  expect(screen.getByText('Alterações salvas')).toBeInTheDocument();
});

test('permite relacionar a sessão ativa a uma OS e atividade', () => {
  renderEditor();

  const order = screen.getByLabelText('OS relacionada');
  const activity = screen.getByLabelText('Atividade relacionada');
  fireEvent.change(order, { target: { value: 'OS-2026-0999' } });
  fireEvent.change(activity, { target: { value: 'Lavagem de módulos' } });

  expect(order).toHaveValue('OS-2026-0999');
  expect(activity).toHaveValue('Lavagem de módulos');
  fireEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }));
  expect(screen.getByText('Alterações salvas')).toBeInTheDocument();
});
