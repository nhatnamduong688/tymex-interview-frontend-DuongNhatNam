/**
 * Custom API Error class
 */
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    
    // This is needed for instanceof to work correctly in TypeScript
    Object.setPrototypeOf(this, ApiError.prototype);
  }
  
  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }
  
  isUnauthorized(): boolean {
    return this.status === 401;
  }
  
  isForbidden(): boolean {
    return this.status === 403;
  }
  
  isNotFound(): boolean {
    return this.status === 404;
  }
  
  isServerError(): boolean {
    return this.status >= 500;
  }
} 