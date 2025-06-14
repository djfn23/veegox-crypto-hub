
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider.tsx';
import { Toaster } from "@/components/ui/sonner"

// Import pages
import Portfolio from './pages/Portfolio.tsx'
import Analytics from './pages/Analytics.tsx'
import PaymentCanceled from './pages/PaymentCanceled.tsx'

console.log('Main: Application starting...');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnifiedAuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
        </Routes>
        <Toaster />
      </UnifiedAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
