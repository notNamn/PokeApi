import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import './css/app.css';

// Seleccionamos el elemento root del DOM
const rootElement = document.getElementById('root');

// Creamos el root con createRoot
const root = ReactDOM.createRoot(rootElement);

// Renderizamos la app dentro de este root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
