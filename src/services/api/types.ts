import { AxiosRequestConfig } from 'axios';

// Base API response interface
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

// Request options interface
export interface RequestOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> {
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTime?: number;
  directQueryString?: string;
}

// Error response interface
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
} 