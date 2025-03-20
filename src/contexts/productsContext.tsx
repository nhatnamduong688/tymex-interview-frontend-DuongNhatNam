import React, { createContext, useContext, useState, ReactNode } from 'react';

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

// Define context type
interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  filteredProducts: Product[];
  selectedCategory: string | null;
  selectedTags: string[];
  setSelectedCategory: (category: string | null) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
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
  setSelectedCategory: () => {},
  addTag: () => {},
  removeTag: () => {},
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

  // Add a tag to the filter
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Remove a tag from the filter
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
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
        setSelectedCategory,
        addTag,
        removeTag,
        clearFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the products context
export const useProducts = () => useContext(ProductsContext); 