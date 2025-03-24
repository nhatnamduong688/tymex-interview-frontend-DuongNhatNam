import { Product } from '../../domain/product/entities/Product';
import { 
  PaginatedProducts, 
  PaginationParams, 
  ProductFilters, 
  ProductRepository, 
  ProductSortOption 
} from '../../domain/product/repositories/ProductRepository';
import { API_ENDPOINTS } from '../../utils/constants';

/**
 * API implementation of the ProductRepository
 */
export class ProductApiRepository implements ProductRepository {
  private readonly baseUrl: string;
  
  constructor(baseUrl: string = API_ENDPOINTS.PRODUCTS) {
    this.baseUrl = baseUrl;
  }
  
  /**
   * Convert API response to domain Product
   */
  private mapToDomain(data: any): Product {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }
  
  /**
   * Build query string from filters, sort, and pagination
   */
  private buildQueryString(
    filters?: ProductFilters,
    sort?: ProductSortOption,
    pagination?: PaginationParams
  ): string {
    const params = new URLSearchParams();
    
    // Add filters
    if (filters) {
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.tags?.length) filters.tags.forEach(tag => params.append('tags', tag));
      if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString());
      if (filters.onSale !== undefined) params.append('onSale', filters.onSale.toString());
      if (filters.search) params.append('search', filters.search);
      
      // Handle attributes
      if (filters.attributes) {
        Object.entries(filters.attributes).forEach(([key, values]) => {
          values.forEach(value => params.append(`attr_${key}`, value));
        });
      }
    }
    
    // Add sort
    if (sort) params.append('sort', sort);
    
    // Add pagination
    if (pagination) {
      params.append('page', pagination.page.toString());
      params.append('perPage', pagination.perPage.toString());
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }
  
  /**
   * Get a product by its ID
   */
  async getById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch product with ID ${id}`);
      }
      
      const data = await response.json();
      return this.mapToDomain(data);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  }
  
  /**
   * Get a product by its slug
   */
  async getBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.baseUrl}/slug/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch product with slug ${slug}`);
      }
      
      const data = await response.json();
      return this.mapToDomain(data);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  }
  
  /**
   * Get a paginated list of products with optional filtering and sorting
   */
  async list(
    filters?: ProductFilters,
    sort?: ProductSortOption,
    pagination: PaginationParams = { page: 1, perPage: 20 }
  ): Promise<PaginatedProducts> {
    try {
      const queryString = this.buildQueryString(filters, sort, pagination);
      const response = await fetch(`${this.baseUrl}${queryString}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      
      return {
        items: data.items.map(this.mapToDomain),
        total: data.total,
        page: data.page,
        perPage: data.perPage,
        totalPages: data.totalPages,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        items: [],
        total: 0,
        page: pagination.page,
        perPage: pagination.perPage,
        totalPages: 0,
      };
    }
  }
  
  /**
   * Get related products for a given product
   */
  async getRelated(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${productId}/related?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch related products for ${productId}`);
      }
      
      const data = await response.json();
      return data.map(this.mapToDomain);
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  }
  
  /**
   * Get featured products
   */
  async getFeatured(limit: number = 8): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/featured?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured products');
      }
      
      const data = await response.json();
      return data.map(this.mapToDomain);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }
  
  /**
   * Get new arrivals
   */
  async getNewArrivals(limit: number = 8): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/new-arrivals?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch new arrivals');
      }
      
      const data = await response.json();
      return data.map(this.mapToDomain);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      return [];
    }
  }
  
  /**
   * Get best sellers
   */
  async getBestSellers(limit: number = 8): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/best-sellers?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch best sellers');
      }
      
      const data = await response.json();
      return data.map(this.mapToDomain);
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      return [];
    }
  }
} 