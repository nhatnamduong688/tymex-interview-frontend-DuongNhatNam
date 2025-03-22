import React from 'react';
import { render, screen } from '@testing-library/react';
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

// Mock Redux store
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

// Mock useBreakpoint hook to return collapsed false (expanded)
vi.mock('../../../hooks/useBreakpoint', () => ({
  useBreakpoint: () => ({ isCollapsed: false })
}));

vi.mock('../../../hooks/useQueryParams', () => ({
  useQueryParams: () => ({
    getParams: () => ({}),
    setParams: vi.fn(),
    removeParams: vi.fn()
  })
}));

// Mock components
vi.mock('../FilterForm', () => ({
  FilterForm: () => <div data-testid="filter-form">Filter Form</div>
}));

vi.mock('../FilterSummary', () => ({
  FilterSummary: () => <div data-testid="filter-summary">Filter Summary</div>
}));

// Mock StyledForm component to just render children
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

describe('Filter Component - Expanded Mode', () => {
  let store;
  
  beforeEach(() => {
    store = createMockStore();
  });
  
  test('renders FilterForm when not collapsed', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Filter />
        </MemoryRouter>
      </Provider>
    );
    
    // When isCollapsed is false, only FilterForm should be rendered
    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
    expect(screen.queryByTestId('filter-summary')).not.toBeInTheDocument();
  });
}); 