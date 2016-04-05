import React from 'react';

import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router';

import MainComponent from './components/MainComponent';
import TodoView from './components/views/TodoView/TodoView';
import FrontView from './components/views/FrontView/FrontView';
import InfoView from './components/views/InfoView/InfoView';
import TickTackToeView from './components/views/TickTackToeView/TickTackToeView';

const routes = (
    <Router history={ hashHistory }>
        <Route path='/' component={MainComponent}>
            <IndexRoute component={FrontView} />
            <Route path='/front' component={FrontView} />
            <Route path='/info' component={InfoView} />
            <Route path='/todo' component={TodoView} />
            <Route path='/tick-tack-toe' component={TickTackToeView } />
        </Route>
    </Router>
);

export default routes;
