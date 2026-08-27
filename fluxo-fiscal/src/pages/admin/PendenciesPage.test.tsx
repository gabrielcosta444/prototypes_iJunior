import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('pendency resolution', () => {
  it('turns a manual classification into a reusable rule', async () => {
    window.history.pushState({}, '', '/app/pendencias');
    render(<App />);

    await userEvent.click(screen.getAllByRole('button', { name: 'Resolver' })[0]);
    await userEvent.selectOptions(screen.getByLabelText('Selecionar categoria'), 'Matéria-prima');
    await userEvent.click(screen.getByRole('button', { name: 'Classificar e continuar' }));

    expect(await screen.findByText('Documento classificado e processamento concluído')).toBeInTheDocument();
    expect(screen.getByText('Morganite — Matéria-prima')).toBeInTheDocument();
  });
});
