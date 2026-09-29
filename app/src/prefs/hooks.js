import { useContext } from 'react';
import { LocaleContext, ThemeContext } from './context';

export const LOCALES = [
  ['en', 'English'],
  ['es', 'Español'],
];

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside LocaleProvider');
  return value;
}

export function useT() {
  return useLocale().t;
}
