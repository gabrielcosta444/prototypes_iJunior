import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';

describe('administrative dashboard', () => {
  it('places operational status directly after the volume charts', () => {
    window.history.pushState({}, '', '/app/dashboard');
    render(<App />);

    expect(within(screen.getByRole('article', { name: 'Documentos recebidos' })).getByText('1.284')).toBeInTheDocument();
    expect(within(screen.getByRole('article', { name: 'Processados' })).getByText('1.167')).toBeInTheDocument();

    const charts = screen.getByRole('heading', { name: 'Volume de documentos' }).closest('.dashboard-primary-grid');
    const nextSection = charts?.nextElementSibling as HTMLElement | null;

    expect(nextSection).not.toBeNull();
    expect(within(nextSection!).getByRole('heading', { name: 'Status de processamento' })).toBeInTheDocument();
  });
});
