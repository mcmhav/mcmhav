import { all } from 'redux-saga/effects';

import snusSaga from './snus';
import addItemSaga from './addItem';

export default function* rootSnusSaga() {
  yield all([snusSaga(), addItemSaga()]);
}
