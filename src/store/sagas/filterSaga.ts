import { takeLatest, put, select, call, debounce, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  applyFilter, 
  applySearchFilter,
  resetFilter,
  updateFormValues
} from '../slices/filterSlice';
import { 
  resetProducts
} from '../slices/productsSlice';
import { api } from '../../services/api';
import { TFilterProduct } from '../../types/product';
import { RootState } from '../index';

// Helper to convert filter state to API params for products API
function convertFiltersToApiParams(filters: any) {
  const apiParams: Record<string, any> = {};
  
  console.log('Converting filters to API params:', filters);
  
  // Search/keyword filter (sử dụng cả search và keyword)
  if (filters.search) {
    apiParams.search = filters.search;
  } else if (filters.keyword) {
    apiParams.search = filters.keyword;
  }
  
  // Handle price filtering
  // Ưu tiên sử dụng minPrice/maxPrice trực tiếp
  if (filters.minPrice !== undefined) {
    apiParams.minPrice = filters.minPrice;
  }
  
  if (filters.maxPrice !== undefined) {
    apiParams.maxPrice = filters.maxPrice;
  }
  // Nếu không có minPrice/maxPrice, sử dụng priceRange nếu có
  else if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
    apiParams.minPrice = filters.priceRange[0];
    apiParams.maxPrice = filters.priceRange[1];
  }
  
  // Product attributes
  if (filters.tier) {
    apiParams.tier = filters.tier;
  }
  
  if (filters.theme) {
    apiParams.theme = filters.theme;
  }
  
  // Categories
  if (filters.categories && filters.categories.length > 0) {
    apiParams.categories = filters.categories;
  }
  
  // Sorting
  if (filters.sortTime) {
    apiParams.sortTime = filters.sortTime;
  }
  
  if (filters.sortPrice) {
    apiParams.sortPrice = filters.sortPrice;
  }
  
  // Pagination
  if (filters._page) {
    apiParams._page = filters._page;
  }
  
  if (filters._limit) {
    apiParams._limit = filters._limit;
  }
  
  console.log('Filter params created:', apiParams);
  return apiParams;
}

// Helper to update URL params
function updateUrlParams(filters: any) {
  const url = new URL(window.location.href);
  
  console.log('Updating URL params with filters:', filters);
  
  // Clear existing params
  Array.from(url.searchParams.keys()).forEach(key => {
    url.searchParams.delete(key);
  });
  
  // Add new params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // Handle arrays - priceRange và categories
        if (key === 'priceRange' && value.length === 2) {
          // Đối với priceRange, chuyển thành minPrice và maxPrice cho URL
          url.searchParams.set('minPrice', String(value[0]));
          url.searchParams.set('maxPrice', String(value[1]));
          console.log('Added price range to URL:', value[0], value[1]);
        } else if (key === 'categories' && value.length > 0) {
          // Đối với categories, sử dụng dấu phẩy để ngăn cách trong URL thay vì append nhiều lần
          url.searchParams.set(key, value.join(','));
          console.log('Added categories to URL:', value);
        } else if (value.length > 0) {
          // Đối với các array khác, nối bằng dấu phẩy
          url.searchParams.set(key, value.join(','));
          console.log('Added array param to URL:', key, value.join(','));
        }
      } else {
        // Đối với các giá trị thông thường
        url.searchParams.set(key, String(value));
        console.log('Added param to URL:', key, value);
      }
    }
  });
  
  // Đảm bảo không thêm các params không cần thiết
  const paramsToExclude = ['priceRange', 'isFilterVisible', '_page', '_limit'];
  paramsToExclude.forEach(param => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      console.log('Removed unnecessary param from URL:', param);
    }
  });
  
  // Use replaceState instead of pushState to avoid creating new history entries
  window.history.replaceState({}, '', url.toString());
  console.log('URL updated:', url.toString());
}

// Worker saga to handle search input changes with debounce
function* handleSearchChangeSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    // Add a small delay to ensure each new keystroke is processed separately
    yield delay(300);
    
    // Log action
    console.log('Setting search keyword:', action.payload);
    
    // Không dispatch fetchProducts trực tiếp (vì là thunk action)
    // Thay vào đó, cập nhật URL và để component tự refresh
    const filterState = yield select((state: RootState) => state.filter);
    updateUrlParams(filterState.appliedFilters);
    
  } catch (error) {
    console.error('Error in search:', error);
  }
}

// Worker saga to apply filter and update URL
function* applyFilterSaga(): Generator<any, void, any> {
  try {
    // Get current filter state
    const filterState = yield select((state: RootState) => state.filter);
    
    // Log the filter being applied
    console.log('Applying filter:', filterState.appliedFilters);
    
    // Note: URL params are now managed by urlSyncMiddleware
    // We just update URL based on the filter state here without worrying about reading URL
    updateUrlParams(filterState.appliedFilters);
  } catch (error) {
    console.error('Error applying filter:', error);
  }
}

// Worker saga for resetting filters
function* resetFilterSaga(): Generator<any, void, any> {
  try {
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
    
    // Reset products state
    yield put(resetProducts());
  } catch (error) {
    console.error('Error resetting filters:', error);
  }
}

// Root filter saga
export function* filterSaga(): Generator<any, void, any> {
  // When filters are applied, trigger applyFilterSaga
  yield takeLatest(applyFilter.type, applyFilterSaga);
  
  // When search filter changes with debounce
  yield debounce(2000, applySearchFilter.type, handleSearchChangeSaga);
  
  // When filters are reset
  yield takeLatest(resetFilter.type, resetFilterSaga);
} 