/*global gapi b:true*/
import './gapi';

import env from '../../env';
// Client ID and API key from the Developer Console

const { CLIENT_ID,API_KEY,spreadsheetId,DISCOVERY_DOCS,SCOPES } = env;

// Array of API discovery doc URLs for APIs used by the quickstart

// Authorization scopes required by the API; multiple scopes can be
// included,separated by spaces.

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function connectElements() {
  authorizeButton = document.getElementById('authorize_button');
  signoutButton = document.getElementById('signout_button');
}
/**
 *  On load,called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  connectElements();
  return new Promise((resolve,reject) => {
    gapi.load('client:auth2',() => initClient(resolve,reject));
  });
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(resolve,reject) {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      () => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        resolve();
      },
      error => {
        // appendPre(JSON.stringify(error,null,2));
        reject(error);
      },
    );
}

/**
 *  Called when the signed in status changes,to update the UI
 *  appropriately. After a sign-in,the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function emptyContent() {
  var pre = document.getElementById('content');
  pre.innerHTML = '';
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

export {
  appendPre,
  handleSignoutClick,
  handleAuthClick,
  updateSigninStatus,
  initClient,
  handleClientLoad,
  spreadsheetId,
};
