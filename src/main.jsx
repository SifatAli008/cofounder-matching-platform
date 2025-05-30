<<<<<<< HEAD
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
>>>>>>> 99d1fff66b3988759386b131aeff98cf5b5ed013
