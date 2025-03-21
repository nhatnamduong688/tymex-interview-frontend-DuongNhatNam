import { useCallback, useEffect, useState, useRef } from 'react';
import { TFilterProduct } from "../../../types/product";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useProductsContext } from '../../../contexts/productsContext';
import useProducts from '../../../hooks/useProducts';
import debounce from 'lodash.debounce';
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { SortType } from "../../../enums/filter";
import { formatPrice } from "../../../helpers/common";

export const useFilterLogic = () => {
  const [form, setForm] = useState<any>(null);
  const [updateFilter, setUpdateFilter] = useState(false);
  const [currentValues, setCurrentValues] = useState<TFilterProduct>({});
  
  // Use a ref to avoid infinite loop with params
  const paramsRef = useRef<any>({});

  const { getParams, setParams, removeParams } = useQueryParams();
  const { isCollapsed } = useBreakpoint();
  const { filter, setFilter } = useProductsContext();
  
  const {
    applyFilter,
    refreshData,
    loading,
    filters: currentFilters,
  } = useProducts();

  // Only get params once at initialization and when explicitly needed
  const fetchParams = useCallback(() => {
    const urlParams = getParams([
      "keyword",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
      "categories",
    ]);
    paramsRef.current = urlParams;
    return urlParams;
  }, [getParams]);

  // Initial params load
  useEffect(() => {
    fetchParams();
  }, [fetchParams]);

  // Set the form reference
  const setFormRef = useCallback((formInstance: any) => {
    setForm(formInstance);
  }, []);

  // Convert current filters to a readable format
  const getFilterSummary = useCallback(() => {
    const summary = [];
    
    if (currentValues.keyword) {
      summary.push(`Search: "${currentValues.keyword}"`);
    }
    
    if (currentValues.priceRange?.length === 2) {
      summary.push(`Price Range: ${formatPrice(currentValues.priceRange[0])} - ${formatPrice(currentValues.priceRange[1])}`);
    }
    
    if (currentValues.tier) {
      summary.push(`Tier: ${currentValues.tier}`);
    }
    
    if (currentValues.theme) {
      summary.push(`Theme: ${currentValues.theme}`);
    }
    
    if (currentValues.sortTime) {
      summary.push(`Sort by Time: ${currentValues.sortTime === SortType.Ascending ? 'Earliest' : 'Latest'}`);
    }
    
    if (currentValues.sortPrice) {
      summary.push(`Sort by Price: ${currentValues.sortPrice === SortType.Ascending ? 'Low to High' : 'High to Low'}`);
    }
    
    if (currentValues.categories?.length) {
      summary.push(`Categories: ${currentValues.categories.join(', ')}`);
    }
    
    return summary;
  }, [currentValues]);

  // Use debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const paramValues = { search: term, keyword: term };
      applyFilter(paramValues);
      setCurrentValues(prev => ({ ...prev, keyword: term }));
    }, 500),
    [applyFilter]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  }, [debouncedSearch]);

  const onSubmit = useCallback((value: TFilterProduct) => {
    setUpdateFilter(true);
    setFilter({
      ...value,
    });
    
    // Save current form values for display
    setCurrentValues(value);
    
    // Convert values to api parameters
    const paramValues: Record<string, string | string[]> = {};
    
    // Map fields explicitly for clarity
    if (value.keyword) {
      paramValues.search = value.keyword;
      paramValues.keyword = value.keyword;
    }
    
    if (value.priceRange) {
      paramValues.priceRange = value.priceRange.map(String);
    }
    
    if (value.tier) {
      paramValues.tier = value.tier;
    }
    
    if (value.theme) {
      paramValues.theme = value.theme;
    }
    
    if (value.sortTime) {
      paramValues.sortTime = value.sortTime;
    }
    
    if (value.sortPrice) {
      paramValues.sortPrice = value.sortPrice;
    }
    
    if (isCollapsed && value.categories) {
      paramValues.categories = value.categories;
    }
    
    // Get the latest params
    const currentParams = fetchParams();
    
    // Update URL params
    setParams(
      {
        ...currentParams,
        ...paramValues
      },
      { replace: false }
    );

    // Apply filters to products
    applyFilter(paramValues);
  }, [setFilter, setParams, fetchParams, isCollapsed, applyFilter]);

  const resetFilter = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    setFilter({ categories: [] });
    setCurrentValues({});
    
    removeParams([
      "keyword",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
      ...(isCollapsed ? ["categories"] : []).flat(),
    ]);

    // Reset filters in the products hook
    applyFilter({ search: "", keyword: "" });

    // Refresh products with empty filters
    refreshData();
  }, [form, setFilter, removeParams, isCollapsed, applyFilter, refreshData]);

  // Sync URL params with form - with proper dependency tracking
  useEffect(() => {
    if (updateFilter || !form) return;
    
    const currentParams = fetchParams();
    form.setFieldsValue(currentParams);
    setCurrentValues(currentParams);
    
    // Reset update flag after a form update cycle
    return () => {
      setUpdateFilter(false);
    };
  }, [fetchParams, form, updateFilter]);

  return {
    // State
    currentValues,
    loading,
    params: paramsRef.current,
    isCollapsed,
    
    // Handlers
    handleSearchChange,
    onSubmit,
    resetFilter,
    setFormRef,
    
    // Computed values
    filterSummary: getFilterSummary(),
  };
}; 