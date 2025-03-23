import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { FilterForm } from '../FilterForm';
import { SortType } from '../../../../enums/filter';
import { TFilterProduct } from '../../../../types/product';
import { api } from '../../../../services/api';
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

// Mock the api
jest.mock('../../../../services/api', () => ({
  api: {
    getProducts: jest.fn(),
  }
}));

describe('FilterForm Component', () => {
  const mockSubmit = jest.fn();
  const mockResetFilter = jest.fn();
  const mockSearchChange = jest.fn();
  
  const testValues: TFilterProduct = {
    keyword: 'test keyword',
    priceRange: [10, 50],
    tier: 'Premium',
    theme: 'Dark',
    sortTime: SortType.Ascending,
    sortPrice: SortType.Descending,
  };
  
  // Mock data for tiers and themes
  const mockProducts = {
    data: [
      { tier: 'Free', theme: 'Light' },
      { tier: 'Premium', theme: 'Dark' },
      { tier: 'Pro', theme: 'Colorful' },
      { tier: 'Premium', theme: 'Minimal' },
    ]
  };
  
  // Setup api mock implementation
  beforeEach(() => {
    (api.getProducts as jest.Mock).mockResolvedValue(mockProducts);
    jest.clearAllMocks();
  });
  
  const renderComponent = () => {
    const [form] = Form.useForm();
    return render(
      <FilterForm
        form={form}
        loading={false}
        onSubmit={mockSubmit}
        onResetFilter={mockResetFilter}
        onSearchChange={mockSearchChange}
        currentValues={testValues}
      />
    );
  };
  
  it('should render correctly with initial values', async () => {
    renderComponent();
    
    // Check if the API was called to fetch filter options
    expect(api.getProducts).toHaveBeenCalled();
    
    // Check for loading states
    expect(screen.getAllByText(/Loading/i)[0]).toBeInTheDocument();
    
    // Wait for API data to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
    
    // Check if the form renders with initial values
    expect(screen.getByDisplayValue('test keyword')).toBeInTheDocument();
    
    // Check if options are rendered from API data
    const tierSelect = screen.getByLabelText('Tier');
    fireEvent.mouseDown(tierSelect);
    
    // Wait for dropdown options to appear
    await waitFor(() => {
      expect(screen.getByText('Free')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
      expect(screen.getByText('Pro')).toBeInTheDocument();
    });
    
    // Check theme select
    const themeSelect = screen.getByLabelText('Theme');
    fireEvent.mouseDown(themeSelect);
    
    await waitFor(() => {
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
      expect(screen.getByText('Colorful')).toBeInTheDocument();
      expect(screen.getByText('Minimal')).toBeInTheDocument();
    });
  });
  
  it('should handle form submission', async () => {
    renderComponent();
    
    // Wait for API data to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
    
    // Submit the form
    const applyButton = screen.getByText('Apply Filters');
    fireEvent.click(applyButton);
    
    // Check if the submit function was called with the form values
    expect(mockSubmit).toHaveBeenCalled();
  });
  
  it('should handle form reset', async () => {
    renderComponent();
    
    // Wait for API data to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
    
    // Reset the form
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    expect(mockResetFilter).toHaveBeenCalled();
  });
  
  it('should handle search change', async () => {
    renderComponent();
    
    // Wait for API data to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
    
    // Change the search input
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockSearchChange).toHaveBeenCalled();
  });
  
  it('should handle API errors gracefully', async () => {
    // Mock API to throw an error
    (api.getProducts as jest.Mock).mockRejectedValue(new Error('API error'));
    
    renderComponent();
    
    // Check if loading state is shown
    expect(screen.getAllByText(/Loading/i)[0]).toBeInTheDocument();
    
    // Wait for error to be handled
    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });
    
    // Verify empty options lists are still rendered
    const tierSelect = screen.getByLabelText('Tier');
    fireEvent.mouseDown(tierSelect);
    
    // Should show empty state
    await waitFor(() => {
      expect(screen.getByText('Select tier')).toBeInTheDocument();
    });
  });
}); 