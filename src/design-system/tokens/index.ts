export * from './colors';
export * from './typography';
export * from './spacing';

// Combine all tokens into a single theme object
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  ...typography,
  spacing,
}; 