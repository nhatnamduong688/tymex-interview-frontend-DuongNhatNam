import { ApiService } from './ApiService';
import { API_ENDPOINTS } from './endpoints';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  images: string[];
  categoryId: string;
  category?: string;
  attributes?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
  onSale?: boolean;
  tags?: string[];
}

export interface PaginationOptions {
  page: number;
  perPage: number;
}

export type SortOrder = 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating';

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export class ProductApiRepository {
  private apiService: ApiService;
  
  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }
  
  async getById(id: string): Promise<Product> {
    return this.apiService.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  }
  
  async getBySlug(slug: string): Promise<Product> {
    return this.apiService.get<Product>(`${API_ENDPOINTS.PRODUCTS}/slug/${slug}`);
  }
  
  async list(
    filters?: ProductFilters,
    sort?: SortOrder,
    pagination?: PaginationOptions
  ): Promise<ProductListResponse> {
    return this.apiService.get<ProductListResponse>(API_ENDPOINTS.PRODUCTS, {
      ...filters,
      sort,
      ...pagination,
    });
  }
  
  async getFeatured(limit: number = 8): Promise<Product[]> {
    return this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/featured`, { limit });
  }
  
  async getNewArrivals(limit: number = 8): Promise<Product[]> {
    return this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/new-arrivals`, { limit });
  }
  
  async getBestSellers(limit: number = 8): Promise<Product[]> {
    return this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/best-sellers`, { limit });
  }
  
  async getRelated(productId: string, limit: number = 4): Promise<Product[]> {
    return this.apiService.get<Product[]>(
      `${API_ENDPOINTS.PRODUCTS}/${productId}/related`,
      { limit }
    );
  }
} 