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

const MarketplaceContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: rgba(12, 13, 26, 0.95);
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
`;

const ContentArea = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: transparent;
  will-change: transform;
  contain: content;
  
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
  
  // Effect để đọc các tham số filter từ URL khi component mount
  useEffect(() => {
    // Get query params from URL and convert to object
    const queryString = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString);
    const params = Object.fromEntries(urlSearchParams.entries());
    
    // Dispatch with empty object if no params found
    dispatch(setFiltersFromUrl(params || {}));
  }, [dispatch]);
  
  // Preload background images để tránh flash
  useEffect(() => {
    // Preload các assets cần thiết
    const imagesToPreload = [
      '/assets/images/custom/space-background.jpg',
      '/assets/images/section-frame.png'
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  return (
    <MarketplaceContainer>
      <BannerSection />
      <ContentArea>
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
      </ContentArea>
    </MarketplaceContainer>
  );
}; 