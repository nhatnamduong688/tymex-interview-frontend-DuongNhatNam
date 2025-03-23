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
    background-color: #242424;
    background-image: linear-gradient(to bottom, #242424, #1a1a1a);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    will-change: transform;
    contain: paint;
    contain-intrinsic-size: 100vh;
    position: relative;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #242424;
        z-index: -1;
    }
    
    .ant-layout-sider {
        background: transparent !important;
    }
`;

const StyledContent = styled(Content)`
    background: transparent;
    padding-top: var(--header-height);
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