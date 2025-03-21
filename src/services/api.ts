import axios, { AxiosResponse } from 'axios';
import { TProduct, TFilterProduct } from '../types/product';
import { SortType } from '../enums/filter';

// API base URL
const API_BASE_URL = 'https://tymex-mock-server-blr0.onrender.com';

// Define interface for API responses
interface ProductsResponse {
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

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

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
  if (filters.search) {
    queryParams.title_like = filters.search;
  }
  
  // Add price range filter
  if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
    queryParams.price_gte = String(filters.priceRange[0]);
    queryParams.price_lte = String(filters.priceRange[1]);
  }
  
  // Add tier filter
  if (filters.tier) {
    queryParams.tier = filters.tier;
  }
  
  // Add theme filter
  if (filters.theme) {
    queryParams.theme = filters.theme;
  }
  
  // Add sort by time
  if (filters.sortTime) {
    queryParams._sort = 'createdAt';
    queryParams._order = filters.sortTime === SortType.Ascending ? 'asc' : 'desc';
  }
  
  // Add sort by price
  if (filters.sortPrice) {
    queryParams._sort = 'price';
    queryParams._order = filters.sortPrice === SortType.Ascending ? 'asc' : 'desc';
  }
  
  // Add categories filter (json-server needs multiple params for array values)
  if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
    // For json-server, we can use multiple category params or category_like
    // Using category param for exact match
    if (filters.categories.length === 1) {
      queryParams.category = filters.categories[0];
    } else {
      // Using a simple approach - this is not ideal for multiple categories
      // but works for demonstration
      queryParams.category_like = filters.categories.join('|'); // Using regex OR
    }
  }
  
  console.log('API Query Params:', queryParams); // Debug log
  
  return queryParams;
};

// Export the api for use in productsSlice
export const api = {
  getProducts: async (params?: Record<string, any>) => {
    const page = params?._page || 1;
    const limit = params?._limit || 12;
    
    // Transform to query parameters
    const queryParams = convertFiltersToQueryParams(params, page, limit);
    
    console.log('API request params:', queryParams);
    
    const response = await apiClient.get('/products', { 
      params: queryParams 
    });
    
    return {
      data: response.data.map(transformProduct),
      headers: response.headers
    };
  },
  
  getProduct: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return transformProduct(response.data);
  }
};

// Product Service (keep for backward compatibility)
export const productService = {
  // Get products with filtering and pagination
  getProducts: async (
    page: number = 1,
    pageSize: number = 12,
    filters?: Record<string, any>
  ): Promise<ProductsResponse> => {
    try {
      console.log('Received filters:', filters); // Debug log
      
      // Convert filter object to query parameters
      const queryParams = convertFiltersToQueryParams(filters, page, pageSize);
      
      // Make API request
      console.log('Sending API request with params:', queryParams); // Debug log
      
      const response: AxiosResponse<ServerProduct[]> = await apiClient.get('/products', { 
        params: queryParams 
      });
      
      // Get total count from headers
      const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
      
      // Transform products to client format
      const transformedProducts = response.data.map(transformProduct);
      
      console.log(`API returned ${transformedProducts.length} products out of ${totalCount} total`); // Debug log
      
      return {
        data: transformedProducts,
        total: totalCount,
        hasMore: response.data.length === pageSize && page * pageSize < totalCount,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  },
  
  // Get product details by ID
  getProduct: async (id: string): Promise<TProduct> => {
    try {
      const response: AxiosResponse<ServerProduct> = await apiClient.get(`/products/${id}`);
      return transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw new Error('Failed to fetch product details. Please try again later.');
    }
  }
};

export default apiClient; 