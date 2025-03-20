// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import {MainLayout} from "./layouts/MainLayout.tsx";
import { HomePage } from './components/HomePage';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <MainLayout>
                <HomePage />
            </MainLayout>
        </ThemeProvider>
    );
};

export default App;