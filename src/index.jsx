import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';

import { Provider } from 'react-redux'
import { compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';

import MainComponent from './components/MainComponent';
import TodoView from './components/views/TodoView/TodoView';
import FrontView from './components/views/FrontView/FrontView';
import InfoView from './components/views/InfoView/InfoView';

import reducer from './state-logic/combiner'

import './main.less';

const routes = (
    <Router history={ hashHistory }>
        <Route path='/' component={MainComponent}>
            <IndexRoute component={FrontView} />
            <Route path='/front' component={FrontView} />
            <Route path='/info' component={InfoView} />
            <Route path='/todo' component={TodoView} />
        </Route>
    </Router>
);

const store = compose(
    reduxReactRouter({
        createHistory
    })
)(createStore)(reducer);

ReactDOM.render(
    <Provider store={ store }>
        { routes }
    </Provider>,
    document.getElementById('app')
);
