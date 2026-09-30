import { useCallback, useEffect, useState } from 'react';
import { ThemeContext } from './context';

const KEY = 'tidence-theme';

const read = () => {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') return { theme: stored, explicit: true };
  } catch {
    // Private mode denies localStorage; fall through to the system value.
  }
  const light = window.matchMedia('(prefers-color-scheme: light)').matches;
  return { theme: light ? 'light' : 'dark', explicit: false };
};

export function ThemeProvider({ children }) {
  // The boot script already wrote data-theme before paint, so this only has to
  // agree with it rather than decide it.
  const [state, setState] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', state.theme === 'light' ? '#F2F6F5' : '#122229');
  }, [state.theme]);

  // Until someone picks a theme themselves, keep following the system.
  useEffect(() => {
    if (state.explicit) return;
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const sync = (event) => setState({ theme: event.matches ? 'light' : 'dark', explicit: false });
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [state.explicit]);

  const setTheme = useCallback((theme) => {
    setState({ theme, explicit: true });
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // Not being able to remember the choice is survivable; applying it is not.
    }
  }, []);

  const toggle = useCallback(
    () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'),
    [setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme: state.theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
