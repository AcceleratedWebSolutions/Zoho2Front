import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { FrontContextProvider } from './providers/frontContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root instance
root.render(
  <React.StrictMode>
    <FrontContextProvider>
      <App />
    </FrontContextProvider>
  </React.StrictMode>
);

