import { Layout } from "antd";
import { HeaderLayout } from "../HeaderLayout";
import { FooterLayout } from "../FooterLayout";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledLayout = styled(Layout)`
  background-image: url('/assets/images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
`;

const SectionFrame = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const DefaultLayout = () => {
  return (
    <StyledLayout>
      <HeaderLayout />
      <Outlet />
      <SectionFrame 
        src="/assets/images/section-frame.png"
        alt="footer-frame"
      />
      <FooterLayout />
    </StyledLayout>
  );
}; 