
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

// Ensure React is properly initialized
if (typeof React === 'undefined' || !React.createElement) {
  console.error('React is not properly loaded');
  throw new Error('React initialization failed');
}

const initializeApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }

  // Ensure React and ReactDOM are ready
  if (!React || !ReactDOM || !ReactDOM.createRoot) {
    console.error('React or ReactDOM not properly initialized');
    setTimeout(initializeApp, 100);
    return;
  }

  try {
    // Add a small delay before rendering to ensure everything is stable
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
    }, 100);
  } catch (error) {
    console.error('Failed to render React app:', error);
    // Show error message instead of blank screen
    rootElement.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1e293b, #7c3aed, #3b82f6); color: white; font-family: system-ui;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">Erreur de chargement</h1>
          <p style="margin-bottom: 16px;">L'application n'a pas pu se charger correctement.</p>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer;">
            Recharger la page
          </button>
        </div>
      </div>
    `;
  }
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // Add a delay to ensure all modules are loaded
  setTimeout(initializeApp, 100);
}
