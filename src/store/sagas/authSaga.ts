import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../reducers/authReducer';
import { PayloadAction } from '@reduxjs/toolkit';

// Mô phỏng gọi API
const mockLoginApi = async (credentials: { email: string; password: string }) => {
  // Giả lập call API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mô phỏng check credentials
  if (credentials.email === 'user@example.com' && credentials.password === 'password') {
    return { 
      id: 1, 
      name: 'John Doe', 
      email: credentials.email, 
      role: 'user' 
    };
  }
  
  throw new Error('Invalid credentials');
};

// Saga worker
function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    // Mô phỏng call API
    const user = yield call(mockLoginApi, action.payload);
    
    // Lưu token vào localStorage (trong thực tế)
    // localStorage.setItem('token', user.token);
    
    // Dispatch action thành công
    yield put(loginSuccess(user));
  } catch (error) {
    // Dispatch action thất bại
    yield put(loginFailure(error instanceof Error ? error.message : 'Login failed'));
  }
}

// Saga watcher
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
} 