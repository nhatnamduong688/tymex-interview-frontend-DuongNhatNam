import React from "react";
import styled from "styled-components";
import { TProduct } from '../../types/product';

interface ProductCartProps {
  product: TProduct;
}

const CardContainer = styled.div`
  background: #262c3a;
  box-shadow: 0 1px 2px rgba(0,0,0,0.16);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  height: 365px;
  position: relative;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-8px);
  }
`;

const CardBackground = styled.div`
  position: relative;
  height: 200px;
  background: #1f2432;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 60%;
  max-height: 60%;
  object-fit: contain;
`;

const CardContent = styled.div`
  padding: 14px;
`;

const ProductName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #fbc625;
`;

const CreatorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4CAF50;
  border: 2px solid #262c3a;
`;

const CreatorName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #a9a9b2;
`;

const TagsContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const Tag = styled.span`
  background: rgba(38, 44, 58, 0.6);
  backdrop-filter: blur(4px);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
`;

export const ProductCart: React.FC<ProductCartProps> = ({ product }) => {
  // Kiểm tra null/undefined cho product
  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <CardContainer>
      <CardBackground>
        <BackgroundImage src={product.imageBg} alt={product.name} />
        <ItemImage src={product.imageItem} alt={product.name} />
      </CardBackground>
      
      {product.tags && product.tags.length > 0 && (
        <TagsContainer>
          {product.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}
      
      <CardContent>
        <ProductName>{product.name}</ProductName>
        <PriceContainer>
          <Price>${product.price.toFixed(2)}</Price>
        </PriceContainer>
        <CreatorContainer>
          <AvatarContainer>
            <Avatar src={product.creator.avatar} alt={product.creator.name} />
            {product.creator.isOnline && <OnlineIndicator />}
          </AvatarContainer>
          <CreatorName>{product.creator.name}</CreatorName>
        </CreatorContainer>
      </CardContent>
    </CardContainer>
  );
}; 