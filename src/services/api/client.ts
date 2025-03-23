import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from './constants';

// Define API response interface
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  headers?: any;
}

// Base API configuration
interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Define request options interface
export interface RequestOptions {
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
  withCredentials?: boolean;
  cache?: boolean;
  cacheTime?: number;
  directQueryString?: string; // Added for direct URL query string support
}

// API Client options
interface ApiClientOptions extends ApiConfig {
  defaultRequestOptions?: RequestOptions;
}

// Cache implementation
interface CacheItem<T> {
  data: T;
  timestamp: number;
  url: string;
}

/**
 * API Client class for making HTTP requests with consistent handling
 */
class ApiClient {
  private instance: AxiosInstance;
  private defaultOptions: RequestOptions;
  private cache: Map<string, CacheItem<any>> = new Map();
  
  constructor(options: ApiClientOptions) {
    this.instance = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout || 15000,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    this.defaultOptions = {
      retries: 3,
      retryDelay: 1000,
      withCredentials: false,
      cache: false,
      cacheTime: 5 * 60 * 1000, // 5 minutes default cache time
      ...options.defaultRequestOptions,
    };
    
    // Add request interceptor for auth tokens, etc.
    this.instance.interceptors.request.use(
      (config) => {
        // You can add auth token here if needed
        // const token = getToken();
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Add response interceptor for consistent error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.handleError(error))
    );
  }
  
  /**
   * Handle API errors consistently
   */
  private handleError(error: AxiosError): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const data = error.response.data as any;
      
      let errorMessage = 'An error occurred with the API request';
      
      if (data?.message) {
        errorMessage = data.message;
      } else if (status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (status === 403) {
        errorMessage = 'You do not have permission to access this resource.';
      } else if (status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (status >= 500) {
        errorMessage = 'A server error occurred. Please try again later.';
      }
      
      const enhancedError = new Error(errorMessage) as any;
      enhancedError.status = status;
      enhancedError.data = data;
      enhancedError.isApiError = true;
      
      return enhancedError;
    } else if (error.request) {
      // The request was made but no response was received
      const networkError = new Error('No response received from server. Please check your network connection.') as any;
      networkError.isNetworkError = true;
      return networkError;
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
  
  /**
   * Get cache key for a request
   */
  private getCacheKey(url: string, params?: any): string {
    const queryString = params ? JSON.stringify(params) : '';
    return `${url}:${queryString}`;
  }
  
  /**
   * Check if cached data is valid
   */
  private isCacheValid(cacheItem: CacheItem<any>, cacheTime: number): boolean {
    return Date.now() - cacheItem.timestamp < cacheTime;
  }
  
  /**
   * Make HTTP request with retry and cache logic
   */
  private async request<T>(
    method: string,
    url: string,
    data?: any,
    options?: RequestOptions & { params?: any, directQueryString?: string }
  ): Promise<ApiResponse<T>> {
    // Merge options with defaults
    const opts = { ...this.defaultOptions, ...options };
    const { retries, retryDelay, cache, cacheTime, directQueryString, ...requestOptions } = opts;
    
    // Handle direct query string if provided
    if (directQueryString) {
      url = `${url}?${directQueryString}`;
    }
    
    // Check cache for GET requests
    if (method === 'GET' && cache) {
      const cacheKey = this.getCacheKey(url, requestOptions.params);
      const cachedItem = this.cache.get(cacheKey);
      
      if (cachedItem && this.isCacheValid(cachedItem, cacheTime || this.defaultOptions.cacheTime!)) {
        return {
          data: cachedItem.data,
          success: true,
        };
      }
    }
    
    // Configure request
    const config: AxiosRequestConfig = {
      method,
      url,
      ...requestOptions,
    };
    
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && data) {
      config.data = data;
    }
    
    // Implement retry mechanism
    let attempts = 0;
    let lastError: any;
    
    while (attempts <= retries!) {
      try {
        const response: AxiosResponse<T> = await this.instance.request(config);
        
        // Cache successful GET responses
        if (method === 'GET' && cache && response.data) {
          const cacheKey = this.getCacheKey(url, requestOptions.params);
          this.cache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
            url,
          });
        }
        
        return {
          data: response.data,
          success: true,
          headers: response.headers,
        };
      } catch (error) {
        lastError = error;
        attempts++;
        
        // Don't retry for client errors (4xx) except for specific cases
        if ((error as any).status >= 400 && (error as any).status < 500) {
          // Retry for 429 (rate limit) but not for other 4xx errors
          if ((error as any).status !== 429) {
            break;
          }
        }
        
        if (attempts <= retries!) {
          // Wait before retrying
          await new Promise((resolve) => setTimeout(resolve, retryDelay!));
        }
      }
    }
    
    // Return error response after retries are exhausted
    return {
      data: null as any,
      success: false,
      error: {
        message: lastError?.message || 'Failed after retry attempts',
        code: lastError?.status?.toString(),
        details: lastError?.data,
      },
    };
  }
  
  /**
   * HTTP GET request
   */
  async get<T>(url: string, params?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    // Detect if the URL already contains query parameters
    if (url.includes('?') && !params) {
      const [baseUrl, queryString] = url.split('?');
      return this.request<T>('GET', baseUrl, null, { 
        ...options, 
        directQueryString: queryString 
      });
    }
    
    return this.request<T>('GET', url, null, { ...options, params });
  }
  
  /**
   * HTTP POST request
   */
  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, data, options);
  }
  
  /**
   * HTTP PUT request
   */
  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, data, options);
  }
  
  /**
   * HTTP PATCH request
   */
  async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', url, data, options);
  }
  
  /**
   * HTTP DELETE request
   */
  async delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url, null, options);
  }
  
  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * Clear cache by URL pattern
   */
  clearCacheByPattern(pattern: string): void {
    for (const [key, item] of this.cache.entries()) {
      if (item.url.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}

// Create and export default API client instance
const apiClient = new ApiClient({
  baseURL: API_BASE_URL,
});

export default apiClient; 