/**
 * Product domain entity
 */

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isDefault: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  isAvailable: boolean;
  attributes: Record<string, string>;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  categories: ProductCategory[];
  tags: string[];
  variants?: ProductVariant[];
  attributes: Record<string, string>;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Check if a product is on sale
 */
export const isOnSale = (product: Product): boolean => {
  return !!product.compareAtPrice && product.compareAtPrice > product.price;
};

/**
 * Calculate discount percentage for a product
 */
export const getDiscountPercentage = (product: Product): number | null => {
  if (!isOnSale(product) || !product.compareAtPrice) return null;
  
  return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
};

/**
 * Get the default product image or a placeholder
 */
export const getDefaultImage = (product: Product): string => {
  const defaultImage = product.images.find(img => img.isDefault);
  if (defaultImage) return defaultImage.url;
  
  return product.images.length > 0 
    ? product.images[0].url 
    : 'https://via.placeholder.com/300';
}; 