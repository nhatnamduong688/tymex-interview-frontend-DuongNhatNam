/**
 * Custom API Error class
 */
export class ApiError extends Error {
  status: number;
  data: any;
  
  constructor(status: number, message: string, data: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
} 