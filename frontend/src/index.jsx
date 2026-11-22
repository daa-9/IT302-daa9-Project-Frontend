/*
    Dylan Almache
    11/22/26
    IT302 Section 001
    Phase 5 C.U.D. Node.js Data using React.js Assignment
    daa9@njit.edu
*/

import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
