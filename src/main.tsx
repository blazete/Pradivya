import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Restore only same-origin paths passed through the GitHub Pages fallback.
const fallbackPath = new URLSearchParams(window.location.search).get('__path');
if (fallbackPath?.startsWith('/') && !fallbackPath.startsWith('//')) {
  const target = new URL(fallbackPath, window.location.origin);
  if (target.origin === window.location.origin) history.replaceState(history.state, '', target.pathname + target.search + target.hash);
}

// A reload starts the landing-page story from its hero.
if (window.location.pathname === '/' &&
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
