import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

// Kết hợp tất cả các reducer lại với nhau
export const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  // Thêm các reducer khác ở đây khi cần
}); 