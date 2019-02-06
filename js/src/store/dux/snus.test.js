import { OrderedSet,OrderedMap,Map,List } from 'immutable';
import { isValidElement } from 'react';

const moreTables = [
  {
    colName: '2019-02-03',
    rows: [
      {
        id: '1549206585275',
        time: '16:09:45',
        notes: 'Home',
        color: 'rgb(255,54,54)',
      },
      {
        id: '1549213433789',
        time: '18:03:53',
        notes: 'Home',
        color: 'rgb(255,41,41)',
      },
    ],
  },
];
const tables = [
  {
    colName: '2019-02-03',
    rows: [
      {
        id: '1549150261826',
        time: '0:31:01',
        notes: 'Home - RL',
        color: 'rgb(255,157,157)',
      },
      {
        id: '1549152341618',
        time: '1:05:41',
        notes: 'Home',
        color: 'rgb(255,150,150)',
      },
      {
        id: '1549196375576',
        time: '13:19:35',
        notes: 'Home',
        color: 'rgb(255,73,73)',
      },
      {
        id: '1549197865063',
        time: '13:44:25',
        notes: 'Home',
        color: 'rgb(255,73,73)',
      },
      {
        id: '1549201803314',
        time: '14:50:03',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      {
        id: '1549206585275',
        time: '16:09:45',
        notes: 'Home',
        color: 'rgb(255,54,54)',
      },
    ],
  },
  {
    colName: '2019-02-02',
    rows: [
      {
        id: '1549113044176',
        time: '14:10:44',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      {
        id: '1549117685536',
        time: '15:28:05',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
      {
        id: '1549121416479',
        time: '16:30:16',
        notes: 'Home - factorio',
        color: 'rgb(255,54,54)',
      },
      {
        id: '1549129712751',
        time: '18:48:32',
        notes: 'Home - dinner',
        color: 'rgb(255,41,41)',
      },
      {
        id: '1549133806740',
        time: '19:56:46',
        notes: 'Home',
        color: 'rgb(255,35,35)',
      },
      {
        id: '1549137265181',
        time: '20:54:25',
        notes: 'Home - cs',
        color: 'rgb(255,29,29)',
      },
      {
        id: '1549142392399',
        time: '22:19:52',
        notes: 'Home',
        color: 'rgb(255,16,16)',
      },
      {
        id: '1549148124494',
        time: '23:55:24',
        notes: 'Home - RL',
        color: 'rgb(255,10,10)',
      },
    ],
  },
  {
    colName: '2019-02-01',
    rows: [
      {
        id: '1549001723262',
        time: '7:15:23',
        notes: 'Work',
        color: 'rgb(255,112,112)',
      },
      {
        id: '1549004479307',
        time: '8:01:19',
        notes: 'Work',
        color: 'rgb(255,105,105)',
      },
      {
        id: '1549006595507',
        time: '8:36:35',
        notes: 'Work',
        color: 'rgb(255,105,105)',
      },
      {
        id: '1549012629351',
        time: '10:17:09',
        notes: 'Work',
        color: 'rgb(255,93,93)',
      },
      {
        id: '1549018290795',
        time: '11:51:30',
        notes: 'Work - lunch',
        color: 'rgb(255,86,86)',
      },
      {
        id: '1549021570094',
        time: '12:46:10',
        notes: 'Work',
        color: 'rgb(255,80,80)',
      },
      {
        id: '1549025169063',
        time: '13:46:09',
        notes: 'Work',
        color: 'rgb(255,73,73)',
      },
      {
        id: '1549027437538',
        time: '14:23:57',
        notes: 'Work',
        color: 'rgb(255,67,67)',
      },
      {
        id: '1549033051346',
        time: '15:57:31',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
      {
        id: '1549037475398',
        time: '17:11:15',
        notes: 'Home - factorio',
        color: 'rgb(255,48,48)',
      },
      {
        id: '1549039435780',
        time: '17:43:55',
        notes: 'Home',
        color: 'rgb(255,48,48)',
      },
      {
        id: '1549053057700',
        time: '21:30:57',
        notes: 'Home - factorio',
        color: 'rgb(255,22,22)',
      },
      {
        id: '1549053189657',
        time: '21:33:09',
        notes: 'Home - factorio',
        color: 'rgb(255,22,22)',
      },
      {
        id: '1549060141904',
        time: '23:29:01',
        notes: 'Home - RL',
        color: 'rgb(255,10,10)',
      },
    ],
  },
];
const moreTablesSet = {
  '2019-02-03': {
    colName: '2019-02-03',
    rows: [
      {
        id: '1549206585275',
        time: '16:09:45',
        notes: 'Home',
        color: 'rgb(255,54,54)',
      },
      {
        id: '1549213433789',
        time: '18:03:53',
        notes: 'Home',
        color: 'rgb(255,41,41)',
      },
    ],
  },
};
const tablesSet = {
  '2019-02-03': {
    colName: '2019-02-03',
    rows: [
      {
        id: '1549150261826',
        time: '0:31:01',
        notes: 'Home - RL',
        color: 'rgb(255,157,157)',
      },
      {
        id: '1549152341618',
        time: '1:05:41',
        notes: 'Home',
        color: 'rgb(255,150,150)',
      },
      {
        id: '1549196375576',
        time: '13:19:35',
        notes: 'Home',
        color: 'rgb(255,73,73)',
      },
      {
        id: '1549197865063',
        time: '13:44:25',
        notes: 'Home',
        color: 'rgb(255,73,73)',
      },
      {
        id: '1549201803314',
        time: '14:50:03',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      {
        id: '1549206585275',
        time: '16:09:45',
        notes: 'Home',
        color: 'rgb(255,54,54)',
      },
    ],
  },
  '2019-02-02': {
    colName: '2019-02-02',
    rows: [
      {
        id: '1549113044176',
        time: '14:10:44',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      {
        id: '1549117685536',
        time: '15:28:05',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
      {
        id: '1549121416479',
        time: '16:30:16',
        notes: 'Home - factorio',
        color: 'rgb(255,54,54)',
      },
      {
        id: '1549129712751',
        time: '18:48:32',
        notes: 'Home - dinner',
        color: 'rgb(255,41,41)',
      },
      {
        id: '1549133806740',
        time: '19:56:46',
        notes: 'Home',
        color: 'rgb(255,35,35)',
      },
      {
        id: '1549137265181',
        time: '20:54:25',
        notes: 'Home - cs',
        color: 'rgb(255,29,29)',
      },
      {
        id: '1549142392399',
        time: '22:19:52',
        notes: 'Home',
        color: 'rgb(255,16,16)',
      },
      {
        id: '1549148124494',
        time: '23:55:24',
        notes: 'Home - RL',
        color: 'rgb(255,10,10)',
      },
    ],
  },
  '2019-02-01': {
    colName: '2019-02-01',
    rows: [
      {
        id: '1549001723262',
        time: '7:15:23',
        notes: 'Work',
        color: 'rgb(255,112,112)',
      },
      {
        id: '1549004479307',
        time: '8:01:19',
        notes: 'Work',
        color: 'rgb(255,105,105)',
      },
      {
        id: '1549006595507',
        time: '8:36:35',
        notes: 'Work',
        color: 'rgb(255,105,105)',
      },
      {
        id: '1549012629351',
        time: '10:17:09',
        notes: 'Work',
        color: 'rgb(255,93,93)',
      },
      {
        id: '1549018290795',
        time: '11:51:30',
        notes: 'Work - lunch',
        color: 'rgb(255,86,86)',
      },
      {
        id: '1549021570094',
        time: '12:46:10',
        notes: 'Work',
        color: 'rgb(255,80,80)',
      },
      {
        id: '1549025169063',
        time: '13:46:09',
        notes: 'Work',
        color: 'rgb(255,73,73)',
      },
      {
        id: '1549027437538',
        time: '14:23:57',
        notes: 'Work',
        color: 'rgb(255,67,67)',
      },
      {
        id: '1549033051346',
        time: '15:57:31',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
      {
        id: '1549037475398',
        time: '17:11:15',
        notes: 'Home - factorio',
        color: 'rgb(255,48,48)',
      },
      {
        id: '1549039435780',
        time: '17:43:55',
        notes: 'Home',
        color: 'rgb(255,48,48)',
      },
      {
        id: '1549053057700',
        time: '21:30:57',
        notes: 'Home - factorio',
        color: 'rgb(255,22,22)',
      },
      {
        id: '1549053189657',
        time: '21:33:09',
        notes: 'Home - factorio',
        color: 'rgb(255,22,22)',
      },
      {
        id: '1549060141904',
        time: '23:29:01',
        notes: 'Home - RL',
        color: 'rgb(255,10,10)',
      },
    ],
  },
};

const moreTablesSetDeep = {
  '2019-02-03': {
    colName: '2019-02-03',
    rows: {
      '1549206585275': {
        id: '1549206585275',
        time: '16:09:45',
        notes: 'Home',
        color: 'rgb(255,54,54)',
      },
      '1549213433789': {
        id: '1549213433789',
        time: '18:03:53',
        notes: 'Home',
        color: 'rgb(255,41,41)',
      },
    },
  },
  '2019-02-02': {
    colName: '2019-02-02',
    rows: {
      '1549113044176': {
        id: '1549113044176',
        time: '14:10:44',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      '1549117685536': {
        id: '1549117685536',
        time: '15:28:05',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
    },
  },
};
const tablesSetDeep = {
  '2019-02-03': {
    colName: '2019-02-03',
    rows: {
      '1549150261826': {
        id: '1549150261826',
        time: '0:31:01',
        notes: 'Home - RL',
        color: 'rgb(255,157,157)',
      },
      '1549152341618': {
        id: '1549152341618',
        time: '1:05:41',
        notes: 'Home',
        color: 'rgb(255,150,150)',
      },
      '1549196375576': {
        id: '1549196375576',
        time: '13:19:35',
        notes: 'Home',
        color: 'rgb(255,73,73)',
      },
      '1549197865063': {
        id: '1549197865063',
        time: '13:44:25',
        notes: 'Home',
        color: 'rgb(255,73,73)',
      },
      '1549201803314': {
        id: '1549201803314',
        time: '14:50:03',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      '1549206585275': {
        id: '1549206585275',
        time: '16:09:45',
        notes: 'Home',
        color: 'rgb(255,54,54)',
      },
    },
  },
  '2019-02-02': {
    colName: '2019-02-02',
    rows: {
      '1549113044176': {
        id: '1549113044176',
        time: '14:10:44',
        notes: 'Home',
        color: 'rgb(255,67,67)',
      },
      '1549117685536': {
        id: '1549117685536',
        time: '15:28:05',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
      '1549121416479': {
        id: '1549121416479',
        time: '16:30:16',
        notes: 'Home - factorio',
        color: 'rgb(255,54,54)',
      },
      '1549129712751': {
        id: '1549129712751',
        time: '18:48:32',
        notes: 'Home - dinner',
        color: 'rgb(255,41,41)',
      },
      '1549133806740': {
        id: '1549133806740',
        time: '19:56:46',
        notes: 'Home',
        color: 'rgb(255,35,35)',
      },
      '1549137265181': {
        id: '1549137265181',
        time: '20:54:25',
        notes: 'Home - cs',
        color: 'rgb(255,29,29)',
      },
      '1549142392399': {
        id: '1549142392399',
        time: '22:19:52',
        notes: 'Home',
        color: 'rgb(255,16,16)',
      },
      '1549148124494': {
        id: '1549148124494',
        time: '23:55:24',
        notes: 'Home - RL',
        color: 'rgb(255,10,10)',
      },
    },
  },
  '2019-02-01': {
    colName: '2019-02-01',
    rows: {
      '1549001723262': {
        id: '1549001723262',
        time: '7:15:23',
        notes: 'Work',
        color: 'rgb(255,112,112)',
      },
      '1549004479307': {
        id: '1549004479307',
        time: '8:01:19',
        notes: 'Work',
        color: 'rgb(255,105,105)',
      },
      '1549006595507': {
        id: '1549006595507',
        time: '8:36:35',
        notes: 'Work',
        color: 'rgb(255,105,105)',
      },
      '1549012629351': {
        id: '1549012629351',
        time: '10:17:09',
        notes: 'Work',
        color: 'rgb(255,93,93)',
      },
      '1549018290795': {
        id: '1549018290795',
        time: '11:51:30',
        notes: 'Work - lunch',
        color: 'rgb(255,86,86)',
      },
      '1549021570094': {
        id: '1549021570094',
        time: '12:46:10',
        notes: 'Work',
        color: 'rgb(255,80,80)',
      },
      '1549025169063': {
        id: '1549025169063',
        time: '13:46:09',
        notes: 'Work',
        color: 'rgb(255,73,73)',
      },
      '1549027437538': {
        id: '1549027437538',
        time: '14:23:57',
        notes: 'Work',
        color: 'rgb(255,67,67)',
      },
      '1549033051346': {
        id: '1549033051346',
        time: '15:57:31',
        notes: 'Home - factorio',
        color: 'rgb(255,61,61)',
      },
      '1549037475398': {
        id: '1549037475398',
        time: '17:11:15',
        notes: 'Home - factorio',
        color: 'rgb(255,48,48)',
      },
      '1549039435780': {
        id: '1549039435780',
        time: '17:43:55',
        notes: 'Home',
        color: 'rgb(255,48,48)',
      },
      '1549053057700': {
        id: '1549053057700',
        time: '21:30:57',
        notes: 'Home - factorio',
        color: 'rgb(255,22,22)',
      },
      '1549053189657': {
        id: '1549053189657',
        time: '21:33:09',
        notes: 'Home - factorio',
        color: 'rgb(255,22,22)',
      },
      '1549060141904': {
        id: '1549060141904',
        time: '23:29:01',
        notes: 'Home - RL',
        color: 'rgb(255,10,10)',
      },
    },
  },
};
const state = Map({
  tables: OrderedMap(tablesSetDeep),
});

const addDataToTable = data => {
  console.log(data);

  let newState = state;
  Object.keys(data).forEach(element => {
    console.log(element);
    const lol = state.getIn(['tables',element,'rows']);
    const dataKeys = Object.keys(data[element].rows);
    console.log(lol);

    dataKeys.forEach(key => {
      const has = state.hasIn(['tables',element,'rows',key]);

      if (!has) {
        lol[key] = data[element].rows[key];
      }

      console.log(has);
    });
    newState = state.setIn(['tables',element,'rows'],lol);

    console.log(dataKeys);
    console.log(lol);
  });

  console.log(newState);
};

it('adds 1 + 2 to equal 3',() => {
  addDataToTable(moreTablesSetDeep);
  expect(sum(1,2)).toBe(3);
});
