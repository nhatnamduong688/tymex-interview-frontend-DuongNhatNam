import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../../types/product';
import { api } from '../../services/api';
import { RootState } from '../index';

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
  limit: 10
};

export const fetchProducts = createAsyncThunk<
  { data: TProduct[]; totalCount: number },
  void,
  { state: RootState }
>(
  'products/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log('============= THUNK: fetchProducts =============');
      const state = getState();
      const filters = state.filter?.appliedFilters || {};
      
      console.log("fetchProducts thunk gọi với filters từ state:", 
                  JSON.stringify(filters, null, 2));
      
      // Log trực tiếp các giá trị quan trọng
      if (filters.minPrice || filters.maxPrice) {
        console.log('Direct minPrice/maxPrice found:');
        console.log('- minPrice:', filters.minPrice, typeof filters.minPrice);
        console.log('- maxPrice:', filters.maxPrice, typeof filters.maxPrice);
      }
      
      if (filters.priceRange) {
        console.log('priceRange found:', filters.priceRange);
      }
      
      if (filters.tier) {
        console.log('tier found:', filters.tier, typeof filters.tier);
      }
      
      if (filters.theme) {
        console.log('theme found:', filters.theme, typeof filters.theme);
      }
      
      console.log("Gọi API với filters:", filters);
      const response = await api.getProducts({
        ...filters,
        _page: 1,
        _limit: 10
      });
      
      console.log("API response received:", {
        dataLength: response.data.length,
        totalCount: response.headers['x-total-count']
      });
      
      console.log('============= END THUNK: fetchProducts =============');
      
      return {
        data: response.data,
        totalCount: parseInt(response.headers['x-total-count'] || '0')
      };
    } catch (error: any) {
      console.error("Error in fetchProducts thunk:", error);
      return rejectWithValue(error.toString());
    }
  }
);

export const fetchMoreProducts = createAsyncThunk<
  { data: TProduct[]; totalCount: number },
  void,
  { state: RootState }
>(
  'products/fetchMore',
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log('============= THUNK: fetchMoreProducts =============');
      console.log('Time:', new Date().toISOString());
      
      const state = getState();
      const productsState = state.products;
      const filters = state.filter?.appliedFilters || {};
      const nextPage = productsState.page + 1;
      
      console.log('fetchMoreProducts called with state:', { 
        currentPage: productsState.page,
        nextPage,
        dataLength: productsState.data.length,
        totalCount: productsState.totalCount,
        hasMore: productsState.hasMore
      });
      
      console.log('Applied filters:', JSON.stringify(filters, null, 2));

      if (!productsState.hasMore) {
        console.log('No more products to fetch (hasMore is false). Returning early.');
        return { 
          data: [], 
          totalCount: productsState.totalCount 
        };
      }

      console.log('Will fetch page:', nextPage);
      console.log('API call parameters:', {
        ...filters,
        _page: nextPage,
        _limit: productsState.limit
      });
      
      // Make API call with explicit pagination parameters
      const response = await api.getProducts({
        ...filters,
        _page: nextPage,
        _limit: productsState.limit
      });
      
      const newData = response.data;
      const totalCount = parseInt(response.headers['x-total-count'] || '0');
      
      console.log('Fetched more products:', {
        newDataLength: newData.length, 
        responseTotal: totalCount,
        currentPage: productsState.page,
        nextPage
      });
      
      // Check if we have more data after this fetch
      const hasMoreProducts = (productsState.data.length + newData.length) < totalCount;
      console.log('Has more products after this fetch:', hasMoreProducts);
      console.log('============= END THUNK: fetchMoreProducts =============');

      return {
        data: newData,
        totalCount
      };
    } catch (error: any) {
      console.error('Error in fetchMoreProducts:', error);
      return rejectWithValue(error.toString());
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: () => initialState
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
        
        // Only append new data if there is any
        if (action.payload.data.length > 0) {
          state.data = [...state.data, ...action.payload.data];
          state.page = state.page + 1;
        }
        
        state.totalCount = action.payload.totalCount;
        
        // Calculate hasMore: still have more products if the total loaded products is less than the total count
        const hasMoreProducts = state.data.length < action.payload.totalCount;
        state.hasMore = hasMoreProducts;
        
        console.log('fetchMoreProducts.fulfilled updated state:', {
          dataLength: state.data.length,
          newDataLength: action.payload.data.length,
          totalCount: action.payload.totalCount,
          currentPage: state.page,
          hasMore: state.hasMore
        });
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.isFetchingNextPage = false;
        state.error = action.payload as string || 'An unknown error occurred';
      });
  }
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer; 