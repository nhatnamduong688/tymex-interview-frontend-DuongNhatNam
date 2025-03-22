import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../types/product';
import productApi from '../services/productApi';
import { RootState } from './index';

export interface ProductsState {
  data: TProduct[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  isFetchingNextPage: boolean;
  page: number;
  limit: number;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
  hasMore: false,
  totalCount: 0,
  isFetchingNextPage: false,
  page: 1,
  limit: 12
};

// Thunk to fetch products
export const fetchProducts = createAsyncThunk<
  { data: TProduct[]; totalCount: number },
  void,
  { rejectValue: string; state: RootState }
>('products/fetchProducts', async (_, { rejectWithValue, getState }) => {
  try {
    // Get current filters state from Redux
    const state = getState();
    const filters = state.filter.appliedFilters;
    
    console.log('fetchProducts thunk accessing Redux filters:', filters);
    
    const apiFilters = {
      ...filters,
      minPrice: filters.minPrice !== undefined ? String(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice !== undefined ? String(filters.maxPrice) : undefined,
    };
    const response = await productApi.getProducts(apiFilters, 1, initialState.limit);
    
    console.log('fetchProducts response:', {
      productsCount: response.data.length,
      totalCount: response.total,
      hasMore: response.hasMore
    });
    
    return {
      data: response.data,
      totalCount: response.total
    };
  } catch (error: any) {
    console.error('Error in fetchProducts thunk:', error);
    
    return rejectWithValue(
      error.message || 'Failed to fetch products'
    );
  }
});

// Thunk to fetch more products (pagination)
export const fetchMoreProducts = createAsyncThunk<
  { data: TProduct[]; totalCount: number },
  void,
  { rejectValue: string; state: RootState }
>('products/fetchMoreProducts', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const { products } = state;
    const { page, limit, hasMore } = products;
    // Get filters directly from filter slice
    const filters = state.filter.appliedFilters;
    
    console.log('fetchMoreProducts thunk with filters:', filters, {
      currentPage: page,
      nextPage: page + 1,
      hasMore,
      currentDataLength: products.data.length
    });
    
    // Don't fetch if there are no more products
    if (!hasMore) {
      console.log('No more products to fetch, returning current data');
      return {
        data: products.data,
        totalCount: products.totalCount
      };
    }
    
    // Fetch next page
    const nextPage = page + 1;
    const apiFilters = {
      ...filters,
      minPrice: filters.minPrice !== undefined ? String(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice !== undefined ? String(filters.maxPrice) : undefined,
    };
    const response = await productApi.getProducts(apiFilters, nextPage, limit);
    
    console.log('fetchMoreProducts response:', {
      newProductsCount: response.data.length,
      totalCount: response.total,
      hasMore: response.hasMore
    });
    
    // Combine existing data with new data
    const combinedData = [...products.data, ...response.data];
    
    return {
      data: combinedData,
      totalCount: response.total
    };
  } catch (error: any) {
    console.error('Error in fetchMoreProducts thunk:', error);
    return rejectWithValue(
      error.message || 'Failed to fetch more products'
    );
  }
});

// Selectors
export const selectProducts = (state: RootState) => state.products.data;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectHasMore = (state: RootState) => state.products.hasMore;
export const selectTotalCount = (state: RootState) => state.products.totalCount;
export const selectIsFetchingNextPage = (state: RootState) => state.products.isFetchingNextPage;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: () => initialState,
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.page = 1;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ data: TProduct[], totalCount: number }>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalCount = action.payload.totalCount;
        
        // Calculate hasMore: still have more products if the number of loaded products is less than the total
        const hasMoreProducts = state.data.length < action.payload.totalCount;
        state.hasMore = hasMoreProducts;
        
        console.log('fetchProducts.fulfilled updated state:', {
          dataLength: state.data.length,
          totalCount: action.payload.totalCount,
          hasMore: state.hasMore
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An unknown error occurred';
      })
      
      // Fetch More Products
      .addCase(fetchMoreProducts.pending, (state) => {
        state.isFetchingNextPage = true;
        state.error = null;
      })
      .addCase(fetchMoreProducts.fulfilled, (state, action: PayloadAction<{ data: TProduct[], totalCount: number }>) => {
        state.isFetchingNextPage = false;
        
        // Check if we actually got new data (to avoid duplicate entries)
        if (action.payload.data.length > state.data.length) {
          state.data = action.payload.data;
          state.page = state.page + 1;
        }
        
        state.totalCount = action.payload.totalCount;
        
        // Calculate if there's more data to load
        const hasMoreProducts = state.data.length < action.payload.totalCount;
        state.hasMore = hasMoreProducts;
        
        console.log('fetchMoreProducts.fulfilled updated state:', {
          dataLength: state.data.length,
          totalCount: action.payload.totalCount,
          hasMore: state.hasMore,
          page: state.page
        });
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.isFetchingNextPage = false;
        state.error = action.payload as string || 'An unknown error occurred';
      });
  }
});

export const { resetProducts, setHasMore } = productsSlice.actions;
export default productsSlice.reducer; 