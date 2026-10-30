import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Technology = lazy(() => import('./pages/Technology'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Contact = lazy(() => import('./pages/Contact'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Legal = lazy(() => import('./pages/Legal'));
const Investors = lazy(() => import('./pages/Investors'));
import ThemeProvider from './contexts/ThemeContext';

function AppLayout() {
  const isLanding = useLocation().pathname === '/';
  return (
    <>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
          {!isLanding && <Header />}
          <a className="skip-link" href="#main-content">Skip to content</a>
          <main id="main-content" className="flex-grow" tabIndex={-1}>
            <Suspense fallback={<div role="status" style={{padding:40}}>Loading…</div>}><Routes>
              <Route path="/" element={<Home />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/investors" element={<Investors />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Solutions />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div style={{padding:"120px 8%"}}><h1>Page not found</h1><a href="/">Return to Pradivya</a></div>}/></Routes></Suspense>
          </main>
          {!isLanding && <Footer />}

          {/* Global Scroll to Top Button */}
          {!isLanding && <ScrollToTop />}
        </div>
    </>
  );
}

function App() { return <ThemeProvider><Router><AppLayout/></Router></ThemeProvider>; }

export default App;
