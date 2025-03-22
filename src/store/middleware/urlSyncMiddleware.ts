import { Middleware } from 'redux';
import { 
  setFiltersFromUrl, 
  applyFilter,
  resetFilter,
  updateCategory,
  updateSearch
} from '../slices/filterSlice';

/**
 * Redux middleware that synchronizes URL parameters with the filter state
 * More efficient than using a React hook as it's outside the React lifecycle
 */
export const urlSyncMiddleware: Middleware = store => {
  // Keep track of previous search to avoid redundant processing
  let previousSearch = window.location.search;
  
  // Process URL parameters on initialization
  const processUrlParams = () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlParams: Record<string, any> = {};
      
      // Extract all URL parameters
      for (const [key, value] of searchParams.entries()) {
        // Handle array parameters with comma separation
        if (value.includes(',')) {
          urlParams[key] = value.split(',');
        } else {
          // Parse numbers if needed
          if (!isNaN(Number(value)) && key !== 'categories' && key !== 'tier' && key !== 'theme') {
            urlParams[key] = Number(value);
          } else {
            urlParams[key] = value;
          }
        }
      }
      
      // Only dispatch if parameters exist
      if (Object.keys(urlParams).length > 0) {
        store.dispatch(setFiltersFromUrl(urlParams));
      }
    } catch (error) {
      console.error('Error processing URL parameters:', error);
    }
  };
  
  // Process URL parameters initially
  processUrlParams();
  
  // Set up listener for URL changes
  window.addEventListener('popstate', () => {
    if (window.location.search !== previousSearch) {
      previousSearch = window.location.search;
      processUrlParams();
    }
  });
  
  // Update URL based on filter state changes
  const updateUrlFromState = (state: any) => {
    try {
      const url = new URL(window.location.href);
      const filters = state.filter.appliedFilters;
      
      // Clear existing params
      Array.from(url.searchParams.keys()).forEach(key => {
        url.searchParams.delete(key);
      });
      
      // Add filter params
      if (filters.search) {
        url.searchParams.set('search', filters.search);
      }
      
      if (filters.minPrice !== undefined) {
        url.searchParams.set('minPrice', String(filters.minPrice));
      }
      
      if (filters.maxPrice !== undefined) {
        url.searchParams.set('maxPrice', String(filters.maxPrice));
      }
      
      if (filters.tier) {
        url.searchParams.set('tier', filters.tier);
      }
      
      if (filters.theme) {
        url.searchParams.set('theme', filters.theme);
      }
      
      if (filters.sortTime) {
        url.searchParams.set('sortTime', filters.sortTime);
      }
      
      if (filters.sortPrice) {
        url.searchParams.set('sortPrice', filters.sortPrice);
      }
      
      if (filters.categories && filters.categories.length > 0) {
        url.searchParams.set('categories', filters.categories.join(','));
      }
      
      // Remove params that should not be in URL
      const paramsToExclude = ['priceRange', 'isFilterVisible', '_page', '_limit', 'keyword'];
      paramsToExclude.forEach(param => {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
        }
      });
      
      // Use replaceState to avoid creating browser history entries
      window.history.replaceState({}, '', url.toString());
      previousSearch = url.search;
    } catch (error) {
      console.error('Error updating URL parameters:', error);
    }
  };
  
  return next => action => {
    // Check for URL-affecting actions
    const result = next(action);
    
    // After the reducer runs, check if we need to update URL
    const state = store.getState();
    
    // Listen for specific actions that should trigger URL updates
    if (
      action.type === applyFilter.type ||
      action.type === updateCategory.type ||
      action.type === updateSearch.type
    ) {
      updateUrlFromState(state);
    }
    
    // Reset URL when filters are reset
    if (action.type === resetFilter.type) {
      window.history.replaceState({}, '', window.location.pathname);
      previousSearch = '';
    }
    
    // Check if URL has changed through history events
    if (window.location.search !== previousSearch) {
      previousSearch = window.location.search;
      processUrlParams();
    }
    
    return result;
  };
}; 