import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import snus from './dux/snus';
import gapi from './dux/gapi';

import sagas from './sagas';

import { Map, List, OrderedMap } from 'immutable';

const SnusTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    return inboundState.toJS();
  },
  // transform state being rehydrated
  ({ supaStruct, tables, notesCounts, rows, ...rest }, key) => {
    // convert mySet back to a Set.
    return Map({
      supaStruct: OrderedMap(supaStruct),
      tables: List(tables),
      notesCounts: List(notesCounts),
      rows: OrderedMap(rows),
      ...rest,
    });
  },
  // define which reducers this transform gets called for.
  { whitelist: ['snus'] },
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['router', 'snus'],
  transforms: [SnusTransform],
};
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const reducers = history => {
  const appReducer = combineReducers({
    router: connectRouter(history),
    snus,
    gapi,
  });

  const initialState = appReducer({}, {});

  const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
      state = initialState;
    }

    return appReducer(state, action);
  };

  return rootReducer;
};

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
