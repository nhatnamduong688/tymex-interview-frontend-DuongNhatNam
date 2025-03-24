import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/input';

describe('Input Component', () => {
  it('renders with required props', () => {
    const handleChange = jest.fn();
    render(
      <Input 
        placeholder="Enter text" 
        value="" 
        onChange={handleChange} 
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('renders with an icon', () => {
    const handleChange = jest.fn();
    const testIcon = <span data-testid="test-icon">🔍</span>;
    
    render(
      <Input 
        placeholder="Search" 
        value="" 
        onChange={handleChange}
        icon={testIcon}
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Search');
    const iconElement = screen.getByTestId('test-icon');
    
    expect(inputElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('displays the current value', () => {
    const handleChange = jest.fn();
    const testValue = 'Test Value';
    
    render(
      <Input 
        placeholder="Enter text" 
        value={testValue} 
        onChange={handleChange} 
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveValue(testValue);
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = jest.fn();
    
    render(
      <Input 
        placeholder="Enter text" 
        value="" 
        onChange={handleChange} 
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Enter text');
    const newValue = 'New input value';
    
    fireEvent.change(inputElement, { target: { value: newValue } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(newValue);
  });

  it('has correct container class', () => {
    const handleChange = jest.fn();
    
    render(
      <Input 
        placeholder="Enter text" 
        value="" 
        onChange={handleChange} 
      />
    );
    
    const containerElement = screen.getByPlaceholderText('Enter text').closest('div');
    expect(containerElement).toHaveClass('input-container');
  });
}); 