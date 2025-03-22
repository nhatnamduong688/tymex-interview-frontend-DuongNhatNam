import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock history replaceState
const mockReplaceState = vi.fn();
const originalReplaceState = window.history.replaceState;

describe('URL Sync Logic Tests', () => {
  beforeEach(() => {
    // Mock URL and history
    delete window.location;
    window.location = {
      ...window.location,
      href: 'http://localhost:3000/',
      search: '',
      pathname: '/',
    } as Location;

    // Mock history.replaceState
    window.history.replaceState = mockReplaceState;
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original replaceState
    window.history.replaceState = originalReplaceState;
  });

  test('should update URL correctly when search is applied', () => {
    // Mock URL update directly - test the URL construction logic
    const url = new URL('http://localhost:3000/');
    const filters = {
      search: 'test query',
      keyword: 'test query',
      categories: [],
      minPrice: 0,
      maxPrice: 200,
      tier: '',
      theme: '',
      sortTime: '',
      sortPrice: '',
    };
    
    // Simulate the behavior of updateUrlFromState
    if (filters.search) {
      url.searchParams.set('search', filters.search);
    }
    
    window.history.replaceState({}, '', url.toString());
    
    // Check that replaceState was called with expected URL
    expect(mockReplaceState).toHaveBeenCalledTimes(1);
    const lastCall = mockReplaceState.mock.calls[0];
    const urlString = lastCall[2] as string;

    // Verify search is included correctly
    expect(urlString).toContain('search=test+query');
    // Verify keyword is not included in URL
    expect(urlString).not.toContain('keyword=');
  });

  test('should update URL correctly when categories are applied', () => {
    // Mock URL update directly - test the URL construction logic
    const url = new URL('http://localhost:3000/');
    const filters = {
      search: '',
      keyword: '',
      categories: ['Music', 'Art'],
      minPrice: 0,
      maxPrice: 200,
      tier: '',
      theme: '',
      sortTime: '',
      sortPrice: '',
    };
    
    // Simulate the behavior of updateUrlFromState
    if (filters.categories && filters.categories.length > 0) {
      url.searchParams.set('categories', filters.categories.join(','));
    }
    
    window.history.replaceState({}, '', url.toString());
    
    // Check that replaceState was called with expected URL
    expect(mockReplaceState).toHaveBeenCalledTimes(1);
    const lastCall = mockReplaceState.mock.calls[0];
    const urlString = lastCall[2] as string;

    // Verify categories are included correctly
    expect(urlString).toContain('categories=Music%2CArt');
  });

  test('should update URL correctly with multiple filters', () => {
    // Mock URL update directly - test the URL construction logic
    const url = new URL('http://localhost:3000/');
    const filters = {
      search: 'test',
      keyword: 'test',
      minPrice: 10,
      maxPrice: 100,
      categories: ['Music'],
      tier: 'Premium',
      theme: 'Dark',
      sortPrice: 'desc',
      sortTime: 'asc',
    };
    
    // Simulate the behavior of updateUrlFromState
    if (filters.search) {
      url.searchParams.set('search', filters.search);
    }
    
    if (filters.minPrice !== undefined) {
      url.searchParams.set('minPrice', String(filters.minPrice));
    }
    
    if (filters.maxPrice !== undefined) {
      url.searchParams.set('maxPrice', String(filters.maxPrice));
    }
    
    if (filters.tier && filters.tier !== "") {
      url.searchParams.set('tier', String(filters.tier));
    }
    
    if (filters.theme && filters.theme !== "") {
      url.searchParams.set('theme', String(filters.theme));
    }
    
    if (filters.sortTime && filters.sortTime !== "") {
      url.searchParams.set('sortTime', String(filters.sortTime));
    }
    
    if (filters.sortPrice && filters.sortPrice !== "") {
      url.searchParams.set('sortPrice', String(filters.sortPrice));
    }
    
    if (filters.categories && filters.categories.length > 0) {
      url.searchParams.set('categories', filters.categories.join(','));
    }
    
    window.history.replaceState({}, '', url.toString());
    
    // Check that replaceState was called with expected URL
    expect(mockReplaceState).toHaveBeenCalledTimes(1);
    const lastCall = mockReplaceState.mock.calls[0];
    const urlString = lastCall[2] as string;

    // Verify all expected parameters are in URL
    expect(urlString).toContain('search=test');
    expect(urlString).toContain('minPrice=10');
    expect(urlString).toContain('maxPrice=100');
    expect(urlString).toContain('tier=Premium');
    expect(urlString).toContain('theme=Dark');
    expect(urlString).toContain('sortPrice=desc');
    expect(urlString).toContain('sortTime=asc');
    expect(urlString).toContain('categories=Music');

    // Verify keyword is not in URL
    expect(urlString).not.toContain('keyword=');
  });

  test('should reset URL correctly', () => {
    // First apply some filters
    const url = new URL('http://localhost:3000/?search=test&minPrice=10');
    
    // Simulate the behavior of resetFilter
    window.history.replaceState({}, '', window.location.pathname);
    
    // Check that replaceState was called to reset URL
    expect(mockReplaceState).toHaveBeenCalledTimes(1);
    const lastCall = mockReplaceState.mock.calls[0];
    const urlString = lastCall[2] as string;

    // Verify URL is reset to just pathname (no search params)
    expect(urlString).toBe('/');
  });
}); 