import React, { memo } from "react";
import styled from "styled-components";
import { TProduct } from '../../types/product';

interface ProductCartProps {
  product: TProduct;
}

const CardContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: rgba(20, 25, 50, 0.7);
  will-change: transform, opacity;
  contain: content;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(60, 80, 150, 0.2);
  width: 100%;
  height: 365px;
  transform: translateZ(0);
  backface-visibility: hidden;
  
  &:hover {
    transform: translateY(-5px) translateZ(0);
    box-shadow: 0 12px 30px rgba(0, 20, 80, 0.5);
  }
`;

const CardBackground = styled.div`
  position: relative;
  height: 200px;
  background: #1f2432;
  overflow: hidden;
  will-change: contents;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #1f2432;
  will-change: transform;
  transform: translateZ(0);
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

// Using React.memo to prevent unnecessary re-renders of product cards
export const ProductCart = memo<ProductCartProps>(({ product }) => {
  // Kiểm tra null/undefined cho product
  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <CardContainer>
      <CardBackground>
        <BackgroundImage 
          src={product.imageBg} 
          alt={product.name}
          loading="lazy" 
          decoding="async"
        />
        <ItemImage 
          src={product.imageItem} 
          alt={product.name}
          loading="lazy"
          decoding="async" 
        />
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
            <Avatar 
              src={product.creator.avatar} 
              alt={product.creator.name}
              loading="lazy" 
            />
            {product.creator.isOnline && <OnlineIndicator />}
          </AvatarContainer>
          <CreatorName>{product.creator.name}</CreatorName>
        </CreatorContainer>
      </CardContent>
    </CardContainer>
  );
}); 