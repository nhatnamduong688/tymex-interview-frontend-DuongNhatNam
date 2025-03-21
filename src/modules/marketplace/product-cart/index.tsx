import React from 'react';
import styled from 'styled-components';
import { Card, Typography, Button, Tag, Space } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  tags: string[];
  created: string;
}

interface ProductCartProps {
  data: ProductData;
}

const ProductCardStyled = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .ant-card-cover {
    height: 200px;
    overflow: hidden;
  }

  .ant-card-body {
    padding: 16px;
  }

  .ant-card-meta-title {
    margin-bottom: 8px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ant-card-meta-description {
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: #f5f5f5;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #aaa;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 12px;
`;

const Price = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors?.primary || '#1890ff'};
`;

const TagsWrapper = styled.div`
  margin-bottom: 16px;

  .ant-tag {
    margin-bottom: 4px;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  
  .ant-btn {
    flex: 1;
    
    &:first-child {
      margin-right: 8px;
    }
  }
`;

export const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  return (
    <ProductCardStyled
      cover={
        data.imageUrl ? (
          <ProductImage image={data.imageUrl} />
        ) : (
          <ProductImage>🖼️</ProductImage>
        )
      }
      bodyStyle={{ padding: '16px' }}
    >
      <Card.Meta
        title={data.name}
        description={data.description}
      />
      
      <TagsWrapper>
        <Space size={[0, 4]} wrap>
          <Tag color="blue">{data.category}</Tag>
          {data.tags.slice(0, 2).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      </TagsWrapper>
      
      <PriceWrapper>
        <Price>{data.price.toFixed(2)} ETH</Price>
      </PriceWrapper>
      
      <CardActions>
        <Button 
          type="primary" 
          icon={<ShoppingCartOutlined />}
        >
          Buy Now
        </Button>
        <Button
          type="default"
          icon={<HeartOutlined />}
        >
          Save
        </Button>
      </CardActions>
    </ProductCardStyled>
  );
}; 