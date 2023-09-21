import React from 'react';
import ReactDOM from 'react-dom/client';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchCamerasAction } from './store/api-actions';

store.dispatch(fetchCamerasAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
