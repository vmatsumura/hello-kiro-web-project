// src/main.tsx
// Ponto de entrada da aplicação React.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n'; // Inicializa i18n antes da renderização
import { App } from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Elemento #root não encontrado no DOM. Verifique o index.html.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
