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
import { useQueryParams } from '../../hooks/useQueryParams';

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
  const { getParams } = useQueryParams();
  
  // Đọc URL parameters và cập nhật Redux state
  useEffect(() => {
    console.log('MarketPlaceModule useEffect running - Reading URL params');
    
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
  }, [dispatch, getParams]);

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