import React from 'react';
import ReactDOMClient from "react-dom/client";
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);


reportWebVitals();
