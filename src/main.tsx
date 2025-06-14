
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider.tsx';
import { Toaster } from "@/components/ui/sonner"

console.log('Main: Application starting...');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UnifiedAuthProvider>
      <App />
      <Toaster />
    </UnifiedAuthProvider>
  </React.StrictMode>,
)
