import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReduxHistoryContext } from 'redux-first-history';

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
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const reducers = () => {
  const appReducer = combineReducers({
    router: routerReducer,
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

const configureStore = preloadedState => {
  const store = createStore(
    persistReducer(persistConfig, reducers()),
    preloadedState,
    compose(applyMiddleware(routerMiddleware, sagaMiddleware, logger)),
  );

  sagaMiddleware.run(sagas);

  const persistor = persistStore(store);
  const history = createReduxHistory(store);

  return { store, persistor, history };
};

export { configureStore };
