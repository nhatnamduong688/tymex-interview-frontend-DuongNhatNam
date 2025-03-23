import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterForm } from '../FilterForm';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { Form } from 'antd';

// Mock Form component from antd
vi.mock('antd', () => {
  const mockForm = {
    Item: ({ children, name, label }) => (
      <div data-testid={`form-item-${name}`}>
        <label>{label}</label>
        {children}
      </div>
    ),
    useForm: () => [{
      resetFields: vi.fn(),
      setFieldsValue: vi.fn(),
      getFieldValue: vi.fn().mockImplementation((field) => {
        if (field === 'priceRange') return [0, 200];
        if (field === 'keyword') return 'test';
        return null;
      }),
      submit: vi.fn()
    }]
  };

  return {
    Form: mockForm,
    Input: ({ placeholder, prefix, onChange, allowClear, defaultValue }) => (
      <input 
        placeholder={placeholder} 
        data-prefix={prefix ? 'has-prefix' : ''} 
        onChange={onChange}
        data-allowclear={allowClear}
        defaultValue={defaultValue}
        data-testid="input"
      />
    ),
    Button: ({ children, type, onClick, icon, htmlType, loading }) => (
      <button 
        type="button" 
        data-type={type} 
        onClick={onClick} 
        data-icon={icon ? 'has-icon' : ''} 
        data-htmltype={htmlType}
        data-loading={loading}
        data-testid={children && children.toString().toLowerCase().replace(/\s+/g, '-')}
      >
        {children}
      </button>
    ),
    Select: ({ placeholder, allowClear, children }) => (
      <select 
        data-placeholder={placeholder} 
        data-allowclear={allowClear}
        data-testid="select"
      >
        {children}
      </select>
    ),
    Option: ({ children, value }) => (
      <option value={value}>{children}</option>
    ),
    Slider: ({ range, min, max, defaultValue, tipFormatter }) => (
      <div 
        data-testid="slider" 
        data-range={range} 
        data-min={min} 
        data-max={max} 
        data-default-value={JSON.stringify(defaultValue)}
      />
    ),
    Divider: () => <hr data-testid="divider" />,
    Row: ({ children, gutter }) => (
      <div data-testid="row" data-gutter={gutter}>
        {children}
      </div>
    ),
    Col: ({ children, span }) => (
      <div data-testid="col" data-span={span}>
        {children}
      </div>
    )
  };
});

// Mock icons
vi.mock('@ant-design/icons', () => ({
  SearchOutlined: () => <span data-testid="search-icon" />,
  ReloadOutlined: () => <span data-testid="reload-icon" />
}));

// Mock enums
vi.mock('../../../../enums/filter', () => ({
  ProductTheme: {
    Art: 'Art',
    Game: 'Game',
    Music: 'Music'
  },
  ProductTier: {
    Free: 'Free',
    Premium: 'Premium'
  },
  SortType: {
    Ascending: 'asc',
    Descending: 'desc'
  }
}));

console.error = vi.fn(); // Silence console errors during tests

describe('FilterForm', () => {
  const mockForm = {
    resetFields: vi.fn(),
    setFieldsValue: vi.fn(),
    getFieldValue: vi.fn().mockImplementation((field) => {
      if (field === 'priceRange') return [0, 200];
      if (field === 'keyword') return 'test';
      return null;
    }),
    submit: vi.fn()
  };
  
  const defaultProps = {
    form: mockForm,
    loading: false,
    onSubmit: vi.fn(),
    onResetFilter: vi.fn(),
    onSearchChange: vi.fn(),
    currentValues: {}
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders key form sections and buttons', () => {
    render(<FilterForm {...defaultProps} />);
    
    // Check for form label names
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Tier')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
  });

  test('calls onResetFilter when reset button is clicked', () => {
    render(<FilterForm {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Reset'));
    
    expect(defaultProps.onResetFilter).toHaveBeenCalledTimes(1);
  });
}); 