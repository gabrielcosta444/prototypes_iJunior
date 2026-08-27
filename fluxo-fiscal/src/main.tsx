import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/documents.css';
import './styles/pendencies.css';
import './styles/rules.css';
import './styles/integrations.css';
import './styles/secondary-pages.css';
import './styles/supplier.css';
import './styles/typography.css';
import './styles/responsive.css';
import './styles/powerapps.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
