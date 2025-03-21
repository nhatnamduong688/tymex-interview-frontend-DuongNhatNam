import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useQueryParams } from '../hooks/useQueryParams';

// Define product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
}

// Define filter type
export interface ProductFilter {
  category?: string | null;
  categories?: string[];
  tags?: string[];
  search?: string;
}

// Define context type
interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  filteredProducts: Product[];
  selectedCategory: string | null;
  selectedTags: string[];
  filter: ProductFilter;
  setFilter: (filter: ProductFilter) => void;
  updateCategory: (category: string | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setSearch: (search: string) => void;
  clearFilters: () => void;
}

// Create context with default values
const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  error: null,
  filteredProducts: [],
  selectedCategory: null,
  selectedTags: [],
  filter: {},
  setFilter: () => {},
  updateCategory: () => {},
  addTag: () => {},
  removeTag: () => {},
  setSearch: () => {},
  clearFilters: () => {},
});

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Digital Artwork #1',
    description: 'A beautiful digital artwork',
    price: 0.5,
    imageUrl: '/images/placeholder1.png',
    category: 'Art',
    tags: ['digital', 'art', 'collectible'],
  },
  {
    id: '2',
    name: 'Virtual Land',
    description: 'Prime location in the metaverse',
    price: 3.2,
    imageUrl: '/images/placeholder2.png',
    category: 'Real Estate',
    tags: ['land', 'metaverse', 'property'],
  },
  {
    id: '3',
    name: 'Game Character',
    description: 'Rare character with special abilities',
    price: 1.8,
    imageUrl: '/images/placeholder3.png',
    category: 'Gaming',
    tags: ['game', 'character', 'rare'],
  },
  {
    id: '4',
    name: 'Music Album',
    description: 'Exclusive music album ownership',
    price: 0.8,
    imageUrl: '/images/placeholder4.png',
    category: 'Music',
    tags: ['music', 'audio', 'exclusive'],
  },
];

// Create Provider component
export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filter, setFilter] = useState<ProductFilter>({
    category: null,
    categories: [],
    tags: [],
    search: '',
  });

  const { getParams } = useQueryParams();

  // Initialize filter from URL params when component mounts
  useEffect(() => {
    const params = getParams();
    const initialFilter: ProductFilter = {
      category: null,
      categories: [],
      tags: [],
      search: '',
    };

    if (params.categories) {
      initialFilter.categories = Array.isArray(params.categories)
        ? params.categories
        : [params.categories];
    }

    if (params.tags) {
      initialFilter.tags = Array.isArray(params.tags)
        ? params.tags
        : [params.tags];
    }

    if (params.search) {
      initialFilter.search = params.search as string;
    }

    if (params.category) {
      initialFilter.category = params.category as string;
    }

    setFilter(initialFilter);
  }, [getParams]);

  // Filter products based on selected category and tags
  const filteredProducts = products.filter((product) => {
    // Filter by category if one is selected
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by tags if any are selected
    if (selectedTags.length > 0) {
      return selectedTags.every((tag) => product.tags.includes(tag));
    }
    
    return true;
  });

  // Update category
  const updateCategory = (category: string | null) => {
    setFilter(prev => ({
      ...prev,
      category,
    }));
  };

  // Add a tag to the filter
  const addTag = (tag: string) => {
    setFilter(prev => {
      const currentTags = prev.tags || [];
      if (!currentTags.includes(tag)) {
        return {
          ...prev,
          tags: [...currentTags, tag],
        };
      }
      return prev;
    });
  };

  // Remove a tag from the filter
  const removeTag = (tag: string) => {
    setFilter(prev => {
      const currentTags = prev.tags || [];
      return {
        ...prev,
        tags: currentTags.filter(t => t !== tag),
      };
    });
  };
  
  // Set search term
  const setSearch = (search: string) => {
    setFilter(prev => ({
      ...prev,
      search,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter({
      category: null,
      categories: [],
      tags: [],
      search: '',
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        filteredProducts,
        selectedCategory,
        selectedTags,
        filter,
        setFilter,
        updateCategory,
        addTag,
        removeTag,
        setSearch,
        clearFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the products context
export const useProductsContext = () => useContext(ProductsContext); 