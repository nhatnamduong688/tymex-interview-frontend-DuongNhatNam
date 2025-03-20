// src/layouts/MainLayout.tsx
import React from 'react';
import { BannerSection } from '../components/BannerSection';
import { HeaderLayout } from './HeaderLayout';
import { FooterLayout } from './FooterLayout';
import styled from 'styled-components';

interface MainLayoutProps {
    children: React.ReactNode;
}

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-image: url('/assets/images/background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
`;

const MainContent = styled.main`
    flex: 1;
    width: 100%;
`;

const SectionFrame = styled.div`
    width: 100%;
    position: relative;
    
    img {
        width: 100%;
        height: auto;
        display: block;
    }
`;

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <LayoutContainer>
            <HeaderLayout />
            
            <BannerSection />
            
            <MainContent>
                {children}
            </MainContent>
            
            <SectionFrame>
                <img 
                    src="/assets/images/section-frame.png" 
                    alt="section-frame"
                    loading="lazy"
                />
            </SectionFrame>
            
            <FooterLayout />
        </LayoutContainer>
    );
};