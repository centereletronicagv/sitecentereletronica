
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { detectDevTools } from './utils/googleVerification.ts';

// Inicializar a detecção de DevTools
detectDevTools();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </CartProvider>
  </React.StrictMode>
);
