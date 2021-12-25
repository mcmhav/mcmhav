import { Map, List, OrderedMap } from 'immutable';

export const FETCH_DATA_SUCCESS = 'snus/FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'snus/FETCH_DATA_ERROR';
export const FETCH_DATA_REQUEST = 'snus/FETCH_DATA_REQUEST';

export const ADD_ITEM = 'snus/ADD_ITEM';

const initialState = Map({
  supaStruct: OrderedMap({}),
  tables: List([]),
  rows: OrderedMap({}),
  notesCounts: List([]),
  range: 'Sheet1!A2:C',
  isFetching: false,
});

export function dataSuccess(data, range) {
  return { type: FETCH_DATA_SUCCESS, data, range };
}
export function dataError(error) {
  return { type: FETCH_DATA_ERROR, error };
}
export function dataFetch(data) {
  return { type: FETCH_DATA_REQUEST, data };
}

export function addItem(data) {
  return { type: ADD_ITEM, data };
}

const addDataToTable = (state, data) => {
  let newState = state;
  data.forEach((val, element) => {
    const lol = newState.getIn(['tables', element, 'rows']);

    let potet = {};

    if (lol) {
      let lal = lol;
      data.getIn([element, 'rows']).forEach((val, key) => {
        const has = newState.hasIn(['tables', element, 'rows', key]);

        if (!has) {
          lal = lal.setIn([key], val);
        }
      });
      potet = lal;
    } else {
      potet = data.getIn([element, 'rows']);
    }

    newState = newState.setIn(['tables', element, 'rows'], potet);
  });

  return newState;
};

function snus(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS: {
      return (
        state
          .set('rows', OrderedMap(action.data.rows))
          // .update('tables',tables => tables.concat(action.data.cols_arr))
          .set('tables', List(action.data.cols_arr))
          // .set(
          //   'supaStruct',
          //   addDataToTable(state.get('supaStruct'), action.data.supaStruct),
          // )
          .set('notesCounts', List(action.data.counts.sortedKeys))
          .set('range', action.range)
          .set('isFetching', false)
      );
    }
    case FETCH_DATA_ERROR:
      return state.set('isFetching', false);
    case FETCH_DATA_REQUEST:
      return state.set('isFetching', true);
    default:
      return state;
  }
}

export default snus;
