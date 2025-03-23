// src/styles/theme.ts
import { DefaultTheme } from "styled-components";

export const styledTheme: DefaultTheme = {
  colors: {
    primary: '#da458f',
    primaryDark: '#b93876',
    primaryLight: '#e76ba6',
    secondary: '#89888b',
    secondaryDark: '#5a595c',
    secondaryLight: '#a9a8ab',
    background: '#18161c',
    backgroundLight: '#242129',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.65)',
    error: '#ff4d4f',
    success: '#52c41a',
    warning: '#faad14',
  },
  
  gradients: {
    primaryBg: 'linear-gradient(91.47deg, #da458f -6%, #da34dd 113.05%)',
    primaryHover: 'linear-gradient(91.47deg, #c33e7f -6%, #c32fc6 113.05%)',
    sliderTrack: 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.8) -6%, rgba(218, 52, 221, 0.8) 113.05%)',
  },
  
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  typography: {
    bodyFont: '"Inter", sans-serif',
    headingFont: '"Drone Ranger Pro", helvetica, arial, verdana, tahoma, sans-serif',
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  breakpoints: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1600px',
  },
  
  layout: {
    headerHeight: '84px',
    mobileHeaderHeight: '64px',
    containerWidth: '1280px',
    sidebarWidth: '280px',
    borderRadius: '4px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  
  transitions: {
    fast: '0.15s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};

// CSS variable definitions for use in styled-components
export const cssVariables = `
  :root {
    /* Colors */
    --primary-color: ${styledTheme.colors.primary};
    --primary-dark: ${styledTheme.colors.primaryDark};
    --primary-light: ${styledTheme.colors.primaryLight};
    --secondary-color: ${styledTheme.colors.secondary};
    --background: ${styledTheme.colors.background};
    --background-light: ${styledTheme.colors.backgroundLight};
    --text: ${styledTheme.colors.text};
    --text-secondary: ${styledTheme.colors.textSecondary};
    
    /* Gradients */
    --primary-bg: ${styledTheme.gradients.primaryBg};
    --primary-hover: ${styledTheme.gradients.primaryHover};
    --slider-track: ${styledTheme.gradients.sliderTrack};
    
    /* Layout */
    --header-height: ${styledTheme.layout.headerHeight};
    --mobile-header-height: ${styledTheme.layout.mobileHeaderHeight};
    --container-width: ${styledTheme.layout.containerWidth};
    --sidebar-width: ${styledTheme.layout.sidebarWidth};
    --border-radius: ${styledTheme.layout.borderRadius};
    
    /* Typography */
    --body-font: ${styledTheme.typography.bodyFont};
    --heading-font: ${styledTheme.typography.headingFont};
    --font-size-xs: ${styledTheme.typography.fontSizes.xs};
    --font-size-sm: ${styledTheme.typography.fontSizes.sm};
    --font-size-md: ${styledTheme.typography.fontSizes.md};
    --font-size-lg: ${styledTheme.typography.fontSizes.lg};
    --font-size-xl: ${styledTheme.typography.fontSizes.xl};
    --font-size-xxl: ${styledTheme.typography.fontSizes.xxl};
    
    /* Spacing */
    --spacing-xxs: ${styledTheme.spacing.xxs};
    --spacing-xs: ${styledTheme.spacing.xs};
    --spacing-sm: ${styledTheme.spacing.sm};
    --spacing-md: ${styledTheme.spacing.md};
    --spacing-lg: ${styledTheme.spacing.lg};
    --spacing-xl: ${styledTheme.spacing.xl};
    --spacing-xxl: ${styledTheme.spacing.xxl};
  }
`;
