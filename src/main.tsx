
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClientOnlyProviders } from "@/components/providers/ClientOnlyProviders";

// Import pages
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import PaymentCanceled from './pages/PaymentCanceled';

// Toaster avec lazy loading sécurisé
const LazyToaster = React.lazy(() =>
  import('@/components/ui/sonner').then(module => ({ default: module.Toaster }))
);

// Composant Toaster sécurisé qui ne charge qu'après l'hydratation
function SafeToaster() {
  const [canRender, setCanRender] = React.useState(false);

  React.useEffect(() => {
    // S'assure que l'hydratation est complète avant de charger Sonner
    const timer = setTimeout(() => {
      setCanRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!canRender) return null;

  return (
    <React.Suspense fallback={null}>
      <LazyToaster />
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
        <SafeToaster />
      </ClientOnlyProviders>
    </BrowserRouter>
  </React.StrictMode>
);
