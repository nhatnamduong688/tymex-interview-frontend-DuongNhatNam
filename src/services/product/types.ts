import { TProduct } from '../../types/product';

// Define API response types
export interface ProductsResponse {
  data: TProduct[];
  total: number;
  hasMore: boolean;
}

// API Server Product Structure
export interface ServerProduct {
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
}

// Product filter parameters
export interface ProductFilterParams {
  search?: string;
  keyword?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortPrice?: 'asc' | 'desc';
  sortTime?: 'asc' | 'desc';
  tier?: string;
  theme?: string;
  favorite?: boolean;
  isFavorite?: boolean; // Alias for favorite
} 