
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'

// Import pages
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
      <ThemeProvider>
        <UnifiedAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/payment-canceled" element={<PaymentCanceled />} />
          </Routes>
          <Toaster />
        </UnifiedAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
