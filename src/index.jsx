import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import createLogger from 'redux-logger';

import routes from './routes';

import reducer from './state-logic/combiner';

import './main.less';

const logger = createLogger();
const store = createStore(
  reducer,
  compose(
    reduxReactRouter({
      routes,
      createHistory,
    }),
    applyMiddleware(logger),
  ),
);

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById('app'),
);
