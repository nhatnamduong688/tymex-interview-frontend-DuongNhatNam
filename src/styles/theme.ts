// src/styles/theme.ts
export const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px",
  xxxl: "1600px",
};

export const colors = {
  primaryGradient: "linear-gradient(91.47deg, #da458f -6%, #da34dd 113.05%)",
  secondary: "#89888b",
  primaryAccent: "#da34dd",
};

export const layout = {
  headerHeight: "84px",
  mobileHeaderHeight: "64px",
};

export const fonts = {
  heading: "Arial Black, Helvetica, Arial, Verdana, Tahoma, sans-serif",
  body: "Inter, Helvetica, Arial, Verdana, Tahoma, sans-serif",
};

// Mixins as template literals that can be used in styled-components
export const mixins = {
  gradientText: `
        background-image: ${colors.primaryGradient};
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
    `,
  container: `
        margin: 0 auto;
        max-width: 95%;
        
        @media (min-width: ${breakpoints.sm}) {
            max-width: 540px;
        }
        
        @media (min-width: 768px) {
            max-width: 720px;
        }
        
        @media (min-width: ${breakpoints.md}) {
            max-width: 960px;
        }
        
        @media (min-width: ${breakpoints.xl}) {
            max-width: 1140px;
        }
        
        @media (min-width: ${breakpoints.xxl}) {
            max-width: 1320px;
        }
        
        @media (min-width: ${breakpoints.xxxl}) {
            max-width: 1536px;
        }
    `,
};

// Default theme
const theme = {
  breakpoints,
  colors,
  layout,
  fonts,
  mixins,
};

export default theme;
