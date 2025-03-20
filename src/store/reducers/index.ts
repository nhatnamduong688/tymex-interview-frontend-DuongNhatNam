import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import uiReducer from './uiReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
}); 