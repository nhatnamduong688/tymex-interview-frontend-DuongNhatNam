import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '@/components/dropdown';

// Mock the Icon component
jest.mock('@/components/icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name} icon</div>,
}));

describe('Dropdown Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with required props', () => {
    render(
      <Dropdown 
        label="Test Dropdown" 
        options={mockOptions} 
        value="" 
        placeholder="Select an option" 
        onChange={() => {}}
      />
    );
    
    // Check label is rendered
    expect(screen.getByText('Test Dropdown')).toBeInTheDocument();
    
    // Check placeholder is rendered
    expect(screen.getByText('Select an option')).toBeInTheDocument();
    
    // Check chevron icon is rendered
    const chevronIcon = screen.getByTestId('icon-chevron-gray-down');
    expect(chevronIcon).toBeInTheDocument();
  });
  
  it('opens dropdown menu when clicked', () => {
    render(
      <Dropdown 
        label="Test Dropdown" 
        options={mockOptions} 
        value="" 
        placeholder="Select an option" 
        onChange={() => {}}
      />
    );
    
    // Initial state - dropdown should be closed
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    
    // Click the dropdown
    const dropdownHeader = screen.getByText('Select an option').closest('.dropdown-header');
    fireEvent.click(dropdownHeader!);
    
    // Dropdown should be open
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
  
  it('selects an option when clicked', () => {
    const handleChange = jest.fn();
    
    render(
      <Dropdown 
        label="Test Dropdown" 
        options={mockOptions} 
        value="" 
        placeholder="Select an option" 
        onChange={handleChange}
      />
    );
    
    // Open the dropdown
    const dropdownHeader = screen.getByText('Select an option').closest('.dropdown-header');
    fireEvent.click(dropdownHeader!);
    
    // Click an option
    fireEvent.click(screen.getByText('Option 2'));
    
    // Check if onChange was called with the correct value
    expect(handleChange).toHaveBeenCalledWith('option2');
    
    // Dropdown should close after selection
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
  
  it('displays selected value instead of placeholder', () => {
    render(
      <Dropdown 
        label="Test Dropdown" 
        options={mockOptions} 
        value="option2" 
        placeholder="Select an option" 
        onChange={() => {}}
      />
    );
    
    // Should display the selected option's label
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    
    // Should not display the placeholder
    expect(screen.queryByText('Select an option')).not.toBeInTheDocument();
  });
  
  it('closes dropdown when clicking outside', () => {
    render(
      <Dropdown 
        label="Test Dropdown" 
        options={mockOptions} 
        value="" 
        placeholder="Select an option" 
        onChange={() => {}}
      />
    );
    
    // Open the dropdown
    const dropdownHeader = screen.getByText('Select an option').closest('.dropdown-header');
    fireEvent.click(dropdownHeader!);
    
    // Check dropdown is open
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Simulate clicking outside
    fireEvent.mouseDown(document);
    
    // Dropdown should be closed
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
}); 