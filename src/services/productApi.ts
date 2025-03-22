import apiClient from './apiService';
import { TProduct, TFilterProduct } from '../types/product';
import { enumToString } from '../utils/enumHelpers';

// Define API response types
export interface ProductsResponse {
  data: TProduct[];
  total: number;
  hasMore: boolean;
}

// API Server Product Structure
interface ServerProduct {
  id: number | string;
  title: string;
  category: string;
  price: number;
  isFavorite: boolean;
  createdAt: number | string;
  theme: string;
  tier: string;
  imageId: number;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    onlineStatus: string;
  };
  tags?: string[];
  description?: string;
  imageBg?: string;
  imageItem?: string;
}

// Transform server product to client product format
const transformProduct = (serverProduct: ServerProduct): TProduct => {
  const imageId = serverProduct.imageId || Math.floor(Math.random() * 100);
  
  return {
    id: String(serverProduct.id),
    name: serverProduct.title || 'Unnamed Product',
    description: serverProduct.description || 'No description available',
    price: serverProduct.price || 0,
    imageBg: serverProduct.imageBg || `https://picsum.photos/id/${imageId}/500/300`,
    imageItem: serverProduct.imageItem || `https://picsum.photos/id/${imageId + 10}/200/200`,
    category: serverProduct.category || 'Unknown',
    creator: {
      name: `${serverProduct.author?.firstName || ''} ${serverProduct.author?.lastName || ''}`.trim() || 'Unknown Creator',
      isOnline: serverProduct.author?.onlineStatus === 'online',
      avatar: serverProduct.author?.avatar || `https://robohash.org/${serverProduct.id}.png?size=100x100&set=set1`,
    },
    createdAt: String(serverProduct.createdAt || new Date().toISOString()),
    tier: serverProduct.tier || 'Standard',
    theme: serverProduct.theme || 'Default',
    tags: serverProduct.tags || [serverProduct.category].filter(Boolean),
  };
};

// Convert filter object to API query parameters
const convertFiltersToQueryParams = (
  filters: Record<string, any> = {},
  page: number = 1,
  pageSize: number = 12
): Record<string, string> => {
  const queryParams: Record<string, string> = {};
  
  // Add pagination
  queryParams._page = String(page);
  queryParams._limit = String(pageSize);
  
  // Add search/keyword filter
  if (filters?.search) {
    queryParams.title_like = filters.search;
  } else if (filters?.keyword) {
    queryParams.title_like = filters.keyword;
  }
  
  // Handle price filtering
  if (filters?.minPrice !== undefined) {
    queryParams.price_gte = String(filters.minPrice);
  }
  
  if (filters?.maxPrice !== undefined) {
    queryParams.price_lte = String(filters.maxPrice);
  }
  // Fallback to priceRange
  else if (filters?.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
    queryParams.price_gte = String(filters.priceRange[0]);
    queryParams.price_lte = String(filters.priceRange[1]);
  }
  
  // Add tier filter
  if (filters?.tier) {
    const tierValue = enumToString(filters.tier);
    queryParams.tier = tierValue;
  }
  
  // Add theme filter
  if (filters?.theme) {
    const themeValue = enumToString(filters.theme);
    queryParams.theme = themeValue;
  }
  
  // Add sort parameters
  if (filters?.sortPrice) {
    queryParams._sort = 'price';
    queryParams._order = enumToString(filters.sortPrice);
  } else if (filters?.sortTime) {
    queryParams._sort = 'createdAt';
    queryParams._order = enumToString(filters.sortTime);
  }
  
  // Add categories filter
  if (filters?.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
    const categoryValues = filters.categories.map(cat => enumToString(cat));
    
    if (categoryValues.length === 1) {
      queryParams.category = categoryValues[0];
    } else {
      queryParams.category_like = categoryValues.join('|');
    }
  }
  
  return queryParams;
};

// Product API Service
const productApi = {
  /**
   * Get products with filtering and pagination
   */
  getProducts: async (
    filters?: TFilterProduct,
    page: number = 1,
    pageSize: number = 12
  ): Promise<ProductsResponse> => {
    try {
      // Convert filter object to query parameters
      const queryParams = convertFiltersToQueryParams(filters, page, pageSize);
      
      // Make API request using our abstraction layer
      const response = await apiClient.get<ServerProduct[]>('/products', queryParams);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch products');
      }
      
      const products = response.data;
      // Get total count from headers
      const totalCount = parseInt((response as any).headers?.['x-total-count'] || '0', 10);
      
      // Transform products to client format
      const transformedProducts = products.map(transformProduct);
      
      return {
        data: transformedProducts,
        total: totalCount,
        hasMore: products.length === pageSize && page * pageSize < totalCount,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  /**
   * Get a single product by ID
   */
  getProduct: async (id: string): Promise<TProduct> => {
    try {
      const response = await apiClient.get<ServerProduct>(`/products/${id}`);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch product');
      }
      
      return transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Get unique categories from products
   */
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<ServerProduct[]>('/products');
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch categories');
      }
      
      const categories = new Set<string>();
      response.data.forEach(product => {
        if (product.category) {
          categories.add(product.category);
        }
      });
      
      return Array.from(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  /**
   * Get unique tiers from products
   */
  getTiers: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<ServerProduct[]>('/products');
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch tiers');
      }
      
      const tiers = new Set<string>();
      response.data.forEach(product => {
        if (product.tier) {
          tiers.add(product.tier);
        }
      });
      
      return Array.from(tiers);
    } catch (error) {
      console.error('Error fetching tiers:', error);
      throw error;
    }
  },
  
  /**
   * Get unique themes from products
   */
  getThemes: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<ServerProduct[]>('/products');
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch themes');
      }
      
      const themes = new Set<string>();
      response.data.forEach(product => {
        if (product.theme) {
          themes.add(product.theme);
        }
      });
      
      return Array.from(themes);
    } catch (error) {
      console.error('Error fetching themes:', error);
      throw error;
    }
  },
  
  /**
   * Clear product cache
   */
  clearCache: () => {
    apiClient.clearCacheByPattern('/products');
  }
};

export default productApi; 