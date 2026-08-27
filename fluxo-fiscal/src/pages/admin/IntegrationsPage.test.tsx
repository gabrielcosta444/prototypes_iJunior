import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('integrations monitoring', () => {
  it('shows feedback after synchronizing Nomus', async () => {
    window.history.pushState({}, '', '/app/integracoes');
    render(<App />);

    await userEvent.click(screen.getByRole('button', { name: 'Sincronizar Nomus ERP' }));

    expect(within(await screen.findByRole('status')).getByText('Sincronização concluída')).toBeInTheDocument();
  });
});
