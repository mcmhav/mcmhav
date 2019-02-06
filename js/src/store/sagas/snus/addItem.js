import { takeEvery,put,call } from 'redux-saga/effects';

import { ADD_ITEM,dataFetch } from '../../dux/snus';

import gapi from '../../../features/Snus/gapi';

import env from '../../../env';

const { CLIENT_ID,API_KEY,spreadsheetId,DISCOVERY_DOCS,SCOPES } = env;

let retries = 0;
function* addItem(action) {
  const notes = action.data;
  const date = new Date();

  const resource = {
    values: [
      [
        `=TIME(${date.getHours()},${date.getMinutes()},${date.getSeconds()})`,
        notes,
        date.getTime(),
      ],
    ],
  };
  var params = {
    spreadsheetId: spreadsheetId,
    range: 'Sheet1!A2:B',// TODO: Update placeholder value.
    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',// TODO: Update placeholder value.
    resource,
  };

  try {
    const response = yield gapi.client.sheets.spreadsheets.values.append(params);
    console.log(response.result);
    yield put(dataFetch());
    retries = 0;
  } catch (error) {
    if (error && error.result && error.result.message) {
      console.log(error);
      console.error('error: ' + error.result.error.message);
      console.error('errorObj: ' + error.result.error);

      if (error.result.error.code === 401 && retries < 3) {
        retries += 1;
        try {
          yield gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .reloadAuthResponse();
          yield call(addItem,action);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log(error);
    }
  }
}

function* addItemSaga() {
  yield takeEvery(ADD_ITEM,addItem);
}

export default addItemSaga;
