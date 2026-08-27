import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('document detail traceability', () => {
  it('opens the complete automated processing history', async () => {
    window.history.pushState({}, '', '/app/documentos/nfe-145829');
    render(<App />);

    await userEvent.click(screen.getByRole('tab', { name: 'Histórico' }));

    expect(screen.getByText('Processamento concluído em 7 segundos')).toBeInTheDocument();
    expect(screen.getByText('Documento enviado ao SharePoint.')).toBeInTheDocument();
  });
});
