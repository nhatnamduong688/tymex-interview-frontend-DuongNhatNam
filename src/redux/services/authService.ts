import { api } from './api';
import { User, LoginCredentials } from '../slices/authSlice';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  // Đăng nhập
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Lưu token vào localStorage và cập nhật header cho các request sau này
    api.setAuthHeader(response.token);
    localStorage.setItem('token', response.token);
    
    return response;
  }

  // Đăng ký
  static async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    
    // Lưu token vào localStorage và cập nhật header cho các request sau này
    api.setAuthHeader(response.token);
    localStorage.setItem('token', response.token);
    
    return response;
  }

  // Lấy thông tin người dùng hiện tại
  static async getCurrentUser(): Promise<User> {
    return api.get<User>('/auth/me');
  }

  // Cập nhật thông tin người dùng
  static async updateProfile(userData: Partial<User>): Promise<User> {
    return api.put<User>('/auth/me', userData);
  }

  // Đăng xuất
  static async logout(): Promise<void> {
    // Xóa token khỏi localStorage và header
    localStorage.removeItem('token');
    api.setAuthHeader(null);
    
    // Gọi API logout nếu cần
    await api.post<void>('/auth/logout', {});
  }

  // Khởi tạo service với token hiện có (gọi khi ứng dụng khởi động)
  static initializeAuth(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      api.setAuthHeader(token);
      return true;
    }
    return false;
  }
} 