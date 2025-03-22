import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilterProduct } from '../../types/product';
import { SortType } from '../../enums/filter';

// Define the filter state interface
export interface FilterState {
  formValues: {
    search?: string;
    categories?: string[];
    theme?: string;
    tier?: string;
    priceRange?: [number, number];
    minPrice?: string;
    maxPrice?: string;
    keyword?: string;
  };
  appliedFilters: {
    search?: string;
    categories?: string[];
    theme?: string;
    tier?: string;
    priceRange?: [number, number];
    minPrice?: string;
    maxPrice?: string;
    keyword?: string;
  };
  isFilterVisible: boolean;
}

// Initial state
const initialState: FilterState = {
  formValues: {
    search: '',
    categories: [],
    theme: '',
    tier: '',
    priceRange: [0, 200],
    minPrice: '',
    maxPrice: '',
    keyword: '',
  },
  appliedFilters: {
    search: '',
    categories: [],
    theme: '',
    tier: '',
    priceRange: [0, 200],
    minPrice: '',
    maxPrice: '',
    keyword: '',
  },
  isFilterVisible: false,
};

// Create the filter slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Update form values without applying filter
    updateFormValues: (state, action: PayloadAction<Partial<FilterState['formValues']>>) => {
      state.formValues = {
        ...state.formValues,
        ...action.payload,
      };
    },
    
    // Apply filter (copy form values to applied filters)
    applyFilter: (state) => {
      state.appliedFilters = { ...state.formValues };
    },
    
    // Apply just the search part of filter 
    applySearchFilter: (state, action: PayloadAction<string>) => {
      state.formValues.search = action.payload;
      state.appliedFilters.search = action.payload;
    },
    
    // Reset filter to initial state
    resetFilter: (state) => {
      state.formValues = initialState.formValues;
      state.appliedFilters = initialState.appliedFilters;
    },
    
    // Toggle filter visibility
    toggleFilterVisibility: (state) => {
      state.isFilterVisible = !state.isFilterVisible;
    },
    
    // Set filter visibility
    setFilterVisibility: (state, action: PayloadAction<boolean>) => {
      state.isFilterVisible = action.payload;
    },
    
    // Set filters from URL params
    setFiltersFromUrl: (state, action: PayloadAction<Record<string, any>>) => {
      console.log('============= FILTER SLICE: setFiltersFromUrl =============');
      console.log('Received action payload:', JSON.stringify(action.payload, null, 2));
      
      // Tạo một bản sao của payload để tránh mutation
      const params = { ...action.payload };
      console.log('Cloned params:', params);
      
      // Xử lý search/keyword để đảm bảo đồng bộ
      if (params.search) {
        console.log('Search param detected:', params.search);
        // Đảm bảo cả search và keyword đều có giá trị
        params.keyword = params.search;
      } else if (params.keyword) {
        console.log('Keyword param detected:', params.keyword);
        // Nếu chỉ có keyword, đảm bảo search cũng có giá trị
        params.search = params.keyword;
      }
      
      // Handle price range for UI
      if (params.minPrice || params.maxPrice) {
        console.log('Price range params detected:');
        console.log('minPrice:', params.minPrice, typeof params.minPrice);
        console.log('maxPrice:', params.maxPrice, typeof params.maxPrice);
        
        const minPrice = parseFloat(params.minPrice) || 0;
        const maxPrice = parseFloat(params.maxPrice) || 200;
        
        console.log('Parsed values:', minPrice, maxPrice);
        
        // Thêm priceRange cho UI nhưng giữ nguyên minPrice/maxPrice cho API
        params.priceRange = [minPrice, maxPrice];
        console.log('Created priceRange:', params.priceRange);
        
        // KHÔNG xóa minPrice/maxPrice để API có thể sử dụng trực tiếp
        console.log('Added priceRange while preserving minPrice/maxPrice for API:', params);
      } else {
        console.log('No price range params found in URL');
      }
      
      // Ensure categories is always an array
      if (params.categories) {
        console.log('Categories before processing:', params.categories, typeof params.categories);
        
        if (!Array.isArray(params.categories)) {
          params.categories = [params.categories];
          console.log('Converted categories to array:', params.categories);
        } else {
          console.log('Categories already an array, no conversion needed');
        }
      } else {
        console.log('No categories found in URL params');
      }
      
      // Check tier and theme params
      if (params.tier) {
        console.log('Tier from URL:', params.tier, typeof params.tier);
      }
      
      if (params.theme) {
        console.log('Theme from URL:', params.theme, typeof params.theme);
      }
      
      console.log('Final params before updating state:', params);
      
      // Đảm bảo priceRange là array
      if (params.priceRange && !Array.isArray(params.priceRange)) {
        try {
          params.priceRange = JSON.parse(params.priceRange);
        } catch (e) {
          // Nếu không parse được, set giá trị mặc định
          params.priceRange = [0, 200];
        }
      }
      
      // Update both formValues and appliedFilters
      state.formValues = {
        ...state.formValues,
        ...params
      };
      
      state.appliedFilters = {
        ...state.appliedFilters,
        ...params
      };
      
      console.log('Updated filter state - formValues:', state.formValues);
      console.log('Updated filter state - appliedFilters:', state.appliedFilters);
      console.log('============= END FILTER SLICE =============');
    },
  },
});

// Export actions and reducer
export const {
  updateFormValues,
  applyFilter,
  applySearchFilter,
  resetFilter,
  toggleFilterVisibility,
  setFilterVisibility,
  setFiltersFromUrl,
} = filterSlice.actions;

export default filterSlice.reducer; 