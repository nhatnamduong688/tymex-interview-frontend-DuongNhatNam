import React from 'react';
import { Avatar, Badge, Card, Flex, Tag, Typography } from "antd";
import styled from 'styled-components';

// Mock icons until we have the real icon components
const IHeart = () => <span>❤️</span>;
const IOnline = () => <span style={{ color: 'green', fontSize: '8px' }}>●</span>;
const IOffline = () => <span style={{ color: 'gray', fontSize: '8px' }}>●</span>;

// Types
interface TProduct {
  id?: string;
  nameItem?: string;
  backgroundItem?: string;
  item?: string;
  price: number;
  category?: string;
  nameCreator?: string;
  statusOnline?: boolean;
  created?: string;
  tags?: string[];
  description?: string;
}

// Breakpoint for mobile
const breakpointSm = '576px';

// Styled components
const ProductCardStyled = styled(Card)`
  background: #3a384199 !important;
  border-radius: 10px;
  border: none !important;
  padding: 16px !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  height: 100%;
  
  .ant-card-body {
    padding: 0 !important;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: ${breakpointSm}) {
    padding: 8px !important;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
`;

const ImageProduct = styled.div`
  position: absolute;
  inset: 0;
  object-fit: cover;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageProductItem = styled.div`
  width: 72%;
  height: 72%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconHeartWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 2;
  
  @media (max-width: ${breakpointSm}) {
    top: 16px;
    right: 16px;
  }
`;

const ProductCategoryTag = styled(Tag)`
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 12px;
  font-weight: 500;
  background: #313b4580;
  border: none;
  padding: 4px 12px;
  margin: 0;
  z-index: 2;
  
  @media (max-width: ${breakpointSm}) {
    top: 12px;
    left: 12px;
    font-size: 10px;
  }
`;

const ProductInfo = styled(Flex)`
  margin-top: 24px;
  margin-bottom: 12px;
  
  @media (max-width: ${breakpointSm}) {
    margin-top: 14px;
    margin-bottom: 6px;
  }
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  
  @media (max-width: ${breakpointSm}) {
    font-size: 12px;
  }
`;

const ProductPrice = styled(Flex)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  flex: 0 0 max-content;
  
  @media (max-width: ${breakpointSm}) {
    font-size: 10px;
  }
`;

const CreatorAvatarContainer = styled(Badge)`
  .ant-avatar {
    background-color: #f3f3f3;
  }
  
  .ant-badge-count {
    right: 0;
    bottom: 0;
    top: unset;
    padding: 0;
    box-shadow: none;
    background: transparent;
    transform: unset;
  }
`;

const CreatorAvatarStatus = styled(Avatar)`
  background: #17161a;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  top: unset;
  transform: unset;
`;

const CreatorName = styled(Typography.Text)`
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  max-width: calc(100% - 50px);
`;

const EthereumIcon = styled.img`
  width: 8px;
  height: 12px;
`;

export const IconEthereum = () => (
  <EthereumIcon
    src="/assets/icons/ethereum.svg"
    alt="icon-ethereum"
  />
);

export const ProductCart = ({ data }: { data: TProduct }) => {
  return (
    <ProductCardStyled>
      <ImageWrapper>
        <ImageProduct>
          <BackgroundImage
            src={
              data.backgroundItem
                ? `/assets/images/${data.backgroundItem}.png`
                : `/assets/images/bg-item-1.png`
            }
            alt="item-nft"
          />
          <ImageProductItem>
            <ItemImage
              src={
                data.item
                  ? `/assets/images/${data.item}.png`
                  : `/assets/images/item-1.png`
              }
              alt="item-nft"
            />
          </ImageProductItem>
        </ImageProduct>
      </ImageWrapper>

      <IconHeartWrapper>
        <IHeart />
      </IconHeartWrapper>

      {data.category && (
        <ProductCategoryTag>{data.category}</ProductCategoryTag>
      )}

      <ProductInfo
        align="flex-start"
        justify="space-between"
        gap={12}
      >
        <ProductName>{data?.nameItem}</ProductName>
        <ProductPrice gap={8} align="center">
          <IconEthereum />
          <span>{formatPrice(data.price)}</span>
        </ProductPrice>
      </ProductInfo>

      <Flex align="center" gap={12} style={{ marginTop: '8px' }}>
        <CreatorAvatarContainer
          count={
            <CreatorAvatarStatus
              size={12}
              icon={data.statusOnline ? <IOnline /> : <IOffline />}
            />
          }
        >
          <Avatar src={"/assets/images/avt-creator.png"} size={32} />
        </CreatorAvatarContainer>
        <CreatorName ellipsis>
          {data.nameCreator}
        </CreatorName>
      </Flex>
    </ProductCardStyled>
  );
};

// Utility function for price formatting
const formatPrice = (price: number): string => {
  return price.toFixed(2);
}; 