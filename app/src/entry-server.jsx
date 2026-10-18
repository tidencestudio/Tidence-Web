import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used by scripts/prerender.mjs at build time only. `path` picks the page.
export function render(path) {
  globalThis.__PRERENDER_PATH__ = path
  return renderToString(<App />)
}
export { default as en } from './prefs/en.js'
export { default as es } from './prefs/es.js'
