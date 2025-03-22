import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useBreakpoint } from './useBreakpoint';
import { useProducts } from './useProducts';
import { useQueryParams } from './useQueryParams';

// Export all hooks from this barrel file
export {
  useAppDispatch,
  useAppSelector,
  useBreakpoint,
  useProducts,
  /**
   * @deprecated This hook is being phased out in favor of Redux-first URL handling.
   * Please use Redux actions directly (updateCategory, updateSearch, etc).
   * The URL will be automatically synchronized via the urlSyncMiddleware.
   */
  useQueryParams
}; 