import { combineReducers } from 'redux'
import { visibilityFilter, todos } from './todo/reducers'

import { routerStateReducer } from 'redux-router';

const reducer = combineReducers({
    router: routerStateReducer,
    visibilityFilter,
    todos
})

export default reducer
