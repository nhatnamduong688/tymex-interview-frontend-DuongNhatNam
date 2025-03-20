// src/App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styledTheme from './styles/theme';
import antdTheme from './styles/antdTheme';
import GlobalStyles from './styles/GlobalStyles';
import { MainLayout, AuthLayout } from "./layouts";
import { HomePage } from './components/HomePage';
import { BannerSection } from './components/BannerSection';
import TopProgressBar from './components/TopProgressBar';
import './styles/nprogress.css';

const AboutUsPage = () => <div style={{ minHeight: '80vh', padding: '100px 20px 20px' }}>About Us Page</div>;
const OurTeamsPage = () => <div style={{ minHeight: '80vh', padding: '100px 20px 20px' }}>Our Teams Page</div>;
const MarketplacePage = () => <div style={{ minHeight: '80vh', padding: '100px 20px 20px' }}>Marketplace Page</div>;
const RoadmapPage = () => <div style={{ minHeight: '80vh', padding: '100px 20px 20px' }}>Roadmap Page</div>;
const WhitepaperPage = () => <div style={{ minHeight: '80vh', padding: '100px 20px 20px' }}>Whitepaper Page</div>;

const App = () => {
    return (
        <ConfigProvider theme={antdTheme}>
            <ThemeProvider theme={styledTheme}>
                <GlobalStyles />
                <BrowserRouter>
                    <TopProgressBar />
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={
                                <>
                                    <BannerSection />
                                    <HomePage />
                                </>
                            } />
                            <Route path="about-us" element={<AboutUsPage />} />
                            <Route path="our-teams" element={<OurTeamsPage />} />
                            <Route path="marketplace" element={<MarketplacePage />} />
                            <Route path="roadmap" element={<RoadmapPage />} />
                            <Route path="whitepaper" element={<WhitepaperPage />} />
                        </Route>
                        <Route path="/auth/*" element={<AuthLayout />}>
                            <Route path="login" element={<div>Login Page</div>} />
                            <Route path="register" element={<div>Register Page</div>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default App;