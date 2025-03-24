import { ApiService } from './ApiService';
import { API_ENDPOINTS } from '../../utils/constants';

// Create a singleton API client instance
const apiClient = new ApiService(process.env.NEXT_PUBLIC_API_URL || '');

// Initialize repositories with this client
export { apiClient }; 