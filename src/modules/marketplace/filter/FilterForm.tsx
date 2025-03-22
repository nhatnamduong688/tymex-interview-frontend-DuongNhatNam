import React from 'react';
import { Form, Input, Button, Select, Slider, Divider, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SortType, ProductTheme, ProductTier } from '../../../enums/filter';
import { TFilterProduct } from '../../../types/product';

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
  // Generate option components for tiers from enum values
  const tierOptions = Object.values(ProductTier).map(tier => (
    <Option key={tier} value={tier}>{tier}</Option>
  ));

  // Generate theme options from enum values
  const themeOptions = Object.values(ProductTheme).map(theme => (
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
        <Select placeholder="Select tier" allowClear>
          {tierOptions}
        </Select>
      </Form.Item>

      <Form.Item name="theme" label="Theme">
        <Select placeholder="Select theme" allowClear>
          {themeOptions}
        </Select>
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