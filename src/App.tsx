// src/App.tsx
import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import styledTheme from './styles/theme';
import antdTheme from './styles/antdTheme';
import { routes } from './routes/routes';
import './styles/nprogress.css';
import { ApiDebugger } from './components/ApiDebugger';

const App = () => {
    return (
        <ConfigProvider theme={antdTheme}>
            <ThemeProvider theme={styledTheme}>
                <RouterProvider router={routes} />
                {process.env.NODE_ENV !== 'production' && <ApiDebugger />}
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default App;