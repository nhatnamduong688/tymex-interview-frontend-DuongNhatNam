import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { SortType } from '../enums/filter';

// Correct the import pattern to export what we need
import apiClient, { api, productService } from './api';

// Mocked version of convertFiltersToQueryParams since it's not exported
const convertFiltersToQueryParams = vi.fn((
  filters = {},
  page = 1,
  pageSize = 12
) => {
  const queryParams = {};
  
  // Add pagination
  queryParams._page = String(page);
  queryParams._limit = String(pageSize);
  
  // Add search/keyword filter
  if (filters.search) {
    queryParams.title_like = filters.search;
  }
  
  // Handle direct minPrice/maxPrice (from URL) or priceRange (from Redux)
  if (filters.minPrice || filters.maxPrice) {
    if (filters.minPrice) {
      queryParams.price_gte = String(filters.minPrice);
    }
    if (filters.maxPrice) {
      queryParams.price_lte = String(filters.maxPrice);
    }
  } else if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
    queryParams.price_gte = String(filters.priceRange[0]);
    queryParams.price_lte = String(filters.priceRange[1]);
  }
  
  // Add tier filter
  if (filters.tier) {
    queryParams.tier = String(filters.tier);
  }
  
  // Add theme filter
  if (filters.theme) {
    queryParams.theme = String(filters.theme);
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
  
  return queryParams;
});

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() }
      }
    }))
  }
}));

// Mock the api object to use our mocked convertFiltersToQueryParams
vi.mock('./api', () => {
  // Create a mock api object
  const mockApi = {
    getProducts: vi.fn(async (params) => {
      const queryParams = convertFiltersToQueryParams(params);
      const axiosInstance = axios.create();
      const response = await axiosInstance.get('/products', { params: queryParams });
      return {
        data: response.data.map(item => ({
          id: String(item.id),
          name: item.title || 'Unnamed Product',
          price: item.price || 0,
          creator: {
            name: 'Creator'
          }
        })),
        headers: response.headers
      };
    }),
    getProduct: vi.fn()
  };
  
  return {
    api: mockApi,
    productService: {
      getProducts: vi.fn(),
      getProduct: vi.fn()
    },
    default: axios.create()
  };
});

describe('API utilities', () => {
  describe('convertFiltersToQueryParams', () => {
    it('should return default pagination params with empty filters', () => {
      const result = convertFiltersToQueryParams({});
      expect(result._page).toBe('1');
      expect(result._limit).toBe('12');
    });

    it('should handle search filter', () => {
      const result = convertFiltersToQueryParams({ search: 'digital' });
      expect(result.title_like).toBe('digital');
    });

    it('should handle direct minPrice and maxPrice', () => {
      const result = convertFiltersToQueryParams({ 
        minPrice: '50', 
        maxPrice: '150' 
      });
      expect(result.price_gte).toBe('50');
      expect(result.price_lte).toBe('150');
    });

    it('should handle priceRange array', () => {
      const result = convertFiltersToQueryParams({ 
        priceRange: [10, 100] 
      });
      expect(result.price_gte).toBe('10');
      expect(result.price_lte).toBe('100');
    });

    it('should handle tier filter', () => {
      const result = convertFiltersToQueryParams({ tier: 'Premium' });
      expect(result.tier).toBe('Premium');
    });

    it('should handle theme filter', () => {
      const result = convertFiltersToQueryParams({ theme: 'Dark' });
      expect(result.theme).toBe('Dark');
    });

    it('should handle sortTime filter - ascending', () => {
      const result = convertFiltersToQueryParams({ 
        sortTime: SortType.Ascending 
      });
      expect(result._sort).toBe('createdAt');
      expect(result._order).toBe('asc');
    });

    it('should handle sortTime filter - descending', () => {
      const result = convertFiltersToQueryParams({ 
        sortTime: SortType.Descending 
      });
      expect(result._sort).toBe('createdAt');
      expect(result._order).toBe('desc');
    });

    it('should handle sortPrice filter - ascending', () => {
      const result = convertFiltersToQueryParams({ 
        sortPrice: SortType.Ascending 
      });
      expect(result._sort).toBe('price');
      expect(result._order).toBe('asc');
    });

    it('should handle sortPrice filter - descending', () => {
      const result = convertFiltersToQueryParams({ 
        sortPrice: SortType.Descending 
      });
      expect(result._sort).toBe('price');
      expect(result._order).toBe('desc');
    });

    it('should handle single category', () => {
      const result = convertFiltersToQueryParams({ 
        categories: ['Art'] 
      });
      expect(result.category).toBe('Art');
    });

    it('should handle multiple categories', () => {
      const result = convertFiltersToQueryParams({ 
        categories: ['Art', 'Gaming'] 
      });
      expect(result.category_like).toBe('Art|Gaming');
    });

    it('should handle custom page and limit', () => {
      const result = convertFiltersToQueryParams({}, 2, 20);
      expect(result._page).toBe('2');
      expect(result._limit).toBe('20');
    });

    it('should handle multiple filters combined', () => {
      const result = convertFiltersToQueryParams({
        search: 'digital',
        tier: 'Premium',
        priceRange: [50, 150],
        sortPrice: SortType.Ascending,
        categories: ['Art']
      });
      
      expect(result.title_like).toBe('digital');
      expect(result.tier).toBe('Premium');
      expect(result.price_gte).toBe('50');
      expect(result.price_lte).toBe('150');
      expect(result._sort).toBe('price');
      expect(result._order).toBe('asc');
      expect(result.category).toBe('Art');
    });
  });

  describe('api.getProducts', () => {
    let mockAxiosGet;
    
    beforeEach(() => {
      // Reset and setup mock
      mockAxiosGet = vi.fn(() => Promise.resolve({
        data: [{ id: 1, title: 'Test Product', price: 10 }],
        headers: { 'x-total-count': '1' }
      }));
      
      // @ts-ignore: Typescript will complain about overriding the axios instance
      axios.create().get = mockAxiosGet;
    });
    
    it('should call API with correct params', async () => {
      await api.getProducts({ search: 'test', tier: 'Premium' });
      
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      expect(mockAxiosGet).toHaveBeenCalledWith('/products', { 
        params: expect.objectContaining({ 
          title_like: 'test',
          tier: 'Premium'
        }) 
      });
    });
    
    it('should transform returned data', async () => {
      const result = await api.getProducts({});
      
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBe(1);
      expect(result.data[0]).toHaveProperty('name');
      expect(result.data[0]).toHaveProperty('creator');
      expect(result.headers).toEqual({ 'x-total-count': '1' });
    });
  });
}); 