import { compose,combineReducers,createStore,applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import snus from './dux/snus';
import gapi from './dux/gapi';

import sagas from './sagas';

const reducers = combineReducers({
  snus,
  gapi,
});

const logger = createLogger({
  collapsed: true,
  stateTransformer: state => {
    const transformed = {};
    Object.keys(state).map(key => {
      transformed[key] = state[key].toJS();
    });
    return transformed;
  },
});

const sagaMiddleware = createSagaMiddleware();
// export default todoApp;

const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware,logger)),
);

sagaMiddleware.run(sagas);

export { store };
