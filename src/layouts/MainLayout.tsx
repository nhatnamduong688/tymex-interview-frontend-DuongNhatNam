// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderLayout } from './HeaderLayout';
import { FooterLayout } from './FooterLayout';
import { SeparateSection } from './SeparateSection';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const StyledLayout = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: #0c0d1a;
    background-image: url('/assets/images/custom/space-background.jpg');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    will-change: transform, background, background-image;
    contain: paint layout;
    contain-intrinsic-size: 100vh;
    position: relative;
    transform: translateZ(0);
    backface-visibility: hidden;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 11, 35, 0.5);
        z-index: -1;
    }
    
    .ant-layout-sider {
        background: transparent !important;
    }
`;

const StyledContent = styled(Content)`
    background: transparent;
    padding-top: var(--header-height);
    position: relative;
    z-index: 1;
`;

export const MainLayout = () => {
    return (
        <StyledLayout className="main-layout min-h-screen w-full">
            <HeaderLayout />
            
            <StyledContent className="bg-transparent">
                {/* Content here by Outlet */}
                <Outlet />
            </StyledContent>
            
            <SeparateSection />
            <FooterLayout />
        </StyledLayout>
    );
};