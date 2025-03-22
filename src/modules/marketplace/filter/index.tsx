import React, { useEffect, useMemo, useCallback } from 'react';
import { ConfigProvider, Form } from "antd";
import themeFilter from "../../../theme/themeFilterConfig";
import { StyledForm } from './filter.styled';
import { FilterForm } from './FilterForm';
import { FilterSummary } from './FilterSummary';
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateFormValues, applyFilter, resetFilter, applySearchFilter, toggleFilterVisibility } from '../../../store/slices/filterSlice';
import { useQueryParams } from '../../../hooks/useQueryParams';
import debounce from 'lodash.debounce';
import { formatPrice } from '../../../helpers/common';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const { formValues, appliedFilters, isFilterVisible } = useSelector((state: RootState) => state.filter);
  const { loading } = useSelector((state: RootState) => state.products);
  const [form] = Form.useForm();
  const { getParams, setParams, removeParams } = useQueryParams();
  const { isCollapsed } = useBreakpoint();
  
  // Debug values
  console.log('Filter component - formValues:', formValues);
  console.log('Filter component - appliedFilters:', appliedFilters);
  
  // Khởi tạo form từ URL params
  useEffect(() => {
    const urlParams = getParams();
    console.log('Filter component - URL params:', urlParams);
    
    if (Object.keys(urlParams).length > 0) {
      // Đảm bảo minPrice và maxPrice được chuyển đúng thành priceRange
      const formData: any = { ...urlParams };
      
      // Nếu có minPrice/maxPrice, tạo priceRange cho form
      if (urlParams.minPrice || urlParams.maxPrice) {
        const minPrice = parseFloat(urlParams.minPrice as string) || 0;
        const maxPrice = parseFloat(urlParams.maxPrice as string) || 200;
        formData.priceRange = [minPrice, maxPrice];
      }
      
      // Đảm bảo search được chuyển thành keyword cho form
      if (urlParams.search) {
        formData.keyword = urlParams.search;
      }
      
      console.log('Setting form fields:', formData);
      form.setFieldsValue(formData);
    }
  }, [getParams, form]);
  
  // Xử lý tìm kiếm với debounce
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      dispatch(applySearchFilter(value));
      // Cập nhật URL params - use replace: true to avoid creating new history entries
      if (value) {
        setParams({ search: value, keyword: value }, { replace: true });
      } else {
        removeParams(["search", "keyword"]);
      }
    }, 500),
    [dispatch, setParams, removeParams]
  );
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);
  
  // Xử lý submit form
  const onSubmit = useCallback((values: any) => {
    console.log('Form submitted with values:', values);
    
    // Nếu có priceRange, thêm minPrice/maxPrice
    if (values.priceRange && Array.isArray(values.priceRange) && values.priceRange.length === 2) {
      values.minPrice = values.priceRange[0];
      values.maxPrice = values.priceRange[1];
    }
    
    // Cập nhật form values trong Redux
    dispatch(updateFormValues(values));
    // Áp dụng filter
    dispatch(applyFilter());
    
    // Không cần gọi setParams ở đây vì saga sẽ cập nhật URL
    // Việc gọi đồng thời cả hai có thể gây conflict
  }, [dispatch]);
  
  // Reset filter
  const handleResetFilter = useCallback(() => {
    form.resetFields();
    dispatch(resetFilter());
    
    // Xóa params khỏi URL
    removeParams([
      "keyword",
      "search",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
      "categories",
      "minPrice",
      "maxPrice"
    ]);
  }, [form, dispatch, removeParams]);
  
  // Chuyển đổi hiển thị filter
  const handleToggleFilter = useCallback(() => {
    dispatch(toggleFilterVisibility());
  }, [dispatch]);
  
  // Tạo tóm tắt filter để hiển thị
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
    
    if (appliedFilters.categories?.length) {
      summary.push(`Categories: ${appliedFilters.categories.join(', ')}`);
    }
    
    return summary;
  }, [appliedFilters]);
  
  return (
    <ConfigProvider theme={themeFilter}>
      {isCollapsed ? (
        <FilterSummary 
          filterSummary={getFilterSummary()}
          onToggleFilter={handleToggleFilter}
          isFilterVisible={isFilterVisible}
        />
      ) : (
        <StyledForm>
          <FilterForm
            form={form}
            loading={loading}
            onSubmit={onSubmit}
            onResetFilter={handleResetFilter}
            onSearchChange={handleSearchChange}
            currentValues={formValues as any}
          />
        </StyledForm>
      )}
    </ConfigProvider>
  );
}; 