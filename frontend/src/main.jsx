import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {PrivyProvider} from "@privy-io/react-auth"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider>
      <App />
    </PrivyProvider>
    
  </StrictMode>,
)
