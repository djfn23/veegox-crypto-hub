
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClientOnlyProviders } from "@/components/providers/ClientOnlyProviders";

// Import pages
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import PaymentCanceled from './pages/PaymentCanceled';

// Client-only Toaster using React.lazy and Suspense
const SonnerToaster = React.lazy(() =>
  import('@/components/ui/sonner').then(module => ({ default: module.Toaster }))
);

function ClientOnlyToaster() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <React.Suspense fallback={null}>
      <SonnerToaster />
    </React.Suspense>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientOnlyProviders>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
        </Routes>
        <ClientOnlyToaster />
      </ClientOnlyProviders>
    </BrowserRouter>
  </React.StrictMode>
);
