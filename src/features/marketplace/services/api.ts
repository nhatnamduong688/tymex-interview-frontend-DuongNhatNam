import axios, { AxiosResponse } from 'axios';
import { TProduct, TFilterProduct } from '../types/product';
import { SortType } from '../enums/filter';
import { enumToString, stringToTier, stringToTheme } from '../utils/enumHelpers';
import { ProductTier, ProductTheme } from '../enums/filter';

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
  console.log('============= API: convertFiltersToQueryParams =============');
  console.log('Input filters:', JSON.stringify(filters, null, 2));
  console.log('Page:', page, 'PageSize:', pageSize);
  
  const queryParams: Record<string, string> = {};
  
  // Add pagination
  queryParams._page = String(page);
  queryParams._limit = String(pageSize);
  
  // Add search/keyword filter - ưu tiên search, sau đó mới dùng keyword
  if (filters?.search) {
    queryParams.title_like = filters.search;
    console.log('Added search filter from search field:', filters.search);
  } else if (filters?.keyword) {
    queryParams.title_like = filters.keyword;
    console.log('Added search filter from keyword field:', filters.keyword);
  }
  
  // Handle price filtering (ưu tiên minPrice/maxPrice)
  if (filters?.minPrice !== undefined) {
    queryParams.price_gte = String(filters.minPrice);
    console.log('Added price_gte from minPrice:', queryParams.price_gte);
  }
  
  if (filters?.maxPrice !== undefined) {
    queryParams.price_lte = String(filters.maxPrice);
    console.log('Added price_lte from maxPrice:', queryParams.price_lte);
  }
  // Nếu không có minPrice/maxPrice, kiểm tra priceRange
  else if (filters?.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
    console.log('Using priceRange array:', filters.priceRange);
    queryParams.price_gte = String(filters.priceRange[0]);
    queryParams.price_lte = String(filters.priceRange[1]);
    console.log('Added price_gte/price_lte from priceRange:', queryParams.price_gte, queryParams.price_lte);
  }
  
  // Add tier filter - using enum helper
  if (filters?.tier) {
    const tierValue = enumToString(filters.tier);
    queryParams.tier = tierValue;
    console.log('Added tier filter:', tierValue);
  }
  
  // Add theme filter - using enum helper
  if (filters?.theme) {
    const themeValue = enumToString(filters.theme);
    queryParams.theme = themeValue;
    console.log('Added theme filter:', themeValue);
  }
  
  // Add sort parameters
  // Using enum helpers for sort values
  if (filters?.sortPrice) {
    queryParams._sort = 'price';
    queryParams._order = enumToString(filters.sortPrice);
    console.log('Added price sort:', queryParams._sort, queryParams._order);
  } else if (filters?.sortTime) {
    queryParams._sort = 'createdAt';
    queryParams._order = enumToString(filters.sortTime);
    console.log('Added time sort:', queryParams._sort, queryParams._order);
  }
  
  // Add categories filter (json-server needs special handling for array values)
  if (filters?.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
    console.log('Processing categories filter:', filters.categories);
    
    // Convert enum values to strings if needed
    const categoryValues = filters.categories.map(cat => enumToString(cat));
    
    if (categoryValues.length === 1) {
      // If single category, use exact match with category field in db.json
      queryParams.category = categoryValues[0];
      console.log('Added single category filter:', queryParams.category);
    } else {
      // For multiple categories, we use OR logic with category_like
      // json-server uses regex patterns for _like operators
      queryParams.category_like = categoryValues.join('|');
      console.log('Added multiple categories filter with OR pattern:', queryParams.category_like);
    }
  }
  
  console.log('API Query Params (FINAL):', queryParams);
  console.log('============= END API convertFiltersToQueryParams =============');
  
  return queryParams;
};

// Export the api for use in productsSlice
export const api = {
  getProducts: async (params?: Record<string, any>) => {
    const page = params?._page || 1;
    const limit = params?._limit || 12;
    
    console.log('API CALL STARTED ===============================');
    console.log('Original params:', JSON.stringify(params, null, 2));
    
    // Transform to query parameters
    const queryParams = convertFiltersToQueryParams(params, page, limit);
    
    console.log('API request params:', JSON.stringify(queryParams, null, 2));
    console.log('Request URL:', `${API_BASE_URL}/products`);
    
    try {
      const response = await apiClient.get('/products', { 
        params: queryParams 
      });
      
      console.log('API RESPONSE:');
      console.log('Status:', response.status);
      console.log('Headers:', response.headers);
      console.log('Total products:', response.headers['x-total-count']);
      console.log('Products returned:', response.data.length);
      console.log('First product sample:', response.data[0] ? JSON.stringify(response.data[0], null, 2) : 'No products');
      console.log('API CALL ENDED ===============================');
      
      return {
        data: response.data.map(transformProduct),
        headers: response.headers
      };
    } catch (error) {
      console.error('API CALL ERROR:', error);
      console.log('API CALL ENDED WITH ERROR ===============================');
      throw error;
    }
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