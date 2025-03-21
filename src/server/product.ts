import { TFilterProduct, TProduct } from "../types/product";
import dummyProducts from "./product-data";

interface ListParams {
  offset: number;
  limit: number;
  filter: TFilterProduct;
}

interface ListResponse {
  data: TProduct[];
  total: number;
  hasMore: boolean;
  nextOffset: number;
}

export const getListProduct = ({
  offset = 0,
  limit = 12,
  filter,
}: ListParams): ListResponse => {
  let filteredProducts = [...dummyProducts];

  try {
    // Filter by keyword
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword)
      );
    }

    // Filter by price range
    if (filter.priceRange && filter.priceRange.length === 2) {
      const [min, max] = filter.priceRange;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Filter by tier
    if (filter.tier) {
      filteredProducts = filteredProducts.filter(
        (product) => product.tier === filter.tier
      );
    }

    // Filter by theme
    if (filter.theme) {
      filteredProducts = filteredProducts.filter(
        (product) => product.theme === filter.theme
      );
    }

    // Filter by multiple categories
    if (filter.categories && filter.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filter.categories && filter.categories.includes(product.category)
      );
    }

    // Sort by time
    if (filter.sortTime) {
      filteredProducts.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return filter.sortTime === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    // Sort by price
    if (filter.sortPrice) {
      filteredProducts.sort((a, b) => {
        return filter.sortPrice === "asc"
          ? a.price - b.price
          : b.price - a.price;
      });
    }

    // Pagination
    const total = filteredProducts.length;
    const hasMore = offset + limit < total;
    const nextOffset = hasMore ? offset + limit : total;
    const data = filteredProducts.slice(offset, offset + limit);

    return {
      data,
      total,
      hasMore,
      nextOffset,
    };
  } catch (error) {
    console.error("Error filtering products:", error);
    return {
      data: [],
      total: 0,
      hasMore: false,
      nextOffset: 0,
    };
  }
}; 