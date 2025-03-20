import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.section`
  background: linear-gradient(135deg, #1a6aff 0%, #7e42ff 100%);
  color: white;
  padding: 80px 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
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