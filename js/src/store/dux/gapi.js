import { Map } from 'immutable';

export const GAPI_SIGNIN = 'gapi/GAPI_SIGNIN';
export const GAPI_SIGNOUT = 'gapi/GAPI_SIGNOUT';

export function gapiSignedIn(isSignedIn) {
  return { type: GAPI_SIGNIN, isSignedIn };
}
export function gapiSignedOut(isSignedIn) {
  return { type: GAPI_SIGNOUT, isSignedIn };
}

const initialState = Map({
  isSignedIn: false,
});

function gapi(state = initialState, action) {
  switch (action.type) {
    case GAPI_SIGNIN:
      return state.set('isSignedIn', action.isSignedIn);
    case GAPI_SIGNOUT:
      return state.set('isSignedIn', action.isSignedIn);
    default:
      return state;
  }
}

export default gapi;
