import React, { useState } from "react";
import { Empty, Grid, Input, Button, Alert } from "antd";
import styled from 'styled-components';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { ProductCart } from "../product-cart";
import { useProducts } from "../../../hooks/useProducts";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  position: relative;
  
  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const LoadMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding: 16px;
`;

const LoadMoreButton = styled(Button)`
  background: linear-gradient(91.47deg, rgba(218, 69, 143, 0.3) -6%, rgba(218, 52, 221, 0.3) 113.05%);
  color: white;
  font-weight: 600;
  
  &:hover, &:focus {
    opacity: 0.9;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
  max-width: 500px;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .ant-empty-image {
    height: 120px;
  }
  
  .ant-empty-description {
    color: #89888b;
    font-size: 16px;
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  padding: 24px;
  text-align: center;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ResultsCount = styled.div`
  color: #89888b;
`;

const RefreshButton = styled(Button)`
  display: flex;
  align-items: center;
`;

export const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    products,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refreshData,
    applyFilter,
    isFetchingNextPage,
    lastRefreshed
  } = useProducts({
    autoRefresh: true,
    refreshInterval: 60000, // 60 seconds
    pageSize: 8
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilter({ search: value || undefined });
  };

  // Initial loading state
  if (loading && products.length === 0) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <ErrorContainer>
        <Alert
          message="Error Loading Products"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={() => refreshData()}>
              Try Again
            </Button>
          }
        />
      </ErrorContainer>
    );
  }

  // Empty state
  if (!loading && products.length === 0) {
    return (
      <>
        <SearchContainer>
          <Input.Search
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            enterButton
            prefix={<SearchOutlined />}
            size="large"
          />
        </SearchContainer>
        
        <EmptyContainer>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No products found"
          />
        </EmptyContainer>
      </>
    );
  }

  return (
    <div>
      <SearchContainer>
        <Input.Search
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          enterButton
          prefix={<SearchOutlined />}
          size="large"
        />
      </SearchContainer>
      
      <StatusBar>
        <ResultsCount>
          Showing {products.length} of {totalCount} products
          {lastRefreshed && (
            <span style={{ marginLeft: 8, fontSize: 12, color: '#999' }}>
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </span>
          )}
        </ResultsCount>
        <RefreshButton 
          type="default" 
          icon={<ReloadOutlined />} 
          onClick={() => refreshData()}
          loading={loading && !isFetchingNextPage}
        >
          Refresh
        </RefreshButton>
      </StatusBar>
      
      <GridStyled>
        {products.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </GridStyled>
      
      {hasMore && (
        <LoadMoreButtonWrapper>
          <LoadMoreButton
            type="primary"
            onClick={loadMore}
            loading={isFetchingNextPage}
            disabled={loading || isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </LoadMoreButton>
        </LoadMoreButtonWrapper>
      )}
    </div>
  );
}; 