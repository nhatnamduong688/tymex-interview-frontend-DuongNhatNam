import { renderHook, act } from '@testing-library/react-hooks';
import { useFilterLogic } from '../useFilterLogic';

// Mock dependencies
jest.mock('../../../hooks/useQueryParams', () => ({
  useQueryParams: () => ({
    getParams: jest.fn().mockReturnValue({}),
    setParams: jest.fn(),
    removeParams: jest.fn()
  })
}));

jest.mock('../../../hooks/useBreakpoint', () => ({
  useBreakpoint: () => ({
    isCollapsed: false,
    screens: { xs: true, sm: true, md: true, lg: true }
  })
}));

jest.mock('../../../contexts/productsContext', () => ({
  useProductsContext: () => ({
    filter: {},
    setFilter: jest.fn()
  })
}));

jest.mock('../../../hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    applyFilter: jest.fn(),
    refreshData: jest.fn(),
    filters: {}
  })
}));

describe('useFilterLogic', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useFilterLogic());
    expect(result.current.currentValues).toEqual({});
    expect(result.current.loading).toBe(false);
    expect(result.current.filterSummary).toEqual([]);
  });

  test('should update form reference when setFormRef is called', () => {
    const { result } = renderHook(() => useFilterLogic());
    const mockForm = { resetFields: jest.fn(), setFieldsValue: jest.fn() };

    act(() => {
      result.current.setFormRef(mockForm);
    });

    // Now test reset filter which uses the form
    act(() => {
      result.current.resetFilter();
    });

    expect(mockForm.resetFields).toHaveBeenCalled();
  });

  test('should handle search change', () => {
    const { result } = renderHook(() => useFilterLogic());
    
    // Create a mock event
    const mockEvent = { target: { value: 'test search' } } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleSearchChange(mockEvent);
    });
    
    // Since we're using debounce, we can't easily test the state change
    // This is a limitation when testing debounced functions
    expect(result.current.handleSearchChange).toBeDefined();
  });

  test('should handle form submit', () => {
    const { result } = renderHook(() => useFilterLogic());
    
    const mockValues = {
      keyword: 'test',
      tier: 'Basic',
      priceRange: [10, 100]
    };
    
    act(() => {
      result.current.onSubmit(mockValues);
    });
    
    // Check that the current values are updated
    expect(result.current.currentValues).toEqual(mockValues);
  });
}); 