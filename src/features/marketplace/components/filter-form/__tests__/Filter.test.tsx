import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Filter } from '..';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { vi, describe, beforeEach, test, expect, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock window.matchMedia required by antd
beforeAll(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

// Create a mock store for testing
const createMockStore = () => {
  return configureStore({
    reducer: {
      filter: (state = {
        formValues: {},
        appliedFilters: { search: 'test' },
        isFilterVisible: true
      }) => state,
      products: (state = { loading: false }) => state
    },
    preloadedState: {
      filter: {
        formValues: {},
        appliedFilters: { search: 'test' },
        isFilterVisible: true
      },
      products: {
        loading: false
      }
    }
  });
};

// Mock useBreakpoint hook with different return values for different tests
let mockIsCollapsed = true;
vi.mock('../../../hooks/useBreakpoint', () => ({
  useBreakpoint: () => ({ isCollapsed: mockIsCollapsed })
}));

vi.mock('../../../hooks/useQueryParams', () => ({
  useQueryParams: () => ({
    getParams: () => ({}),
    setParams: vi.fn(),
    removeParams: vi.fn()
  })
}));

// Mock components for testing
vi.mock('../FilterForm', () => ({
  FilterForm: (props) => <div data-testid="filter-form">Filter Form</div>
}));

vi.mock('../FilterSummary', () => ({
  FilterSummary: (props) => <div data-testid="filter-summary">Filter Summary</div>
}));

// Mock styled components
vi.mock('../filter.styled', () => ({
  StyledForm: ({ children }) => <div data-testid="styled-form">{children}</div>
}));

vi.mock('antd', async () => {
  const actual = await vi.importActual('antd');
  return {
    ...actual,
    Form: {
      ...actual.Form,
      useForm: () => [{
        resetFields: vi.fn(),
        setFieldsValue: vi.fn(),
        getFieldValue: vi.fn()
      }]
    },
    ConfigProvider: ({ children }) => <>{children}</>,
    Collapse: {
      Panel: ({ children }) => <div data-testid="collapse-panel">{children}</div>
    }
  };
});

describe('Filter Component Rendering Logic', () => {
  let store;
  
  beforeEach(() => {
    store = createMockStore();
  });
  
  test('renders FilterSummary when isCollapsed is true', () => {
    // Set the mock to return isCollapsed: true
    mockIsCollapsed = true;
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filter />
        </MemoryRouter>
      </Provider>
    );
    
    // FilterSummary should be rendered when isCollapsed is true
    expect(screen.getByTestId('filter-summary')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-form')).not.toBeInTheDocument();
  });
  
  test('renders FilterForm when isCollapsed is false', () => {
    // Set the mock to return isCollapsed: false
    mockIsCollapsed = false;
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filter />
        </MemoryRouter>
      </Provider>
    );
    
    // FilterForm should be rendered when isCollapsed is false
    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-summary')).not.toBeInTheDocument();
  });
}); 