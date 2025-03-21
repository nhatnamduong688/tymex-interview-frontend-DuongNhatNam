import React from 'react';
import { render, screen } from '@testing-library/react';
import { Filter } from '..';
import { useFilterLogic } from '../useFilterLogic';
import { FilterForm } from '../FilterForm';
import { FilterSummary } from '../FilterSummary';

// Mock the dependencies
jest.mock('../useFilterLogic', () => ({
  useFilterLogic: jest.fn()
}));

jest.mock('../FilterForm', () => ({
  FilterForm: jest.fn(() => <div data-testid="filter-form">FilterForm</div>)
}));

jest.mock('../FilterSummary', () => ({
  FilterSummary: jest.fn(() => <div data-testid="filter-summary">FilterSummary</div>)
}));

describe('Filter Component', () => {
  
  beforeEach(() => {
    // Setup default mock return values
    (useFilterLogic as jest.Mock).mockReturnValue({
      currentValues: {},
      loading: false,
      params: {},
      isCollapsed: false,
      handleSearchChange: jest.fn(),
      onSubmit: jest.fn(),
      resetFilter: jest.fn(),
      setFormRef: jest.fn(),
      filterSummary: ['Test filter'],
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders FilterForm and FilterSummary components', () => {
    render(<Filter />);
    
    // Check that both components are rendered
    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
    expect(screen.getByTestId('filter-summary')).toBeInTheDocument();
  });
  
  test('passes correct props to FilterForm', () => {
    render(<Filter />);
    
    // Check FilterForm was called with the correct props
    expect(FilterForm).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: {},
        loading: false,
        isCollapsed: false,
        onSearchChange: expect.any(Function),
        onSubmit: expect.any(Function),
        onReset: expect.any(Function),
        setFormRef: expect.any(Function),
      }),
      expect.anything()
    );
  });
  
  test('passes correct props to FilterSummary', () => {
    render(<Filter />);
    
    // Check FilterSummary was called with the correct props
    expect(FilterSummary).toHaveBeenCalledWith(
      expect.objectContaining({
        summary: ['Test filter'],
      }),
      expect.anything()
    );
  });
  
  test('handles loading state properly', () => {
    (useFilterLogic as jest.Mock).mockReturnValue({
      currentValues: {},
      loading: true,
      params: {},
      isCollapsed: false,
      handleSearchChange: jest.fn(),
      onSubmit: jest.fn(),
      resetFilter: jest.fn(),
      setFormRef: jest.fn(),
      filterSummary: [],
    });
    
    render(<Filter />);
    
    expect(FilterForm).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: true,
      }),
      expect.anything()
    );
  });
}); 