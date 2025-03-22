import productApi, { ProductsResponse } from '../../services/productApi';
import apiClient from '../../services/apiService';
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock apiClient
vi.mock('../../services/apiService', () => ({
  default: {
    get: vi.fn(),
    clearCacheByPattern: vi.fn(),
  }
}));

describe('productApi service', () => {
  const mockResponseData = [
    {
      id: 1,
      title: 'Test Product',
      category: 'Test Category',
      price: 99.99,
      isFavorite: false,
      createdAt: '2023-01-01',
      theme: 'Dark',
      tier: 'Premium',
      imageId: 123,
      author: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'male',
        avatar: 'avatar.jpg',
        onlineStatus: 'online'
      }
    }
  ];

  const mockApiResponse = {
    data: mockResponseData,
    success: true,
    error: null,
    headers: { 'x-total-count': '1' }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (apiClient.get as any).mockResolvedValue(mockApiResponse);
  });

  describe('getProducts function', () => {
    test('should handle sorting priority correctly - sortPrice takes precedence over sortTime', async () => {
      // Arrange - both sort params present, sortPrice should be used
      const filters = {
        sortPrice: 'desc',
        sortTime: 'asc'
      };

      // Act
      await productApi.getProducts(filters);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify only sortPrice was used
      expect(url).toContain('_sort=price');
      expect(url).toContain('_order=desc');
      expect(url).not.toContain('_sort=createdAt');
    });

    test('should use sortTime when sortPrice is not present', async () => {
      // Arrange - only sortTime present
      const filters = {
        sortTime: 'asc'
      };

      // Act
      await productApi.getProducts(filters);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify sortTime was used
      expect(url).toContain('_sort=createdAt');
      expect(url).toContain('_order=asc');
    });

    test('should handle search priority correctly - search takes precedence over keyword', async () => {
      // Arrange - both search params present, search should be used
      const filters = {
        search: 'test product',
        keyword: 'should not be used'
      };

      // Act
      await productApi.getProducts(filters);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify correct search term was used
      expect(url).toContain('title_like=test+product');
      expect(url).not.toContain('should+not+be+used');
    });

    test('should use keyword when search is not present', async () => {
      // Arrange - only keyword present
      const filters = {
        keyword: 'test keyword'
      };

      // Act
      await productApi.getProducts(filters);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify keyword was used
      expect(url).toContain('title_like=test+keyword');
    });

    test('should handle single category correctly', async () => {
      // Arrange - single category
      const filters = {
        categories: ['Music']
      };

      // Act
      await productApi.getProducts(filters);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify category param was correctly added
      expect(url).toContain('category=Music');
    });

    test('should handle multiple categories correctly', async () => {
      // Arrange - multiple categories
      const filters = {
        categories: ['Music', 'Art', 'Design']
      };

      // Act
      await productApi.getProducts(filters);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify category_like param was correctly added with regex format
      expect(url).toContain('category_like=Music%7CArt%7CDesign');
    });

    test('should include pagination parameters', async () => {
      // Act
      await productApi.getProducts({}, 2, 20);

      // Assert
      expect(apiClient.get).toHaveBeenCalledTimes(1);
      const url = (apiClient.get as any).mock.calls[0][0];
      
      // Verify pagination params
      expect(url).toContain('_page=2');
      expect(url).toContain('_limit=20');
    });
  });
}); 