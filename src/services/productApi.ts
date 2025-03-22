import apiClient from './apiService';
import { TProduct, TFilterProduct } from '../types/product';
import { enumToString } from '../utils/enumHelpers';
import axios from 'axios';

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
  
  console.log("Original filters:", filters);
  
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
  if (filters?.tier && filters.tier !== "") {
    queryParams.tier = filters.tier;
    console.log(`Applied tier filter - EXACT VALUE: "${filters.tier}" (type: ${typeof filters.tier})`);
  }
  
  // Add theme filter
  if (filters?.theme && filters.theme !== "") {
    queryParams.theme = filters.theme;
    console.log(`Applied theme filter - EXACT VALUE: "${filters.theme}" (type: ${typeof filters.theme})`);
  }
  
  // Add sort parameters
  if (filters?.sortPrice) {
    queryParams._sort = 'price';
    queryParams._order = String(filters.sortPrice);
  } else if (filters?.sortTime) {
    queryParams._sort = 'createdAt';
    queryParams._order = String(filters.sortTime);
  }
  
  // Add categories filter
  if (filters?.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
    const categoryValues = filters.categories.map(cat => String(cat));
    
    if (categoryValues.length === 1) {
      queryParams.category = categoryValues[0];
    } else {
      queryParams.category_like = categoryValues.join('|');
    }
  }
  
  console.log("Generated query parameters:", queryParams);
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
    console.log('Raw filters received:', filters);
    
    // Construct the query parameters
    let queryParams = new URLSearchParams();
    
    // Add pagination parameters
    queryParams.append('_page', String(page));
    queryParams.append('_limit', String(pageSize));
    console.log('Added pagination:', { page, pageSize });
    
    // Handle categories
    if (filters?.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
      if (filters.categories.length === 1) {
        queryParams.append('category', filters.categories[0]);
        console.log('Added single category:', filters.categories[0]);
      } else {
        queryParams.append('category_like', filters.categories.join('|'));
        console.log('Added multiple categories:', filters.categories.join('|'));
      }
    }
    
    // Handle tier
    if (filters?.tier && filters.tier !== '') {
      queryParams.append('tier', String(filters.tier));
      console.log('Added tier to params:', filters.tier);
    }
    
    // Handle theme
    if (filters?.theme && filters.theme !== '') {
      queryParams.append('theme', String(filters.theme));
      console.log('Added theme to params:', filters.theme);
    }
    
    // Handle search/keyword
    if (filters?.search && filters.search !== '') {
      queryParams.append('title_like', filters.search);
      console.log('Added search term to params:', filters.search);
    } else if (filters?.keyword && filters.keyword !== '') {
      queryParams.append('title_like', filters.keyword);
      console.log('Added keyword term to params:', filters.keyword);
    }
    
    // Handle price range - ensure these are being set correctly
    if (typeof filters?.minPrice === 'number') {
      queryParams.append('minPrice', String(filters.minPrice));
      console.log('Added minPrice to params:', filters.minPrice);
    } else if (filters?.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length > 0) {
      queryParams.append('minPrice', String(filters.priceRange[0]));
      console.log('Added minPrice from priceRange:', filters.priceRange[0]);
    }
    
    if (typeof filters?.maxPrice === 'number') {
      queryParams.append('maxPrice', String(filters.maxPrice));
      console.log('Added maxPrice to params:', filters.maxPrice);
    } else if (filters?.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length > 1) {
      queryParams.append('maxPrice', String(filters.priceRange[1]));
      console.log('Added maxPrice from priceRange:', filters.priceRange[1]);
    }
    
    // Handle sorting - ensure only one sort parameter is sent
    // Priority: Price sorting over time sorting if both are present
    if (filters?.sortPrice && filters.sortPrice !== '') {
      // Sort by price takes precedence
      queryParams.append('_sort', 'price');
      queryParams.append('_order', String(filters.sortPrice));
      console.log('Added price sorting to params:', filters.sortPrice);
    } else if (filters?.sortTime && filters.sortTime !== '') {
      // Sort by time only if price sort is not specified
      queryParams.append('_sort', 'createdAt');
      queryParams.append('_order', String(filters.sortTime));
      console.log('Added time sorting to params:', filters.sortTime);
    }
    
    // Construct the final URL with the query string
    const url = `/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    console.log('Fetching products with URL:', url);
    
    try {
      const response = await apiClient.get<ServerProduct[]>(url);
      console.log(`Received ${response.data.length} products from API`);
      
      // Transform products
      const transformedProducts = response.data.map(transformProduct);
      
      return {
        data: transformedProducts,
        total: response.headers?.['x-total-count'] ? parseInt(response.headers['x-total-count']) : transformedProducts.length,
        hasMore: transformedProducts.length === pageSize
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