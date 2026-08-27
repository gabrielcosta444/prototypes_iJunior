import type { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: PropsWithChildren) => <>{children}</>,
  AreaChart: ({ children }: PropsWithChildren) => <svg>{children}</svg>,
  Area: ({ name, isAnimationActive }: { name: string; isAnimationActive?: boolean }) => (
    <div data-testid={`area-${name}`} data-animation-active={String(isAnimationActive)} />
  ),
  CartesianGrid: () => null,
  Tooltip: () => null,
  XAxis: ({ tick }: { tick: { fontSize: number } }) => <div data-testid="x-axis" data-font-size={tick.fontSize} />,
  YAxis: ({ tick }: { tick: { fontSize: number } }) => <div data-testid="y-axis" data-font-size={tick.fontSize} />,
}));

import { VolumeChart } from './VolumeChart';

describe('VolumeChart', () => {
  it('renders both series without an animated clip so the full 30-day range is immediately visible', () => {
    render(<VolumeChart />);

    expect(screen.getByRole('img', { name: 'Volume de documentos nos últimos 30 dias' })).toBeInTheDocument();
    expect(screen.getByTestId('area-Recebidos')).toHaveAttribute('data-animation-active', 'false');
    expect(screen.getByTestId('area-Processados')).toHaveAttribute('data-animation-active', 'false');
    expect(Number(screen.getByTestId('x-axis').getAttribute('data-font-size'))).toBeGreaterThanOrEqual(11);
    expect(Number(screen.getByTestId('y-axis').getAttribute('data-font-size'))).toBeGreaterThanOrEqual(11);
  });
});
