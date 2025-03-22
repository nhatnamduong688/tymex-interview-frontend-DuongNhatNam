import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQueryParams } from './useQueryParams';
import * as router from 'react-router-dom';

// Mock các hàm trước khi test
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation()
}));

describe('useQueryParams', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Giá trị mặc định cho location
    mockUseLocation.mockReturnValue({
      pathname: '/marketplace',
      search: '?tier=Premium&minPrice=50&maxPrice=150'
    });
  });

  it('should get all query parameters from URL', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/marketplace',
      search: '?tier=Premium&minPrice=50&maxPrice=150&search=digital'
    });
    
    const { result } = renderHook(() => useQueryParams());
    const params = result.current.getParams();
    
    expect(params).toEqual({
      tier: 'Premium',
      minPrice: '50',
      maxPrice: '150',
      search: 'digital'
    });
  });

  it('should get specific query parameters', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/marketplace',
      search: '?tier=Premium&minPrice=50&maxPrice=150'
    });
    
    const { result } = renderHook(() => useQueryParams());
    const params = result.current.getParams(['tier']);
    
    expect(params).toEqual({
      tier: 'Premium'
    });
  });

  it('should set query parameters', () => {
    const { result } = renderHook(() => useQueryParams());
    result.current.setParams({ search: 'digital' });
    
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should remove query parameters', () => {
    mockUseLocation.mockReturnValue({
      pathname: '/marketplace',
      search: '?tier=Premium&minPrice=50&maxPrice=150'
    });
    
    const { result } = renderHook(() => useQueryParams());
    result.current.removeParams(['tier']);
    
    expect(mockNavigate).toHaveBeenCalled();
  });
}); 