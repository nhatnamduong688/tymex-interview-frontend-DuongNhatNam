import { ProductCategory, ProductTheme, ProductTier, SortType } from '../enums/filter';

/**
 * Safely converts a string to a ProductCategory enum value
 * @param value String value to convert
 * @returns The corresponding enum value or the original string if not found
 */
export const stringToCategory = (value: string): ProductCategory | string => {
  // Check if value exists in enum
  const enumValue = Object.values(ProductCategory).find(v => v === value);
  return enumValue !== undefined ? enumValue : value;
};

/**
 * Safely converts a string to a ProductTheme enum value
 * @param value String value to convert
 * @returns The corresponding enum value or the original string if not found
 */
export const stringToTheme = (value: string): ProductTheme | string => {
  // Check if value exists in enum
  const enumValue = Object.values(ProductTheme).find(v => v === value);
  return enumValue !== undefined ? enumValue : value;
};

/**
 * Safely converts a string to a ProductTier enum value
 * @param value String value to convert
 * @returns The corresponding enum value or the original string if not found
 */
export const stringToTier = (value: string): ProductTier | string => {
  // Check if value exists in enum
  const enumValue = Object.values(ProductTier).find(v => v === value);
  return enumValue !== undefined ? enumValue : value;
};

/**
 * Safely converts a string to a SortType enum value
 * @param value String value to convert
 * @returns The corresponding enum value or the original string if not found
 */
export const stringToSortType = (value: string): SortType | string => {
  // Check if value exists in enum
  const enumValue = Object.values(SortType).find(v => v === value);
  return enumValue !== undefined ? enumValue : value;
};

/**
 * Converts an array of strings to an array of ProductCategory enum values
 * @param values Array of string values to convert
 * @returns Array of corresponding enum values or original strings if not found
 */
export const stringArrayToCategories = (values: string[]): (ProductCategory | string)[] => {
  return values.map(value => stringToCategory(value));
};

/**
 * Gets the string value from any enum type
 * @param enumValue The enum value
 * @returns The string representation of the enum value
 */
export const enumToString = <T>(enumValue: T): string => {
  return String(enumValue);
};

/**
 * Check if a value exists in a specific enum
 * @param enumObj The enum object to check against
 * @param value The value to check
 * @returns Boolean indicating if the value exists in the enum
 */
export const isInEnum = <T extends object>(enumObj: T, value: string): boolean => {
  return Object.values(enumObj).includes(value as unknown as T[keyof T]);
}; 