
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

// Ensure DOM is ready and React is fully initialized
const initializeApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  // Add a small delay to ensure all modules are loaded
  setTimeout(() => {
    ReactDOM.createRoot(rootElement).render(
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
    );
  }, 50);
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
