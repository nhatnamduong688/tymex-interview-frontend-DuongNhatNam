// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import {MainLayout} from "./layouts/MainLayout.tsx";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <MainLayout>
                <div>
                    {/* Các routes và components của bạn */}
                </div>
            </MainLayout>
        </ThemeProvider>
    );
};

export default App;