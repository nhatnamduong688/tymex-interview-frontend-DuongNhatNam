import React, { useEffect } from 'react';
import { Col, Row } from "antd";
import { BannerSection } from "./components/banner-section";
import { Filter } from "./components/filter-form";
import { FilterMobile } from "./components/filter-mobile";
import { useBreakpoint } from "../../shared/hooks/useBreakpoint";
import { TagCategories } from "./components/tag-categories";
import { ProductList } from "./components/product-list";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { setFiltersFromUrl } from './store/filterSlice';

// Enhanced container with better background gradients and responsive design
const MarketplaceContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: rgba(12, 13, 26, 0.95);
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  /* Fallback background with gradient */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #0c0d1a, #1a1c30);
    z-index: -1;
  }
`;

// Enhanced content area with better spacing on different devices
const ContentArea = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: transparent;
  will-change: transform;
  contain: content;
  
  @media (min-width: 768px) {
    padding: 50px 30px;
  }
  
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

  return (
    <MarketplaceContainer>
      <BannerSection />
      <ContentArea>
        {isCollapsed && <FilterMobile />}

        <Row gutter={16}>
          {!isCollapsed && (
            <Col xl={6} lg={8}>
              <Filter />
            </Col>
          )}
          <ProductListWrapper xl={18} lg={isCollapsed ? 24 : 16} xs={24}>
            {!isCollapsed && <TagCategories />}
            <ProductList />
          </ProductListWrapper>
        </Row>
      </ContentArea>
    </MarketplaceContainer>
  );
}; 