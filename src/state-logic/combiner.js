import { combineReducers } from 'redux'
import { visibilityFilter,todos } from './todo/reducers'
import { board } from './tickTackToe/reducers'

import { routerStateReducer } from 'redux-router';

const reducer = combineReducers({
    router: routerStateReducer,
    visibilityFilter,
    todos,
    board
})

export default reducer
