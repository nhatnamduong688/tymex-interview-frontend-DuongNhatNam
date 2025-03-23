import apiClient from '../api/client';
import { TProduct, TFilterProduct } from '../../types/product';
import { enumToString } from '../../utils/enumHelpers';
import { ProductFilterParams, ProductsResponse, ServerProduct } from './types';
import { transformServerProducts } from './transformers';

/**
 * Get filtered products with pagination
 */
export async function getProducts(
  filters: TFilterProduct = {},
  page: number = 1,
  limit: number = 9
): Promise<ProductsResponse> {
  try {
    // Build query string
    let query = '';
    
    // Handle pagination
    query += `_page=${page}&_limit=${limit}`;
    
    // Handle sorting (sortPrice takes precedence over sortTime)
    if (filters.sortPrice) {
      query += `&_sort=price&_order=${filters.sortPrice}`;
    } else if (filters.sortTime) {
      query += `&_sort=createdAt&_order=${filters.sortTime}`;
    }
    
    // Handle search (search takes precedence over keyword)
    if (filters.search) {
      query += `&title_like=${encodeURIComponent(filters.search)}`;
    } else if (filters.keyword) {
      query += `&title_like=${encodeURIComponent(filters.keyword)}`;
    }
    
    // Handle price range
    if (filters.minPrice !== undefined) {
      query += `&price_gte=${filters.minPrice}`;
    }
    if (filters.maxPrice !== undefined) {
      query += `&price_lte=${filters.maxPrice}`;
    }
    
    // Handle categories
    if (filters.categories && filters.categories.length > 0) {
      if (filters.categories.length === 1) {
        // Exact match for single category
        query += `&category=${encodeURIComponent(filters.categories[0])}`;
      } else {
        // Use regex for multiple categories (OR condition)
        const categoryPattern = filters.categories.join('|');
        query += `&category_like=${encodeURIComponent(categoryPattern)}`;
      }
    }
    
    // Handle theme
    if (filters.theme) {
      const themeStr = enumToString(filters.theme);
      if (themeStr) {
        query += `&theme=${encodeURIComponent(themeStr)}`;
      }
    }
    
    // Handle tier
    if (filters.tier) {
      const tierStr = enumToString(filters.tier);
      if (tierStr) {
        query += `&tier=${encodeURIComponent(tierStr)}`;
      }
    }
    
    // Handle favorites
    if (filters.favorite !== undefined) {
      query += `&isFavorite=${filters.favorite}`;
    } else if (filters.isFavorite !== undefined) {
      query += `&isFavorite=${filters.isFavorite}`;
    }
    
    // Make the API request
    const response = await apiClient.get<ServerProduct[]>(`/products?${query}`, null, {
      cache: true
    });
    
    // Get total count from headers
    const totalCount = parseInt(response.headers?.['x-total-count'] || '0', 10);
    
    // Transform the data
    const products = transformServerProducts(response.data);
    
    return {
      data: products,
      total: totalCount,
      hasMore: products.length === limit && totalCount > page * limit
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {
      data: [],
      total: 0,
      hasMore: false
    };
  }
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: string | number): Promise<TProduct | null> {
  try {
    const response = await apiClient.get<ServerProduct>(`/products/${id}`);
    return transformServerProducts([response.data])[0];
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    return null;
  }
}

/**
 * Toggle product favorite status
 */
export async function toggleFavorite(id: string | number, isFavorite: boolean): Promise<boolean> {
  try {
    await apiClient.patch(`/products/${id}`, { isFavorite });
    
    // Clear related cache
    apiClient.clearCacheByPattern('/products');
    
    return true;
  } catch (error) {
    console.error(`Failed to toggle favorite for product with ID ${id}:`, error);
    return false;
  }
}

/**
 * Get unique product categories
 */
export async function getCategories(): Promise<string[]> {
  try {
    const response = await apiClient.get<ServerProduct[]>('/products', null, {
      cache: true
    });
    
    // Extract unique categories
    const uniqueCategories = new Set<string>();
    response.data.forEach(product => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    
    return Array.from(uniqueCategories).sort();
  } catch (error) {
    console.error('Failed to fetch product categories:', error);
    return [];
  }
} 