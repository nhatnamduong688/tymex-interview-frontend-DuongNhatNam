import { useState, useEffect, useCallback, useRef } from 'react';
import { TProduct } from '../types/Product';
import { productService } from '../services/api';

interface UseProductsProps {
  initialFilters?: Record<string, any>;
  pageSize?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseProductsReturn {
  products: TProduct[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  loadMore: () => void;
  refreshData: () => Promise<void>;
  applyFilter: (filters: Record<string, any>) => void;
  isFetchingNextPage: boolean;
  lastRefreshed: Date | null;
}

export const useProducts = ({
  initialFilters = {},
  pageSize = 12,
  autoRefresh = false,
  refreshInterval = 60000, // 1 minute
}: UseProductsProps = {}): UseProductsReturn => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  
  const intervalRef = useRef<number | null>(null);

  const fetchProducts = useCallback(async (currentPage: number, replace: boolean = true) => {
    try {
      const isLoadingMore = currentPage > 1;
      
      if (isLoadingMore) {
        setIsFetchingNextPage(true);
      } else if (replace) {
        setLoading(true);
      }
      
      setError(null);
      
      const response = await productService.getProducts(
        currentPage, 
        pageSize, 
        filters
      );
      
      setTotalCount(response.total);
      setHasMore(response.hasMore);
      
      // Update products list
      if (replace || currentPage === 1) {
        setProducts(response.data);
      } else {
        setProducts(prevProducts => [...prevProducts, ...response.data]);
      }
      
      setLastRefreshed(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
      setIsFetchingNextPage(false);
    }
  }, [filters, pageSize]);

  // Initial load and when filters change
  useEffect(() => {
    setPage(1);
    fetchProducts(1, true);
  }, [fetchProducts]);

  // Setup auto-refresh if enabled
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      console.log(`Setting up auto-refresh every ${refreshInterval / 1000} seconds`);
      
      // Clear any existing interval
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      
      // Set new interval
      intervalRef.current = window.setInterval(() => {
        console.log('Auto-refreshing products data...');
        fetchProducts(1, true);
      }, refreshInterval);
      
      // Cleanup on unmount
      return () => {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [autoRefresh, refreshInterval, fetchProducts]);

  // Load more products
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, false);
    }
  }, [loading, hasMore, page, fetchProducts]);

  // Apply new filters
  const applyFilter = useCallback((newFilters: Record<string, any>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    setPage(1);
  }, []);

  // Manually refresh data
  const refreshData = useCallback(async () => {
    setPage(1);
    await fetchProducts(1, true);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    totalCount,
    loadMore,
    refreshData,
    applyFilter,
    isFetchingNextPage,
    lastRefreshed
  };
};

export default useProducts; 