import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../../types/product';
import { api } from '../../services/api';

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
  { state: { filter: { appliedFilters: any } } }
>(
  'products/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log('============= THUNK: fetchProducts =============');
      const state = getState();
      const filters = state.filter.appliedFilters;
      
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
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const fetchMoreProducts = createAsyncThunk<
  { data: TProduct[]; totalCount: number; page: number },
  void,
  { state: { products: ProductsState; filter: { appliedFilters: any } } }
>(
  'products/fetchMore',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    
    const { page, limit } = state.products;
    const nextPage = page + 1;
    const filters = state.filter.appliedFilters;
    
    try {
      const response = await api.getProducts({
        ...filters,
        _page: nextPage,
        _limit: limit
      });
      
      return {
        data: response.data,
        totalCount: parseInt(response.headers['x-total-count'] || '0'),
        page: nextPage
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch more products');
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
        state.hasMore = state.data.length < action.payload.totalCount;
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
      .addCase(fetchMoreProducts.fulfilled, (state, action: PayloadAction<{ data: TProduct[], totalCount: number, page: number }>) => {
        state.isFetchingNextPage = false;
        state.data = [...state.data, ...action.payload.data];
        state.totalCount = action.payload.totalCount;
        state.page = action.payload.page;
        state.hasMore = state.data.length < action.payload.totalCount;
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.isFetchingNextPage = false;
        state.error = action.payload as string || 'An unknown error occurred';
      });
  }
});

export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer; 