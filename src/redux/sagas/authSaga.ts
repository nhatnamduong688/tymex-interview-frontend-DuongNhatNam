import { call, put, takeLatest, all } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  LoginCredentials, 
  User,
  loginStart,
  loginSuccess,
  loginFailure
} from '../slices/authSlice';

// Action types
export const LOGIN_SAGA = 'auth/loginSaga';
export const REGISTER_SAGA = 'auth/registerSaga';
export const LOGOUT_SAGA = 'auth/logoutSaga';
export const FETCH_USER_SAGA = 'auth/fetchUserSaga';

// Action creators
export const loginSaga = (credentials: LoginCredentials) => ({
  type: LOGIN_SAGA,
  payload: credentials,
});

export const registerSaga = (userData: Omit<User, 'id' | 'role'> & { password: string }) => ({
  type: REGISTER_SAGA,
  payload: userData,
});

export const logoutSaga = () => ({
  type: LOGOUT_SAGA,
});

export const fetchUserSaga = () => ({
  type: FETCH_USER_SAGA,
});

// API functions
const loginApi = async (credentials: LoginCredentials) => {
  // Mô phỏng API call - thay thế bằng API thực tế
  return new Promise<{ user: User; token: string }>((resolve, reject) => {
    // Trong ứng dụng thực tế, đây sẽ là một API call
    setTimeout(() => {
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        resolve({
          user: {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            role: 'admin',
          },
          token: 'mock-jwt-token',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const registerApi = async (userData: Omit<User, 'id' | 'role'> & { password: string }) => {
  // Mô phỏng API call - thay thế bằng API thực tế
  return new Promise<{ user: User; token: string }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '2',
          username: userData.username,
          email: userData.email,
          role: 'user',
        },
        token: 'mock-jwt-token',
      });
    }, 1000);
  });
};

const fetchUserApi = async (token: string) => {
  // Mô phỏng API call - thay thế bằng API thực tế
  return new Promise<User>((resolve, reject) => {
    if (!token) {
      reject(new Error('No token provided'));
      return;
    }

    setTimeout(() => {
      resolve({
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin',
      });
    }, 1000);
  });
};

// Worker Sagas
function* loginSagaWorker(action: PayloadAction<LoginCredentials>) {
  try {
    yield put(loginStart());
    const result: { user: User; token: string } = yield call(loginApi, action.payload);
    yield put(loginSuccess(result));
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

function* registerSagaWorker(action: PayloadAction<Omit<User, 'id' | 'role'> & { password: string }>) {
  try {
    yield put(loginStart());
    const result: { user: User; token: string } = yield call(registerApi, action.payload);
    yield put(loginSuccess(result));
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

function* logoutSagaWorker() {
  try {
    // Có thể gọi API để invalid token ở server
    yield put({ type: 'auth/logout' });
  } catch (error) {
    console.error('Logout error:', error);
  }
}

function* fetchUserSagaWorker() {
  try {
    const token: string = yield call(
      [localStorage, localStorage.getItem],
      'token'
    );
    if (!token) {
      throw new Error('No token found');
    }
    const user: User = yield call(fetchUserApi, token);
    yield put(loginSuccess({ user, token }));
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

// Watcher Sagas
function* watchLogin() {
  yield takeLatest(LOGIN_SAGA, loginSagaWorker);
}

function* watchRegister() {
  yield takeLatest(REGISTER_SAGA, registerSagaWorker);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_SAGA, logoutSagaWorker);
}

function* watchFetchUser() {
  yield takeLatest(FETCH_USER_SAGA, fetchUserSagaWorker);
}

// Root Saga
export default function* authSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchLogout(),
    watchFetchUser(),
  ]);
} 