import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterSummary } from '../FilterSummary';
import { vi } from 'vitest';

// Mock the antd components
vi.mock('antd', () => ({
  Button: ({ children, icon, onClick, type }) => (
    <button 
      onClick={onClick} 
      data-type={type}
      data-testid="filter-button"
    >
      {icon && <span data-testid="filter-icon"></span>}
      {children}
    </button>
  ),
  Tag: ({ children, color }) => (
    <div data-testid="tag" data-color={color}>
      {children}
    </div>
  )
}));

// Mock icons
vi.mock('@ant-design/icons', () => ({
  FilterOutlined: () => <span data-testid="filter-icon" />
}));

// Mock styled-components
vi.mock('styled-components', () => ({
  default: {
    div: () => (props) => <div {...props} />,
    button: () => (props) => <button {...props} />
  }
}));

describe('FilterSummary', () => {
  const defaultProps = {
    filterSummary: ['Search: "product"', 'Price Range: $10 - $100', 'Tier: Premium'],
    onToggleFilter: vi.fn(),
    isFilterVisible: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('renders filter summary items correctly', () => {
    render(<FilterSummary {...defaultProps} />);
    
    // Check if button and filter tags are rendered
    expect(screen.getByTestId('filter-button')).toBeInTheDocument();
    expect(screen.getByText('Show Filters')).toBeInTheDocument();
    
    // Check all summary items
    const tags = screen.getAllByTestId('tag');
    expect(tags).toHaveLength(3);
    expect(screen.getByText('Search: "product"')).toBeInTheDocument();
    expect(screen.getByText('Price Range: $10 - $100')).toBeInTheDocument();
    expect(screen.getByText('Tier: Premium')).toBeInTheDocument();
  });
  
  test('renders with different button text when filters are visible', () => {
    render(<FilterSummary {...defaultProps} isFilterVisible={true} />);
    
    expect(screen.getByText('Hide Filters')).toBeInTheDocument();
    expect(screen.getByTestId('filter-button')).toHaveAttribute('data-type', 'primary');
  });
  
  test('returns only the button when summary array is empty', () => {
    render(<FilterSummary 
      filterSummary={[]} 
      onToggleFilter={defaultProps.onToggleFilter}
      isFilterVisible={false}
    />);
    
    // Button should be rendered
    expect(screen.getByTestId('filter-button')).toBeInTheDocument();
    
    // No tags should be rendered
    expect(screen.queryAllByTestId('tag')).toHaveLength(0);
  });
}); 