import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      secondary: string;
      secondaryDark: string;
      secondaryLight: string;
      background: string;
      backgroundLight: string;
      text: string;
      textSecondary: string;
      error: string;
      success: string;
      warning: string;
    };
    
    gradients: {
      primaryBg: string;
      primaryHover: string;
      sliderTrack: string;
    };
    
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    
    typography: {
      bodyFont: string;
      headingFont: string;
      fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      fontWeights: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    
    layout: {
      headerHeight: string;
      mobileHeaderHeight: string;
      containerWidth: string;
      sidebarWidth: string;
      borderRadius: string;
    };
    
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    
    transitions: {
      fast: string;
      medium: string;
      slow: string;
    };
  }
} 