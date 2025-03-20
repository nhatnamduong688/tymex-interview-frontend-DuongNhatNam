// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderLayout } from './HeaderLayout';
import { FooterLayout } from './FooterLayout';
import { SeparateSection } from './SeparateSection';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
    min-height: 100vh;
    width: 100%;
    background-image: url('/assets/images/common/tymex-background.svg');
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center center;
    
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