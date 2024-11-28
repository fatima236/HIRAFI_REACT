import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Assurez-vous que cet élément existe dans index.html
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container); // Création du root React
  root.render(<App />); // Rendu de l'application
} else {
  console.error("Le conteneur 'root' n'existe pas dans le DOM.");
}
