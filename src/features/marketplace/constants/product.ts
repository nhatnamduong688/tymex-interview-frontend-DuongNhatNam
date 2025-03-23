import { ProductCategory, ProductTheme, ProductTier } from '../enums/filter';

// Re-export the ProductCategory enum for convenience
export { ProductCategory };

// Options for tier dropdown
export const TierOptions = [
  { value: ProductTier.Basic, label: 'Basic' },
  { value: ProductTier.Premium, label: 'Premium' },
  { value: ProductTier.Deluxe, label: 'Deluxe' },
];

// Options for theme dropdown
export const ThemeOptions = [
  { value: ProductTheme.Light, label: 'Light' },
  { value: ProductTheme.Dark, label: 'Dark' },
  { value: ProductTheme.Colorful, label: 'Colorful' },
  { value: ProductTheme.Halloween, label: 'Halloween' },
];

// Price range constants
export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 200; 