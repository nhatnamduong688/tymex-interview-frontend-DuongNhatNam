import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Empty, Flex, List, Typography } from 'antd';
import { ProductCart } from '../product-cart';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { fetchProducts, fetchMoreProducts } from '../../../store/slices/productsSlice';
import { TProduct } from '../../../types/product';
import { Button } from '../../../components/Button';

// Root container for product list with the new styling
const ProductListContainer = styled.div`
  .btn-load-more {
    margin: 55px auto 0 !important;

    .ant-btn {
      width: 160px;
    }
  }

  .ant-empty {
    .ant-typography {
      background: linear-gradient(
        91.47deg,
        #da458f -6%,
        #da34dd 113.05%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 8px;
    }
  }

  .loading-spinner {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

export const ProductList = () => {
  const dispatch = useAppDispatch();
  
  // Get products state from Redux
  const { 
    data: products = [], 
    loading = false, 
    error = null, 
    hasMore = false,
    isFetchingNextPage = false 
  } = useAppSelector((state: RootState) => state.products);
  
  const { appliedFilters } = useAppSelector((state: RootState) => state.filter);
  
  // Prefetch images for products to prevent white flashes during scrolling
  useEffect(() => {
    if (products.length > 0) {
      products.forEach((product: TProduct) => {
        if (product.imageBg) {
          const img = new Image();
          img.src = product.imageBg;
        }
        if (product.imageItem) {
          const bgImg = new Image();
          bgImg.src = product.imageItem;
        }
      });
    }
  }, [products]);
  
  // Fetch products when component mounts or appliedFilters change
  useEffect(() => {
    console.log("Fetching products with filters:", appliedFilters);
    dispatch(fetchProducts());
  }, [dispatch, appliedFilters]);

  // Handle fetch more products
  const fetchNextPage = () => {
    dispatch(fetchMoreProducts());
  };

  return (
    <ProductListContainer>
      {loading && products.length > 0 && <LoadingSpinner />}
      {!loading && (
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          itemLayout="horizontal"
          rowKey={(product) => product.id}
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <ProductCart product={product} />
            </List.Item>
          )}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Typography.Title level={4}>
                    No items found
                  </Typography.Title>
                }
              />
            ),
          }}
        />
      )}
      {hasMore && (
        <Flex
          align="center"
          justify="center"
          className="btn-load-more"
        >
          <Button
            loading={isFetchingNextPage}
            onClick={fetchNextPage}
            type="primary"
            size="large"
          >
            View more
          </Button>
        </Flex>
      )}
    </ProductListContainer>
  );
}; 