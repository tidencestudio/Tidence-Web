import Nav from './components/Nav';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Journey from './components/Journey';
import Approach from './components/Approach';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Backdrop from './components/Backdrop';
import ScrollProgress from './components/ScrollProgress';
import useHashLanding from './components/useHashLanding';
import LegalPage from './components/LegalPage';
import { LocaleProvider } from './prefs/locale';
import { useT } from './prefs/hooks';
import './App.css';

function Site() {
  const t = useT();

  // A shared /#journey link has to land on that section, not the top.
  useHashLanding();

  return (
    <>
      <a className="skip" href="#main">
        {t('meta.skip')}
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Manifesto />
        <Marquee />
        <Services />
        <Journey />
        <Approach />
        <Journal />
        <Contact />
      </main>

      <Footer />

      {/* The drifting light sits behind everything; the grain sits on top.
          Both are fixed and inert, never on a scrolling container: a layer
          that repaints with the page destroys frame budget on mobile. */}
      <Backdrop />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

// Two static pages beside the home page do not justify a router. The path is
// read once; links between pages are ordinary navigations. vercel.json
// rewrites these paths to index.html, and Vite's dev server already does.
const LEGAL = { '/privacy': 'privacy', '/terms': 'terms' };

export default function App() {
  const path = typeof window === 'undefined' ? globalThis.__PRERENDER_PATH__ : window.location.pathname;
  const doc = LEGAL[(path ?? '/').replace(/\/+$/, '') || '/'];

  return (
    <LocaleProvider titlePath={doc ? `legal.${doc}.metaTitle` : undefined}>
      {doc ? <LegalPage doc={doc} /> : <Site />}
    </LocaleProvider>
  );
}
