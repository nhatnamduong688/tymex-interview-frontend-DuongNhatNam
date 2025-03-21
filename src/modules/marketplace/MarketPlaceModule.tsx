import React from 'react';
import { Col, Row } from "antd";
import { BannerSection } from "./banner-section";
import { Filter } from "./filter";
import { FilterMobile } from "./filter-mobile";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { TagCategories } from "./tag-categories";
import { ProductList } from "./product-list";
import { ProductsProvider } from "../../contexts/productsContext";
import styled from "styled-components";

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

  return (
    <ProductsProvider>
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
    </ProductsProvider>
  );
}; 