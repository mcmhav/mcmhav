import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import snus from './dux/snus';
import gapi from './dux/gapi';

import sagas from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['router'],
};
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    snus,
    gapi,
  });

const logger = createLogger({
  collapsed: true,
  stateTransformer: state => {
    const transformed = {};
    Object.keys(state).map(key => {
      if (state[key].toJS) {
        transformed[key] = state[key].toJS();
      } else {
        transformed[key] = state[key];
      }
    });
    return transformed;
  },
});

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const configureStore = preloadedState => {
  const store = createStore(
    persistReducer(persistConfig, reducers(history)),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)),
  );

  sagaMiddleware.run(sagas);

  const persistor = persistStore(store);

  return { store, persistor };
};

export { configureStore, history };
