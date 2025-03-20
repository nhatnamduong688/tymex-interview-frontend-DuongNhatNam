import { takeLatest, put, delay } from 'redux-saga/effects';
import { setGlobalLoading, toggleTheme } from '../reducers/uiReducer';

// Saga worker để xử lý các side effects liên quan đến UI
function* themeChangeSaga() {
  // Có thể lưu theme vào localStorage hoặc gọi API để cập nhật preference
  try {
    // Simulate API call or processing
    yield delay(300);
    
    // Có thể thực hiện các tác vụ khác sau khi theme thay đổi
    // ví dụ: cập nhật theme trong localStorage
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    
  } catch (error) {
    console.error('Error processing theme change', error);
  }
}

// Saga watcher
export default function* uiSaga() {
  // Ví dụ theo dõi action thay đổi theme
  yield takeLatest(toggleTheme.type, themeChangeSaga);
} 