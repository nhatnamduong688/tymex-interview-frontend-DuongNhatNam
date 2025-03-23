import React, { useEffect } from 'react';
import { Col, Row } from "antd";
import { BannerSection } from "./banner-section";
import { Filter } from "./filter";
import { FilterMobile } from "./filter-mobile";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { TagCategories } from "./tag-categories";
import { ProductList } from "./product-list";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { setFiltersFromUrl } from '../../store/slices/filterSlice';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1280px;
  margin: 0 auto;
  
  @media (min-width: 992px) {
    padding: 60px 40px;
  }
`;

const ProductListWrapper = styled(Col)`
  margin-top: 20px;
  
  @media (min-width: 992px) {
    margin-top: 0;
  }
`;

export const MarketPlaceModule = () => {

  const { isCollapsed } = useBreakpoint();
  const dispatch = useDispatch();
  
  // Use effect to process URL params whenever they change
  useEffect(() => {
    // Get current URL search params
    const searchParams = new URLSearchParams(window.location.search);
    const urlParams: Record<string, any> = {};
    
    // Extract all URL parameters
    searchParams.forEach((value, key) => {
      if (value.includes(',')) {
        urlParams[key] = value.split(',');
      } else {
        // Parse numbers but keep tier and theme as strings
        if (!isNaN(Number(value)) && key !== 'categories' && key !== 'tier' && key !== 'theme') {
          urlParams[key] = Number(value);
        } else {
          urlParams[key] = value;
        }
      }
    });
    
    // Only dispatch if parameters exist
    if (Object.keys(urlParams).length > 0) {
      console.log('[MarketplaceModule] URL parameters detected:', urlParams);
      dispatch(setFiltersFromUrl(urlParams));
    }
  }, [dispatch, window.location.search]);
  
  // No need for useSyncUrlWithFilters hook as it's handled by Redux middleware now

  return (
    <article>
      <BannerSection />
      <Container>
        {isCollapsed && <FilterMobile />}

        <Row gutter={16}>
          {!isCollapsed && (
            <Col xl={6}>
              <Filter />
            </Col>
          )}
          <ProductListWrapper xl={18} lg={24}>
            {!isCollapsed && <TagCategories />}
            <ProductList />
          </ProductListWrapper>
        </Row>
      </Container>
    </article>
  );
}; 