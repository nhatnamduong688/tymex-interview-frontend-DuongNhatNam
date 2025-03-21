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

// Helper to convert filter state to API parameters
function convertFiltersToApiParams(filters: any) {
  const apiParams: Record<string, any> = {};
  
  if (filters.search) {
    apiParams.search = filters.search;
  }
  
  if (filters.priceRange) {
    apiParams.priceRange = filters.priceRange;
  }
  
  if (filters.tier) {
    apiParams.tier = filters.tier;
  }
  
  if (filters.theme) {
    apiParams.theme = filters.theme;
  }
  
  if (filters.categories && filters.categories.length > 0) {
    apiParams.categories = filters.categories;
  }
  
  console.log('Filter params created:', apiParams);
  return apiParams;
}

// Helper to update URL params
function updateUrlParams(filters: any) {
  const url = new URL(window.location.href);
  
  // Clear existing params
  Array.from(url.searchParams.keys()).forEach(key => {
    url.searchParams.delete(key);
  });
  
  // Add new params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // Handle arrays like priceRange and categories
        if (key === 'priceRange' && value.length === 2) {
          url.searchParams.set('minPrice', String(value[0]));
          url.searchParams.set('maxPrice', String(value[1]));
        } else if (value.length > 0) {
          // For other arrays like categories
          value.forEach((item: string) => {
            url.searchParams.append(key, item);
          });
        }
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });
  
  // Update URL without refresh
  window.history.pushState({}, '', url.toString());
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
    // Add a small delay to ensure filter is applied properly
    yield delay(300);
    
    // Get current filter state
    const filterState = yield select((state: RootState) => state.filter);
    
    // Log the filter being applied
    console.log('Applying filter:', filterState.appliedFilters);
    
    // Update URL params
    updateUrlParams(filterState.appliedFilters);
    
    // Không dispatch fetchProducts trực tiếp
    // Để component tự gọi API khi appliedFilters thay đổi
    
  } catch (error) {
    console.error('Error applying filter:', error);
  }
}

// Worker saga for resetting filters
function* resetFilterSaga(): Generator<any, void, any> {
  try {
    yield delay(300);
    
    // Clear URL params
    window.history.pushState({}, '', window.location.pathname);
    
    // Chỉ reset products state, không dispatch fetchProducts
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