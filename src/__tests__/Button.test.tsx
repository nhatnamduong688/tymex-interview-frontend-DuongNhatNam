import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button text="Click me" />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('primary');
    expect(button).toHaveClass('small');
  });

  it('renders with custom props', () => {
    render(
      <Button 
        text="Submit" 
        typeButton="secondary"
        size="large"
        className="custom-class"
        type="submit"
      />
    );
    
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('secondary');
    expect(button).toHaveClass('large');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays disabled state correctly', () => {
    render(<Button text="Disabled Button" disabled />);
    
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('renders with an icon', () => {
    render(
      <Button 
        text="Icon Button" 
        icon={<span data-testid="test-icon">🔍</span>}
      />
    );
    
    const button = screen.getByRole('button', { name: /icon button/i });
    const icon = screen.getByTestId('test-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
}); 