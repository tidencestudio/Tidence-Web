import { useContext } from 'react';
import { LocaleContext } from './context';

export const LOCALES = [
  ['en', 'English'],
  ['es', 'Español'],
];

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error('useLocale must be used inside LocaleProvider');
  return value;
}

export function useT() {
  return useLocale().t;
}
