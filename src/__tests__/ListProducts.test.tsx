import React from 'react';
import { render, screen } from '../test-utils';
import ListProducts from '@/components/list-products';

// Mock the Product component
jest.mock('@/components/product', () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid={`product-${props.id || 'mock'}`} className="product-card">
      {props.title || 'Mock Product'}
    </div>
  )
}));

describe('ListProducts Component', () => {
  const mockProducts = [
    { 
      id: '1', 
      title: 'Product 1', 
      price: 0.1, 
      category: 'Art',
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
    },
    { 
      id: '2', 
      title: 'Product 2', 
      price: 0.2, 
      category: 'Gaming',
      imageId: 2,
      isFavorite: false,
      theme: 'dark',
      tier: 'rare',
      author: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        gender: 'female',
        avatar: '/avatar2.jpg',
        onlineStatus: 'offline'
      }
    },
    { 
      id: '3', 
      title: 'Product 3', 
      price: 0.3, 
      category: 'Art',
      imageId: 3,
      isFavorite: true,
      theme: 'light',
      tier: 'epic',
      author: {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        gender: 'male',
        avatar: '/avatar3.jpg',
        onlineStatus: 'online'
      }
    }
  ];

  it('renders a list of products correctly', () => {
    render(<ListProducts products={mockProducts} />);
    
    // Check that each product is rendered
    mockProducts.forEach(product => {
      expect(screen.getByTestId(`product-${product.id}`)).toBeInTheDocument();
    });
  });
  
  it('renders the container with correct class', () => {
    const { container } = render(<ListProducts products={mockProducts} />);
    
    // Check for the list container
    const listContainer = container.querySelector('.list-products');
    expect(listContainer).toBeInTheDocument();
  });
  
  it('renders an empty container when no products are found', () => {
    const { container } = render(<ListProducts products={[]} />);
    
    // Check for the list container
    const listContainer = container.querySelector('.list-products');
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toBeEmptyDOMElement();
  });
}); 