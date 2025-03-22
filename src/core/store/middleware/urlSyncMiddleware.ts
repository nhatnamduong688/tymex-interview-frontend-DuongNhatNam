import { Middleware } from 'redux';
import { 
  setFiltersFromUrl, 
  applyFilter,
  resetFilter,
  updateCategory,
  updateSearch
} from '../../../features/marketplace/store/filterSlice';
import { AnyAction } from '@reduxjs/toolkit';

/**
 * Redux middleware that synchronizes URL parameters with the filter state
 * More efficient than using a React hook as it's outside the React lifecycle
 */
export const urlSyncMiddleware: Middleware = store => {
  // Keep track of previous search to avoid redundant processing
  let previousSearch = window.location.search;
  let isInitialized = false;
  
  // Process URL parameters on initialization
  const processUrlParams = () => {
    try {
      console.log('Processing URL parameters:', window.location.search);
      const searchParams = new URLSearchParams(window.location.search);
      const urlParams: Record<string, any> = {};
      
      // Extract all URL parameters
      for (const [key, value] of searchParams.entries()) {
        console.log(`Found URL param: ${key} = ${value}`);
        // Handle array parameters with comma separation
        if (value.includes(',')) {
          urlParams[key] = value.split(',');
        } else {
          // Parse numbers if needed but preserve tier and theme as strings
          if (!isNaN(Number(value)) && key !== 'categories' && key !== 'tier' && key !== 'theme') {
            urlParams[key] = Number(value);
          } else {
            urlParams[key] = value;
          }
        }
      }
      
      // Only dispatch if parameters exist
      if (Object.keys(urlParams).length > 0) {
        console.log('Dispatching setFiltersFromUrl with:', urlParams);
        store.dispatch(setFiltersFromUrl(urlParams));
      }
    } catch (error) {
      console.error('Error processing URL parameters:', error);
    }
  };
  
  // Process URL parameters initially - this is important when the page first loads
  // but delay slightly to ensure the store is fully initialized
  setTimeout(() => {
    if (!isInitialized && window.location.search) {
      console.log('Initial URL processing with search string:', window.location.search);
      isInitialized = true;
      processUrlParams();
    }
  }, 0);
  
  // Set up listener for URL changes (back/forward button)
  window.addEventListener('popstate', () => {
    console.log('Popstate event detected with search:', window.location.search);
    if (window.location.search !== previousSearch) {
      previousSearch = window.location.search;
      processUrlParams();
    }
  });
  
  // Also set up a history listener to handle direct URL changes
  const originalPushState = window.history.pushState;
  window.history.pushState = function() {
    // Call the original function
    originalPushState.apply(this, arguments as any);
    
    // Check if search params have changed
    if (window.location.search !== previousSearch) {
      console.log('History pushState detected with new search:', window.location.search);
      previousSearch = window.location.search;
      processUrlParams();
    }
  };
  
  // Handle replaceState as well
  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function() {
    // Call the original function
    originalReplaceState.apply(this, arguments as any);
    
    // Check if search params have changed
    if (window.location.search !== previousSearch) {
      console.log('History replaceState detected with new search:', window.location.search);
      previousSearch = window.location.search;
      processUrlParams();
    }
  };
  
  // Update URL based on filter state changes
  const updateUrlFromState = (state: any) => {
    try {
      const url = new URL(window.location.href);
      const filters = state.filter.appliedFilters;
      
      console.log("Updating URL from filter state:", filters);
      
      // Clear existing params
      Array.from(url.searchParams.keys()).forEach(key => {
        url.searchParams.delete(key);
      });
      
      // Add filter params - chỉ giữ lại search, không dùng keyword trong URL
      if (filters.search) {
        url.searchParams.set('search', filters.search);
      }
      
      if (filters.minPrice !== undefined) {
        url.searchParams.set('minPrice', String(filters.minPrice));
      }
      
      if (filters.maxPrice !== undefined) {
        url.searchParams.set('maxPrice', String(filters.maxPrice));
      }
      
      if (filters.tier && filters.tier !== "") {
        url.searchParams.set('tier', String(filters.tier));
        console.log(`Setting URL tier parameter: ${filters.tier}`);
      }
      
      if (filters.theme && filters.theme !== "") {
        url.searchParams.set('theme', String(filters.theme));
        console.log(`Setting URL theme parameter: ${filters.theme}`);
      }
      
      // Add sortTime parameter
      if (filters.sortTime && filters.sortTime !== "") {
        url.searchParams.set('sortTime', String(filters.sortTime));
        console.log(`Setting URL sortTime parameter: ${filters.sortTime}`);
      }
      
      // Add sortPrice parameter
      if (filters.sortPrice && filters.sortPrice !== "") {
        url.searchParams.set('sortPrice', String(filters.sortPrice));
        console.log(`Setting URL sortPrice parameter: ${filters.sortPrice}`);
      }
      
      // Add categories parameter
      if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
        url.searchParams.set('categories', filters.categories.join(','));
        console.log(`Setting URL categories parameter: ${filters.categories.join(',')}`);
      }
      
      // Remove params that should not be in URL
      const paramsToExclude = ['priceRange', 'isFilterVisible', '_page', '_limit', 'keyword'];
      paramsToExclude.forEach(param => {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
        }
      });
      
      // Log the final URL
      console.log(`URL parameters updated: ${url.toString()}`);
      
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
      action && typeof action === 'object' && 'type' in action && (
        action.type === applyFilter.type ||
        action.type === updateCategory.type ||
        action.type === updateSearch.type
      )
    ) {
      updateUrlFromState(state);
    }
    
    // Reset URL when filters are reset
    if (action && typeof action === 'object' && 'type' in action && action.type === resetFilter.type) {
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