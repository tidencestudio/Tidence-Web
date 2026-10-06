import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import installTranslateGuard from './translateGuard'
import './fonts.css'
import './index.css'
import App from './App.jsx'

// Before the first render: translation can be switched on at any moment.
installTranslateGuard()

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The HTML is prerendered in English. A reader whose language is Spanish
// (resolved by the inline script in index.html before this runs) would
// mismatch it, so they get a fresh client render instead of a hydration.
if (root.hasChildNodes() && document.documentElement.lang === 'en') {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  root.dataset.client = ''
  createRoot(root).render(app)
}
