// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styledTheme from './styles/theme';
import antdTheme from './styles/antdTheme';
import GlobalStyles from './styles/GlobalStyles';
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from './components/HomePage';
import { BannerSection } from './components/BannerSection';

const App = () => {
    return (
        <ConfigProvider theme={antdTheme}>
            <ThemeProvider theme={styledTheme}>
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={
                                <>
                                    <BannerSection />
                                    <HomePage />
                                </>
                            } />
                            {/* Thêm các route khác ở đây */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default App;