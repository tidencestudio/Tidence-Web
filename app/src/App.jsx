import Hero from './components/Hero';
import Work from './components/Work';
import Contact from './components/Contact';
import GradualBlur from './components/GradualBlur';
import './App.css';

function App() {
  return (
    <>
      <Hero />
      <Work />
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
