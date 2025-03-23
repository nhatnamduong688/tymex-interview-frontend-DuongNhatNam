import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ConfigProvider, Form, Input, Select, Slider, Drawer, Button } from 'antd';
import { CloseCircleFilled, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import themeFilter from '../../../shared/theme/themeFilterConfig';
import { 
  updateFormValues,
  applyFilter,
  resetFilter,
  toggleFilterVisibility
} from '../../../store/slices/filterSlice';
import { RootState } from '../../../store';
import { TFilterProduct } from '../../../types/product';
import { SortType } from '../../../enums/filter';
import { useFilterLogic } from './useFilterLogic';
import { formatPrice } from '../../../helpers/common';

// Important: Order of imports matters for CSS!
// 1. First import CSS variables
import './scss/variables.css';
// 2. Then import module styles
import styles from './scss/Filter.module.scss';

const { Option } = Select;

// Define options for tier, theme, and other selects
const tierOptions = ['Basic', 'Premium'].map(tier => ({
  label: tier,
  value: tier,
}));

const themeOptions = ['Dark', 'Light'].map(theme => ({
  label: theme,
  value: theme,
}));

const sortTimeOptions = [
  { label: 'Latest', value: SortType.Descending },
  { label: 'Earliest', value: SortType.Ascending }
];

const sortPriceOptions = [
  { label: 'Low to high', value: SortType.Ascending },
  { label: 'High to low', value: SortType.Descending }
];

export function Filter() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [updateFilter, setUpdateFilter] = useState(false);
  
  // Get the current filter state from Redux
  const { formValues, appliedFilters, isFilterVisible } = useSelector((state: RootState) => state.filter);
  const loading = useSelector((state: RootState) => state.products.loading);
  
  // Get filter logic handlers
  const { handleSearchChange } = useFilterLogic();

  // Reset the form when component mounts
  useEffect(() => {
    // Apply initial values to form
    form.resetFields();
  }, []);

  // Match the form fields to the current Redux state when it changes
  useEffect(() => {
    if (!updateFilter && formValues) {
      form.setFieldsValue({
        ...formValues,
        keyword: formValues.keyword || formValues.search,
        priceRange: formValues.priceRange || [0.01, 200] // Ensure default values
      });
    }
  }, [form, formValues, updateFilter]);

  // Handle opening and closing the mobile filter drawer
  const showDrawer = () => {
    dispatch(toggleFilterVisibility());
  };

  const closeDrawer = () => {
    dispatch(toggleFilterVisibility());
  };

  const handleResetFilter = () => {
    form.resetFields();
    setUpdateFilter(true);
    dispatch(resetFilter());
  };

  const handleSubmit = (values: TFilterProduct) => {
    // Ensure search and keyword both have values
    if (values.keyword) {
      values.search = values.keyword;
    }
    
    // Ensure price range is properly set
    if (values.priceRange && Array.isArray(values.priceRange) && values.priceRange.length === 2) {
      values.minPrice = String(values.priceRange[0]);
      values.maxPrice = String(values.priceRange[1]);
    }

    // Create a copy of values to avoid reference issues
    const processedValues = {...values};
    
    setUpdateFilter(true);
    dispatch(updateFormValues(processedValues));
    dispatch(applyFilter());
    
    // Close drawer if it's open
    if (isFilterVisible) {
      closeDrawer();
    }
  };

  // Properly initialize the form values, especially for the slider
  const initialValues = {
    ...formValues,
    keyword: formValues?.keyword || formValues?.search || '',
    priceRange: formValues?.priceRange || [0.01, 200]
  };

  return (
    <>
      {/* Mobile filter button */}
      <Button
        className={styles.mobileFilterButton}
        type="primary" 
        icon={<FilterOutlined />}
        onClick={showDrawer}
        block
      >
        Filter Products
      </Button>
      
      {/* Desktop filter container */}
      <div className={styles.desktopFilterContainer}>
        <ConfigProvider theme={themeFilter}>
          <Form
            className={styles['container-filter']}
            form={form}
            labelCol={{ span: 24 }}
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <Form.Item name="keyword">
              <Input 
                placeholder="Quick search" 
                prefix={<SearchOutlined />} 
                onChange={handleSearchChange}
              />
            </Form.Item>
            
            <Form.Item name="priceRange" label="Price">
              <Slider
                range
                min={0.01}
                max={200}
                marks={{
                  0.01: formatPrice(0.01),
                  200: formatPrice(200),
                }}
              />
            </Form.Item>
            
            <Form.Item name="tier" label="Tier">
              <Select
                options={tierOptions}
                allowClear
                placeholder="Select tier"
              />
            </Form.Item>
            
            <Form.Item name="theme" label="Theme">
              <Select
                options={themeOptions}
                allowClear
                placeholder="Select theme"
              />
            </Form.Item>
            
            <Form.Item name="sortTime" label="Time">
              <Select
                options={sortTimeOptions}
                allowClear
                placeholder="Sort by time"
              />
            </Form.Item>
            
            <Form.Item name="sortPrice" label="Price">
              <Select
                options={sortPriceOptions}
                allowClear
                placeholder="Sort by price"
              />
            </Form.Item>
            
            <div className="action-buttons">
              <Button
                type="text"
                icon={<CloseCircleFilled />}
                onClick={handleResetFilter}
              >
                Reset filter
              </Button>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
      
      {/* Mobile filter drawer */}
      <Drawer
        title="Filter Products"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={isFilterVisible}
        width={320}
        styles={{
          body: {
            padding: 0,
            backgroundColor: 'var(--bg-dark)'
          },
          header: {
            backgroundColor: 'var(--bg-dark)',
            color: 'var(--text-color)',
            borderBottom: '1px solid var(--border-color)'
          }
        }}
      >
        <ConfigProvider theme={themeFilter}>
          <Form
            className={styles['container-filter']}
            form={form}
            labelCol={{ span: 24 }}
            onFinish={handleSubmit}
            initialValues={initialValues}
          >
            <Form.Item name="keyword">
              <Input 
                placeholder="Quick search" 
                prefix={<SearchOutlined />} 
                onChange={handleSearchChange}
              />
            </Form.Item>
            
            <Form.Item name="priceRange" label="Price">
              <Slider
                range
                min={0.01}
                max={200}
                marks={{
                  0.01: formatPrice(0.01),
                  200: formatPrice(200),
                }}
              />
            </Form.Item>
            
            <Form.Item name="tier" label="Tier">
              <Select
                options={tierOptions}
                allowClear
                placeholder="Select tier"
              />
            </Form.Item>
            
            <Form.Item name="theme" label="Theme">
              <Select
                options={themeOptions}
                allowClear
                placeholder="Select theme"
              />
            </Form.Item>
            
            <Form.Item name="sortTime" label="Time">
              <Select
                options={sortTimeOptions}
                allowClear
                placeholder="Sort by time"
              />
            </Form.Item>
            
            <Form.Item name="sortPrice" label="Price">
              <Select
                options={sortPriceOptions}
                allowClear
                placeholder="Sort by price"
              />
            </Form.Item>
            
            <div className="action-buttons">
              <Button
                type="text"
                icon={<CloseCircleFilled />}
                onClick={handleResetFilter}
              >
                Reset filter
              </Button>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </Drawer>
    </>
  );
}