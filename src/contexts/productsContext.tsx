import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useQueryParams } from '../hooks/useQueryParams';
import {TFilterProduct, TProduct} from "../types/product.ts";

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
const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  error: null,
  filteredProducts: [],
  filter: {},
  setFilter: () => {},
  clearFilters: () => {},
});

// Sample products data
const sampleProducts: TProduct[] = [
  {
    id: '1',
    nameItem: 'Digital Artwork #1',
    description: 'A beautiful digital artwork',
    price: 0.5,
    backgroundItem: 'bg-item-1',
    item: 'item-1',
    category: 'Art',
    nameCreator: 'Artist One',
    statusOnline: true,
    created: '2023-01-15',
    tags: ['digital', 'art', 'collectible'],
  },
  {
    id: '2',
    nameItem: 'Virtual Land',
    description: 'Prime location in the metaverse',
    price: 3.2,
    backgroundItem: 'bg-item-2',
    item: 'item-2',
    category: 'Real Estate',
    nameCreator: 'Land Developer',
    statusOnline: false,
    created: '2023-02-10',
    tags: ['land', 'metaverse', 'property'],
  },
  {
    id: '3',
    nameItem: 'Game Character',
    description: 'Rare character with special abilities',
    price: 1.8,
    backgroundItem: 'bg-item-3',
    item: 'item-3',
    category: 'Gaming',
    nameCreator: 'Game Studio',
    statusOnline: true,
    created: '2023-03-05',
    tags: ['game', 'character', 'rare'],
  },
  {
    id: '4',
    nameItem: 'Music Album',
    description: 'Exclusive music album ownership',
    price: 0.8,
    backgroundItem: 'bg-item-4',
    item: 'item-4',
    category: 'Music',
    nameCreator: 'Musician',
    statusOnline: true,
    created: '2023-04-20',
    tags: ['music', 'audio', 'exclusive'],
  },
];

// Create Provider component
export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<TProduct[]>(sampleProducts);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [filter, setFilter] = useState<TFilterProduct>({});

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
  const filteredProducts = products.filter((product) => {
    // Filter by keyword search
    if (filter.keyword && product.nameItem) {
      const keyword = filter.keyword.toLowerCase();
      const productName = product.nameItem.toLowerCase();
      if (!productName.includes(keyword)) {
        return false;
      }
    }
    
    // Filter by price range
    if (filter.priceRange && filter.priceRange.length === 2) {
      const [min, max] = filter.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    
    // Filter by categories if any are selected
    if (filter.categories) {
      // Kiểm tra nếu categories là string, chuyển về array
      const categoriesArray = Array.isArray(filter.categories) 
        ? filter.categories 
        : typeof filter.categories === 'string' 
          ? [filter.categories] 
          : [];
          
      if (categoriesArray.length > 0) {
        if (!categoriesArray.some(cat => cat === product.category)) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Clear all filters
  const clearFilters = () => {
    setFilter({});
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        filteredProducts,
        filter,
        setFilter,
        clearFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the products context
export const useProductsContext = () => useContext(ProductsContext); 