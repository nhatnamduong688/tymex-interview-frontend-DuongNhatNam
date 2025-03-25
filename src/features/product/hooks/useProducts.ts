import { useQuery } from '@tanstack/react-query';
import { ProductApiRepository } from '../../../infrastructure/api/ProductApiRepository';
import { 
  PaginatedProducts, 
  PaginationParams, 
  ProductFilters, 
  ProductSortOption 
} from '../../../domain/product/repositories/ProductRepository';
import { Product } from '../../../domain/product/entities/Product';
import { apiClient } from '../../../infrastructure/api/client';

// Create the repository instance
const productRepository = new ProductApiRepository(apiClient);

/**
 * Hook for fetching a paginated list of products
 */
export const useProducts = (
  filters?: ProductFilters,
  sort?: ProductSortOption,
  pagination: PaginationParams = { page: 1, perPage: 20 }
) => {
  return useQuery<PaginatedProducts, Error>({
    queryKey: ['products', filters, sort, pagination],
    queryFn: () => productRepository.list(filters, sort, pagination),
  });
};

/**
 * Hook for fetching a single product by ID
 */
export const useProduct = (id: string | null) => {
  return useQuery<Product | null, Error>({
    queryKey: ['product', id],
    queryFn: () => productRepository.getById(id as string),
    enabled: !!id,
  });
};

/**
 * Hook for fetching a single product by slug
 */
export const useProductBySlug = (slug: string | null) => {
  return useQuery<Product | null, Error>({
    queryKey: ['product', 'slug', slug],
    queryFn: () => productRepository.getBySlug(slug as string),
    enabled: !!slug,
  });
};

/**
 * Hook for fetching related products
 */
export const useRelatedProducts = (productId: string | null, limit?: number) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', 'related', productId, limit],
    queryFn: () => productRepository.getRelated(productId as string, limit),
    enabled: !!productId,
  });
};

/**
 * Hook for fetching featured products
 */
export const useFeaturedProducts = (limit?: number) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productRepository.getFeatured(limit),
  });
};

/**
 * Hook for fetching new arrivals
 */
export const useNewArrivals = (limit?: number) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', 'new-arrivals', limit],
    queryFn: () => productRepository.getNewArrivals(limit),
  });
};

/**
 * Hook for fetching best sellers
 */
export const useBestSellers = (limit?: number) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', 'best-sellers', limit],
    queryFn: () => productRepository.getBestSellers(limit),
  });
}; 