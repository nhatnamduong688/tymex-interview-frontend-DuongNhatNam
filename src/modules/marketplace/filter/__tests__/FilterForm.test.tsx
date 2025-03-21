import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterForm } from '../FilterForm';
import { TFilterProduct } from '../../../../types/product';

describe('FilterForm', () => {
  const defaultProps = {
    initialValues: {} as TFilterProduct,
    loading: false,
    isCollapsed: false,
    onSearchChange: jest.fn(),
    onSubmit: jest.fn(),
    onReset: jest.fn(),
    setFormRef: jest.fn()
  };

  test('renders form elements correctly', () => {
    render(<FilterForm {...defaultProps} />);
    
    // Check presence of key form elements
    expect(screen.getByPlaceholderText('Quick search')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Tier')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Reset filter')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('shows loading state correctly', () => {
    render(<FilterForm {...defaultProps} loading={true} />);
    
    expect(screen.getByText('Applying filters...')).toBeInTheDocument();
  });

  test('renders categories field when isCollapsed is true', () => {
    render(<FilterForm {...defaultProps} isCollapsed={true} />);
    
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  test('does not render categories field when isCollapsed is false', () => {
    render(<FilterForm {...defaultProps} isCollapsed={false} />);
    
    expect(screen.queryByText('Categories')).not.toBeInTheDocument();
  });

  test('calls onReset when reset button is clicked', () => {
    render(<FilterForm {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Reset filter'));
    
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);
  });

  test('calls onSearchChange when input value changes', () => {
    render(<FilterForm {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Quick search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(defaultProps.onSearchChange).toHaveBeenCalledTimes(1);
  });

  test('sets form ref on mount', () => {
    render(<FilterForm {...defaultProps} />);
    
    expect(defaultProps.setFormRef).toHaveBeenCalledTimes(1);
  });
}); 