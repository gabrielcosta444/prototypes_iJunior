import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { PlantsProvider, usePlants } from './PlantsContext';

function TestConsumer() {
  const { plants, addPlant } = usePlants();
  return (
    <div>
      <output>{plants.map((plant) => plant.name).join(',')}</output>
      <button type="button" onClick={() => addPlant({
        name: 'Planta importada',
        ufv: 'UFV Horizonte',
        project: 'Projeto Horizonte',
        scale: 1000,
        expectedAreaHa: 20,
        pdfName: 'horizonte.pdf',
        pdfData: 'data:application/pdf;base64,JVBERi0xLjQ=',
      })}>Adicionar</button>
    </div>
  );
}

beforeEach(() => window.localStorage.clear());
afterEach(() => window.localStorage.clear());

test('persiste uma planta adicionada e a reidrata em uma nova montagem', () => {
  const firstRender = render(<PlantsProvider><TestConsumer /></PlantsProvider>);

  fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));
  expect(screen.getByText(/Planta importada/)).toBeInTheDocument();
  firstRender.unmount();

  render(<PlantsProvider><TestConsumer /></PlantsProvider>);
  expect(screen.getByText(/Planta importada/)).toBeInTheDocument();
});
