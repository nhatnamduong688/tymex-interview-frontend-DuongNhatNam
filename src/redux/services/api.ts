// Lớp tiện ích cho các cuộc gọi API
export class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = '', headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  // Phương thức để cập nhật headers, thường sử dụng cho auth token
  setAuthHeader(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  // GET method
  async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.defaultHeaders,
    });

    return this.handleResponse<T>(response);
  }

  // POST method
  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  // PUT method
  async put<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  // DELETE method
  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.defaultHeaders,
    });

    return this.handleResponse<T>(response);
  }

  // Xử lý response
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Trích xuất thông báo lỗi từ response body
      let errorMessage: string;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      } catch {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // Kiểm tra nếu response là rỗng
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return {} as T;
  }

  // Xây dựng URL với các tham số query
  private buildUrl(endpoint: string, params: Record<string, string> = {}): string {
    const url = `${this.baseUrl}${endpoint}`;
    const queryParams = new URLSearchParams(params).toString();
    return queryParams ? `${url}?${queryParams}` : url;
  }
}

// Tạo và export một instance mặc định
export const api = new ApiService('/api'); 