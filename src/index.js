import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  HashRouter } from 'react-router-dom';
import { ScrollNavigationProvider } from './context/ScrollNavigationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <ScrollNavigationProvider>
        <App />
      </ScrollNavigationProvider>
    </HashRouter>
  </React.StrictMode>
);


reportWebVitals();
