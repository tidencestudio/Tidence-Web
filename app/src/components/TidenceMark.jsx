import { useId } from 'react';

/**
 * The Tidence mark: an anchor drawn as a T. A foam-to-mint bar over a
 * sea-green stem, with a dark fold where the stem meets the bar.
 *
 * Geometry is traced from the 7a "Transformative Teal" brand sheet and
 * symmetrised about x = 187. Stop colours live in CSS (see .mark in App.css):
 * a presentation attribute is not a CSS declaration, so var() never resolves
 * there.
 */
export default function TidenceMark({ size = 28, className = '' }) {
  // useId returns characters that are awkward inside url(#...), so strip them.
  const id = `tm${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      className={`mark ${className}`}
      width={(size * 374) / 384}
      height={size}
      viewBox="0 0 374 384"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="1" y2="0.4">
          <stop className="mark-bar-0" offset="0%" />
          <stop className="mark-bar-1" offset="100%" />
        </linearGradient>
        <linearGradient id={`${id}-stem`} gradientUnits="userSpaceOnUse" x1="140" y1="62" x2="234" y2="384">
          <stop className="mark-stem-0" offset="0%" />
          <stop className="mark-stem-1" offset="100%" />
        </linearGradient>
      </defs>

      <g>
        <rect width="374" height="62" fill={`url(#${id}-bar)`} />
        <path
          d="M156 62H218V343H245L297 293L322 207H364L336 321L269 384H105L38 321L10 207H52L77 293L129 343H156Z"
          fill={`url(#${id}-stem)`}
        />
        <path className="mark-fold" d="M156 62H218V124Z" />
      </g>
    </svg>
  );
}
