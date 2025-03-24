import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchInput from '@/components/search-input';

// Mock the dependencies
jest.mock('@/components/icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name} icon</div>
}));

jest.mock('@/components/input', () => ({
  __esModule: true,
  default: ({ placeholder, value, onChange, icon }: any) => (
    <div className="input-container">
      {icon}
      <input
        data-testid="input-element"
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
      />
    </div>
  )
}));

// Mock the useDebounce hook
jest.mock('@/hooks/useDebounce', () => ({
  __esModule: true,
  default: (value: string) => value
}));

describe('SearchInput Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with empty value', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    
    render(<SearchInput value="" onChange={onChange} onClear={onClear} />);
    
    // Check for the search icon
    const searchIcon = screen.getByTestId('icon-search');
    expect(searchIcon).toBeInTheDocument();
    
    // The clear icon should not be visible when value is empty
    const clearIcon = screen.queryByTestId('icon-close');
    expect(clearIcon).not.toBeInTheDocument();
  });

  it('renders with non-empty value and shows clear button', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    
    render(<SearchInput value="test" onChange={onChange} onClear={onClear} />);
    
    // The clear icon should be visible when value is not empty
    const clearIcon = screen.getByTestId('icon-close');
    expect(clearIcon).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    
    render(<SearchInput value="test" onChange={onChange} onClear={onClear} />);
    
    const clearButton = screen.getByTestId('icon-close').parentElement;
    fireEvent.click(clearButton!);
    
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when input changes', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    
    render(<SearchInput value="" onChange={onChange} onClear={onClear} />);
    
    const input = screen.getByTestId('input-element');
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Fast-forward timers to trigger debounced call
    act(() => {
      jest.runAllTimers();
    });
    
    expect(onChange).toHaveBeenCalledWith('test');
  });
}); 