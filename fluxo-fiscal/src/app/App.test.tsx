import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('application navigation', () => {
  it('logs in and navigates to the administrative dashboard', async () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Fluxo Fiscal' })).toBeInTheDocument();

    const email = screen.getByLabelText('E-mail');
    const password = screen.getByLabelText('Senha');
    await userEvent.clear(email);
    await userEvent.type(email, 'gabriel@allebras.com.br');
    await userEvent.clear(password);
    await userEvent.type(password, 'allebras');
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByRole('heading', { name: 'Visão Geral' }, { timeout: 2000 })).toBeInTheDocument();
  });

  it('keeps sidebar links named when their visible labels are hidden on compact screens', () => {
    window.history.pushState({}, '', '/app/dashboard');
    render(<App />);

    expect(screen.getByRole('link', { name: 'Documentos' })).toHaveAttribute('aria-label', 'Documentos');
  });
});
