import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import registerServiceWorker from './registerServiceWorker';

import { configureStore, history } from './store';

import App from './App';
import './index.css';

const { store, persistor } = configureStore();
render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
