import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  setFiltersFromUrl, 
  updateCategory,
  updateSearch,
  applyFilter
} from '../store/slices/filterSlice';

/**
 * @deprecated This hook is deprecated in favor of Redux-first URL handling.
 * Please use Redux actions directly: updateCategory, updateSearch, applyFilter, etc.
 * URL parameters are automatically handled by the urlSyncMiddleware.
 */
export const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.warn(
    'useQueryParams is deprecated. Consider using Redux actions directly for better performance.'
  );

  /**
   * Read URL parameters and return them as an object
   * @param keys Optional array of specific keys to extract
   * @returns Object containing URL parameters
   */
  const getParams = useCallback((keys?: string[]) => {
    const searchParams = new URLSearchParams(location.search);
    const params: Record<string, string | string[]> = {};

    // If keys are provided, only get those specific parameters
    if (keys && keys.length > 0) {
      keys.forEach(key => {
        const value = searchParams.get(key);
        if (value !== null) {
          // Handle array parameters with comma separation
          if (value.includes(',')) {
            params[key] = value.split(',');
          } else {
            params[key] = value;
          }
        }
      });
    } else {
      // Get all parameters if no keys are specified
      for (const [key, value] of searchParams.entries()) {
        // Handle array parameters with comma separation
        if (value.includes(',')) {
          params[key] = value.split(',');
        } else {
          params[key] = value;
        }
      }
    }

    return params;
  }, [location.search]);

  /**
   * @deprecated Use Redux actions instead
   * This method is kept for backward compatibility only
   */
  const setParams = useCallback(
    (newParams: Record<string, string | string[]>, options: { replace?: boolean } = {}) => {
      // Check common filter parameters and dispatch Redux actions
      if (newParams.search && typeof newParams.search === 'string') {
        // Search filter
        dispatch(updateSearch(newParams.search));
        return;
      }
      
      if (newParams.categories) {
        // If it's a category change, dispatch that specific action
        if (Array.isArray(newParams.categories) && newParams.categories.length === 1) {
          dispatch(updateCategory(newParams.categories[0]));
          return;
        }
      }
      
      // For other changes, get current params, merge with new ones and apply filter
      const currentParams = getParams();
      dispatch(setFiltersFromUrl({
        ...currentParams,
        ...newParams
      }));
      dispatch(applyFilter());
    },
    [dispatch, location, navigate, getParams]
  );

  /**
   * @deprecated Use Redux reset action instead
   * This method is kept for backward compatibility only
   */
  const removeParams = useCallback(
    (keys: string[]) => {
      // Most common scenario - updating categories
      if (keys.includes('categories')) {
        dispatch(updateCategory(''));
        return;
      }
      
      // For search/keyword
      if (keys.includes('search') || keys.includes('keyword')) {
        dispatch(updateSearch(''));
        return;
      }
      
      // For other parameters, we'll have to extract current params and remove specified ones
      const currentParams = getParams();
      keys.forEach(key => {
        delete currentParams[key];
      });
      
      dispatch(setFiltersFromUrl(currentParams));
      dispatch(applyFilter());
    },
    [dispatch, getParams, location, navigate]
  );

  return {
    getParams,
    setParams,
    removeParams,
  };
}; 