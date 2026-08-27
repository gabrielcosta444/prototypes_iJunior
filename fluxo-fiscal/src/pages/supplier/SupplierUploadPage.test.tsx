import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('supplier document upload', () => {
  it('shows extracted XML data and reaches the received state', async () => {
    window.history.pushState({}, '', '/fornecedor/enviar');
    render(<App />);

    expect(screen.getByText('NFe_000023781.xml')).toBeInTheDocument();
    expect(screen.getByText('R$ 6.831,90')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Enviar documento' }));

    expect(await screen.findByText('Documento recebido', {}, { timeout: 2500 })).toBeInTheDocument();
  });
});
