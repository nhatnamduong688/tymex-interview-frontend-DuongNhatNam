import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  fetchProducts,
  fetchMoreProducts,
  resetProducts,
  ProductsState
} from './productsSlice';
import { api } from '../../services/api';

// Mock the API
vi.mock('../../services/api', () => ({
  api: {
    getProducts: vi.fn()
  }
}));

// Define initialState
const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
  hasMore: false,
  totalCount: 0,
  isFetchingNextPage: false,
  page: 1,
  limit: 10
};

// Sample mock data
const mockProducts = [
  { id: '1', name: 'Product 1', price: 10 },
  { id: '2', name: 'Product 2', price: 20 }
];

describe('Products Slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper to create a test store with products reducer
  const createTestStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        products: productsReducer
      },
      preloadedState
    });
  };

  describe('Initial State', () => {
    it('should return the initial state', () => {
      const state = productsReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('Reducers', () => {
    describe('fetchProducts', () => {
      it('should set loading state when fetchProducts.pending', () => {
        const action = { type: fetchProducts.pending.type };
        const state = productsReducer(initialState, action);
        
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
        expect(state.page).toBe(1);
      });
      
      it('should set data when fetchProducts.fulfilled', () => {
        const action = { 
          type: fetchProducts.fulfilled.type,
          payload: { 
            data: mockProducts, 
            totalCount: 2 
          }
        };
        
        const state = productsReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.data).toEqual(mockProducts);
        expect(state.totalCount).toBe(2);
        expect(state.hasMore).toBe(false); // Because totalCount equals data.length
      });
      
      it('should set error when fetchProducts.rejected', () => {
        const action = { 
          type: fetchProducts.rejected.type,
          payload: 'Failed to fetch products'
        };
        
        const state = productsReducer(initialState, action);
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to fetch products');
      });
    });
    
    describe('fetchMoreProducts', () => {
      it('should set loading state when fetchMoreProducts.pending', () => {
        const action = { type: fetchMoreProducts.pending.type };
        const state = productsReducer(initialState, action);
        
        expect(state.isFetchingNextPage).toBe(true);
        expect(state.error).toBe(null);
      });
      
      it('should append data when fetchMoreProducts.fulfilled', () => {
        // Start with some existing data
        const stateWithData = {
          ...initialState,
          data: [{ id: '1', name: 'Existing Product', price: 5 }],
          page: 1,
          totalCount: 3
        };
        
        const action = { 
          type: fetchMoreProducts.fulfilled.type,
          payload: { 
            data: mockProducts, 
            totalCount: 3,
            page: 2
          }
        };
        
        const state = productsReducer(stateWithData, action);
        
        expect(state.isFetchingNextPage).toBe(false);
        expect(state.data.length).toBe(3); // 1 existing + 2 new
        expect(state.page).toBe(2);
        expect(state.totalCount).toBe(3);
        expect(state.hasMore).toBe(false); // 3 items in data and totalCount is 3
      });
      
      it('should set error when fetchMoreProducts.rejected', () => {
        const action = { 
          type: fetchMoreProducts.rejected.type,
          payload: 'Failed to fetch more products'
        };
        
        const state = productsReducer(initialState, action);
        
        expect(state.isFetchingNextPage).toBe(false);
        expect(state.error).toBe('Failed to fetch more products');
      });
    });
    
    describe('resetProducts', () => {
      it('should reset the state to initial values', () => {
        const modifiedState = {
          ...initialState,
          data: mockProducts,
          totalCount: 2,
          page: 2
        };
        
        const state = productsReducer(modifiedState, resetProducts());
        expect(state).toEqual(initialState);
      });
    });
  });
  
  describe('Thunks', () => {
    let store;
    
    beforeEach(() => {
      store = configureStore({
        reducer: {
          products: productsReducer,
          filter: {
            appliedFilters: {}
          }
        }
      });
    });
    
    describe('fetchProducts', () => {
      it('should fetch products with empty filters', async () => {
        // Setup the mock to return successful response
        vi.mocked(api.getProducts).mockResolvedValue({
          data: mockProducts,
          headers: { 'x-total-count': '2' }
        });
        
        await store.dispatch(fetchProducts());
        
        expect(api.getProducts).toHaveBeenCalledWith(
          expect.objectContaining({
            _page: 1,
            _limit: 10
          })
        );
        
        const state = store.getState().products;
        expect(state.data).toEqual(mockProducts);
        expect(state.totalCount).toBe(2);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
      });
      
      it('should fetch products with filters', async () => {
        // Create store with filter state
        const filters = {
          search: 'test',
          tier: 'Premium',
          priceRange: [10, 100],
          categories: ['Art']
        };
        
        store = configureStore({
          reducer: {
            products: productsReducer,
            filter: {
              appliedFilters: filters
            }
          }
        });
        
        vi.mocked(api.getProducts).mockResolvedValue({
          data: mockProducts,
          headers: { 'x-total-count': '2' }
        });
        
        await store.dispatch(fetchProducts());
        
        expect(api.getProducts).toHaveBeenCalledWith(
          expect.objectContaining({
            ...filters,
            _page: 1,
            _limit: 10
          })
        );
        
        const state = store.getState().products;
        expect(state.data).toEqual(mockProducts);
        expect(state.totalCount).toBe(2);
      });
      
      it('should handle API errors', async () => {
        vi.mocked(api.getProducts).mockRejectedValue(new Error('Network error'));
        
        await store.dispatch(fetchProducts());
        
        const state = store.getState().products;
        expect(state.error).toBeDefined();
        expect(state.loading).toBe(false);
      });
    });
    
    describe('fetchMoreProducts', () => {
      it('should fetch more products with pagination', async () => {
        // Start with state having page 1
        store = configureStore({
          reducer: {
            products: productsReducer,
            filter: {
              appliedFilters: {}
            }
          },
          preloadedState: {
            products: {
              ...initialState,
              data: [{ id: '0', name: 'Initial Product', price: 5 }],
              page: 1,
              limit: 12
            }
          }
        });
        
        vi.mocked(api.getProducts).mockResolvedValue({
          data: mockProducts,
          headers: { 'x-total-count': '3' }
        });
        
        await store.dispatch(fetchMoreProducts());
        
        expect(api.getProducts).toHaveBeenCalledWith(
          expect.objectContaining({
            _page: 2,
            _limit: 12
          })
        );
        
        const state = store.getState().products;
        expect(state.data.length).toBe(3); // 1 initial + 2 new
        expect(state.page).toBe(2);
        expect(state.isFetchingNextPage).toBe(false);
      });
    });
  });
  
  describe('Selectors', () => {
    const selectProductsData = (state) => state.products.data;
    const selectProductsLoading = (state) => state.products.loading;
    const selectProductsError = (state) => state.products.error;
    const selectHasMore = (state) => state.products.hasMore;
    const selectTotalCount = (state) => state.products.totalCount;
    const selectIsFetchingNextPage = (state) => state.products.isFetchingNextPage;
    
    it('should select products data', () => {
      const state = {
        products: {
          data: [{ id: 1, name: 'Product 1' }]
        }
      };
      
      expect(selectProductsData(state)).toEqual([{ id: 1, name: 'Product 1' }]);
    });
    
    it('should select products loading state', () => {
      const state = {
        products: {
          loading: true
        }
      };
      
      expect(selectProductsLoading(state)).toBe(true);
    });
    
    it('should select products error state', () => {
      const state = {
        products: {
          error: 'Error message'
        }
      };
      
      expect(selectProductsError(state)).toBe('Error message');
    });
    
    it('should select hasMore state', () => {
      const state = {
        products: {
          hasMore: true
        }
      };
      
      expect(selectHasMore(state)).toBe(true);
    });
    
    it('should select totalCount', () => {
      const state = {
        products: {
          totalCount: 10
        }
      };
      
      expect(selectTotalCount(state)).toBe(10);
    });
    
    it('should select isFetchingNextPage', () => {
      const state = {
        products: {
          isFetchingNextPage: true
        }
      };
      
      expect(selectIsFetchingNextPage(state)).toBe(true);
    });
  });
}); 