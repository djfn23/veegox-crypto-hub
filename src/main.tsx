
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// S'assurer que React est disponible globalement
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
