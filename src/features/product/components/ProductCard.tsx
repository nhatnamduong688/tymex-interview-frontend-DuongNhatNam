import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Product, getDefaultImage, getDiscountPercentage, isOnSale } from '../../../domain/product/entities/Product';
import { formatPrice } from '../../../utils/formatters';
import { Text } from '../../../design-system/primitives/Text';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: white;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SaleBadge = styled.div`
  background-color: #ff4d4f;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
`;

const NewBadge = styled.div`
  background-color: #1890ff;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled(Text)`
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #1890ff;
`;

const CompareAtPrice = styled.span`
  text-decoration: line-through;
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const ProductCard = ({ product, className }: ProductCardProps) => {
  const isNew = new Date().getTime() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
  const discountPercentage = getDiscountPercentage(product);
  const productOnSale = isOnSale(product);
  
  return (
    <Link href={`/products/${product.slug}`} passHref legacyBehavior>
      <a style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <Card className={className}>
          <ImageContainer>
            <StyledImage
              src={getDefaultImage(product)}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <BadgeContainer>
              {productOnSale && discountPercentage && (
                <SaleBadge>{`-${discountPercentage}%`}</SaleBadge>
              )}
              {isNew && <NewBadge>New</NewBadge>}
            </BadgeContainer>
          </ImageContainer>
          <Content>
            <Title variant="body" weight="medium">{product.name}</Title>
            <PriceContainer>
              <Price>{formatPrice(product.price, product.currency)}</Price>
              {productOnSale && product.compareAtPrice && (
                <CompareAtPrice>
                  {formatPrice(product.compareAtPrice, product.currency)}
                </CompareAtPrice>
              )}
            </PriceContainer>
          </Content>
        </Card>
      </a>
    </Link>
  );
};

export default ProductCard; 