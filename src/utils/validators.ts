/**
 * Validation utilities for form inputs and data validation
 */

/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns Whether the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a password meets minimum requirements
 * @param password - The password to validate
 * @param minLength - Minimum required length (default: 8)
 * @param requireSpecialChar - Whether to require special characters (default: true)
 * @returns Whether the password meets requirements
 */
export const isValidPassword = (
  password: string,
  minLength: number = 8,
  requireSpecialChar: boolean = true
): boolean => {
  if (password.length < minLength) return false;
  
  if (requireSpecialChar) {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharRegex.test(password)) return false;
  }
  
  return true;
};

/**
 * Validates if a string is empty or only contains whitespace
 * @param value - The string to check
 * @returns Whether the string is empty or only whitespace
 */
export const isEmpty = (value: string): boolean => {
  return value.trim() === '';
};

/**
 * Validates if a value is within a specified range
 * @param value - The number to validate
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns Whether the value is within range
 */
export const isInRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};

/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns Whether the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
