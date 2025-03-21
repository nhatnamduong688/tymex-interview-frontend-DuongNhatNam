import React, { useEffect, memo } from 'react';
import { Button, Form, Input, Select, Slider } from "antd";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import { ProductCategory, ProductTheme, ProductTier, SortType } from "../../../enums/filter";
import { formatPrice } from "../../../helpers/common";
import { TFilterProduct } from "../../../types/product";
import { FilterStatus } from './filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { 
  applySearchFilter, 
  applyFilter, 
  resetFilter,
  updateFormValues
} from '../../../store/slices/filterSlice';
import { RootState } from '../../../store';

interface FilterFormProps {
  isCollapsed: boolean;
}

const optionsCategory = Object.values(ProductCategory).map((item) => ({
  label: item === "" ? "All" : item,
  value: item,
}));

// Memoize the component to prevent unnecessary re-renders
export const FilterForm: React.FC<FilterFormProps> = memo(({
  isCollapsed
}) => {
  const dispatch = useDispatch();
  const { formValues, appliedFilters } = useSelector((state: RootState) => state.filter);
  const { loading } = useSelector((state: RootState) => state.products);
  
  const [form] = Form.useForm<TFilterProduct>();
  
  // Initialize form with values from Redux
  useEffect(() => {
    form.setFieldsValue({
      keyword: formValues.search,
      priceRange: formValues.priceRange,
      tier: formValues.tier,
      theme: formValues.theme,
      categories: formValues.categories
    });
  }, [formValues, form]); 

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(applySearchFilter(value));
  };

  // Handle form submission
  const handleSubmit = (values: TFilterProduct) => {
    // Transform form values to match filter state format
    const filterValues = {
      search: values.keyword,
      priceRange: values.priceRange as [number, number],
      tier: values.tier,
      theme: values.theme,
      categories: values.categories
    };
    
    dispatch(updateFormValues(filterValues));
    dispatch(applyFilter());
  };

  // Handle filter reset
  const handleReset = () => {
    form.resetFields();
    dispatch(resetFilter());
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      onFinish={handleSubmit}
    >
      <Form.Item name="keyword">
        <Input 
          placeholder="Quick search" 
          prefix={<SearchOutlined />} 
          onChange={handleSearchChange}
        />
      </Form.Item>
      
      {loading && (
        <FilterStatus>
          Applying filters...
        </FilterStatus>
      )}
      
      <Form.Item name="priceRange" label="Price">
        <Slider
          range
          max={200}
          min={0.01}
          marks={{
            0.01: formatPrice(0.01),
            200: formatPrice(200),
          }}
        />
      </Form.Item>
      
      <Form.Item name="tier" label="Tier">
        <Select
          options={[ProductTier.Basic, ProductTier.Premium].map((tier) => ({
            label: tier,
            value: tier,
          }))}
          allowClear
        />
      </Form.Item>
      
      <Form.Item name="theme" label="Theme">
        <Select
          options={[ProductTheme.Dark, ProductTheme.Light].map((theme) => ({
            label: theme,
            value: theme,
          }))}
          allowClear
        />
      </Form.Item>
      
      <Form.Item name="categories" label="Categories">
        <Select
          mode="multiple"
          options={optionsCategory}
          allowClear
        />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Apply Filters
        </Button>
        <Button onClick={handleReset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}); 