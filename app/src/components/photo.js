/**
 * Props for an <img> backed by an Unsplash URL, at several widths.
 *
 * The URLs carry w/h/fit=crop. Rewriting both for each width keeps the crop's
 * aspect ratio, so a phone downloads a file sized for its column instead of
 * the 1200px original. `sizes` says how wide the image is laid out.
 */
export default function photo(url, widths, sizes) {
  const base = new URL(url);
  const w0 = Number(base.searchParams.get('w'));
  const h0 = Number(base.searchParams.get('h'));
  const at = (w) => {
    const v = new URL(url);
    v.searchParams.set('w', String(w));
    v.searchParams.set('h', String(Math.round((w * h0) / w0)));
    return v.toString();
  };
  return {
    src: url,
    srcSet: widths.map((w) => `${at(w)} ${w}w`).join(', '),
    sizes,
    width: w0,
    height: h0,
  };
}
