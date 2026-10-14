import { useSyncExternalStore } from 'react';

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Live result of a media query. The server snapshot is false, which is also
 * what the first client render of a hydrating page uses, so the markup
 * matches; React then re-renders with the real value.
 */
export default function useMedia(query) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', notify);
      return () => mq.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
