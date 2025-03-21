import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import uiSaga from './uiSaga';
import { filterSaga } from './filterSaga';

// Root saga that combines all other sagas
export function* rootSaga() {
  yield all([
    fork(filterSaga),
    authSaga(),
    uiSaga(),
  ]);
} 