import { all, fork } from 'redux-saga/effects';
import productSaga from './productSaga';
import authSaga from './authSaga';

// Kết hợp tất cả các saga lại với nhau
export default function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(authSaga),
    // Thêm các saga khác ở đây
  ]);
} 