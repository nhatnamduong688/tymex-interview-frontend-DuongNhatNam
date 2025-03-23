import React from 'react';
import {
  HomePageContainer,
  SectionTitle,
  CardGrid,
  Card,
  CardContent,
  CardTitle,
  CardPrice
} from './styles';

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