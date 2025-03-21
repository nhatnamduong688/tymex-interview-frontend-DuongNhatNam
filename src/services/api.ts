import axios, { AxiosResponse } from 'axios';
import { TProduct } from '../types/product';

// Thay đổi URL này thành Render URL của bạn
const API_BASE_URL = 'https://tymex-mock-api.onrender.com';

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

// Product Service
export const productService = {
  // Get products with pagination and filters
  getProducts: async (
    page: number = 1,
    pageSize: number = 12,
    filters: Record<string, any> = {}
  ): Promise<ProductsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add pagination params
      queryParams.append('_page', page.toString());
      queryParams.append('_limit', pageSize.toString());
      
      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === 'search' && typeof value === 'string') {
            // Handle search by name
            queryParams.append('title_like', value);
          } else if (key === 'categories' && Array.isArray(value) && value.length > 0) {
            // Handle categories filter
            value.forEach((category: string) => {
              queryParams.append('category_like', category);
            });
          } else {
            queryParams.append(key, String(value));
          }
        }
      });

      const response: AxiosResponse<ServerProduct[]> = await apiClient.get(`/products?${queryParams.toString()}`);
      
      // Get total count from headers
      const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
      
      // Transform each product to client format
      const transformedProducts = response.data.map(transformProduct);
      
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

  // Get product by id
  getProductById: async (id: string): Promise<TProduct> => {
    try {
      const response: AxiosResponse<ServerProduct> = await apiClient.get(`/products/${id}`);
      return transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw new Error('Failed to fetch product details. Please try again later.');
    }
  },
};

export default apiClient; 