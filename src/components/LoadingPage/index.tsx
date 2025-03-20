import React, { useEffect, useState, useRef } from 'react';
import { Spin } from 'antd';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div<{ isLoading: boolean; isHidden: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(13, 17, 38, 0.95), rgba(21, 25, 46, 0.95));
  z-index: 1000;
  opacity: 1;
  animation: ${props => (props.isLoading ? fadeIn : fadeOut)} 0.5s ease-in-out forwards;
  visibility: ${props => (props.isHidden ? 'hidden' : 'visible')};
`;

const LogoContainer = styled.div`
  margin-bottom: 32px;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: 800;
  background: ${props => props.theme.colors.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoadingMessage = styled.div`
  color: white;
  margin-top: 16px;
  font-size: 16px;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 12px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div<{ progress: number }>`
  position: absolute;
  height: 100%;
  width: ${props => props.progress}%;
  background: ${props => props.theme.colors.primaryGradient};
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const LoadingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  
  useEffect(() => {
    // Đo thời gian thực tế để load component
    const actualLoadTime = Date.now() - startTime.current;
    const minLoadTime = 800; // ms
    const totalLoadTime = Math.max(minLoadTime, actualLoadTime);
    
    // Chạy animation progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, totalLoadTime / 50); // Chia thành 50 bước để animation mượt

    // Nếu load quá nhanh, vẫn hiển thị đủ thời gian tối thiểu
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // After animation, completely hide the component
      setTimeout(() => {
        setIsHidden(true);
      }, 500); // Match this with the animation duration
    }, totalLoadTime);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <Container isLoading={isLoading} isHidden={isHidden}>
      <LogoContainer>
        <Logo>TYMEX</Logo>
      </LogoContainer>
      <Spin size="large" />
      <LoadingMessage>Loading amazing experience...</LoadingMessage>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
    </Container>
  );
};

export default LoadingPage; 