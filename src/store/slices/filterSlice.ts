import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilterProduct } from '../../types/product';
import { SortType } from '../../enums/filter';

// Define the filter state interface
export interface FilterState {
  formValues: {
    // Search/filter fields
    search?: string;
    keyword?: string;
    
    // Category filtering
    categories?: string[];
    
    // Product attributes filtering
    theme?: string;
    tier?: string;
    
    // Price filtering
    priceRange?: [number, number];
    minPrice?: number | string;
    maxPrice?: number | string;
    
    // Sorting
    sortTime?: string;
    sortPrice?: string;
  };
  appliedFilters: {
    // Search/filter fields
    search?: string;
    keyword?: string;
    
    // Category filtering
    categories?: string[];
    
    // Product attributes filtering
    theme?: string;
    tier?: string;
    
    // Price filtering
    priceRange?: [number, number];
    minPrice?: number | string;
    maxPrice?: number | string;
    
    // Sorting
    sortTime?: string;
    sortPrice?: string;
  };
  isFilterVisible: boolean;
  tiers: string[];
  themes: string[];
}

// Initial state
const initialState: FilterState = {
  formValues: {
    search: '',
    keyword: '',
    categories: [],
    theme: '',
    tier: '',
    priceRange: [0, 200],
    minPrice: 0,
    maxPrice: 200,
    sortTime: '',
    sortPrice: '',
  },
  appliedFilters: {
    search: '',
    keyword: '',
    categories: [],
    theme: '',
    tier: '',
    priceRange: [0, 200],
    minPrice: 0,
    maxPrice: 200,
    sortTime: '',
    sortPrice: '',
  },
  isFilterVisible: false,
  tiers: [],
  themes: [],
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
    
    // Reset all filters to default values
    resetFilter: (state) => {
      console.log('============= FILTER SLICE: resetFilter =============');
      
      // Reset form values
      state.formValues = {
        ...initialState.formValues
      };
      
      // Reset applied filters
      state.appliedFilters = {
        ...initialState.appliedFilters
      };
      
      console.log('Reset filter state - formValues:', state.formValues);
      console.log('Reset filter state - appliedFilters:', state.appliedFilters);
      console.log('============= END FILTER SLICE =============');
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
        
        // Đảm bảo chuyển đổi đúng kiểu dữ liệu
        const minPrice = params.minPrice !== undefined ? parseFloat(params.minPrice) : 0;
        const maxPrice = params.maxPrice !== undefined ? parseFloat(params.maxPrice) : 200;
        
        console.log('Parsed values:', minPrice, maxPrice);
        
        // Standardize: luôn tạo priceRange cho UI từ minPrice/maxPrice
        params.priceRange = [minPrice, maxPrice];
        
        // Cập nhật lại minPrice/maxPrice (đảm bảo là số, không phải chuỗi)
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
        
        console.log('Created priceRange and updated min/max:', params);
      } else if (params.priceRange) {
        console.log('priceRange param detected:', params.priceRange);
        
        // Đảm bảo priceRange là array
        let priceRange = params.priceRange;
        if (!Array.isArray(priceRange)) {
          try {
            priceRange = JSON.parse(params.priceRange);
          } catch (e) {
            // Nếu không parse được, set giá trị mặc định
            priceRange = [0, 200];
          }
        }
        
        // Đảm bảo priceRange đúng format và có 2 phần tử
        if (!Array.isArray(priceRange) || priceRange.length !== 2) {
          priceRange = [0, 200];
        }
        
        params.priceRange = priceRange;
        // Đồng bộ lại minPrice/maxPrice
        params.minPrice = priceRange[0];
        params.maxPrice = priceRange[1];
        
        console.log('Standardized priceRange and created min/max:', params);
      } else {
        console.log('No price range params found in URL, using defaults');
        
        // Set default values nếu không có params
        params.priceRange = [0, 200];
        params.minPrice = 0;
        params.maxPrice = 200;
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
        params.categories = [];
      }
      
      // Check and standardize tier and theme params
      if (params.tier) {
        console.log('Tier from URL:', params.tier, typeof params.tier);
        // Ensure tier is a string
        params.tier = String(params.tier);
      }
      
      if (params.theme) {
        console.log('Theme from URL:', params.theme, typeof params.theme);
        // Ensure theme is a string
        params.theme = String(params.theme);
      }
      
      // Handling sortTime and sortPrice
      if (params.sortTime) {
        console.log('sortTime from URL:', params.sortTime);
        // Ensure it's a valid sort value
        params.sortTime = SortType[params.sortTime as keyof typeof SortType] || SortType.Ascending;
      }
      
      if (params.sortPrice) {
        console.log('sortPrice from URL:', params.sortPrice);
        // Ensure it's a valid sort value
        params.sortPrice = SortType[params.sortPrice as keyof typeof SortType] || SortType.Ascending;
      }
      
      console.log('Final params before updating state:', params);
      
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
    
    // Update category filter
    updateCategory: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      
      if (value === "") { // All categories
        state.formValues.categories = [];
        state.appliedFilters.categories = [];
      } else {
        const currentCategories = state.formValues.categories || [];
        const newCategories = currentCategories.includes(value)
          ? currentCategories.filter(item => item !== value)
          : [...currentCategories, value];
          
        state.formValues.categories = newCategories;
        state.appliedFilters.categories = newCategories;
      }
    },
    
    // Search by keyword
    updateSearch: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      state.formValues.search = value;
      state.formValues.keyword = value;
      state.appliedFilters.search = value;
      state.appliedFilters.keyword = value;
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
  updateCategory,
  updateSearch,
} = filterSlice.actions;

export default filterSlice.reducer; 