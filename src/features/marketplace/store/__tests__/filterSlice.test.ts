import { describe, it, expect } from 'vitest';
import filterReducer, { 
  updateFormValues, 
  applyFilter, 
  resetFilter, 
  toggleFilterVisibility,
  setFilterVisibility,
  applySearchFilter,
  setFiltersFromUrl,
  FilterState
} from '../../store/filterSlice';
import { SortType } from '../../enums/filter';

// Mock initialState to match the actual initialState in filterSlice
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
    sortPrice: ''
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
    sortPrice: ''
  },
  isFilterVisible: false,
  themes: [],
  tiers: []
};

// Mock form values for testing
const mockFormValues = {
  search: 'digital',
  keyword: '',
  categories: ['Art'],
  theme: 'Dark',
  tier: 'Premium',
  priceRange: [50, 150],
  minPrice: 0,
  maxPrice: 200,
  sortTime: '',
  sortPrice: ''
};

describe('Filter Slice', () => {
  describe('Initial State', () => {
    it('should return the initial state', () => {
      const state = filterReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('updateFormValues', () => {
    it('should update form values', () => {
      const mockPartialFormValues = {
        search: 'digital',
        categories: ['Art'],
        theme: 'Dark',
        tier: 'Premium',
        priceRange: [50, 150],
      };

      const state = filterReducer(initialState, updateFormValues(mockPartialFormValues));
      
      // Chỉ kiểm tra các giá trị đã cập nhật
      expect(state.formValues.search).toEqual(mockPartialFormValues.search);
      expect(state.formValues.categories).toEqual(mockPartialFormValues.categories);
      expect(state.formValues.theme).toEqual(mockPartialFormValues.theme);
      expect(state.formValues.tier).toEqual(mockPartialFormValues.tier);
      expect(state.formValues.priceRange).toEqual(mockPartialFormValues.priceRange);
    });

    it('should handle partial updates', () => {
      const previousState = {
        ...initialState,
        formValues: {
          ...initialState.formValues,
          search: 'existing',
          tier: 'Basic'
        }
      };

      const updatedValues = {
        search: 'new search',
        theme: 'Dark'
      };

      const state = filterReducer(previousState, updateFormValues(updatedValues));

      expect(state.formValues).toEqual({
        ...previousState.formValues,
        ...updatedValues
      });
    });
  });

  describe('applyFilter', () => {
    it('should apply filter from form values', () => {
      const mockPartialFormValues = {
        search: 'digital',
        categories: ['Art'],
        theme: 'Dark',
        tier: 'Premium',
        priceRange: [50, 150],
      };

      let state = filterReducer(initialState, updateFormValues(mockPartialFormValues));
      state = filterReducer(state, applyFilter());
      
      // Chỉ kiểm tra các giá trị đã áp dụng
      expect(state.appliedFilters.search).toEqual(mockPartialFormValues.search);
      expect(state.appliedFilters.categories).toEqual(mockPartialFormValues.categories);
      expect(state.appliedFilters.theme).toEqual(mockPartialFormValues.theme);
      expect(state.appliedFilters.tier).toEqual(mockPartialFormValues.tier);
      expect(state.appliedFilters.priceRange).toEqual(mockPartialFormValues.priceRange);
    });

    it('should update searchText when search is applied', () => {
      const mockFormValues = {
        search: 'digital art',
        categories: [],
      };

      let state = filterReducer(initialState, updateFormValues(mockFormValues));
      state = filterReducer(state, applyFilter());
      
      expect(state.appliedFilters.search).toBe('digital art');
    });
  });

  describe('resetFilter', () => {
    it('should reset filter to initial state', () => {
      // First, set some values
      let state = filterReducer(initialState, updateFormValues({
        search: 'digital',
        categories: ['Art'],
        theme: 'Dark',
        tier: 'Premium',
        priceRange: [50, 150],
      }));

      // Then apply them
      state = filterReducer(state, applyFilter());
      
      // Check that values were updated
      expect(state.formValues).not.toEqual(initialState.formValues);
      expect(state.appliedFilters).not.toEqual(initialState.appliedFilters);
      
      // Reset the filter
      state = filterReducer(state, resetFilter());
      
      expect(state.formValues).toEqual(initialState.formValues);
      expect(state.appliedFilters).toEqual(initialState.appliedFilters);
    });
  });

  describe('toggleFilterVisibility', () => {
    it('should toggle filter visibility', () => {
      expect(initialState.isFilterVisible).toBe(false);
      
      let state = filterReducer(initialState, toggleFilterVisibility());
      expect(state.isFilterVisible).toBe(true);
      
      state = filterReducer(state, toggleFilterVisibility());
      expect(state.isFilterVisible).toBe(false);
    });
  });

  describe('setFilterVisibility', () => {
    it('should set filter visibility to true', () => {
      const state = filterReducer(initialState, setFilterVisibility(true));
      expect(state.isFilterVisible).toBe(true);
    });
    
    it('should set filter visibility to false', () => {
      // First set to true
      let state = filterReducer(initialState, setFilterVisibility(true));
      expect(state.isFilterVisible).toBe(true);
      
      // Then set back to false
      state = filterReducer(state, setFilterVisibility(false));
      expect(state.isFilterVisible).toBe(false);
    });
    
    it('should not change if already at desired value', () => {
      // Default is false, set to false again
      const state = filterReducer(initialState, setFilterVisibility(false));
      expect(state.isFilterVisible).toBe(false);
    });
  });

  describe('applySearchFilter', () => {
    it('should update search value in both formValues and appliedFilters', () => {
      const searchValue = 'new search term';
      
      const state = filterReducer(initialState, applySearchFilter(searchValue));
      
      expect(state.formValues.search).toBe(searchValue);
      expect(state.appliedFilters.search).toBe(searchValue);
    });
    
    it('should override existing search values', () => {
      // Setup state with existing search values
      let state = filterReducer(initialState, updateFormValues({
        search: 'existing search'
      }));
      state = filterReducer(state, applyFilter());
      
      // Apply new search value
      const newSearchValue = 'updated search';
      state = filterReducer(state, applySearchFilter(newSearchValue));
      
      expect(state.formValues.search).toBe(newSearchValue);
      expect(state.appliedFilters.search).toBe(newSearchValue);
    });
    
    it('should handle empty string', () => {
      // Setup state with existing search values
      let state = filterReducer(initialState, updateFormValues({
        search: 'existing search'
      }));
      state = filterReducer(state, applyFilter());
      
      // Apply empty search
      state = filterReducer(state, applySearchFilter(''));
      
      expect(state.formValues.search).toBe('');
      expect(state.appliedFilters.search).toBe('');
    });
  });

  describe('setFiltersFromUrl', () => {
    it('should set filters from URL parameters', () => {
      const urlParams = {
        search: 'digital',
        tier: 'Premium',
        minPrice: '50',
        maxPrice: '150',
        theme: 'Dark',
        categories: ['Art'],
        sortPrice: SortType.Ascending
      };

      const state = filterReducer(initialState, setFiltersFromUrl(urlParams));
      
      expect(state.formValues.search).toBe('digital');
      expect(state.formValues.keyword).toBe('digital');
      expect(state.formValues.tier).toBe('Premium');
      expect(state.appliedFilters.minPrice).toBe(50);
      expect(state.appliedFilters.maxPrice).toBe(150);
      expect(state.formValues.theme).toBe('Dark');
      expect(state.formValues.categories).toEqual(['Art']);
      
      expect(state.appliedFilters.search).toBe('digital');
      expect(state.appliedFilters.keyword).toBe('digital');
      expect(state.appliedFilters.tier).toBe('Premium');
      expect(state.appliedFilters.minPrice).toBe(50);
      expect(state.appliedFilters.maxPrice).toBe(150);
      expect(state.appliedFilters.theme).toBe('Dark');
      expect(state.appliedFilters.categories).toEqual(['Art']);
      expect(state.appliedFilters.sortPrice).toBe(SortType.Ascending);
    });

    it('should handle multiple categories from URL', () => {
      const urlParams = {
        categories: ['Art', 'Gaming']
      };

      const state = filterReducer(initialState, setFiltersFromUrl(urlParams));
      
      expect(state.appliedFilters.categories).toEqual(['Art', 'Gaming']);
      expect(state.formValues.categories).toEqual(['Art', 'Gaming']);
    });

    it('should handle empty parameters', () => {
      const state = filterReducer(initialState, setFiltersFromUrl({}));
      
      expect(state.appliedFilters).toEqual(initialState.appliedFilters);
      expect(state.formValues).toEqual(initialState.formValues);
    });
    
    it('should set both search and keyword when search parameter is present', () => {
      const urlParams = {
        search: 'keyword search'
      };
      
      const state = filterReducer(initialState, setFiltersFromUrl(urlParams));
      
      expect(state.formValues.search).toBe('keyword search');
      expect(state.formValues.keyword).toBe('keyword search');
      expect(state.appliedFilters.search).toBe('keyword search');
      expect(state.appliedFilters.keyword).toBe('keyword search');
    });
    
    it('should handle minPrice and maxPrice parameters correctly', () => {
      const urlParams = {
        minPrice: '50',
        maxPrice: '150'
      };
      
      const state = filterReducer(initialState, setFiltersFromUrl(urlParams));
      
      expect(state.appliedFilters.minPrice).toBe(50);
      expect(state.appliedFilters.maxPrice).toBe(150);
    });
  });
}); 