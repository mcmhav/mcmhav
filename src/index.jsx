import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import { createHistory } from 'history';
import { Route } from 'react-router';

import Testur from './views/testur';

import './main.less';

const routes = (
    <Route path="/" component={ App }>
        <Route path="parent" component={ Testur }></Route>
    </Route>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);


const reducer = combineReducers({
    router: routerStateReducer
});

const store = compose(
    applyMiddleware(m1, m2, m3),
    reduxReactRouter({
        routes,
        createHistory
    })
)(createStore)(reducer);
