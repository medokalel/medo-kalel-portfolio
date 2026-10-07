import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import '@fortawesome/fontawesome-free/css/all.min.css'
// TEMPORARY (Task 9): Bootstrap grid classes still used by the old sections. Must load AFTER the
// components so it overrides their CSS Modules exactly like the real Bootstrap file did.
import './styles/legacy-bootstrap.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)