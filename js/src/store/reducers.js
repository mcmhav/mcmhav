import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import snus from './dux/snus';
import gapi from './dux/gapi';

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

export default reducers;
