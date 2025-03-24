import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from '@/components/product';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} src={props.src || '/mocked-path'} data-testid="next-image" />;
  },
}));

// Mock the Icon component
jest.mock('@/components/icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`}>{name} icon</div>,
}));

describe('Product Component', () => {
  const mockProductProps = {
    title: 'Test Product',
    category: 'Art',
    price: 1.5,
    imageId: 1,
    isFavorite: true,
    theme: 'light',
    tier: 'legendary',
    author: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      gender: 'male',
      avatar: '/avatar.jpg',
      onlineStatus: 'online'
    }
  };

  it('renders product details correctly', () => {
    render(<Product {...mockProductProps} />);
    
    // Check product title
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Check product category
    expect(screen.getByText('Art')).toBeInTheDocument();
    
    // Check product price
    expect(screen.getByText(/1.5 ETH/)).toBeInTheDocument();
    
    // Check author's name
    expect(screen.getByText('John')).toBeInTheDocument();
  });
  
  it('displays ethereum icon with price', () => {
    render(<Product {...mockProductProps} />);
    
    // Check for ethereum icon
    const ethIcon = screen.getByTestId('icon-ethereum');
    expect(ethIcon).toBeInTheDocument();
  });
  
  it('displays heart icon when product is favorite', () => {
    render(<Product {...mockProductProps} />);
    
    // Check for heart icon
    const heartIcon = screen.getByTestId('icon-heart');
    expect(heartIcon).toBeInTheDocument();
  });
  
  it('does not display heart icon when product is not favorite', () => {
    const nonFavoriteProps = { ...mockProductProps, isFavorite: false };
    render(<Product {...nonFavoriteProps} />);
    
    // Verify heart icon is not present
    expect(screen.queryByTestId('icon-heart')).not.toBeInTheDocument();
  });
  
  it('renders with proper structure and classes', () => {
    const { container } = render(<Product {...mockProductProps} />);
    
    // Check product structure
    const productWrapper = container.querySelector('.product-wrapper');
    expect(productWrapper).toBeInTheDocument();
    expect(productWrapper).toHaveClass('art');
    
    // Check for product image container
    const imageContainer = container.querySelector('.product-image');
    expect(imageContainer).toBeInTheDocument();
    
    // Check for product info section
    const infoSection = container.querySelector('.product-info');
    expect(infoSection).toBeInTheDocument();
    
    // Check for product tier
    const tierSection = container.querySelector('.product-tier');
    expect(tierSection).toBeInTheDocument();
    
    // Check for creator section
    const creatorSection = container.querySelector('.product-creator');
    expect(creatorSection).toBeInTheDocument();
  });
}); 