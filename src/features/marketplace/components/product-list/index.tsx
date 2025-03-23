import React, { useEffect } from 'react';
import { Empty, Flex, List, Typography } from 'antd';
import { ProductCart } from '../product-cart';
import { TProduct } from '../../types/product';
import { LoadingSpinner } from '../../../../shared/components/LoadingSpinner';
import { Button } from '../../../../shared/components/Button';
import { useProduct } from './hook';
import styles from './scss/ProductList.module.scss';

export const ProductList = () => {
  const { dataProduct, hasMore, fetchNextPage, isLoading, isFetchingNextPage } = useProduct();
  
  // Prefetch images for products to prevent white flashes during scrolling
  useEffect(() => {
    if (dataProduct.length > 0) {
      dataProduct.forEach((product: TProduct) => {
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
  }, [dataProduct]);

  return (
    <div className={styles["product-list-container"]}>
      {isLoading && dataProduct.length > 0 && <LoadingSpinner />}
      {!isLoading && (
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
          dataSource={dataProduct}
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
    </div>
  );
}; 