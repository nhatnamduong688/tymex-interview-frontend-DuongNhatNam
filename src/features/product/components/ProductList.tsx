import React from 'react';
import styled from 'styled-components';
import { Product } from '../../../domain/product/entities/Product';
import ProductCard from './ProductCard';
import { Grid } from '../../../design-system/layouts/Grid';
import { Text } from '../../../design-system/primitives/Text';

interface ProductListProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled(Text)`
  margin-bottom: 1.5rem;
`;

const EmptyMessage = styled(Text)`
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const LoadingCard = styled.div`
  height: 350px;
  border-radius: 8px;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ProductList = ({ 
  products, 
  title, 
  emptyMessage = 'No products found',
  isLoading = false,
  columns = 3,
  className,
}: ProductListProps) => {
  return (
    <Container className={className}>
      {title && <Title variant="h3" weight="semibold">{title}</Title>}
      
      {isLoading ? (
        <LoadingContainer>
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </LoadingContainer>
      ) : products.length > 0 ? (
        <Grid columns={columns} gap="lg">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      ) : (
        <EmptyMessage variant="body">{emptyMessage}</EmptyMessage>
      )}
    </Container>
  );
};

export default ProductList; 