import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import filterReducer from './slices/filterSlice';
import productsReducer from './slices/productsSlice';
import authReducer from './reducers/authReducer';
import { urlSyncMiddleware } from './middleware/urlSyncMiddleware';

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