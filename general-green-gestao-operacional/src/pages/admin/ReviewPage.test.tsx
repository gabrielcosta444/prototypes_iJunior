import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PrototypeProvider } from '../../app/PrototypeContext';
import { ReviewPage } from './ReviewPage';

test('permite aprovar uma atividade revisada', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><PrototypeProvider><ReviewPage /></PrototypeProvider></MemoryRouter>);
  await user.click(screen.getByRole('button', { name: /aprovar atividade/i }));
  expect(await screen.findByRole('heading', { name: 'Atividade aprovada' })).toBeInTheDocument();
});
