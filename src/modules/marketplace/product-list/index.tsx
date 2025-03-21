import React from 'react';
import { Row, Col, Card, Typography, Empty, Button, Flex, List } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useProducts } from '../../../contexts/productsContext';
import { ProductCart } from "../product-cart";
import { useProduct } from "./hook";
import { Button as CustomButton } from "../../../components/Button";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

const { Title, Text } = Typography;

const ProductCard = styled(Card)`
  margin-bottom: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #aaa;
`;

const PriceTag = styled(Text)`
  font-size: 18px;
  font-weight: 700;
`;

const ProductListContainer = styled.div`
  .ant-empty {
    .ant-typography {
      background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      margin-top: 8px;
    }
  }

  .loading-spinner {
    width: 100%;
    height: 500px;
  }
`;

const LoadMoreButton = styled(Flex)`
  margin: 55px auto 0 !important;

  .ant-btn {
    width: 160px;
  }
`;

export const ProductList: React.FC = () => {
  const { 
    dataProduct, 
    hasMore, 
    fetchNextPage, 
    isLoading, 
    isFetchingNextPage,
    isError,
    error 
  } = useProduct();

  if (isLoading && dataProduct.length === 0) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <Empty
        description={
          <Typography.Title level={4}>
            Error loading products: {error instanceof Error ? error.message : 'Unknown error'}
          </Typography.Title>
        }
      />
    );
  }

  if (dataProduct.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Typography.Title level={4}>
            No items found
          </Typography.Title>
        }
      />
    );
  }

  return (
    <ProductListContainer>
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
        rowKey={(product) => product.created}
        dataSource={dataProduct}
        renderItem={(product) => (
          <List.Item>
            <ProductCart data={product} />
          </List.Item>
        )}
      />
      
      {isFetchingNextPage && <LoadingSpinner />}
      
      {hasMore && !isFetchingNextPage && (
        <LoadMoreButton
          align="center"
          justify="center"
        >
          <CustomButton
            loading={isLoading}
            onClick={() => fetchNextPage()}
            type="primary"
            size="large"
          >
            View more
          </CustomButton>
        </LoadMoreButton>
      )}
    </ProductListContainer>
  );
}; 