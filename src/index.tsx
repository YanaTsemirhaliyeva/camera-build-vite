import React from 'react';
import ReactDOM from 'react-dom/client';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <App />
    </HistoryRouter>
  </React.StrictMode>
);
