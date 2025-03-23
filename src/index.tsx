import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import GlobalStyle from './styles/global';

// Import SCSS files
import 'antd/dist/reset.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Load theme from store or default
const themeConfig = {
  token: {
    colorPrimary: '#da458f',
    colorInfo: '#da458f',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorBgBase: '#242129',
    colorTextBase: '#ffffff',
    borderRadius: 4,
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    Slider: {
      handleColor: '#da458f',
      railBg: 'rgba(58, 56, 65, 0.8)',
      trackBg: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.8) -6%, rgba(218, 52, 221, 0.8) 113.05%)',
      handleActiveColor: '#da34dd',
      trackHoverBg: 'linear-gradient(91.47deg, rgba(218, 69, 143, 1) -6%, rgba(218, 52, 221, 1) 113.05%)',
    },
    Select: {
      controlItemBgActive: 'rgba(218, 69, 143, 0.2)',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
    },
    Input: {
      colorBgContainer: '#242129',
      colorBorder: 'transparent',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
    },
    Button: {
      controlOutline: 'transparent',
      primaryShadow: 'none',
    }
  }
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ConfigProvider theme={themeConfig}>
          <GlobalStyle />
          <App />
        </ConfigProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();