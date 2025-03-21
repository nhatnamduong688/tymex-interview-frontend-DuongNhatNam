import { ProductFilter } from '../contexts/productsContext';

// Sample data for products
const products = Array.from({ length: 50 }, (_, index) => ({
  id: `product-${index + 1}`,
  name: `Product ${index + 1}`,
  description: `This is a sample description for product ${index + 1}. It might have some interesting features and details.`,
  price: Number((Math.random() * 10 + 0.1).toFixed(2)),
  imageUrl: '',
  category: ['Art', 'Gaming', 'Music', 'Real Estate'][Math.floor(Math.random() * 4)],
  tags: [
    ['collectible', 'digital', 'art'][Math.floor(Math.random() * 3)],
    ['rare', 'metaverse', 'property', 'game'][Math.floor(Math.random() * 4)]
  ],
  created: Date.now() - Math.floor(Math.random() * 1000000)
}));

interface ProductParams {
  offset: number;
  limit: number;
  category?: string | null;
  categories?: string[];
  tags?: string[];
  search?: string;
}

interface ProductResponse {
  data: typeof products;
  hasMore: boolean;
  nextOffset: number;
  total: number;
}

export const getListProduct = async (params: ProductParams): Promise<ProductResponse> => {
  const { offset, limit, category, categories, tags, search } = params;
  
  // Add artificial delay to simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter products based on parameters
  let filteredProducts = [...products];
  
  // Filter by single category
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  // Filter by multiple categories
  if (categories && categories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      categories.includes(product.category)
    );
  }
  
  if (tags && tags.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      tags.every(tag => product.tags.includes(tag))
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const total = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);
  const hasMore = offset + limit < total;
  const nextOffset = hasMore ? offset + limit : offset;
  
  return {
    data: paginatedProducts,
    hasMore,
    nextOffset,
    total
  };
}; 