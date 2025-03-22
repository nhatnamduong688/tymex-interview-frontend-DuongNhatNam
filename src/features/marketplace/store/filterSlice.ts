import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilterProduct } from '../types/product';
import { SortType } from '../enums/filter';

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
    updateFormValues: (state, action: PayloadAction<Partial<TFilterProduct>>) => {
      console.log('Updating form values with:', action.payload);
      
      // Handle updates to formValues
      state.formValues = {
        ...state.formValues,
        ...action.payload
      };
      
      // Handle price range specifically
      if (action.payload.priceRange && Array.isArray(action.payload.priceRange) && action.payload.priceRange.length === 2) {
        // Update minPrice and maxPrice based on priceRange
        state.formValues.minPrice = action.payload.priceRange[0];
        state.formValues.maxPrice = action.payload.priceRange[1];
        console.log('Updated price range in Redux:', 
          state.formValues.priceRange, 
          'min:', state.formValues.minPrice, 
          'max:', state.formValues.maxPrice
        );
      }
      
      // For direct updates to minPrice/maxPrice, update priceRange as well
      if (action.payload.minPrice !== undefined || action.payload.maxPrice !== undefined) {
        const minPrice = action.payload.minPrice !== undefined ? 
          action.payload.minPrice : (state.formValues.minPrice || 0);
        const maxPrice = action.payload.maxPrice !== undefined ? 
          action.payload.maxPrice : (state.formValues.maxPrice || 200);
        
        state.formValues.priceRange = [Number(minPrice), Number(maxPrice)];
        console.log('Updated priceRange from min/max:', state.formValues.priceRange);
      }
    },
    
    // Apply filter (copy form values to applied filters)
    applyFilter: (state) => {
      console.log('Applying filter from form values:', state.formValues);
      
      // Log tier and theme specifically
      if (state.formValues.tier) {
        console.log(`Applying tier filter: "${state.formValues.tier}" of type ${typeof state.formValues.tier}`);
      }
      
      if (state.formValues.theme) {
        console.log(`Applying theme filter: "${state.formValues.theme}" of type ${typeof state.formValues.theme}`);
      }
      
      // Ensure string types for tier and theme
      if (state.formValues.tier) {
        state.formValues.tier = String(state.formValues.tier);
      }
      
      if (state.formValues.theme) {
        state.formValues.theme = String(state.formValues.theme);
      }
      
      state.appliedFilters = { ...state.formValues };
      
      console.log('Applied filters:', state.appliedFilters);
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
      const urlParams = action.payload;
      console.log('FILTER SLICE: Setting filters from URL params:', urlParams);
      
      // Deep clone parameter values to avoid reference issues
      let updatedValues = { ...state.formValues };
      
      // Apply URL params to form values
      if (urlParams.search) {
        const searchTerm = String(urlParams.search);
        updatedValues.search = searchTerm;
        updatedValues.keyword = searchTerm;
        console.log(`Setting search/keyword in state to: "${searchTerm}"`);
      }
      
      // Handle minPrice & maxPrice from URL
      if (urlParams.minPrice) {
        const minPrice = Number(urlParams.minPrice);
        state.formValues.priceRange = state.formValues.priceRange || [0, 200];
        state.formValues.priceRange = [minPrice, state.formValues.priceRange[1]];
        state.appliedFilters.minPrice = minPrice;
      }
      if (urlParams.maxPrice) {
        const maxPrice = Number(urlParams.maxPrice);
        state.formValues.priceRange = state.formValues.priceRange || [0, 200];
        state.formValues.priceRange = [state.formValues.priceRange[0], maxPrice];
        state.appliedFilters.maxPrice = maxPrice;
      }
      
      if (urlParams.tier) {
        // Ensure tier is treated as a string value
        updatedValues.tier = String(urlParams.tier);
        console.log(`Setting tier in state to: "${updatedValues.tier}"`);
      }
      
      if (urlParams.theme) {
        // Ensure theme is treated as a string value
        updatedValues.theme = String(urlParams.theme);
        console.log(`Setting theme in state to: "${updatedValues.theme}"`);
      }
      
      if (urlParams.sortTime) {
        updatedValues.sortTime = String(urlParams.sortTime);
      }
      
      if (urlParams.sortPrice) {
        updatedValues.sortPrice = String(urlParams.sortPrice);
      }
      
      if (urlParams.categories) {
        updatedValues.categories = Array.isArray(urlParams.categories) 
          ? urlParams.categories 
          : [urlParams.categories];
      }
      
      // Update form values state
      state.formValues = updatedValues;
      
      // IMPORTANT: Also update applied filters to match - this ensures filters are actually applied
      state.appliedFilters = { ...updatedValues };
      
      console.log('FILTER SLICE: Updated form values from URL:', state.formValues);
      console.log('FILTER SLICE: Updated applied filters from URL:', state.appliedFilters);
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