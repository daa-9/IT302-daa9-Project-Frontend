/*
    Dylan Almache
    11/1/26
    IT302 Section 001
    Phase 4 Read Node.js Data Using React.js Assignment
    daa9@njit.edu
*/

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
