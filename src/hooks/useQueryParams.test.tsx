import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useQueryParams } from './useQueryParams';

// Mock react-router hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: vi.fn().mockReturnValue({
      pathname: '/marketplace',
      search: '?search=digital&tier=Premium&minPrice=50&maxPrice=150',
      hash: '',
      state: null
    })
  };
});

describe('useQueryParams', () => {
  beforeEach(() => {
    // Reset history mock before each test
    window.history.pushState = vi.fn();
    window.history.replaceState = vi.fn();
  });

  it('should get all query parameters from URL', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    const params = result.current.getAll();
    
    expect(params).toEqual({
      search: 'digital',
      tier: 'Premium',
      minPrice: '50',
      maxPrice: '150'
    });
  });

  it('should get a specific query parameter', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    const searchParam = result.current.get('search');
    expect(searchParam).toBe('digital');
  });

  it('should return undefined for non-existent parameter', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    const nonExistentParam = result.current.get('nonexistent');
    expect(nonExistentParam).toBeUndefined();
  });

  it('should set a query parameter with pushState', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    result.current.set('category', 'art');
    
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      '',
      '/marketplace?search=digital&tier=Premium&minPrice=50&maxPrice=150&category=art'
    );
  });

  it('should set a query parameter with replaceState when specified', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    result.current.set('category', 'art', true);
    
    expect(window.history.replaceState).toHaveBeenCalledWith(
      expect.anything(),
      '',
      '/marketplace?search=digital&tier=Premium&minPrice=50&maxPrice=150&category=art'
    );
  });

  it('should add multiple parameters at once', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    result.current.setAll({
      category: 'art',
      theme: 'dark'
    });
    
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      '',
      '/marketplace?search=digital&tier=Premium&minPrice=50&maxPrice=150&category=art&theme=dark'
    );
  });

  it('should remove a specific parameter', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    result.current.remove('search');
    
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      '',
      '/marketplace?tier=Premium&minPrice=50&maxPrice=150'
    );
  });

  it('should clear all parameters', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    result.current.clear();
    
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      '',
      '/marketplace'
    );
  });

  it('should handle empty search string', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/marketplace',
      search: '',
      hash: '',
      state: null
    });

    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    const params = result.current.getAll();
    expect(params).toEqual({});
  });

  it('should handle special characters in parameters', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/marketplace',
      search: '?search=digital%20art&special=%26%3D%3F',
      hash: '',
      state: null
    });

    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    expect(result.current.get('search')).toBe('digital art');
    expect(result.current.get('special')).toBe('&=?');
  });

  it('should encode special characters when setting parameters', () => {
    const { result } = renderHook(() => useQueryParams(), {
      wrapper: BrowserRouter
    });

    result.current.set('search', 'digital art & design');
    
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      '',
      expect.stringContaining('search=digital%20art%20%26%20design')
    );
  });
});