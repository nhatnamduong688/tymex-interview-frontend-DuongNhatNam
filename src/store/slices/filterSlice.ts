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
  };
  appliedFilters: {
    search?: string;
    categories?: string[];
    theme?: string;
    tier?: string;
    priceRange?: [number, number];
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
  },
  appliedFilters: {
    search: '',
    categories: [],
    theme: '',
    tier: '',
    priceRange: [0, 200],
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
    setFiltersFromUrl: (state, action: PayloadAction<Partial<FilterState['formValues']>>) => {
      state.formValues = {
        ...initialState.formValues,
        ...action.payload,
      };
      state.appliedFilters = {
        ...initialState.appliedFilters,
        ...action.payload,
      };
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