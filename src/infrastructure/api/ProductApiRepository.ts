import { ApiService } from './ApiService';
import { API_ENDPOINTS } from './endpoints';
import { 
  PaginatedProducts, 
  ProductRepository, 
  ProductSortOption 
} from '../../domain/product/repositories/ProductRepository';
import { Product as DomainProduct } from '../../domain/product/entities/Product';

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

export type SortOrder = 
  | 'price_asc' 
  | 'price_desc' 
  | 'name_asc' 
  | 'name_desc' 
  | 'newest' 
  | 'popularity'
  | 'relevance';

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
  
  // Adapter function to convert API Product to Domain Product
  private mapToDomainProduct(apiProduct: Product): DomainProduct {
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      slug: apiProduct.id, // Using id as slug since we don't have slug in API model
      description: apiProduct.description,
      shortDescription: apiProduct.description.substring(0, 100) + '...',
      price: apiProduct.price,
      compareAtPrice: apiProduct.originalPrice,
      currency: 'USD', // Assuming USD as default currency
      images: apiProduct.images.map((url, index) => ({
        id: `img-${index}`,
        url,
        alt: `${apiProduct.name} image ${index + 1}`,
        isDefault: index === 0
      })),
      rating: apiProduct.rating || 0,
      reviewCount: apiProduct.reviewCount || 0,
      categories: [
        {
          id: apiProduct.categoryId,
          name: apiProduct.category || 'Uncategorized',
          slug: apiProduct.categoryId
        }
      ],
      tags: [], // No tags in API model
      attributes: apiProduct.attributes || {},
      isAvailable: apiProduct.stockQuantity > 0,
      createdAt: new Date(apiProduct.createdAt),
      updatedAt: new Date(apiProduct.updatedAt)
    };
  }

  // Adapter function to convert API response to Domain response
  private mapToPaginatedProducts(response: ProductListResponse): PaginatedProducts {
    return {
      items: response.products.map(this.mapToDomainProduct.bind(this)),
      total: response.total,
      page: response.page,
      perPage: response.perPage,
      totalPages: response.totalPages
    };
  }

  async getById(id: string): Promise<DomainProduct | null> {
    const product = await this.apiService.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return product ? this.mapToDomainProduct(product) : null;
  }
  
  async getBySlug(slug: string): Promise<DomainProduct | null> {
    const product = await this.apiService.get<Product>(`${API_ENDPOINTS.PRODUCTS}/slug/${slug}`);
    return product ? this.mapToDomainProduct(product) : null;
  }
  
  async list(
    filters?: ProductFilters,
    sort?: SortOrder,
    pagination?: PaginationOptions
  ): Promise<PaginatedProducts> {
    const response = await this.apiService.get<ProductListResponse>(API_ENDPOINTS.PRODUCTS, {
      ...filters,
      sort,
      ...pagination,
    });
    return this.mapToPaginatedProducts(response);
  }
  
  async getFeatured(limit: number = 8): Promise<DomainProduct[]> {
    const products = await this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/featured`, { limit });
    return products.map(this.mapToDomainProduct.bind(this));
  }
  
  async getNewArrivals(limit: number = 8): Promise<DomainProduct[]> {
    const products = await this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/new-arrivals`, { limit });
    return products.map(this.mapToDomainProduct.bind(this));
  }
  
  async getBestSellers(limit: number = 8): Promise<DomainProduct[]> {
    const products = await this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/best-sellers`, { limit });
    return products.map(this.mapToDomainProduct.bind(this));
  }
  
  async getRelated(productId: string, limit: number = 4): Promise<DomainProduct[]> {
    const products = await this.apiService.get<Product[]>(`${API_ENDPOINTS.PRODUCTS}/${productId}/related`, { limit });
    return products.map(this.mapToDomainProduct.bind(this));
  }
} 