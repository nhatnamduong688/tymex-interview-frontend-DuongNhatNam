import React from 'react';
import { render, screen } from '@testing-library/react';
import { BannerSection } from './index';
import { ThemeProvider } from 'styled-components';

// Mock theme object for styled-components
const theme = {
  breakpoints: {
    lg: '992px',
    md: '768px',
    sm: '576px'
  },
  fonts: {
    heading: 'Arial, sans-serif'
  }
};

// Wrap component with ThemeProvider for tests
const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('BannerSection Component', () => {
  it('renders the component correctly', () => {
    renderWithTheme(<BannerSection />);
    
    // Check that all important images are rendered
    expect(screen.getByAltText('bg-banner-section')).toBeInTheDocument();
    expect(screen.getByAltText('new_arrival')).toBeInTheDocument();
    expect(screen.getByAltText('list-item-banner-section')).toBeInTheDocument();
    expect(screen.getByAltText('item-banner-section')).toBeInTheDocument();
    expect(screen.getByAltText('bg-text-the-DJ')).toBeInTheDocument();
    expect(screen.getByAltText('text-the-DJ')).toBeInTheDocument();
  });

  it('renders the filter button', () => {
    renderWithTheme(<BannerSection />);
    
    // Check that the filter button exists
    expect(screen.getByText('Filters & Sort')).toBeInTheDocument();
  });

  it('has correct responsive styling props', () => {
    const { container } = renderWithTheme(<BannerSection />);
    
    // Get the main container
    const bannerContainer = container.firstChild;
    
    // Check that styled component has been rendered with proper styling
    expect(bannerContainer).toHaveStyle('position: relative');
    expect(bannerContainer).toHaveStyle('overflow: hidden');
  });
});
