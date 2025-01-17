import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AdminProvider } from './context/AdminContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);