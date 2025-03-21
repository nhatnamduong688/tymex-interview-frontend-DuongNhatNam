import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterSummary } from '../FilterSummary';

describe('FilterSummary', () => {
  test('renders filter summary items correctly', () => {
    const summary = [
      'Search: "product"',
      'Price Range: $10 - $100',
      'Tier: Premium'
    ];
    
    render(<FilterSummary summary={summary} />);
    
    // Check if default heading and all summary items are displayed
    expect(screen.getByText('Current Filter Settings:')).toBeInTheDocument();
    expect(screen.getByText('Search: "product"')).toBeInTheDocument();
    expect(screen.getByText('Price Range: $10 - $100')).toBeInTheDocument();
    expect(screen.getByText('Tier: Premium')).toBeInTheDocument();
  });
  
  test('renders children instead of default content when provided', () => {
    const summary = ['Search: "product"'];
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    
    render(
      <FilterSummary summary={summary}>
        {customContent}
      </FilterSummary>
    );
    
    // Check if custom content is rendered
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    
    // Default content should not be rendered
    expect(screen.queryByText('Current Filter Settings:')).not.toBeInTheDocument();
    expect(screen.queryByText('Search: "product"')).not.toBeInTheDocument();
  });
  
  test('returns null when summary array is empty', () => {
    const { container } = render(<FilterSummary summary={[]} />);
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });
}); 