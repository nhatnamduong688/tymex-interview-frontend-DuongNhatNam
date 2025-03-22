import { useCallback, useEffect, useState } from 'react';
import { TFilterProduct } from '../../types/product';
import { useForm } from 'antd/es/form/Form';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateFormValues, 
  applyFilter, 
  resetFilter, 
  updateSearch 
} from '../../store/filterSlice';
import { useBreakpoint } from '../../../../shared/hooks/useBreakpoint';
import { SortType } from '../../enums/filter';
import { formatPrice } from '../../../../shared/helpers/common';
import debounce from 'lodash.debounce';

/**
 * @deprecated This hook is deprecated in favor of direct Redux usage in components.
 * Please use Redux actions directly for better performance.
 */
export const useFilterLogic = () => {
  console.warn(
    'useFilterLogic is deprecated. Consider using Redux actions and selectors directly.'
  );
  
  const [form, setForm] = useState<any>(null);
  
  const dispatch = useDispatch();
  const { isCollapsed } = useBreakpoint();
  
  // Get values from Redux store
  const { formValues, appliedFilters } = useSelector((state: RootState) => state.filter);
  const { loading } = useSelector((state: RootState) => state.products);
  
  // Set the form reference
  const setFormRef = useCallback((formInstance: any) => {
    setForm(formInstance);
  }, []);

  // Convert current filters to a readable format
  const getFilterSummary = useCallback(() => {
    const summary = [];
    
    if (appliedFilters.search) {
      summary.push(`Search: "${appliedFilters.search}"`);
    }
    
    if (appliedFilters.priceRange?.length === 2) {
      summary.push(`Price Range: ${formatPrice(appliedFilters.priceRange[0])} - ${formatPrice(appliedFilters.priceRange[1])}`);
    } else if (appliedFilters.minPrice || appliedFilters.maxPrice) {
      const minPrice = parseFloat(appliedFilters.minPrice as string) || 0;
      const maxPrice = parseFloat(appliedFilters.maxPrice as string) || 200;
      summary.push(`Price Range: ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`);
    }
    
    if (appliedFilters.tier) {
      summary.push(`Tier: ${appliedFilters.tier}`);
    }
    
    if (appliedFilters.theme) {
      summary.push(`Theme: ${appliedFilters.theme}`);
    }
    
    if (appliedFilters.sortTime) {
      summary.push(`Sort by Time: ${appliedFilters.sortTime === SortType.Ascending ? 'Earliest' : 'Latest'}`);
    }
    
    if (appliedFilters.sortPrice) {
      summary.push(`Sort by Price: ${appliedFilters.sortPrice === SortType.Ascending ? 'Low to High' : 'High to Low'}`);
    }
    
    if (appliedFilters.categories?.length) {
      summary.push(`Categories: ${Array.isArray(appliedFilters.categories) 
        ? appliedFilters.categories.join(', ') 
        : appliedFilters.categories}`);
    }
    
    return summary;
  }, [appliedFilters]);

  // Use debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(updateSearch(term));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  }, [debouncedSearch]);

  const onSubmit = useCallback((values: TFilterProduct) => {
    // Đảm bảo cả search và keyword đều được gửi đi
    if (values.keyword) {
      values.search = values.keyword;
    }
    
    // Convert priceRange to minPrice/maxPrice if needed
    if (values.priceRange && Array.isArray(values.priceRange) && values.priceRange.length === 2) {
      values.minPrice = String(values.priceRange[0]);
      values.maxPrice = String(values.priceRange[1]);
    }
    
    // Update form values in Redux
    dispatch(updateFormValues(values));
    
    // Apply filter
    dispatch(applyFilter());
  }, [dispatch]);

  const resetFilterHandler = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    
    // Reset Redux filter state
    dispatch(resetFilter());
  }, [form, dispatch]);

  // Sync Redux state with form
  useEffect(() => {
    if (!form) return;
    
    const formData: any = { ...formValues };
    
    // Nếu có minPrice/maxPrice, tạo priceRange cho form
    if (formValues.minPrice || formValues.maxPrice) {
      const minPrice = parseFloat(formValues.minPrice as string) || 0;
      const maxPrice = parseFloat(formValues.maxPrice as string) || 200;
      formData.priceRange = [minPrice, maxPrice];
    }
    
    // Đảm bảo search được chuyển thành keyword cho form
    if (formValues.search) {
      formData.keyword = formValues.search;
    }
    
    form.setFieldsValue(formData);
  }, [formValues, form]);

  return {
    // State
    currentValues: formValues,
    loading,
    isCollapsed,
    tiers: [],
    themes: [],
    
    // Handlers
    handleSearchChange,
    onSubmit,
    resetFilter: resetFilterHandler,
    setFormRef,
    handlePriceRangeChange: () => {},
    handleMinPriceChange: () => {},
    handleMaxPriceChange: () => {},
    handleFilterSubmit: onSubmit,
    
    // Computed values
    filterSummary: getFilterSummary(),
  };
}; 