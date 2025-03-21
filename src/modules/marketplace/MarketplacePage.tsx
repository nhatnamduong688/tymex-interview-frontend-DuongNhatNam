import React, { useEffect } from 'react';
import { Container } from '../../components/Container';
import { PageContent } from '../../components/PageContent';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Filter } from './filter';
import { ProductList } from './product-list';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';

const StyledMarketplacePage = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.isCollapsed ? '300px 1fr' : '1fr'};
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MarketplacePage = () => {
  const { isCollapsed } = useBreakpoint();
  const dispatch = useDispatch();
  
  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container>
      <PageContent title="Marketplace">
        <StyledMarketplacePage isCollapsed={isCollapsed}>
          <Filter />
          <ProductList />
        </StyledMarketplacePage>
      </PageContent>
    </Container>
  );
}; 