import { useState, useEffect } from 'react';
import { FilterData, Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/client-api/get-products';
import { useRouter, useSearchParams } from 'next/navigation';

export const initFilter: FilterData = {
  search: '',
  tier: '',
  theme: '',
  time: '',
  priceOrder: '',
  category: '',
  page: 1,
  price: [],
};

const useFilters = () => {
  const [dataFilter, setDataFilter] = useState<FilterData>(initFilter);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  // Sync dataFilter with URL params on mount and searchParams change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const urlFilterData = {
      search: params.get('search') || '',
      tier: params.get('tier') || '',
      theme: params.get('theme') || '',
      time: params.get('time') || '',
      priceOrder: params.get('priceOrder') || '',
      category: params.get('category') || '',
      price: params.get('price')
        ? (params.get('price')?.split(',').map(Number) as [number, number])
        : [],
      page: 1,
    };
    setDataFilter(urlFilterData);
  }, [searchParams]);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', dataFilter],
    queryFn: () => {
      const request = {
        filterData: {
          ...dataFilter,
          price: dataFilter.price?.length ? dataFilter.price.join(',') : '',
        },
        page: dataFilter.page || 1,
        pageSize: 20,
      };
      return getProducts(request);
    },
    // refetchInterval: 60000,
    refetchInterval: 60000,
  });
  // Update URL with filter params, but skip if only page changed
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentFilterWithoutPage = { ...dataFilter };
    delete currentFilterWithoutPage.page;

    Object.entries(currentFilterWithoutPage).forEach(([key, value]) => {
      if (key === 'price') {
        if (Array.isArray(value) && value.length) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    const newUrl = `?${params.toString()}`;
    if (newUrl !== window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilter]);

  useEffect(() => {
    if (!products?.data) return;
    if (products?.currentPage === 1) {
      setFilteredProducts(products.data);
    } else {
      setFilteredProducts((prev) => [...prev, ...products.data]);
    }

    setHasMore(products?.currentPage < products?.totalPages);
  }, [products]);

  const resetFilters = () => {
    setDataFilter(initFilter);
    setHasMore(true);
  };

  const loadMore = () => {
    setDataFilter((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
  };

  return {
    filteredProducts,
    hasMore,
    dataFilter,
    isLoading,
    loadMore,
    resetFilters,
    setDataFilter,
  };
};

export default useFilters;
