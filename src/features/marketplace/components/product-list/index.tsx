import React, { useEffect, useRef, useState } from 'react';
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
import { FixedSizeGrid } from 'react-window';
import useWindowSize from '../../../../shared/hooks/useWindowSize';

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
  background-color: transparent;
  will-change: transform;
  contain: content;
  transform: translateZ(0);
  backface-visibility: hidden;
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
  background-color: rgba(12, 13, 26, 0.8); /* Đậm hơn để tránh thấy nền trắng */
  backdrop-filter: blur(5px); /* Thêm hiệu ứng blur để nổi bật nội dung */
  min-height: 100vh;
  padding-bottom: 50px;
  overflow: visible;
  position: relative;
  z-index: 1;
  transform: translateZ(0);
  will-change: transform;
  contain: paint layout;
  
  /* Đảm bảo nền kéo dài khi có nhiều sản phẩm */
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 300px; /* Tăng kích thước để đảm bảo phủ khi scroll */
    background-color: rgba(12, 13, 26, 0.8);
    z-index: -1;
  }
`;

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const { screens } = useBreakpoint();
  const windowSize = useWindowSize();
  
  // Dùng ref để theo dõi lần load đầu tiên
  const isInitialMount = useRef(true);
  const gridRef = useRef(null);
  
  // Local state for grid dimensions
  const [gridDimensions, setGridDimensions] = useState({ width: 0, height: 0 });
  
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
  
  // Calculate columns based on screen size
  const getColumns = () => {
    if (screens.xxl) return 4;
    if (screens.xl) return 3;
    if (screens.md) return 2;
    return 1;
  };

  const columns = getColumns();
  const itemHeight = 385; // Height of a product card + gap
  
  // Update grid dimensions when window size changes
  useEffect(() => {
    if (windowSize.width) {
      setGridDimensions({
        width: Math.min(windowSize.width - 32, 1200), // Max width with padding
        height: Math.min(windowSize.height * 0.7, 800) // Limit height to 70% of viewport or 800px
      });
    }
  }, [windowSize]);
  
  // Fetch products when component mounts or appliedFilters change
  useEffect(() => {
    console.log("Fetching products with filters:", appliedFilters);
    dispatch(fetchProducts());
  }, [dispatch, appliedFilters]);
  
  console.log("ProductList render với", products.length, "sản phẩm:", products);
  console.log("Filters từ Redux:", appliedFilters);
  
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

  // Prefetch images for products to prevent white flashes during scrolling
  useEffect(() => {
    if (products.length > 0) {
      products.forEach((product: TProduct) => {
        if (product.image) {
          const img = new Image();
          img.src = product.image;
        }
        if (product.backgroundImage) {
          const bgImg = new Image();
          bgImg.src = product.backgroundImage;
        }
      });
    }
  }, [products]);

  const activeFilters = getActiveFilters();
  const hasFilters = activeFilters.length > 0;

  // Render a cell in the virtualized grid
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const itemIndex = rowIndex * columns + columnIndex;
    if (itemIndex >= products.length) return null;
    
    const product = products[itemIndex];
    return (
      <div style={{...style, padding: '8px'}}>
        <ProductCart product={product} />
      </div>
    );
  };

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
                  <span>Active filters: {activeFilters.join(', ')}</span>
                  <ClearFilters onClick={handleClearFilters}>Clear all filters</ClearFilters>
                </FilterSummary>
              )}
              
              <TotalResults>Found {totalCount} products</TotalResults>
              
              {gridDimensions.width > 0 && (
                <FixedSizeGrid
                  ref={gridRef}
                  columnCount={columns}
                  columnWidth={(gridDimensions.width / columns) - 8}
                  height={gridDimensions.height}
                  rowCount={Math.ceil(products.length / columns)}
                  rowHeight={itemHeight}
                  width={gridDimensions.width}
                  overscanRowCount={2}
                  style={{ margin: '0 auto' }}
                >
                  {Cell}
                </FixedSizeGrid>
              )}
              
              {hasMore && (
                <LoadMoreButton 
                  type="primary" 
                  loading={isFetchingNextPage} 
                  onClick={loadMore}
                >
                  Load More
                </LoadMoreButton>
              )}
            </ProductsContainer>
          </>
        )}
      </StyledProductList>
    </ProductListBackgroundWrapper>
  );
}; 