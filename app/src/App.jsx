import Hero from './components/Hero';
import ScrollPhrase from './components/ScrollPhrase';
import Work from './components/Work';
import Contact from './components/Contact';
import GradualBlur from './components/GradualBlur';
import './App.css';

function App() {
  return (
    <>
      <Hero />

      <ScrollPhrase eyebrow="OUR METHOD">
        Here is the work that shows how we build.
      </ScrollPhrase>

      <Work />

      <ScrollPhrase eyebrow="THE TEAM">
        Two people build all of it. You talk to both.
      </ScrollPhrase>

      <Contact />

      {/* Fixed bottom blur, same configuration as the portfolio. */}
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={2.5}
        divCount={4}
        curve="bezier"
        exponential
        opacity={1}
        style={{ zIndex: 50 }}
      />
    </>
  );
}

export default App;
