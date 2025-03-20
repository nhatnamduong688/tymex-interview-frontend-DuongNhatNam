// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderLayout } from './HeaderLayout';
import { FooterLayout } from './FooterLayout';
import { SeparateSection } from './SeparateSection';
import styled from 'styled-components';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
    min-height: 100vh;
    width: 100%;
    background-image: url('/assets/images/background.png');
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center center;
    
    .ant-layout-sider {
        background: transparent !important;
    }
`;

const StyledContent = styled(Content)`
    background: transparent;
`;

export const MainLayout = () => {
    return (
        <StyledLayout className="main-layout">
            <HeaderLayout />
            
            <StyledContent>
                {/* Content here by Outlet */}
                <Outlet />
            </StyledContent>
            
            <SeparateSection />
            <FooterLayout />
        </StyledLayout>
    );
};