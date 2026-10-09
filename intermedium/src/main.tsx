import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/App';
import { PrototypeProvider } from './app/PrototypeContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PrototypeProvider>
        <AppRoutes />
      </PrototypeProvider>
    </BrowserRouter>
  </StrictMode>,
);
