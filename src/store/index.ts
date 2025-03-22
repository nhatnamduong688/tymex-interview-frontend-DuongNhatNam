import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import filterReducer from '../features/marketplace/store/filterSlice';
import productsReducer from '../features/marketplace/store/productsSlice';
import authReducer from './reducers/authReducer';
import { urlSyncMiddleware } from '../core/store/middleware/urlSyncMiddleware';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    products: productsReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: true })
      .concat(sagaMiddleware)
      .concat(urlSyncMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 