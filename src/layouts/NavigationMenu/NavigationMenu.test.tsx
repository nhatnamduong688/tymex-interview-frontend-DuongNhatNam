import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationMenu } from './index';
import { NAVIGATION_ITEMS } from '../../constants/common';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { vi, describe, it, expect, beforeAll } from 'vitest';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' })
  };
});

// Mock theme
const theme = {
  mixins: {
    gradientText: 'color: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);'
  },
  colors: {
    primaryGradient: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
  },
  fonts: {
    heading: 'Arial, sans-serif'
  }
};

// Mock matchMedia for Ant Design
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const renderNavigationMenu = (mode = 'horizontal') => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <NavigationMenu mode={mode} />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('NavigationMenu Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders all navigation items correctly', () => {
    renderNavigationMenu();
    
    // Check that all navigation items are rendered
    Object.values(NAVIGATION_ITEMS).forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('calls navigate function when item is clicked', () => {
    renderNavigationMenu();
    
    // Click on the About Us item
    fireEvent.click(screen.getByText(NAVIGATION_ITEMS.ABOUT_US.label));
    
    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith(NAVIGATION_ITEMS.ABOUT_US.path);
  });

  it('does not navigate when clicking the current active item', () => {
    renderNavigationMenu();
    
    // Click on the Home item (which is already active)
    fireEvent.click(screen.getByText(NAVIGATION_ITEMS.HOME.label));
    
    // Check that navigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders in vertical mode when specified', () => {
    const { container } = renderNavigationMenu('vertical');
    
    // Find the Menu element with mode="vertical"
    const verticalMenu = container.querySelector('.ant-menu-vertical');
    expect(verticalMenu).toBeInTheDocument();
  });
}); 