import React from 'react';

interface ProductListSkeletonProps {
  count?: number;
  layout?: 'grid' | 'list';
}

export const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({
  count = 8,
  layout = 'grid'
}) => {
  return (
    <div className={`product-list-skeleton product-list-skeleton--${layout}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="product-skeleton">
          <div className="product-skeleton__image animate-pulse"></div>
          <div className="product-skeleton__content">
            <div className="product-skeleton__title animate-pulse"></div>
            <div className="product-skeleton__price animate-pulse"></div>
            {layout === 'list' && (
              <div className="product-skeleton__description animate-pulse"></div>
            )}
            <div className="product-skeleton__button animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton; 