import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('classification rule builder', () => {
  it('saves a visually configured classification rule', async () => {
    window.history.pushState({}, '', '/app/regras/nova');
    render(<App />);

    await userEvent.clear(screen.getByLabelText('Nome da regra'));
    await userEvent.type(screen.getByLabelText('Nome da regra'), 'Morganite — Matéria-prima');
    await userEvent.click(screen.getByRole('button', { name: 'Salvar regra' }));

    expect(await screen.findByText('Regra salva com sucesso')).toBeInTheDocument();
  });
});
