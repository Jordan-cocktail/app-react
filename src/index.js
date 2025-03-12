import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // L'application principale
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Pas besoin de <Router> ici, cela est déjà géré dans App.js */}
  </React.StrictMode>
);

// Si tu veux mesurer les performances de ton app, tu peux passer une fonction ici
reportWebVitals();
