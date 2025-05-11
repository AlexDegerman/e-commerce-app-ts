import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ProductProvider } from './providers/ProductProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductProvider>
        <Router basename="/e-commerce-app-ts">
          <App />
        </Router>
    </ProductProvider>
  </StrictMode>,
)
