import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/(home)/page';

jest.mock('@/components/section', () => ({
  Section: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Home Page', () => {
  it('renders the home page with correct heading', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { name: /this is home page/i });
    expect(heading).toBeInTheDocument();
  });
}); 