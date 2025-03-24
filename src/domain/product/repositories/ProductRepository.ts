import { Product } from '../entities/Product';

/**
 * Filter parameters for product queries
 */
export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  attributes?: Record<string, string[]>;
  inStock?: boolean;
  onSale?: boolean;
  search?: string;
}

/**
 * Sort options for product lists
 */
export type ProductSortOption = 
  | 'price_asc' 
  | 'price_desc' 
  | 'name_asc' 
  | 'name_desc' 
  | 'newest' 
  | 'popularity';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  perPage: number;
}

/**
 * Result of a paginated product query
 */
export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Repository interface for product data access
 */
export interface ProductRepository {
  /**
   * Get a product by its ID
   */
  getById(id: string): Promise<Product | null>;
  
  /**
   * Get a product by its slug
   */
  getBySlug(slug: string): Promise<Product | null>;
  
  /**
   * Get a paginated list of products with optional filtering and sorting
   */
  list(
    filters?: ProductFilters,
    sort?: ProductSortOption,
    pagination?: PaginationParams
  ): Promise<PaginatedProducts>;
  
  /**
   * Get related products for a given product
   */
  getRelated(productId: string, limit?: number): Promise<Product[]>;
  
  /**
   * Get featured products
   */
  getFeatured(limit?: number): Promise<Product[]>;
  
  /**
   * Get new arrivals
   */
  getNewArrivals(limit?: number): Promise<Product[]>;
  
  /**
   * Get best sellers
   */
  getBestSellers(limit?: number): Promise<Product[]>;
} 