import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import uiSaga from './uiSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    uiSaga(),
  ]);
} 