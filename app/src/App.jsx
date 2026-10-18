import Nav from './components/Nav';
import Hero from './components/Hero';
import StartSection from './components/StartSection';
import Services from './components/Services';
import Journey from './components/Journey';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Backdrop from './components/Backdrop';
import ScrollProgress from './components/ScrollProgress';
import useHashLanding from './components/useHashLanding';
import useAnchorScroll from './components/useAnchorScroll';
import LegalPage from './components/LegalPage';
import { LocaleProvider } from './prefs/locale';
import { useT } from './prefs/hooks';
import './App.css';

function Site() {
  const t = useT();

  // A shared /#process link has to land on that section, not the top.
  useHashLanding();

  return (
    <>
      <a className="skip" href="#main">
        {t('meta.skip')}
      </a>

      <Nav />

      <main id="main">
        {/* The hero is a screen over the start section; a hole opens in it on
            scroll. One wrapper so both can stay pinned together (Hero.jsx). */}
        <div className="opening">
          <Hero />
          <StartSection />
          {/* Room for the hero's scroll; sized by Hero.jsx. */}
          <div className="opening-spacer" aria-hidden="true" />
        </div>
        <Services />
        <Journey />
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

  // Section links scroll without ever writing `#section` into the URL.
  useAnchorScroll();

  return (
    <LocaleProvider titlePath={doc ? `legal.${doc}.metaTitle` : undefined}>
      {doc ? <LegalPage doc={doc} /> : <Site />}
    </LocaleProvider>
  );
}
