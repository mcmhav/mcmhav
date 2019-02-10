import { all } from 'redux-saga/effects';

import snusSaga from './snus';

export function* helloSaga() {
  console.log('Hello Sagas!');
  yield 'potato';
}

export default function* rootSaga() {
  yield all([snusSaga(), helloSaga()]);
}
