import Nav from './components/Nav';
import ScrollExpandHero from './components/ScrollExpandHero';
import Manifesto from './components/Manifesto';
import Capabilities from './components/Capabilities';
import Work from './components/Work';
import Approach from './components/Approach';
import Studio from './components/Studio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useHashLanding from './components/useHashLanding';
import { ThemeProvider } from './prefs/theme';
import { LocaleProvider } from './prefs/locale';
import { useT } from './prefs/hooks';
import './App.css';

function Site() {
  const t = useT();

  // A shared /#work link has to land on the work section, not the top.
  useHashLanding();

  return (
    <>
      <a className="skip" href="#main">
        {t('meta.skip')}
      </a>

      <Nav />

      <main id="main">
        <ScrollExpandHero />
        <Manifesto />
        <Capabilities />
        <Work />
        <Approach />
        <Studio />
        <Contact />
      </main>

      <Footer />

      {/* Both fixed, inert and never on a scrolling container: a texture that
          repaints with the page destroys frame budget on mobile. */}
      <div className="texture" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Site />
      </LocaleProvider>
    </ThemeProvider>
  );
}
