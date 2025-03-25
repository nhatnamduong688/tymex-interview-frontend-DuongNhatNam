import { api } from './api';
import { Product } from '../slices/productSlice';

export class ProductService {
  // Lấy tất cả sản phẩm
  static async getProducts(): Promise<Product[]> {
    return api.get<Product[]>('/products');
  }

  // Lấy chi tiết một sản phẩm
  static async getProductById(id: string): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  }

  // Tìm kiếm sản phẩm
  static async searchProducts(query: string, category?: string): Promise<Product[]> {
    const params: Record<string, string> = { q: query };
    if (category) {
      params.category = category;
    }
    return api.get<Product[]>('/products/search', params);
  }

  // Tạo sản phẩm mới
  static async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return api.post<Product>('/products', product);
  }

  // Cập nhật sản phẩm
  static async updateProduct(product: Product): Promise<Product> {
    return api.put<Product>(`/products/${product.id}`, product);
  }

  // Xóa sản phẩm
  static async deleteProduct(id: string): Promise<void> {
    return api.delete<void>(`/products/${id}`);
  }
} 