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

// Every URL is prerendered in its own language (/en, /es and their legal
// pages), so the HTML always matches the first render and can be hydrated.
// Only a page served without prerendered markup (the dev server) is rendered
// fresh.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}

// The editorial face sets only the journal ("Who we are"). Fetch it when the
// reader is about a screen and a half away from it (or when the browser is
// idle, if the section cannot be observed), so most visits never pay for it.
const loadEditorial = () => import('./fonts-editorial.css')
const journal = document.getElementById('about')
if (journal && 'IntersectionObserver' in window) {
  const watcher = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      watcher.disconnect()
      loadEditorial()
    },
    { rootMargin: '1500px 0px' },
  )
  watcher.observe(journal)
} else {
  window.addEventListener('load', () => setTimeout(loadEditorial, 1500), { once: true })
}
