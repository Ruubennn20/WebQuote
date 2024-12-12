import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WebQuote from './Components/webquote/WebQuote'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebQuote/>
  </StrictMode>,
)
