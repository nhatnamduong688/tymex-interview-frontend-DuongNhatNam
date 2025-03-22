import { filterReducer, 
  setFiltersFromUrl, 
  applyFilter, 
  resetFilter, 
  updateCategory, 
  updateSearch 
} from '../../store/slices/filterSlice';

describe('filterSlice', () => {
  // Define initial state for tests
  const initialState = {
    formValues: {
      search: '',
      keyword: '',
      categories: [],
      tier: '',
      theme: '',
      priceRange: [0, 1000],
      sortTime: '',
      sortPrice: '',
      isFilterVisible: false,
    },
    appliedFilters: {
      search: '',
      keyword: '',
      categories: [],
      tier: '',
      theme: '',
      minPrice: 0,
      maxPrice: 1000,
      sortTime: '',
      sortPrice: '',
    },
    isLoading: false,
    error: null,
  };

  test('should set search and keyword to the same value when setFiltersFromUrl is called with search param', () => {
    // Arrange
    const urlParams = {
      search: 'test query',
    };

    // Act
    const newState = filterReducer(initialState, setFiltersFromUrl(urlParams));

    // Assert - both search and keyword should be updated
    expect(newState.formValues.search).toBe('test query');
    expect(newState.formValues.keyword).toBe('test query');
    expect(newState.appliedFilters.search).toBe('test query');
    expect(newState.appliedFilters.keyword).toBe('test query');
  });

  test('should update both search and keyword when updateSearch is called', () => {
    // Arrange
    const searchQuery = 'new search';

    // Act
    const newState = filterReducer(initialState, updateSearch(searchQuery));

    // Assert - both search and keyword should be updated
    expect(newState.formValues.search).toBe('new search');
    expect(newState.formValues.keyword).toBe('new search');
    expect(newState.appliedFilters.search).toBe('new search');
    expect(newState.appliedFilters.keyword).toBe('new search');
  });

  test('should update categories when updateCategory is called', () => {
    // Arrange
    const categories = ['Music', 'Art'];

    // Act
    const newState = filterReducer(initialState, updateCategory(categories));

    // Assert
    expect(newState.formValues.categories).toEqual(['Music', 'Art']);
    expect(newState.appliedFilters.categories).toEqual(['Music', 'Art']);
  });

  test('should apply multiple filters when applyFilter is called', () => {
    // Arrange
    const filters = {
      search: 'test',
      priceRange: [10, 100],
      tier: 'Premium',
      theme: 'Dark',
      sortPrice: 'desc',
      categories: ['Music'],
    };

    // Act
    const newState = filterReducer(initialState, applyFilter(filters));

    // Assert - form values should be updated
    expect(newState.formValues.search).toBe('test');
    expect(newState.formValues.keyword).toBe('test'); // keyword should match search
    expect(newState.formValues.priceRange).toEqual([10, 100]);
    expect(newState.formValues.tier).toBe('Premium');
    expect(newState.formValues.theme).toBe('Dark');
    expect(newState.formValues.sortPrice).toBe('desc');
    expect(newState.formValues.categories).toEqual(['Music']);

    // Assert - applied filters should be updated
    expect(newState.appliedFilters.search).toBe('test');
    expect(newState.appliedFilters.keyword).toBe('test'); // keyword should match search
    expect(newState.appliedFilters.minPrice).toBe(10);
    expect(newState.appliedFilters.maxPrice).toBe(100);
    expect(newState.appliedFilters.tier).toBe('Premium');
    expect(newState.appliedFilters.theme).toBe('Dark');
    expect(newState.appliedFilters.sortPrice).toBe('desc');
    expect(newState.appliedFilters.categories).toEqual(['Music']);
  });

  test('should reset all filters when resetFilter is called', () => {
    // Arrange - start with some filters applied
    const stateWithFilters = {
      ...initialState,
      formValues: {
        ...initialState.formValues,
        search: 'test',
        keyword: 'test',
        categories: ['Music'],
        tier: 'Premium',
      },
      appliedFilters: {
        ...initialState.appliedFilters,
        search: 'test',
        keyword: 'test',
        categories: ['Music'],
        tier: 'Premium',
      },
    };

    // Act
    const newState = filterReducer(stateWithFilters, resetFilter());

    // Assert - everything should be reset to initial values
    expect(newState.formValues).toEqual(initialState.formValues);
    expect(newState.appliedFilters).toEqual(initialState.appliedFilters);
  });
}); 