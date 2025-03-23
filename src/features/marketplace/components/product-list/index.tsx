import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Skeleton, Input, Flex, Typography, Button, Empty, Alert, Space, Grid, Row, Col, Spin } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import { ProductCart } from '../product-cart';
import { useBreakpoint } from '../../../../shared/hooks/useBreakpoint';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks';
import { RootState } from '../../store';
import { fetchProducts, fetchMoreProducts } from '../../store/productsSlice';
import { resetFilter } from '../../store/filterSlice';
import { TProduct } from '../../types/product';

// Styled components
const StyledProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ProductGrid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, 1fr);
  gap: 16px;
  background-color: #242424;
  will-change: transform;
  contain: content;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const NoResultsContainer = styled.div`
  padding: 24px;
  background-color: #242424;
  border-radius: 8px;
  text-align: center;
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  justify-content: center;
`;

const FilterTag = styled.div`
  background-color: #333;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #ccc;
`;

const RetryButton = styled(Button)`
  margin-top: 16px;
`;

const ProductsContainer = styled.div`
  margin-top: 20px;
  background-color: transparent;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background-color: transparent;
`;

const FilterSummary = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  color: #ccc;
`;

const ClearFilters = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 14px;
  margin-left: 8px;

  &:hover {
    color: #40a9ff;
  }
`;

const LoadMoreButton = styled(Button)`
  margin: 24px auto;
  display: block;
`;

const TotalResults = styled.div`
  margin-bottom: 16px;
  color: #ccc;
`;

// Thêm styled component mới để bọc StyledProductList
const ProductListBackgroundWrapper = styled.div`
  background-color: #242424; /* Luôn đảm bảo có nền */
  min-height: 100vh; /* Luôn đủ cao để che phủ khi cuộn */
  padding-bottom: 50px; /* Thêm padding để đảm bảo nền mở rộng xuống dưới */
  overflow: visible;
  position: relative;
  z-index: 1;
  
  /* Đảm bảo nền kéo dài khi có nhiều sản phẩm */
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 200px; /* Mở rộng thêm nền xuống dưới */
    background-color: #242424;
    z-index: -1;
  }
`;

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { screens } = useBreakpoint();
  
  // Dùng ref để theo dõi lần load đầu tiên
  const isInitialMount = useRef(true);
  
  // Get products state from Redux
  const { 
    data: products = [], 
    loading = false, 
    error = null, 
    hasMore = false, 
    totalCount = 0, 
    isFetchingNextPage = false 
  } = useAppSelector((state: RootState) => state.products);
  
  // Get filter state from Redux
  const { appliedFilters = {} } = useAppSelector((state: RootState) => state.filter);
  
  // Fetch products when component mounts or appliedFilters change
  useEffect(() => {
    // Luôn fetch products khi component mount hoặc filters thay đổi
    console.log("Fetching products with filters:", appliedFilters);
    dispatch(fetchProducts());
  }, [dispatch, appliedFilters]);
  
  console.log("ProductList render với", products.length, "sản phẩm:", products);
  console.log("Filters từ Redux:", appliedFilters);
  
  // Calculate columns based on screen size
  const getColumns = () => {
    if (screens.xxl) return 4;
    if (screens.xl) return 3;
    if (screens.md) return 2;
    return 1;
  };

  // Convert filter state to readable format
  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (appliedFilters.search) {
      activeFilters.push(`Search: "${appliedFilters.search}"`);
    }
    
    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      activeFilters.push(`Categories: ${appliedFilters.categories.join(', ')}`);
    }
    
    if (appliedFilters.tier) {
      activeFilters.push(`Tier: ${appliedFilters.tier}`);
    }
    
    if (appliedFilters.theme) {
      activeFilters.push(`Theme: ${appliedFilters.theme}`);
    }
    
    if (appliedFilters.priceRange) {
      activeFilters.push(`Price: $${appliedFilters.priceRange[0]} - $${appliedFilters.priceRange[1]}`);
    }
    
    return activeFilters;
  };
  
  // Clear all filters and refresh products
  const handleClearFilters = () => {
    dispatch(resetFilter());
  };
  
  // Retry loading products
  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  // Load more products when clicking "Load More"
  const loadMore = () => {
    console.log("Dispatching fetchMoreProducts");
    dispatch(fetchMoreProducts());
  };

  const activeFilters = getActiveFilters();
  const hasFilters = activeFilters.length > 0;

  if (loading && !products.length) {
    return (
      <ProductListBackgroundWrapper>
        <EmptyContainer>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: '#ccc' }}>Loading products...</div>
        </EmptyContainer>
      </ProductListBackgroundWrapper>
    );
  }

  if (error) {
    return (
      <ProductListBackgroundWrapper>
        <EmptyContainer>
          <Empty
            description={
              <div>
                <div>Error loading products: {error}</div>
                <RetryButton type="primary" onClick={handleRetry}>
                  Retry
                </RetryButton>
              </div>
            }
          />
        </EmptyContainer>
      </ProductListBackgroundWrapper>
    );
  }

  return (
    <ProductListBackgroundWrapper>
      <StyledProductList>
        <SearchContainer>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRetry}
            loading={loading && !isFetchingNextPage}
          >
            Refresh
          </Button>
        </SearchContainer>

        {/* Error handling with retry option */}
        {error && (
          <Alert
            message="Error Loading Products"
            description={
              <Space direction="vertical">
                <Typography.Text>{error}</Typography.Text>
                <RetryButton 
                  type="primary" 
                  icon={<ReloadOutlined />} 
                  onClick={handleRetry}
                >
                  Retry Now
                </RetryButton>
              </Space>
            }
            type="error"
            showIcon
          />
        )}

        {/* Loading state */}
        {loading && !isFetchingNextPage && !error && (
          <ProductGrid $cols={getColumns()}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} active paragraph={{ rows: 4 }} />
            ))}
          </ProductGrid>
        )}

        {/* Empty state with active filters */}
        {!loading && !error && products.length === 0 && (
          <NoResultsContainer>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Typography.Text strong style={{ fontSize: '16px', color: '#ccc' }}>
                  No products found
                </Typography.Text>
              }
            />
            
            {hasFilters && (
              <>
                <Typography.Text type="secondary" style={{ display: 'block', marginTop: '12px', color: '#aaa' }}>
                  No products match your current filters:
                </Typography.Text>
                
                <ActiveFiltersContainer>
                  {activeFilters.map((filter, index) => (
                    <FilterTag key={index}>
                      {filter}
                    </FilterTag>
                  ))}
                </ActiveFiltersContainer>
                
                <ClearFilters onClick={handleClearFilters}>Clear filters</ClearFilters>
              </>
            )}
          </NoResultsContainer>
        )}

        {/* Product grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <ProductsContainer>
              {hasFilters && (
                <FilterSummary>
                  <div style={{ color: '#ccc' }}>Active filters: </div>
                  {activeFilters.map((filter, index) => (
                    <FilterTag key={index}>{filter}</FilterTag>
                  ))}
                  <ClearFilters onClick={handleClearFilters}>Clear all</ClearFilters>
                </FilterSummary>
              )}

              <TotalResults>
                Showing {products.length} of {totalCount} products
              </TotalResults>

              <ProductGrid $cols={getColumns()}>
                {products.map((product: TProduct) => (
                  <ProductCart key={product.id} product={product} />
                ))}
              </ProductGrid>
            </ProductsContainer>

            {hasMore && (
              <LoadMoreContainer>
                <LoadMoreButton 
                  type="primary" 
                  loading={isFetchingNextPage}
                  onClick={loadMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                </LoadMoreButton>
              </LoadMoreContainer>
            )}
          </>
        )}
      </StyledProductList>
    </ProductListBackgroundWrapper>
  );
}; 