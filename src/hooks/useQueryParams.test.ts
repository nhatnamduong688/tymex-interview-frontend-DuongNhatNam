import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQueryParams } from './useQueryParams';

// Mock window.location and window.history methods
const mockLocation = {
  pathname: '/marketplace',
  search: '?tier=Premium&minPrice=50&maxPrice=150',
  hash: '',
  host: 'localhost:5173',
  hostname: 'localhost',
  protocol: 'http:',
  origin: 'http://localhost:5173',
  href: 'http://localhost:5173/marketplace?tier=Premium&minPrice=50&maxPrice=150'
};

const mockPushState = vi.fn();
const mockReplaceState = vi.fn();

describe('useQueryParams', () => {
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'location', {
      value: { ...mockLocation },
      writable: true
    });
    
    Object.defineProperty(window.history, 'pushState', {
      value: mockPushState,
      writable: true
    });
    
    Object.defineProperty(window.history, 'replaceState', {
      value: mockReplaceState,
      writable: true
    });
    
    // Reset mocks between tests
    vi.clearAllMocks();
  });

  it('should get all query parameters from URL', () => {
    window.location.search = '?tier=Premium&minPrice=50&maxPrice=150&search=digital';
    
    const { result } = renderHook(() => useQueryParams());
    const allParams = result.current.getParams();
    
    expect(allParams).toEqual({
      tier: 'Premium',
      minPrice: '50',
      maxPrice: '150',
      search: 'digital'
    });
  });

  it('should get a specific query parameter', () => {
    window.location.search = '?tier=Premium&minPrice=50&maxPrice=150';
    
    const { result } = renderHook(() => useQueryParams());
    const tier = result.current.getParams('tier');
    
    expect(tier).toBe('Premium');
  });

  it('should return undefined for non-existent parameter', () => {
    window.location.search = '?tier=Premium';
    
    const { result } = renderHook(() => useQueryParams());
    const search = result.current.getParams('search');
    
    expect(search).toBeUndefined();
  });

  it('should set a query parameter with pushState', () => {
    window.location.search = '?tier=Premium';
    
    const { result } = renderHook(() => useQueryParams());
    result.current.setParam('search', 'digital');
    
    expect(mockPushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('/marketplace?tier=Premium&search=digital')
    );
  });

  it('should set a query parameter with replaceState when specified', () => {
    window.location.search = '?tier=Premium';
    
    const { result } = renderHook(() => useQueryParams());
    result.current.setParam('search', 'digital', true);
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('/marketplace?tier=Premium&search=digital')
    );
  });

  it('should add multiple parameters at once', () => {
    window.location.search = '';
    
    const { result } = renderHook(() => useQueryParams());
    result.current.setParams({
      tier: 'Premium',
      minPrice: '50',
      maxPrice: '150'
    });
    
    expect(mockPushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('/marketplace?tier=Premium&minPrice=50&maxPrice=150')
    );
  });

  it('should remove a specific parameter', () => {
    window.location.search = '?tier=Premium&minPrice=50&maxPrice=150';
    
    const { result } = renderHook(() => useQueryParams());
    result.current.removeParam('tier');
    
    expect(mockPushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('/marketplace?minPrice=50&maxPrice=150')
    );
  });

  it('should clear all parameters', () => {
    window.location.search = '?tier=Premium&minPrice=50&maxPrice=150';
    
    const { result } = renderHook(() => useQueryParams());
    result.current.clearParams();
    
    expect(mockPushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      '/marketplace'
    );
  });

  it('should handle empty search string', () => {
    window.location.search = '';
    
    const { result } = renderHook(() => useQueryParams());
    const params = result.current.getParams();
    
    expect(params).toEqual({});
  });

  it('should handle special characters in parameters', () => {
    window.location.search = '?search=digital%20art&category=Art%20%26%20Design';
    
    const { result } = renderHook(() => useQueryParams());
    const params = result.current.getParams();
    
    expect(params).toEqual({
      search: 'digital art',
      category: 'Art & Design'
    });
  });

  it('should encode special characters when setting parameters', () => {
    window.location.search = '';
    
    const { result } = renderHook(() => useQueryParams());
    result.current.setParam('search', 'digital art');
    
    expect(mockPushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('/marketplace?search=digital%20art')
    );
  });
}); 