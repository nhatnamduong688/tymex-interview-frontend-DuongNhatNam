import React from 'react';
import { Row, Col, Card, Typography, Empty, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useProducts } from '../../../contexts/productsContext';

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

export const ProductList: React.FC = () => {
  const { filteredProducts, loading } = useProducts();

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (filteredProducts.length === 0) {
    return (
      <Empty
        description="No products found with the selected filters"
        style={{ margin: '40px 0' }}
      />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {filteredProducts.map(product => (
        <Col xs={24} sm={12} md={8} key={product.id}>
          <ProductCard
            cover={
              <ProductImage>
                🖼️
              </ProductImage>
            }
            actions={[
              <Button type="primary" icon={<ShoppingCartOutlined />} key="buy">
                Buy Now
              </Button>
            ]}
          >
            <Card.Meta
              title={product.name}
              description={product.description}
            />
            <div style={{ marginTop: '16px' }}>
              <PriceTag>{product.price} ETH</PriceTag>
            </div>
          </ProductCard>
        </Col>
      ))}
    </Row>
  );
}; 