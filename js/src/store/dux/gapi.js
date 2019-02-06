import { Map,List } from 'immutable';

export const GAPI_SIGNIN = 'gapi/GAPI_SIGNIN';

export function gapiSignedIn(isSignedIn) {
  return { type: GAPI_SIGNIN,isSignedIn };
}

const initialState = Map({
  isSignedIn: false,
});

function gapi(state = initialState,action) {
  switch (action.type) {
    case GAPI_SIGNIN:
      return state.set('isSignedIn',action.isSignedIn);
    default:
      return state;
  }
}

export default gapi;
