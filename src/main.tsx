import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'; // Import i18n configuration
import { LocaleProvider } from './contexts'; // Import LocaleProvider
import { Provider } from 'react-redux';
import { store } from './store';

// Không cần xử lý nữa vì đã loại bỏ các transition và light/dark mode
document.body.style.backgroundColor = '#242424';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </Provider>
  </React.StrictMode>,
)
