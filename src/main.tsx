
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Main: React imported successfully:', !!React);
console.log('Main: React version:', React.version);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

console.log('Main: Creating React root');
const root = createRoot(rootElement);

console.log('Main: Rendering App component');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('Main: App rendered successfully');
