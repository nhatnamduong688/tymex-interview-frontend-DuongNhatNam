import React from 'react';
import { render, screen } from '@testing-library/react';
import { Filter } from '..';
import { useFilterLogic } from '../useFilterLogic';
import { FilterForm } from '../FilterForm';
import { FilterSummary } from '../FilterSummary';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import { Form } from 'antd';

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

// Mock the dependencies
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
    }
  };
});

describe('Filter Component', () => {
  
  test('renders FilterForm when not collapsed', () => {
    // Create a mock store
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    
    // The main form should be rendered as we're mocking isCollapsed as false
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
}); 