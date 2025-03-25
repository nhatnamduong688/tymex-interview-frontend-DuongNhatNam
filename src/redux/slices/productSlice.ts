import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Định nghĩa interface cho sản phẩm
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Định nghĩa state cho slice
interface ProductState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

// State ban đầu
const initialState: ProductState = {
  items: [],
  filteredItems: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// Tạo async thunk action để fetch sản phẩm
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Tạo product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Các action đồng bộ
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (category === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (product) => product.category === category
        );
      }
    },
    sortProducts: (state, action: PayloadAction<'price_asc' | 'price_desc'>) => {
      const sortOrder = action.payload;
      state.filteredItems = [...state.filteredItems].sort((a, b) => {
        if (sortOrder === 'price_asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },
  },
  extraReducers: (builder) => {
    // Xử lý các trạng thái của async thunk action
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export các action từ slice
export const { setSelectedProduct, filterProducts, sortProducts } = productSlice.actions;

// Export selectors
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectFilteredProducts = (state: RootState) => state.products.filteredItems;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductLoading = (state: RootState) => state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;

// Export reducer
export default productSlice.reducer; 