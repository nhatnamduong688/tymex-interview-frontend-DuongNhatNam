import { css } from 'styled-components';
import theme from './theme';

// GradientText mixin as a styled-component function
export const gradientText = css`
  ${theme.mixins.gradientText}
`;

// Container mixin as a styled-component function
export const container = css`
  ${theme.mixins.container}
`;

// Media query helpers
export const media = {
  sm: (styles: string) => css`
    @media (max-width: ${theme.breakpoints.sm}) {
      ${styles}
    }
  `,
  md: (styles: string) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      ${styles}
    }
  `,
  lg: (styles: string) => css`
    @media (max-width: ${theme.breakpoints.lg}) {
      ${styles}
    }
  `,
  xl: (styles: string) => css`
    @media (max-width: ${theme.breakpoints.xl}) {
      ${styles}
    }
  `,
  xxl: (styles: string) => css`
    @media (max-width: ${theme.breakpoints.xxl}) {
      ${styles}
    }
  `
}; 