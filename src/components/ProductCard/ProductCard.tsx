import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  reviewCount?: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  showRating?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  layout = 'grid',
  showRating = true
}) => {
  return (
    <div className={`product-card product-card--${layout}`}>
      <div className="product-card__image">
        <Link href={`/products/${product.id}`}>
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            width={300} 
            height={300}
            className="object-cover"
            priority
          />
        </Link>
        {product.discount && product.discount > 0 && (
          <span className="product-card__discount-badge">
            -{product.discount}%
          </span>
        )}
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-card__price">
          {product.discount && product.discount > 0 && product.originalPrice ? (
            <>
              <span className="product-card__price--original">${product.originalPrice}</span>
              <span className="product-card__price--current">${product.price}</span>
            </>
          ) : (
            <span className="product-card__price--current">${product.price}</span>
          )}
        </div>
        
        {showRating && product.rating && (
          <div className="product-card__rating">
            {/* Rating stars component would go here */}
            <span className="product-card__rating-count">({product.reviewCount || 0})</span>
          </div>
        )}
        
        <button className="product-card__add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard; 