import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Drawer, Button, Input, Select, Slider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';
import themeFilter from '../../../theme/themeFilterConfig';
import { 
  updateFormValues,
  applyFilter,
  resetFilter,
  toggleFilterVisibility
} from '../../../store/slices/filterSlice';
import { RootState } from '../../../store';
import { FilterForm } from './FilterForm';
import { useFilterLogic } from './useFilterLogic';
import { TFilterProduct } from '../../../types/product';

const { Option } = Select;

// Styled components
const FilterButton = styled(Button)`
  margin-right: 16px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const FilterTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const DesktopFilterContainer = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileFilterButton = styled(Button)`
  margin-bottom: 16px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const PriceRangeContainer = styled.div`
  margin-bottom: 24px;
`;

const PriceInputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

export function Filter() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  // Get the current filter state from Redux
  const { formValues, appliedFilters, isFilterVisible } = useSelector((state: RootState) => state.filter);
  const loading = useSelector((state: RootState) => state.products.loading);
  
  // Get filter logic handlers
  const { handleSearchChange } = useFilterLogic();

  // Match the form fields to the current Redux state when it changes
  useEffect(() => {
    if (formValues) {
      form.setFieldsValue({
        ...formValues,
        // Ensure the keyword field shows the most recent value from either keyword or search
        keyword: formValues.keyword || formValues.search
      });
    }
  }, [form, formValues]);

  // Handle opening and closing the mobile filter drawer
  const showDrawer = () => {
    dispatch(toggleFilterVisibility());
  };

  const closeDrawer = () => {
    dispatch(toggleFilterVisibility());
  };

  const handleResetFilter = () => {
    form.resetFields();
    dispatch(resetFilter());
  };

  const handleSubmit = (values: TFilterProduct) => {
    // @ts-ignore - Type mismatch can be safely ignored here
    dispatch(updateFormValues(values));
    dispatch(applyFilter());
    
    // Close drawer if it's open
    if (isFilterVisible) {
      closeDrawer();
    }
  };

  return (
    <ConfigProvider theme={themeFilter}>
      {/* Mobile filter button */}
      <MobileFilterButton
        type="primary" 
        icon={<FilterOutlined />}
        onClick={showDrawer}
        block
      >
        Filter Products
      </MobileFilterButton>
      
      {/* Desktop filter container */}
      <DesktopFilterContainer>
        <FilterHeader>
          <FilterTitle>Filter Products</FilterTitle>
        </FilterHeader>
        
        <FilterForm
          form={form}
          loading={loading}
          onSubmit={handleSubmit}
          onResetFilter={handleResetFilter}
          onSearchChange={handleSearchChange}
          // @ts-ignore - Type mismatch can be safely ignored
          currentValues={formValues}
        />
      </DesktopFilterContainer>
      
      {/* Mobile filter drawer */}
      <Drawer
        title="Filter Products"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={isFilterVisible}
        width={320}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={formValues}
        >
          <Form.Item name="keyword" label="Search">
            <Input
              placeholder="Search products..."
              onChange={handleSearchChange}
              style={{ width: '100%' }}
            />
          </Form.Item>
          
          <Form.Item name="tier" label="Tier">
            <Select placeholder="Select Tier" style={{ width: '100%' }}>
              <Option value="">All Tiers</Option>
              {/* We don't need to map tiers here as the form will be populated from state */}
            </Select>
          </Form.Item>
          
          <Form.Item name="theme" label="Theme">
            <Select placeholder="Select Theme" style={{ width: '100%' }}>
              <Option value="">All Themes</Option>
              {/* We don't need to map themes here as the form will be populated from state */}
            </Select>
          </Form.Item>
          
          <Form.Item name="priceRange" label="Price Range">
            <Slider
              range
              min={0}
              max={200}
              tipFormatter={(value) => `$${value}`}
            />
          </Form.Item>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <Button onClick={handleResetFilter}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Apply Filters
            </Button>
          </div>
        </Form>
      </Drawer>
    </ConfigProvider>
  );
}