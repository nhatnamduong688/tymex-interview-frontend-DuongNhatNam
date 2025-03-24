import { Product } from '../entities/Product';
import { 
  PaginatedProducts, 
  PaginationParams, 
  ProductFilters, 
  ProductRepository, 
  ProductSortOption 
} from '../repositories/ProductRepository';

/**
 * Service for product-related business logic
 */
export class ProductService {
  private repository: ProductRepository;
  
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }
  
  /**
   * Get a product by its ID
   */
  async getProductById(id: string): Promise<Product | null> {
    return this.repository.getById(id);
  }
  
  /**
   * Get a product by its slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.repository.getBySlug(slug);
  }
  
  /**
   * Get a list of products with optional filtering and sorting
   */
  async getProducts(
    filters?: ProductFilters,
    sort?: ProductSortOption,
    pagination?: PaginationParams
  ): Promise<PaginatedProducts> {
    return this.repository.list(filters, sort, pagination);
  }
  
  /**
   * Get related products for a given product
   */
  async getRelatedProducts(productId: string, limit?: number): Promise<Product[]> {
    return this.repository.getRelated(productId, limit);
  }
  
  /**
   * Get featured products
   */
  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    return this.repository.getFeatured(limit);
  }
  
  /**
   * Get new arrivals
   */
  async getNewArrivals(limit?: number): Promise<Product[]> {
    return this.repository.getNewArrivals(limit);
  }
  
  /**
   * Get best sellers
   */
  async getBestSellers(limit?: number): Promise<Product[]> {
    return this.repository.getBestSellers(limit);
  }
  
  /**
   * Filter products by specific criteria with additional business logic
   */
  async filterProductsByCategory(categoryId: string, pagination?: PaginationParams): Promise<PaginatedProducts> {
    const filters: ProductFilters = {
      categoryId,
      inStock: true, // Additional business logic: only show in-stock items
    };
    
    return this.repository.list(filters, 'popularity', pagination);
  }
  
  /**
   * Search products with additional business logic
   */
  async searchProducts(query: string, pagination?: PaginationParams): Promise<PaginatedProducts> {
    if (!query.trim()) {
      // Return featured products if search query is empty
      const featuredProducts = await this.repository.getFeatured(pagination?.perPage || 20);
      return {
        items: featuredProducts,
        total: featuredProducts.length,
        page: pagination?.page || 1,
        perPage: pagination?.perPage || 20,
        totalPages: 1,
      };
    }
    
    const filters: ProductFilters = {
      search: query,
      inStock: true, // Additional business logic: only show in-stock items
    };
    
    return this.repository.list(filters, 'relevance', pagination);
  }
} 