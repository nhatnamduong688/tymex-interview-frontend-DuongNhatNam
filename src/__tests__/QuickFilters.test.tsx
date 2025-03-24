import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../test-utils';
import QuickFilters from '@/components/quick-filters';
import { quickFilter } from '@/assets/mock-data/quick-filter';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((param) => null),
    toString: jest.fn(() => ''),
  }),
  usePathname: () => '/marketplace',
}));

// Mock useFilters values
const mockSetDataFilter = jest.fn();
const mockResetFilters = jest.fn();
const mockDataFilter = { category: '' };

// Mock the useFilters hook
jest.mock('@/hooks/useFilters', () => ({
  __esModule: true,
  default: () => ({
    dataFilter: mockDataFilter,
    setDataFilter: mockSetDataFilter,
    resetFilters: mockResetFilters
  }),
}));

describe('QuickFilters Component', () => {
  beforeEach(() => {
    // Clear mocks between tests
    mockSetDataFilter.mockClear();
    mockResetFilters.mockClear();
  });

  it('renders the quick filters component', () => {
    const { container } = render(<QuickFilters />);
    
    // Check for the container
    const filtersContainer = container.querySelector('.quick-filters');
    expect(filtersContainer).toBeInTheDocument();
    
    const filtersList = container.querySelector('.quick-filters-list');
    expect(filtersList).toBeInTheDocument();
  });
  
  it('renders filter buttons', () => {
    const { container } = render(<QuickFilters />);
    
    // Check for filter buttons
    const buttons = container.querySelectorAll('.quick-filters-item');
    expect(buttons.length).toBe(quickFilter.length);
  });
  
  it('displays "All" category by default', () => {
    render(<QuickFilters />);
    
    // Check for the "All" category
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    
    // Check that the All button has the active class
    const allContainer = allButton.closest('.quick-filters-item');
    expect(allContainer).toHaveClass('active');
  });
  
  it('handles category clicks correctly', () => {
    render(<QuickFilters />);
    
    // Find a non-active filter (we know the specific items from the mock data)
    const upperBodyFilter = screen.getByText('Upper Body');
    
    // Click the filter
    fireEvent.click(upperBodyFilter);
    
    // Check that resetFilters was called
    expect(mockResetFilters).toHaveBeenCalled();
    
    // Check that setDataFilter was called with the right category
    expect(mockSetDataFilter).toHaveBeenCalledWith({ 
      ...mockDataFilter, 
      category: 'upper body' 
    });
  });
}); 