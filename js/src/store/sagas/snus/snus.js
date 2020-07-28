import { OrderedMap } from 'immutable';
import { select, takeEvery, take, call, put } from 'redux-saga/effects';

import { dataSuccess, dataError, FETCH_DATA_REQUEST } from '../../dux/snus';
import { gapiSignedIn, GAPI_SIGNIN } from '../../dux/gapi';

import gapi, { loadGapiScript } from '../../../features/Snus/gapi';
import env from '../../../env';
import dateFns from 'date-fns';

const { CLIENT_ID, API_KEY, spreadsheetId, DISCOVERY_DOCS, SCOPES } = env;

const timeToColor = time => {
  const from = 10;
  const to = 157;
  const diff = to - from;

  const date = new Date(parseInt(time, 10));

  const hours = date.getHours();

  const color = to - (hours / 23) * diff;

  return `rgb(255,${parseInt(color, 10)},${parseInt(color, 10)})`;
};

function* updateSigninStatus(isSignedIn) {
  yield put(gapiSignedIn(isSignedIn));
}

function initClient(resolve, reject) {
  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      () => {
        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        // authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
        resolve();
      },
      error => {
        // appendPre(JSON.stringify(error,null,2));
        reject(error);
      },
    );
}

function* initGAPIClient() {
  const response = yield window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });

  // window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  // Handle the initial sign-in state.
  yield call(
    updateSigninStatus,
    window.gapi.auth2.getAuthInstance().isSignedIn.get(),
  );
}

function loadGAPIClient() {
  return new Promise(resolve => {
    window.gapi.load('client:auth2', () => {
      // TODO: should do a calback check for resolve/reject
      resolve();
    });
  });
}

function* waitForClient() {
  try {
    yield call(loadGapiScript);
    yield call(loadGAPIClient);
    yield call(initGAPIClient);

    // yield call(handleClientLoad);
  } catch (error) {
    console.log(error);
  }
}

const parseRange = range => {
  // TODO: fix,hella brittle
  const split = range.split(':');
  const endRange = split[1].replace('C', '');
  return `Sheet1!A${endRange}:C`;
};

const makeSupaDataStructure = values => {
  let tables = OrderedMap({});
  values.forEach(row => {
    var date = dateFns.format(parseInt(row[2], 10), 'YYYY-MM-DD');

    // if (!tables[date]) {
    //   tables[date] = {
    //     colName: date,
    //     rows: {},
    //   };
    // }
    tables = tables.setIn([date, 'rows', row[2]], {
      id: row[2],
      time: row[0],
      notes: row[1],
      color: timeToColor(row[2]),
    });
    // tables[date].rows[row[2]] = {
    //   id: row[2],
    //   time: row[0],
    //   notes: row[1],
    //   color: timeToColor(row[2]),
    // };
  });

  // return tables;
  return tables.reverse();
};

const counter2 = rows => {
  const counts = {};
  const sorted = [];

  const now = Date.now();

  rows.forEach(row => {
    const num = row[1];
    const timeSince = (now - parseInt(row[2], 10)) / (1000 * 60 * 60 * 24);

    const weight = Math.pow(Math.E, -timeSince / 10);

    counts[num] = counts[num] ? counts[num] + weight : weight;
  });

  for (var count in counts) {
    sorted.push([count, counts[count]]);
  }
  sorted.sort(function(a, b) {
    return b[1] - a[1];
  });

  const countsInfo = {
    counts,
    sorted,
  };
  countsInfo.sortedKeys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  return countsInfo;
};
function createColsArray2(cols) {
  const cols_arr = [];
  Object.keys(cols)
    .sort()
    .reverse()
    .forEach(key => {
      cols_arr.push({
        colName: key,
        rows: cols[key],
      });
    });

  return cols_arr;
}
function createCols2(values) {
  const cols = {};
  const timestamps = Object.keys(values.map(row => parseInt(row[2], 10)).toJS());
  const minTs = Math.min(...timestamps);
  const maxTs = Date.now();

  const dateRange = dateFns.eachDay(minTs, maxTs);
  dateRange.forEach(date => {
    cols[dateFns.format(date, 'YYYY-MM-DD')] = [];
  });

  values.forEach(row => {
    const date = dateFns.format(parseInt(row[2], 10), 'YYYY-MM-DD');

    if (!cols[date]) {
      cols[date] = [];
    }
    cols[date].push({
      id: row[2],
      time: row[0],
      notes: row[1],
      color: timeToColor(row[2]),
    });
    // cols[date].push(row);
  });

  return cols;
}
function createStructs2(rows) {
  const cols = createCols2(rows);
  const cols_arr = createColsArray2(cols);
  const counts = counter2(rows);
  const supaStruct = makeSupaDataStructure(rows);

  // console.log(rows);
  // console.log(cols);
  // console.log(cols_arr);

  return {
    cols,
    cols_arr,
    counts,
    supaStruct,
  };
}

function mergeRows(values, rows) {
  const newRows = {};
  values.forEach(value => {
    newRows[value[2]] = value;
  });

  return rows.merge(newRows);
}

function* getValues() {
  try {
    yield call(waitForClient);

    const state = yield select();

    if (!state.gapi.get('isSignedIn')) {
      yield take(GAPI_SIGNIN);
    }

    const range = state.snus.get('range');
    const rows = state.snus.get('rows');

    const response = yield window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rowsUpdated = mergeRows(response.result.values, rows);

    const data = {
      rows: rowsUpdated,
      // ...createStructs(response.result.values),
      ...createStructs2(rowsUpdated),
    };

    yield put(dataSuccess(data, parseRange(response.result.range)));
    // yield put(dataSuccess(data, range));
  } catch (error) {
    console.log(error);
    yield put(dataError(error));
  }
}

function* snusSaga() {
  // yield call(getValues);
  yield takeEvery(FETCH_DATA_REQUEST, getValues);
}

export default snusSaga;
