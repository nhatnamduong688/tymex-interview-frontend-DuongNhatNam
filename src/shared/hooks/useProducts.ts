import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../core/types';
import { 
  fetchProducts, 
  fetchMoreProducts,
  selectProducts,
  setHasMore, 
  ProductsState 
} from '../../features/marketplace/store/productsSlice';
import { TProduct } from '../../features/marketplace/types/product';

/**
 * Hook for accessing and managing product data through Redux
 */
export const useProducts = () => {
  const dispatch = useDispatch();
  const { 
    data, 
    loading, 
    error, 
    hasMore,
    page
  } = useSelector((state: RootState) => state.products);
  const appliedFilters = useSelector((state: RootState) => state.filter.appliedFilters);

  // Initialize products when the component mounts or filters change
  useEffect(() => {
    // @ts-ignore - Type error is related to thunk action types
    dispatch(fetchProducts(appliedFilters));
  }, [dispatch, JSON.stringify(appliedFilters)]);

  /**
   * Loads the next page of products
   */
  const loadMore = () => {
    // @ts-ignore - Type error is related to thunk action types
    dispatch(fetchMoreProducts());
  };

  /**
   * Retries loading products when there was an error
   */
  const retryLoading = () => {
    // @ts-ignore - Type error is related to thunk action types
    dispatch(fetchProducts(appliedFilters));
  };

  return {
    products: data,
    loading,
    error,
    hasMore,
    currentPage: page,
    loadMore,
    retryLoading
  };
}; 