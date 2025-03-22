import { describe, it, expect } from 'vitest';
import filterReducer, { 
  updateFormValues, 
  applyFilter, 
  resetFilter, 
  toggleFilterVisibility, 
  setFiltersFromUrl,
  FilterState
} from './filterSlice';
import { SortType } from '../../enums/filter';

// Create correct initialState matching the actual implementation
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

describe('Filter Slice', () => {
  describe('Initial State', () => {
    it('should return the initial state', () => {
      const state = filterReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('updateFormValues', () => {
    it('should update form values', () => {
      const mockFormValues = {
        search: 'digital',
        categories: ['Art'],
        theme: 'Dark',
        tier: 'Premium',
        priceRange: [50, 150],
      };

      const state = filterReducer(initialState, updateFormValues(mockFormValues));
      
      expect(state.formValues).toEqual(mockFormValues);
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
      const mockFormValues = {
        search: 'digital',
        categories: ['Art'],
        theme: 'Dark',
        tier: 'Premium',
        priceRange: [50, 150],
      };

      let state = filterReducer(initialState, updateFormValues(mockFormValues));
      state = filterReducer(state, applyFilter());
      
      expect(state.appliedFilters).toEqual(mockFormValues);
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
      expect(state.formValues.tier).toBe('Premium');
      expect(state.formValues.priceRange).toEqual([50, 150]);
      expect(state.formValues.theme).toBe('Dark');
      expect(state.formValues.categories).toEqual(['Art']);
      
      expect(state.appliedFilters.search).toBe('digital');
      expect(state.appliedFilters.tier).toBe('Premium');
      expect(state.appliedFilters.priceRange).toEqual([50, 150]);
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

    it('should synchronize search and keyword fields', () => {
      const urlParams = {
        search: 'digital'
      };

      const state = filterReducer(initialState, setFiltersFromUrl(urlParams));
      
      expect(state.appliedFilters.search).toBe('digital');
      expect(state.appliedFilters.keyword).toBe('digital');
    });
  });
}); 