import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { DataContextProvider } from './data/context';
import { ToastContainer } from 'react-toastify';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
    <ToastContainer position="top-left" />
  </DataContextProvider>
);
