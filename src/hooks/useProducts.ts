import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { 
  fetchProducts, 
  fetchMoreProducts,
  setHasMore, 
  ProductsState 
} from '../store/slices/productsSlice';
import { Product } from '../types';

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
    currentPage
  } = useSelector((state: RootState) => state.products);
  const appliedFilters = useSelector((state: RootState) => state.filter.appliedFilters);

  // Initialize products when the component mounts or filters change
  useEffect(() => {
    dispatch(fetchProducts(appliedFilters));
  }, [dispatch, JSON.stringify(appliedFilters)]);

  /**
   * Loads the next page of products
   */
  const loadMore = () => {
    dispatch(fetchMoreProducts());
  };

  /**
   * Retries loading products when there was an error
   */
  const retryLoading = () => {
    dispatch(fetchProducts(appliedFilters));
  };

  return {
    products: data,
    loading,
    error,
    hasMore,
    currentPage,
    loadMore,
    retryLoading
  };
}; 