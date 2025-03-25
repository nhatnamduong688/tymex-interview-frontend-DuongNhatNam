import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import rootSaga from './sagas/rootSaga';

// Tạo middleware saga
const sagaMiddleware = createSagaMiddleware();

// Cấu hình store với thunk mặc định từ RTK và saga middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      // Thunk đã được bao gồm mặc định trong RTK
      serializableCheck: false, // Tắt kiểm tra serializable để tương thích với Saga
    }).concat(sagaMiddleware),
});

// Chạy saga sau khi store được tạo
sagaMiddleware.run(rootSaga);

// Export các kiểu dữ liệu
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 