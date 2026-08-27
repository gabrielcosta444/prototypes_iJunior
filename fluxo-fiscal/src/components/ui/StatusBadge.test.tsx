import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('applies the success semantic to a completed document', () => {
    render(<StatusBadge status="Concluído" />);

    expect(screen.getByText('Concluído')).toHaveClass('status-badge--success');
  });
});
