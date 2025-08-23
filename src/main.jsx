import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';
import { initModalRoot } from './services/createModalRoot';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';

import Loader from './components/Loader/Loader';
import App from './components/App';

import 'modern-normalize';
import './styles/index.css';

initModalRoot();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
