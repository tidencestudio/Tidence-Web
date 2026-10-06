import Nav from './components/Nav';
import ScrollExpandHero from './components/ScrollExpandHero';
import Manifesto from './components/Manifesto';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Journey from './components/Journey';
import Approach from './components/Approach';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SonarGrid from './components/SonarGrid';
import ScrollProgress from './components/ScrollProgress';
import useHashLanding from './components/useHashLanding';
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
        <ScrollExpandHero />
        <Manifesto />
        <Marquee />
        <Services />
        <Journey />
        <Approach />
        <Journal />
        <Contact />
      </main>

      <Footer />

      {/* The sonar field sits behind everything; the grain sits on top. Both
          are fixed and inert, never on a scrolling container: a layer that
          repaints with the page destroys frame budget on mobile. */}
      <SonarGrid />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <Site />
    </LocaleProvider>
  );
}
