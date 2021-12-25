import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import registerServiceWorker from './registerServiceWorker';

import { configureStore } from './store';

import App from './App';
import './index.css';

const { store, persistor, history } = configureStore();
render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
