import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// A reload starts the landing-page story from its hero.
if (window.location.pathname === import.meta.env.BASE_URL &&
    (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type === 'reload') {
  history.scrollRestoration = 'manual';
  history.replaceState(history.state, '', window.location.pathname + window.location.search);
  window.scrollTo({top: 0, left: 0, behavior: 'instant'});
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
