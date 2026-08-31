import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReportPreviewPage } from './ReportPreviewPage';

test('consolida avanço, produção e evidências na prévia', () => {
  render(
    <MemoryRouter>
      <ReportPreviewPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Avanço físico' })).toBeInTheDocument();
  expect(screen.getByText('144 ha executados')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Produção diária' })).toBeInTheDocument();
  expect(screen.getByRole('table', { name: 'Produção diária consolidada' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Evidências da execução' })).toBeInTheDocument();
  expect(screen.getByText('Versão 3 · Publicada')).toBeInTheDocument();
  expect(screen.getByText('PUBLICADO POR')).toBeInTheDocument();
});
