import { OrderedSet, OrderedMap, Map, List } from 'immutable';
import { select, takeEvery, call, put } from 'redux-saga/effects';

import { dataSuccess, FETCH_DATA_REQUEST } from '../../dux/snus';
import { gapiSignedIn } from '../../dux/gapi';

import gapi from '../../../features/Snus/gapi';
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

function handleClientLoad() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => initClient(resolve, reject));
  });
}

function* initGAPIClient() {
  const response = yield gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });

  // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  // Handle the initial sign-in state.
  yield call(updateSigninStatus, gapi.auth2.getAuthInstance().isSignedIn.get());
}

function loadGAPIClient() {
  return new Promise(resolve => {
    gapi.load('client:auth2', () => {
      // TODO: should do a calback check for resolve/reject
      resolve();
    });
  });
}

function* waitForClient() {
  try {
    yield call(loadGAPIClient);
    yield call(initGAPIClient);

    // yield call(handleClientLoad);
  } catch (error) {
    console.log(error);
  }
}

const counter = rows => {
  const counts = {};
  const sorted = [];
  rows.forEach(row => {
    var num = row[1];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
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

function* getValues() {
  try {
    yield call(waitForClient);

    const state = yield select();

    const range = state.snus.get('range');

    const response = yield gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    var counts = {};

    for (var i = 0; i < response.result.values.length; i++) {
      var num = response.result.values[i][1];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    const cols = {};
    response.result.values.forEach(row => {
      var date = dateFns.format(parseInt(row[2], 10), 'YYYY-MM-DD');

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

    const data = {
      rows: response.result.values.map(value => {
        return { id: value[2], time: value[0], notes: value[1] };
      }),
      cols,
      cols_arr,
      counts: counter(response.result.values),
      supaStruct: makeSupaDataStructure(response.result.values),
    };

    // yield put(dataSuccess(data,parseRange(response.result.range)));
    yield put(dataSuccess(data, range));
  } catch (error) {
    console.log(error);
  }
}

function* snusSaga() {
  // yield call(getValues);
  yield takeEvery(FETCH_DATA_REQUEST, getValues);
}

export default snusSaga;