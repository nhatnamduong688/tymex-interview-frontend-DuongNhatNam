import React, { useEffect } from 'react';
import { Container } from '../../components/Container';
import { PageContent } from '../../components/PageContent';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Filter } from './filter';
import { ProductList } from './product-list';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setFiltersFromUrl } from '../../store/slices/filterSlice';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useLocation } from 'react-router-dom';

interface StyledMarketplacePageProps {
  isCollapsed?: boolean;
}

const StyledMarketplacePage = styled.div<StyledMarketplacePageProps>`
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
  const { getParams } = useQueryParams();
  const location = useLocation();
  
  // Read URL parameters and initialize filter state - but only once on initial render or when URL search params change
  useEffect(() => {
    console.log('MarketplacePage useEffect running - Reading URL params');
    
    // Get all URL parameters
    const urlParams = getParams();
    console.log('Raw URL params from useQueryParams:', urlParams);
    
    // Update Redux state with URL parameters
    if (Object.keys(urlParams).length > 0) {
      console.log('URL parameters detected, dispatching to Redux:', urlParams);
      
      // Log specific param types for debugging
      if (urlParams.minPrice) console.log('minPrice type:', typeof urlParams.minPrice, 'value:', urlParams.minPrice);
      if (urlParams.maxPrice) console.log('maxPrice type:', typeof urlParams.maxPrice, 'value:', urlParams.maxPrice);
      if (urlParams.tier) console.log('tier type:', typeof urlParams.tier, 'value:', urlParams.tier);
      if (urlParams.theme) console.log('theme type:', typeof urlParams.theme, 'value:', urlParams.theme);
      if (urlParams.categories) console.log('categories type:', typeof urlParams.categories, 'value:', urlParams.categories);
      
      dispatch(setFiltersFromUrl(urlParams));
      console.log('Dispatched setFiltersFromUrl action');
    } else {
      console.log('No URL parameters found');
    }
  }, [location.search, dispatch, getParams]);

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