import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Slider, Divider, Row, Col, Spin } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SortType } from '../../../enums/filter';
import { TFilterProduct } from '../../../types/product';
import { api } from '../../../services/api';

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
        const response = await api.getProducts();
        
        // Extract unique tiers
        const uniqueTiers = Array.from(new Set(
          response.data.map((product: any) => product.tier).filter(Boolean)
        ));
        
        // Extract unique themes
        const uniqueThemes = Array.from(new Set(
          response.data.map((product: any) => product.theme).filter(Boolean)
        ));
        
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

  const handleFinish = (values: TFilterProduct) => {
    // Đảm bảo cả search và keyword đều được gửi đi
    if (values.keyword) {
      values.search = values.keyword;
    }
    onSubmit(values);
  };

  // Log để debug giá trị priceRange và keyword/search
  console.log('FilterForm currentValues:', currentValues);
  console.log('keyword value:', form.getFieldValue('keyword'));
  console.log('priceRange value:', form.getFieldValue('priceRange'));
  
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