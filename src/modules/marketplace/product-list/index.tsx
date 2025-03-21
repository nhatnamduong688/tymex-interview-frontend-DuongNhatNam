import React, { useEffect, useState, useRef, useCallback } from "react";
import { Empty, Grid, List, Skeleton } from "antd";
import VirtualList from 'rc-virtual-list';
import styled from 'styled-components';
import { ProductCart } from "../product-cart";
import { useProduct } from "./hook";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

const { useBreakpoint } = Grid;

const ContainerHeight = 800;

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

const LoadMoreButton = styled.button`
  background: linear-gradient(91.47deg, rgba(218, 69, 143, 0.3) -6%, rgba(218, 52, 221, 0.3) 113.05%);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  padding: 12px 24px;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
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

export const ProductList: React.FC = () => {
  const { dataProduct, hasMore, fetchNextPage, isLoading, isFetchingNextPage, isError } = useProduct();
  const loadingRef = useRef<HTMLDivElement>(null);
  const screens = useBreakpoint();
  const [columnCount, setColumnCount] = useState(4);

  // Update columns based on breakpoints
  useEffect(() => {
    if (screens.xs) {
      setColumnCount(1);
    } else if (screens.sm) {
      setColumnCount(2);
    } else if (screens.lg) {
      setColumnCount(3);
    } else {
      setColumnCount(4);
    }
  }, [screens]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [fetchNextPage, hasMore, isLoading, isFetchingNextPage]);

  // Handle manual load more
  const handleLoadMore = useCallback(() => {
    if (!isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isLoading, isFetchingNextPage]);

  if (isLoading && dataProduct.length === 0) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <EmptyContainer>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Error loading products. Please try again later."
        />
      </EmptyContainer>
    );
  }

  if (dataProduct.length === 0) {
    return (
      <EmptyContainer>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No products found."
        />
      </EmptyContainer>
    );
  }

  return (
    <>
      <GridStyled>
        {dataProduct.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </GridStyled>
      
      {hasMore && (
        <LoadMoreButtonWrapper ref={loadingRef}>
          <LoadMoreButton 
            onClick={handleLoadMore} 
            disabled={isLoading || isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </LoadMoreButton>
        </LoadMoreButtonWrapper>
      )}
    </>
  );
}; 