import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Slider, Spin } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { SortType } from '../../enums/filter';
import { TFilterProduct } from '../../types/product';
import { api } from '../../services/api';
import { ethSliderStyles } from '../../../../styles/sliderStyles';

// Important: Order of imports matters for CSS!
// 1. First import CSS variables
import './scss/variables.css';
// 2. Then import module styles
import styles from './scss/FilterForm.module.scss';

const { Option } = Select;

const sortTimeOptions = [
  <Option key="asc" value={SortType.Ascending}>Oldest First</Option>,
  <Option key="desc" value={SortType.Descending}>Newest First</Option>
];

const sortPriceOptions = [
  <Option key="asc" value={SortType.Ascending}>Low to High</Option>, 
  <Option key="desc" value={SortType.Descending}>High to Low</Option>
];

interface FilterFormProps {
  form: any;
  loading: boolean;
  onSubmit: (values: TFilterProduct) => void;
  onResetFilter: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentValues: TFilterProduct;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  form,
  loading,
  onSubmit,
  onResetFilter,
  onSearchChange,
  currentValues
}) => {
  const [tiers, setTiers] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);

  // Fetch tiers and themes from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setIsLoadingFilters(true);
      try {
        // Fetch products to extract unique tiers and themes
        const response = await api.getProducts();
        
        // Extract unique tiers
        const uniqueTiers = Array.from(new Set(
          response.data.map((product: any) => product.tier).filter(Boolean)
        )) as string[];
        
        // Extract unique themes
        const uniqueThemes = Array.from(new Set(
          response.data.map((product: any) => product.theme).filter(Boolean)
        )) as string[];
        
        setTiers(uniqueTiers);
        setThemes(uniqueThemes);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setIsLoadingFilters(false);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Generate tier options from API data
  const tierOptions = tiers.map(tier => (
    <Option key={tier} value={tier}>{tier}</Option>
  ));

  // Generate theme options from API data
  const themeOptions = themes.map(theme => (
    <Option key={theme} value={theme}>{theme}</Option>
  ));

  const handlePriceRangeChange = (newRange: [number, number]) => {
    form.setFieldsValue({ priceRange: newRange });
  };

  const handleFinish = (values: TFilterProduct) => {
    // Đảm bảo cả search và keyword đều được gửi đi
    if (values.keyword) {
      values.search = values.keyword;
    }
    
    // Đảm bảo có giá tiền min/max nếu có priceRange
    if (values.priceRange && Array.isArray(values.priceRange) && values.priceRange.length === 2) {
      values.minPrice = String(values.priceRange[0]);
      values.maxPrice = String(values.priceRange[1]);
    }
    
    onSubmit(values);
  };
  
  // Tạo marks cho slider
  const sliderMarks = {
    0.01: '0,01 ETH',
    200: '200 ETH',
  };
  
  // Update form when currentValues changes from Redux
  useEffect(() => {
    form.setFieldsValue({
      ...currentValues,
      // Đảm bảo keyword được hiển thị từ cả search hoặc keyword
      keyword: currentValues.keyword || currentValues.search,
      // Đảm bảo các giá trị khác được cập nhật đúng
      priceRange: currentValues.priceRange || [0.01, 200],
      sortTime: currentValues.sortTime || '',
      sortPrice: currentValues.sortPrice || ''
    });
  }, [currentValues, form]);
  
  return (
    <div className={styles.containerFilter}>
      <Form
        className={styles.styledForm}
        form={form}
        name="filter_form"
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          ...currentValues,
          keyword: currentValues.keyword || currentValues.search,
          priceRange: [0.01, 200]
        }}
      >
        <Form.Item name="keyword">
          <Input 
            placeholder="Quick search" 
            prefix={<SearchOutlined />} 
            onChange={onSearchChange}
            allowClear
          />
        </Form.Item>

        <Form.Item name="priceRange" label="Price">
          <Slider
            range
            min={0.01}
            max={200}
            marks={sliderMarks}
            value={currentValues.priceRange || [0.01, 200]}
            onChange={(value: number | number[]) => {
              if (Array.isArray(value) && value.length === 2) {
                handlePriceRangeChange(value as [number, number]);
              }
            }}
            tooltip={{ formatter: value => `${value} ETH` }}
            styles={ethSliderStyles}
          />
        </Form.Item>

        <Form.Item name="tier" label="Tier">
          {isLoadingFilters ? (
            <div className={styles.loadingSelect}>
              <Spin size="small" /> <span style={{ marginLeft: 8 }}>Loading tiers...</span>
            </div>
          ) : (
            <Select 
              placeholder="Select tier" 
              allowClear
            >
              {tierOptions}
            </Select>
          )}
        </Form.Item>

        <Form.Item name="theme" label="Theme">
          {isLoadingFilters ? (
            <div className={styles.loadingSelect}>
              <Spin size="small" /> <span style={{ marginLeft: 8 }}>Loading themes...</span>
            </div>
          ) : (
            <Select 
              placeholder="Select theme" 
              allowClear
            >
              {themeOptions}
            </Select>
          )}
        </Form.Item>

        <Form.Item name="sortTime" label="Time">
          <Select placeholder="" allowClear>
            {sortTimeOptions}
          </Select>
        </Form.Item>

        <Form.Item name="sortPrice" label="Price">
          <Select placeholder="" allowClear>
            {sortPriceOptions}
          </Select>
        </Form.Item>

        <div className="action-buttons">
          <Button 
            type="text" 
            onClick={onResetFilter}
            icon={<CloseCircleOutlined />}
          >
            Reset filter
          </Button>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={loading}
          >
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}; 
