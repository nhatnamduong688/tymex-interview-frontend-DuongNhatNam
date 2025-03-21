import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useQueryParams } from '../hooks/useQueryParams';
import {TFilterProduct, TProduct} from "../types/product.ts";
import { ProductCategory, ProductTheme, ProductTier } from '../enums/filter';

// Define context type
interface ProductsContextType {
  products: TProduct[];
  loading: boolean;
  error: string | null;
  filteredProducts: TProduct[];
  filter: TFilterProduct;
  setFilter: (filter: TFilterProduct) => void;
  clearFilters: () => void;
}

// Create context with default values
const defaultContextValue: ProductsContextType = {
  products: [],
  loading: false,
  error: null,
  filteredProducts: [],
  filter: { categories: [] },
  setFilter: () => {},
  clearFilters: () => {},
};

export const ProductsContext = createContext<ProductsContextType>(defaultContextValue);

// Sample products data
const sampleProducts: TProduct[] = [
  {
    id: '1',
    name: 'Digital Artwork #1',
    description: 'Beautiful digital artwork with vibrant colors',
    price: 2.5,
    imageBg: '/assets/img/product/bg-1.png',
    imageItem: '/assets/img/product/item-1.png',
    category: ProductCategory.Art,
    creator: {
      name: 'Artist One',
      isOnline: true,
      avatar: '/assets/img/avatar/avatar-1.png'
    },
    createdAt: new Date().toISOString(),
    tier: ProductTier.Premium,
    theme: ProductTheme.Dark,
    tags: ['digital', 'art']
  },
  {
    id: '2',
    name: 'Virtual Land',
    description: 'Own a piece of the metaverse with this virtual land',
    price: 5.8,
    imageBg: '/assets/img/product/bg-2.png',
    imageItem: '/assets/img/product/item-2.png',
    category: ProductCategory.RealEstate,
    creator: {
      name: 'Creator Studio',
      isOnline: false,
      avatar: '/assets/img/avatar/avatar-2.png'
    },
    createdAt: new Date().toISOString(),
    tier: ProductTier.Basic,
    theme: ProductTheme.Light,
    tags: ['metaverse', 'property']
  },
  {
    id: '3',
    name: 'Game Character',
    description: 'Unique game character with special abilities',
    price: 1.2,
    imageBg: '/assets/img/product/bg-3.png',
    imageItem: '/assets/img/product/item-3.png',
    category: ProductCategory.Gaming,
    creator: {
      name: 'Game Designer',
      isOnline: true,
      avatar: '/assets/img/avatar/avatar-3.png'
    },
    createdAt: new Date().toISOString(),
    tier: ProductTier.Premium,
    theme: ProductTheme.Dark,
    tags: ['game', 'character']
  },
  {
    id: '4',
    name: 'Music Album',
    description: 'Exclusive digital music album with bonus tracks',
    price: 0.8,
    imageBg: '/assets/img/product/bg-4.png',
    imageItem: '/assets/img/product/item-4.png',
    category: ProductCategory.Music,
    creator: {
      name: 'Digital Musician',
      isOnline: false,
      avatar: '/assets/img/avatar/avatar-4.png'
    },
    createdAt: new Date().toISOString(),
    tier: ProductTier.Basic,
    theme: ProductTheme.Light,
    tags: ['music', 'audio']
  }
];

// Create Provider component
export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<TProduct[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>(sampleProducts);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [filter, setFilter] = useState<TFilterProduct>({ categories: [] });

  const { getParams } = useQueryParams();

  // Initialize filter from URL params when component mounts
  useEffect(() => {
    const params = getParams([
      "keyword",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
      "categories",
    ]);
    
    setFilter(params as unknown as TFilterProduct);
  }, [getParams]);

  // Apply filters to products
  useEffect(() => {
    let result = [...products];

    // Apply keyword filter
    if (filter.keyword) {
      result = result.filter(product => {
        const productName = product.name.toLowerCase();
        const keyword = filter.keyword!.toLowerCase();
        const description = product.description?.toLowerCase() || '';
        return productName.includes(keyword) || description.includes(keyword);
      });
    }

    // Apply category filter
    if (filter.categories && filter.categories.length > 0) {
      result = result.filter(product => 
        filter.categories?.includes(product.category)
      );
    }

    // Apply tier filter
    if (filter.tier) {
      result = result.filter(product => product.tier === filter.tier);
    }

    // Apply theme filter
    if (filter.theme) {
      result = result.filter(product => product.theme === filter.theme);
    }

    // Apply price range filter
    if (filter.priceRange && filter.priceRange.length === 2) {
      const [min, max] = filter.priceRange;
      result = result.filter(product => product.price >= min && product.price <= max);
    }

    setFilteredProducts(result);
  }, [filter, products]);

  // Clear all filters
  const clearFilters = () => {
    setFilter({ categories: [] });
  };

  const handleSetFilter = useCallback((newFilter: TFilterProduct) => {
    setFilter(prevFilter => ({
      ...newFilter,
      categories: newFilter.categories || prevFilter.categories || [],
    }));
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        filteredProducts,
        filter,
        setFilter: handleSetFilter,
        clearFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the products context
export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
}; 