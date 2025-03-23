import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks';
import { RootState } from '../../store';
import { fetchProducts, fetchMoreProducts } from '../../store/productsSlice';

export interface UseProductResult {
  dataProduct: any[];
  hasMore: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

export const useProduct = (): UseProductResult => {
  const dispatch = useAppDispatch();
  
  // Get data from Redux
  const { 
    data: dataProduct, 
    loading: isLoading, 
    hasMore,
    isFetchingNextPage
  } = useAppSelector((state: RootState) => state.products);
  
  const { appliedFilters } = useAppSelector((state: RootState) => state.filter);
  
  // Load first page of products when filters change
  useEffect(() => {
    console.log("Fetching products with filters:", appliedFilters);
    dispatch(fetchProducts());
  }, [dispatch, appliedFilters]);

  // Load more products
  const fetchNextPage = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(fetchMoreProducts());
    }
  }, [dispatch, isLoading, hasMore]);

  return {
    dataProduct,
    hasMore,
    fetchNextPage,
    isLoading,
    isFetchingNextPage
  };
}; 