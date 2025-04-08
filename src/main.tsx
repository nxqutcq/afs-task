import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import { App } from './App';
import { configure } from 'mobx';
import { BrowserRouter } from 'react-router-dom';

configure({
  enforceActions: 'never',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
