import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.section`
  background: linear-gradient(135deg, #1a6aff 0%, #7e42ff 100%);
  color: white;
  padding: 80px 40px;
  text-align: center;
  position: relative;
  z-index: 2;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Thêm fallback background tối */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0c0d1a;
    z-index: -1;
  }
  
  /* Thêm gradient tối ở dưới cùng để transition với phần tiếp theo */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, transparent, rgba(12, 13, 26, 0.5));
    z-index: 1;
    pointer-events: none;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  position: relative;
  z-index: 2;
`;

export const BannerSection: React.FC = () => {
  return (
    <BannerContainer>
      <Title>Marketplace</Title>
      <Subtitle>
        Discover unique digital assets on our marketplace. Browse through 
        collections, filter by category, and find the perfect digital item.
      </Subtitle>
    </BannerContainer>
  );
}; 