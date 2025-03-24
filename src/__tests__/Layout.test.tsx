import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

// Mock ReactQueryProvider since we don't need actual query functionality in tests
jest.mock('@/providers/ReactQueryProvider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-provider-mock">{children}</div>
  )
}));

describe('RootLayout Component', () => {
  it('renders children content', () => {
    render(
      <RootLayout>
        <div data-testid="test-content">Test Content</div>
      </RootLayout>
    );
    
    // Check children content is rendered
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });
  
  it('wraps content with ReactQueryProvider', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    
    // Check that ReactQueryProvider is used to wrap the content
    const queryProvider = screen.getByTestId('query-provider-mock');
    expect(queryProvider).toBeInTheDocument();
    expect(queryProvider).toHaveTextContent('Test Content');
  });
  
  it('renders with proper HTML structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    
    // The html and body elements should be present in the structure
    // (Note: TestingLibrary renders components in a div, so we need to check the structure)
    expect(container.innerHTML).toMatch(/<html/);
    expect(container.innerHTML).toMatch(/<body/);
    
    // Check for lang attribute on html
    expect(container.innerHTML).toMatch(/lang=('|")en('|")/);
    
    // Check that the body has the font classes
    expect(container.innerHTML).toMatch(/class=["'].*variable.*variable.*["']/);
  });
}); 