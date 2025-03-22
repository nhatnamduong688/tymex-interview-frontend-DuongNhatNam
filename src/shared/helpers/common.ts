/**
 * Format a price number to Ethereum price format
 * @param price The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return price.toFixed(2);
}; 