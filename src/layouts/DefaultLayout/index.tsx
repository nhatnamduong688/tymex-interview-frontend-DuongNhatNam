import { Layout } from "antd";
import { HeaderLayout } from "../HeaderLayout";
import { FooterLayout } from "../FooterLayout";
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const StyledLayout = styled(Layout)`
  background-image: url('/assets/images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
`;

const SectionFrameWrapper = styled.div`
  width: 100%;
  height: 200px; /* Đặt chiều cao cố định phù hợp với hình ảnh */
  background-image: url('/assets/images/section-frame.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #0c0d1a; /* Màu nền đồng nhất với theme */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Thêm lớp overlay để tránh hiện tượng flash */
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(12, 13, 26, 0.8);
    z-index: -1;
  }
`;

export const DefaultLayout = () => {
  const location = useLocation();
  
  // Preload các hình ảnh quan trọng
  useEffect(() => {
    const imagesToPreload = [
      '/assets/images/section-frame.png',
      '/assets/images/background.png'
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  return (
    <StyledLayout>
      <HeaderLayout />
      <Outlet />
      <SectionFrameWrapper />
      <FooterLayout />
    </StyledLayout>
  );
}; 