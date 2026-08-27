import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from '../../app/App';
import '../../styles/base.css';
import '../../styles/components.css';
import '../../styles/layout.css';
import '../../styles/documents.css';
import '../../styles/typography.css';

describe('document center', () => {
  it('filters documents by supplier name', async () => {
    window.history.pushState({}, '', '/app/documentos');
    render(<App />);

    await userEvent.type(screen.getByPlaceholderText(/Buscar por número/), 'Morganite');

    expect(screen.getByText('NF-e 000023781')).toBeInTheDocument();
    expect(screen.queryByText('Transportadora Atlas')).not.toBeInTheDocument();
  });

  it('keeps primary and supporting table text legible during a client presentation', () => {
    window.history.pushState({}, '', '/app/documentos');
    render(<App />);

    const documentName = screen.getAllByText('NF-e 000145829')[0];
    const supportingText = screen.getAllByText('XML validado')[0];
    const columnHeader = screen.getByRole('columnheader', { name: /Documento/i });

    expect(Number.parseFloat(getComputedStyle(documentName).fontSize)).toBeGreaterThanOrEqual(12);
    expect(Number.parseFloat(getComputedStyle(supportingText).fontSize)).toBeGreaterThanOrEqual(10);
    expect(Number.parseFloat(getComputedStyle(columnHeader).fontSize)).toBeGreaterThanOrEqual(11);
  });
});
