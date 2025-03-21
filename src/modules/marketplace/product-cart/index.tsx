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

// Styled components
const ProductCardStyled = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconHeartWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  z-index: 2;
`;

const ProductCategoryTag = styled(Tag)`
  position: absolute;
  top: 12px;
  left: 12px;
  border-radius: 20px;
  padding: 2px 10px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  font-weight: 500;
  z-index: 2;
`;

const ProductInfo = styled(Flex)`
  margin-top: 12px;
  padding: 0 4px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 65%;
`;

const ProductPrice = styled(Flex)`
  font-weight: 700;
  font-size: 14px;
`;

const CreatorAvatarContainer = styled(Badge)`
  .ant-badge-count {
    right: 0;
    bottom: 0;
    top: auto;
    padding: 0;
    box-shadow: none;
    background: transparent;
  }
`;

const CreatorAvatarStatus = styled(Avatar)`
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreatorName = styled(Typography.Text)`
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
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