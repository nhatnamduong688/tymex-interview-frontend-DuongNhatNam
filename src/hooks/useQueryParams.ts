import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SetParamsOptions {
  replace?: boolean;
}

export const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const setParams = useCallback(
    (newParams: Record<string, string | string[]>, options: SetParamsOptions = {}) => {
      const searchParams = new URLSearchParams(location.search);

      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            searchParams.set(key, value.join(','));
          } else {
            searchParams.delete(key);
          }
        } else if (value !== undefined && value !== null && value !== '') {
          searchParams.set(key, value);
        } else {
          searchParams.delete(key);
        }
      });

      // Build the new URL
      const newSearch = searchParams.toString();
      const query = newSearch ? `?${newSearch}` : '';

      // Navigate to the new URL
      navigate({
        pathname: location.pathname,
        search: query,
      }, {
        replace: options.replace
      });
    },
    [location, navigate]
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      const searchParams = new URLSearchParams(location.search);
      
      // Remove specified parameters
      keys.forEach(key => {
        searchParams.delete(key);
      });

      // Build the new URL
      const newSearch = searchParams.toString();
      const query = newSearch ? `?${newSearch}` : '';

      // Navigate to the new URL
      navigate({
        pathname: location.pathname,
        search: query,
      });
    },
    [location, navigate]
  );

  return {
    getParams,
    setParams,
    removeParams,
  };
}; 