import React from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  padding: 100px 20px 40px;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
  
  span {
    ${props => props.theme.mixins.gradientText}
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const Card = styled.div`
  background: rgba(15, 16, 41, 0.8);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CardPrice = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.colors.primaryAccent};
`;

export const HomePage = () => {
  return (
    <HomePageContainer>
      <SectionTitle>
        Discover, collect, and sell <span>extraordinary NFTs</span>
      </SectionTitle>
      
      <CardGrid>
        {[1, 2, 3, 4].map((item) => (
          <Card key={item}>
            <img src={`/assets/images/item-${item}.png`} alt={`NFT Item ${item}`} />
            <CardContent>
              <CardTitle>Digital Collectible #{item}</CardTitle>
              <CardPrice>0.5 ETH</CardPrice>
            </CardContent>
          </Card>
        ))}
      </CardGrid>
    </HomePageContainer>
  );
}; 