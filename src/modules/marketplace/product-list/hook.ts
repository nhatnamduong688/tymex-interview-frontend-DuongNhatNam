import { useState, useEffect } from 'react';
import { getListProduct } from "../../../server/product";
import { useProductsContext } from "../../../contexts/productsContext";

const DEFAULT_LIMIT = 12;

export const useProduct = () => {
  const { filter } = useProductsContext();
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial data when filter changes
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setDataProduct([]);
      setOffset(0);
      setIsError(false);
      setError(null);
      
      try {
        const response = await getListProduct({ 
          offset: 0, 
          limit: DEFAULT_LIMIT, 
          ...filter 
        });
        
        setDataProduct(response.data);
        setHasMore(response.hasMore);
        setOffset(response.nextOffset);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, [filter]);

  // Function to fetch next page
  const fetchNextPage = async () => {
    if (isFetchingNextPage || !hasMore) return;
    
    setIsFetchingNextPage(true);
    
    try {
      const response = await getListProduct({ 
        offset, 
        limit: DEFAULT_LIMIT, 
        ...filter 
      });
      
      setDataProduct(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setOffset(response.nextOffset);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  return {
    dataProduct,
    isLoading,
    hasMore,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  };
}; 