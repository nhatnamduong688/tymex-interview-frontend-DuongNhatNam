import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer';

// Mock nested components if needed
jest.mock('@/components/icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name} icon</div>
}));

// Mock next/link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href} data-testid="next-link">{children}</a>;
  };
});

describe('Footer Component', () => {
  it('renders the footer component', () => {
    render(<Footer />);
    
    // Check for navigation section
    const navigation = screen.getByText(/Navigation/i);
    expect(navigation).toBeInTheDocument();
    
    // Check for main links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
    expect(screen.getByText(/Our teams/i)).toBeInTheDocument();
    
    // Check for contact section
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
    
    // Check for subscription form
    expect(screen.getByPlaceholderText(/Enter your email/i) || 
           screen.getByPlaceholderText(/Your email/i) || 
           screen.getByRole('textbox')).toBeInTheDocument();
    
    // Check for copyright
    expect(screen.getByText(/©2023 Tyme/i) || 
           screen.getByText(/Rights reserved/i)).toBeInTheDocument();
  });
  
  it('renders the footer with correct structure', () => {
    const { container } = render(<Footer />);
    
    // Check for the main footer container
    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    
    // Check for footer sections
    const footerSections = container.querySelectorAll('.footer-content > div');
    expect(footerSections.length).toBeGreaterThan(0);
  });
}); 