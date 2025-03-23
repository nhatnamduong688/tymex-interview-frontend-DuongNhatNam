import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Slider, Divider, Row, Col, Spin } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SortType } from '../../../enums/filter';
import { TFilterProduct } from '../../../types/product';
import * as productApi from '../../../services/product';

const { Option } = Select;

// Styled components
const SliderContainer = styled.div`
  padding: 0 10px;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
`;

const LoadingSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

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
        const response = await productApi.getProducts();
        
        // Extract unique tiers
        const uniqueTiers = Array.from(new Set(
          response.data.map((product: any) => product.tier).filter(Boolean)
        )) as string[];
        
        // Extract unique themes
        const uniqueThemes = Array.from(new Set(
          response.data.map((product: any) => product.theme).filter(Boolean)
        )) as string[];
        
        console.log("API TIERS (raw values):", uniqueTiers);
        console.log("API THEMES (raw values):", uniqueThemes);
        
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
  const tierOptions = tiers.map(tier => {
    console.log(`Creating tier option: ${tier}`);
    return <Option key={tier} value={tier}>{tier}</Option>
  });

  // Generate theme options from API data
  const themeOptions = themes.map(theme => {
    console.log(`Creating theme option: ${theme}`);
    return <Option key={theme} value={theme}>{theme}</Option>
  });

  const handlePriceRangeChange = (newRange: [number, number]) => {
    console.log('Price range changed:', newRange);
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
      console.log('Setting price range:', values.priceRange, 'min:', values.minPrice, 'max:', values.maxPrice);
    }

    // Log the form submission values with detailed type info
    console.log('Form submitted with values:', JSON.stringify(values, null, 2));
    console.log('Form tier value:', values.tier, 'of type', typeof values.tier);
    console.log('Form theme value:', values.theme, 'of type', typeof values.theme);
    console.log('Form sortTime value:', values.sortTime, 'of type', typeof values.sortTime);
    console.log('Form sortPrice value:', values.sortPrice, 'of type', typeof values.sortPrice);
    
    onSubmit(values);
  };

  // Log để debug giá trị priceRange và keyword/search
  console.log('FilterForm currentValues:', currentValues);
  console.log('keyword value:', form.getFieldValue('keyword'));
  console.log('priceRange value:', form.getFieldValue('priceRange'));
  console.log('tier value:', form.getFieldValue('tier'));
  console.log('theme value:', form.getFieldValue('theme'));
  console.log('sortTime value:', form.getFieldValue('sortTime'));
  console.log('sortPrice value:', form.getFieldValue('sortPrice'));
  
  // Update form when currentValues changes from Redux
  useEffect(() => {
    console.log('FilterForm: Updating form with new values from Redux:', currentValues);
    form.setFieldsValue({
      ...currentValues,
      // Đảm bảo keyword được hiển thị từ cả search hoặc keyword
      keyword: currentValues.keyword || currentValues.search,
      // Đảm bảo các giá trị khác được cập nhật đúng
      priceRange: currentValues.priceRange || [0, 200],
      sortTime: currentValues.sortTime || '',
      sortPrice: currentValues.sortPrice || ''
    });
  }, [currentValues, form]);
  
  return (
    <Form
      form={form}
      name="filter_form"
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...currentValues,
        // Đảm bảo keyword được hiển thị từ cả search hoặc keyword
        keyword: currentValues.keyword || currentValues.search
      }}
    >
      <Form.Item name="keyword" label="Search">
        <Input 
          placeholder="Search products..." 
          prefix={<SearchOutlined />} 
          onChange={onSearchChange}
          allowClear
          // Hiển thị search value nếu có
          defaultValue={currentValues.keyword || currentValues.search}
        />
      </Form.Item>

      <Divider />

      <Form.Item name="priceRange" label="Price Range">
        <SliderContainer>
          <Slider
            range
            min={0}
            max={200}
            defaultValue={currentValues.priceRange || [0, 200]}
            onChange={(value: number | number[]) => {
              if (Array.isArray(value) && value.length === 2) {
                handlePriceRangeChange(value as [number, number]);
              }
            }}
            tipFormatter={value => `$${value}`}
          />
        </SliderContainer>
      </Form.Item>

      <Form.Item name="tier" label="Tier">
        {isLoadingFilters ? (
          <LoadingSelect>
            <Spin size="small" /> <span style={{ marginLeft: 8 }}>Loading tiers...</span>
          </LoadingSelect>
        ) : (
          <Select placeholder="Select tier" allowClear>
            {tierOptions}
          </Select>
        )}
      </Form.Item>

      <Form.Item name="theme" label="Theme">
        {isLoadingFilters ? (
          <LoadingSelect>
            <Spin size="small" /> <span style={{ marginLeft: 8 }}>Loading themes...</span>
          </LoadingSelect>
        ) : (
          <Select placeholder="Select theme" allowClear>
            {themeOptions}
          </Select>
        )}
      </Form.Item>

      <Divider />

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="sortTime" label="Sort by Time">
            <Select placeholder="Sort by time" allowClear>
              {sortTimeOptions}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="sortPrice" label="Sort by Price">
            <Select placeholder="Sort by price" allowClear>
              {sortPriceOptions}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <FormFooter>
        <Button 
          type="default" 
          onClick={onResetFilter}
          icon={<ReloadOutlined />}
        >
          Reset
        </Button>
        <Button 
          type="primary" 
          htmlType="submit"
          loading={loading}
        >
          Apply Filters
        </Button>
      </FormFooter>
    </Form>
  );
}; 