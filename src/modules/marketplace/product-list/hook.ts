import { useState, useEffect } from 'react';
import { getListProduct } from '../../../server/product';
import { TProduct } from '../../../types/product';
import { useProductsContext } from '../../../contexts/productsContext';

interface UseProductReturn {
  dataProduct: TProduct[];
  hasMore: boolean;
  fetchNextPage: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: Error | null;
}

export const useProduct = (): UseProductReturn => {
  const [dataProduct, setDataProduct] = useState<TProduct[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { filter } = useProductsContext();
  
  const LIMIT = 8;

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      
      try {
        const response = await getListProduct({
          offset: 0,
          limit: LIMIT,
          filter
        });
        
        setDataProduct(response.data as TProduct[]);
        setHasMore(response.hasMore);
        setNextOffset(response.nextOffset);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [filter]);

  // Function to fetch next page
  const fetchNextPage = async () => {
    if (!hasMore || isLoading || isFetchingNextPage) return;
    
    setIsFetchingNextPage(true);
    
    try {
      const response = await getListProduct({
        offset: nextOffset,
        limit: LIMIT,
        filter
      });
      
      setDataProduct(prev => [...prev, ...(response.data as TProduct[])]);
      setHasMore(response.hasMore);
      setNextOffset(response.nextOffset);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  return {
    dataProduct,
    hasMore,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error
  };
}; 