import React from 'react';
import { render, screen } from '@testing-library/react';
import Marketplace from '@/app/(home)/marketplace/page';

// Mock the components used in the Marketplace page
jest.mock('@/components/hero-section', () => ({
  __esModule: true,
  default: () => <div data-testid="hero-section">Hero Section Mock</div>
}));

jest.mock('@/components/group-products', () => ({
  __esModule: true,
  default: () => <div data-testid="group-products">Group Products Mock</div>
}));

describe('Marketplace Page', () => {
  it('renders the marketplace page with hero section', () => {
    render(<Marketplace />);
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
  });

  it('renders the marketplace page with group products section', () => {
    render(<Marketplace />);
    const groupProducts = screen.getByTestId('group-products');
    expect(groupProducts).toBeInTheDocument();
  });

  it('renders with correct CSS classes', () => {
    render(<Marketplace />);
    const marketplacePage = screen.getByText(/Hero Section Mock/i).closest('div.marketplace-page');
    expect(marketplacePage).toBeInTheDocument();
    
    // Check for animation classes
    const animatedElements = document.querySelectorAll('.animated.fadeInLeft');
    expect(animatedElements.length).toBe(2);
  });

  it('renders with Suspense for loading state', () => {
    render(<Marketplace />);
    const suspenseElement = screen.getByText(/Group Products Mock/i).closest('div');
    expect(suspenseElement).toHaveClass('animated');
    expect(suspenseElement).toHaveClass('fadeInLeft');
  });
}); 