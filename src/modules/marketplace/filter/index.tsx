import React, { useEffect, useMemo, useCallback } from 'react';
import { ConfigProvider, Form, Button, Input, Select, Space, InputNumber, Slider } from "antd";
import themeFilter from "../../../theme/themeFilterConfig";
import { StyledForm } from './filter.styled';
import { FilterForm } from './FilterForm';
import { FilterSummary } from './FilterSummary';
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateFormValues, applyFilter, resetFilter, updateSearch, toggleFilterVisibility } from '../../../store/slices/filterSlice';
import debounce from 'lodash.debounce';
import { formatPrice } from '../../../helpers/common';
import { useForm, Controller } from 'react-hook-form';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Option } = Select;

const FilterContainer = styled.div`
  min-width: 220px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-right: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const FilterGroup = styled.div`
  margin-bottom: 24px;
`;

const FilterLabel = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const PriceInputsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const PriceInput = styled(InputNumber)`
  width: 100%;
`;

const PriceDivider = styled.span`
  margin: 0 8px;
`;

const FilterButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

type FilterFormValues = {
  search: string;
  tier: string;
  theme: string;
  priceRange: [number, number];
  minPrice: number | null;
  maxPrice: number | null;
};

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const { formValues, appliedFilters, isFilterVisible, tiers, themes } = useSelector((state: RootState) => state.filter);
  const { loading } = useSelector((state: RootState) => state.products);
  const [form] = Form.useForm();
  const { isCollapsed } = useBreakpoint();
  
  const { control, handleSubmit, setValue, reset, watch } = useForm<FilterFormValues>({
    defaultValues: {
      search: '',
      tier: 'all',
      theme: 'all',
      priceRange: [0, 100],
      minPrice: null,
      maxPrice: null
    }
  });
  
  // Debug values
  console.log('Filter component - formValues:', formValues);
  console.log('Filter component - appliedFilters:', appliedFilters);
  
  // Initialize form values from Redux state
  useEffect(() => {
    if (formValues) {
      setValue('search', formValues.search || '');
      setValue('tier', formValues.tier || 'all');
      setValue('theme', formValues.theme || 'all');
      setValue('priceRange', formValues.priceRange || [0, 100]);
      setValue('minPrice', formValues.minPrice || null);
      setValue('maxPrice', formValues.maxPrice || null);
    }
  }, [formValues, setValue]);
  
  // Watch form values for search input
  const searchValue = watch('search');
  
  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    dispatch(updateSearch(value));
  }, 500);
  
  // Handle search input changes
  useEffect(() => {
    if (searchValue !== undefined) {
      debouncedSearch(searchValue);
    }
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);
  
  // Handle price range change from slider
  const handlePriceRangeChange = (value: [number, number]) => {
    setValue('priceRange', value);
    setValue('minPrice', value[0]);
    setValue('maxPrice', value[1]);
  };
  
  // Handle min/max price input change
  const handleMinPriceChange = (value: number | null) => {
    if (value !== null) {
      const currentRange = watch('priceRange');
      setValue('priceRange', [value, currentRange[1]]);
      setValue('minPrice', value);
    }
  };
  
  const handleMaxPriceChange = (value: number | null) => {
    if (value !== null) {
      const currentRange = watch('priceRange');
      setValue('priceRange', [currentRange[0], value]);
      setValue('maxPrice', value);
    }
  };
  
  // Handle form submission
  const onSubmit = (data: FilterFormValues) => {
    // Update form values in Redux
    dispatch(updateFormValues(data));
    
    // Apply filters
    dispatch(applyFilter());
  };
  
  // Handle filter reset
  const handleResetFilter = () => {
    reset({
      search: '',
      tier: 'all',
      theme: 'all',
      priceRange: [0, 100],
      minPrice: null,
      maxPrice: null
    });
    
    dispatch(resetFilter());
  };
  
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
        <FilterContainer>
          <FilterTitle>Filter</FilterTitle>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchContainer>
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Search products..."
                    prefix={<SearchOutlined />}
                    suffix={
                      field.value ? (
                        <CloseOutlined
                          onClick={() => {
                            setValue('search', '');
                            dispatch(updateSearch(''));
                          }}
                        />
                      ) : null
                    }
                  />
                )}
              />
            </SearchContainer>
            
            <FilterGroup>
              <FilterLabel>Tier</FilterLabel>
              <Controller
                name="tier"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    placeholder="Select tier"
                  >
                    <Option value="all">All</Option>
                    {tiers.map((tier) => (
                      <Option key={tier} value={tier}>
                        {tier}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Theme</FilterLabel>
              <Controller
                name="theme"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    placeholder="Select theme"
                  >
                    <Option value="all">All</Option>
                    {themes.map((theme) => (
                      <Option key={theme} value={theme}>
                        {theme}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>Price Range</FilterLabel>
              <Controller
                name="priceRange"
                control={control}
                render={({ field }) => (
                  <Slider
                    range
                    value={field.value}
                    onChange={handlePriceRangeChange}
                    min={0}
                    max={100}
                  />
                )}
              />
              
              <PriceInputsContainer>
                <Controller
                  name="minPrice"
                  control={control}
                  render={({ field }) => (
                    <PriceInput
                      min={0}
                      max={100}
                      value={field.value}
                      onChange={handleMinPriceChange}
                      placeholder="Min"
                    />
                  )}
                />
                
                <PriceDivider>-</PriceDivider>
                
                <Controller
                  name="maxPrice"
                  control={control}
                  render={({ field }) => (
                    <PriceInput
                      min={0}
                      max={100}
                      value={field.value}
                      onChange={handleMaxPriceChange}
                      placeholder="Max"
                    />
                  )}
                />
              </PriceInputsContainer>
            </FilterGroup>
            
            <FilterButtonGroup>
              <Button onClick={handleResetFilter}>Reset</Button>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </FilterButtonGroup>
          </form>
        </FilterContainer>
      )}
    </ConfigProvider>
  );
}; 