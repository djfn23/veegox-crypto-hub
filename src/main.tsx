
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index.tsx';
import Trading from './pages/Trading.tsx';
import Governance from './pages/Governance.tsx';
import Settings from './pages/Settings.tsx';
import { UnifiedAuthProvider } from './components/auth/UnifiedAuthProvider.tsx';
import { Toaster } from "@/components/ui/sonner"
import Notifications from './pages/Notifications.tsx';
import APITest from "@/pages/APITest";
import PaymentSuccess from "@/pages/PaymentSuccess";
import CryptoBank from './pages/CryptoBank.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UnifiedAuthProvider><App /></UnifiedAuthProvider>,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/trading",
        element: <Trading />,
      },
      {
        path: "/crypto-bank",
        element: <CryptoBank />,
      },
      {
        path: "/governance",
        element: <Governance />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/api-test",
        element: <APITest />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
