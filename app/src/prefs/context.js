import { createContext } from 'react';

// The contexts live apart from the providers on purpose.
//
// A file that exports both a component and something else cannot be handled by
// React Fast Refresh, so Vite invalidates the whole module on edit. That hands
// out a second Context identity while the mounted provider still holds the
// first, and every consumer throws "must be used inside …" until a hard reload.
// Keeping these here means the identity survives any refresh of the providers.
export const ThemeContext = createContext(null);
export const LocaleContext = createContext(null);
