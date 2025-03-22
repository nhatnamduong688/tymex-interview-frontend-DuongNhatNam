import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterForm } from './FilterForm';
import { vi, describe, test, expect } from 'vitest';

// Mock the antd components
vi.mock('antd', () => {
  const Form = {
    Item: ({ children, name, label }) => (
      <div data-testid={`form-item-${name}`}>
        <label>{label}</label>
        {children}
      </div>
    ),
    useForm: () => [{
      resetFields: vi.fn(),
      setFieldsValue: vi.fn(),
      getFieldValue: vi.fn(),
      submit: vi.fn()
    }]
  };
  
  const Input = ({ placeholder, prefix, onChange, allowClear, defaultValue }) => (
    <input 
      placeholder={placeholder} 
      data-prefix={prefix ? 'has-prefix' : ''} 
      onChange={onChange}
      data-allowclear={allowClear}
      defaultValue={defaultValue}
      data-testid="input"
    />
  );
  
  const Button = ({ children, type, onClick, icon, htmlType, loading }) => (
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
  );
  
  const Select = ({ placeholder, allowClear, children }) => (
    <select 
      data-placeholder={placeholder} 
      data-allowclear={allowClear}
      data-testid="select"
    >
      {children}
    </select>
  );
  
  const Option = ({ children, value }) => (
    <option value={value}>{children}</option>
  );
  
  const Slider = ({ range, min, max, defaultValue, tipFormatter }) => (
    <div 
      data-testid="slider" 
      data-range={range} 
      data-min={min} 
      data-max={max} 
      data-default-value={JSON.stringify(defaultValue)}
    />
  );
  
  const Divider = () => <hr data-testid="divider" />;
  
  const Row = ({ children, gutter }) => (
    <div data-testid="row" data-gutter={gutter}>
      {children}
    </div>
  );
  
  const Col = ({ children, span }) => (
    <div data-testid="col" data-span={span}>
      {children}
    </div>
  );

  return {
    Form,
    Input,
    Button,
    Select,
    Option,
    Slider,
    Divider,
    Row,
    Col
  };
});

// Mock icons
vi.mock('@ant-design/icons', () => ({
  SearchOutlined: () => <span data-testid="search-icon" />,
  ReloadOutlined: () => <span data-testid="reload-icon" />
}));

// Mock styled-components
vi.mock('styled-components', () => ({
  default: {
    div: (props) => (args) => <div {...args} />,
  }
}));

// Mock enums
vi.mock('../../../enums/filter', () => ({
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
    expect(screen.getByTestId('reset')).toBeInTheDocument();
    expect(screen.getByTestId('apply-filters')).toBeInTheDocument();
  });

  test('calls onResetFilter when reset button is clicked', () => {
    render(<FilterForm {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('reset'));
    
    expect(defaultProps.onResetFilter).toHaveBeenCalledTimes(1);
  });
}); 