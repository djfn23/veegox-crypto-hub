
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider'
import { Toaster } from '@/components/ui/sonner'

// Import pages (pas App ici! On n’utilise App que comme wrapper)
import Index from './pages/Index'
import Portfolio from './pages/Portfolio'
import Analytics from './pages/Analytics'
import PaymentCanceled from './pages/PaymentCanceled'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnifiedAuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
        </Routes>
        <Toaster />
      </UnifiedAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
