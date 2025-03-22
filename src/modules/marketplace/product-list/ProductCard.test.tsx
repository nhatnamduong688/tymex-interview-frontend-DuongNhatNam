import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCart } from '../product-cart';

describe('ProductCart', () => {
  const mockProduct = {
    id: '1',
    name: 'Digital Art Creation',
    creator: {
      name: 'Jane Smith',
      isOnline: true,
      avatar: 'https://example.com/avatar.jpg'
    },
    price: 99.99,
    tier: 'Premium',
    theme: 'Dark',
    category: 'Art',
    imageBg: 'https://example.com/background.jpg',
    imageItem: 'https://example.com/item.jpg',
    description: 'A beautiful digital art piece',
    createdAt: '2023-01-15T10:30:00Z',
    tags: ['Premium', 'Featured']
  };

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('should render product data correctly', () => {
    renderWithRouter(<ProductCart product={mockProduct} />);
    
    expect(screen.getByText('Digital Art Creation')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should render product images correctly', () => {
    renderWithRouter(<ProductCart product={mockProduct} />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', mockProduct.imageBg);
    expect(images[0]).toHaveAttribute('alt', mockProduct.name);
    expect(images[1]).toHaveAttribute('src', mockProduct.imageItem);
    expect(images[1]).toHaveAttribute('alt', mockProduct.name);
  });

  it('should render product tags when present', () => {
    renderWithRouter(<ProductCart product={mockProduct} />);
    
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('should render creator avatar correctly', () => {
    renderWithRouter(<ProductCart product={mockProduct} />);
    
    const avatar = screen.getAllByRole('img')[2]; // Third image should be the avatar
    expect(avatar).toHaveAttribute('src', mockProduct.creator.avatar);
    expect(avatar).toHaveAttribute('alt', mockProduct.creator.name);
  });

  it('should handle online and offline creators', () => {
    // Test with online creator
    const { unmount } = renderWithRouter(<ProductCart product={mockProduct} />);
    
    // Verify online product renders
    const avatar = screen.getAllByRole('img')[2];
    expect(avatar).toHaveAttribute('src', mockProduct.creator.avatar);
    
    // Clean up
    unmount();
    
    // Test with offline creator
    const offlineProduct = {
      ...mockProduct,
      creator: {
        ...mockProduct.creator,
        isOnline: false
      }
    };
    
    renderWithRouter(<ProductCart product={offlineProduct} />);
    
    // Verify offline product renders
    const offlineAvatar = screen.getAllByRole('img')[2];
    expect(offlineAvatar).toHaveAttribute('src', offlineProduct.creator.avatar);
  });

  it('should format price with dollar sign and two decimal places', () => {
    renderWithRouter(<ProductCart product={mockProduct} />);
    
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should display a loading state when product is not provided', () => {
    render(<ProductCart product={null} />);
    
    expect(screen.getByText('Loading product...')).toBeInTheDocument();
  });
}); 