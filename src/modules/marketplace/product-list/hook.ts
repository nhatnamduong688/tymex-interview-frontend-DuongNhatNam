import { useEffect } from 'react';
import { TProduct } from '../../../types/product';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { fetchProducts, fetchMoreProducts } from '../../../store/slices/productsSlice';

/**
 * @deprecated This hook is deprecated in favor of direct Redux usage.
 * Please use Redux actions and selectors directly instead.
 */
interface UseProductReturn {
  dataProduct: TProduct[];
  hasMore: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * @deprecated This hook is deprecated in favor of direct Redux usage.
 * Please use useSelector and useDispatch with products slice instead.
 */
export const useProduct = (): UseProductReturn => {
  console.warn(
    'useProduct hook is deprecated. Please use Redux directly with useSelector and useDispatch.'
  );
  
  const dispatch = useDispatch();
  
  // Get data from Redux
  const { 
    data: dataProduct, 
    loading: isLoading, 
    error, 
    hasMore,
    isFetchingNextPage
  } = useSelector((state: RootState) => state.products);
  
  const appliedFilters = useSelector((state: RootState) => state.filter.appliedFilters);
  
  // Fetch initial data
  useEffect(() => {
    dispatch(fetchProducts(appliedFilters));
  }, [dispatch, JSON.stringify(appliedFilters)]);

  // Function to fetch next page
  const fetchNextPage = () => {
    if (!hasMore || isLoading || isFetchingNextPage) return;
    dispatch(fetchMoreProducts());
  };

  return {
    dataProduct,
    hasMore,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    isError: !!error,
    error: error ? new Error(error) : null
  };
}; 