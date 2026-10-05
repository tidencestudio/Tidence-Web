import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import installTranslateGuard from './translateGuard'
import './index.css'
import App from './App.jsx'

// Before the first render: translation can be switched on at any moment.
installTranslateGuard()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
