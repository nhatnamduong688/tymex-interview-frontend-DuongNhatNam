import React, { useState } from 'react';
import { Button, Drawer, Space, Radio, Checkbox, Divider, Typography, Input } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import type { RadioChangeEvent } from 'antd';
import { useProductsContext } from '../../../contexts/productsContext';

const { Title } = Typography;
const { Search } = Input;

const FilterButton = styled(Button)`
  margin-bottom: 16px;
  display: block;
  width: 100%;
`;

const FilterSection = styled.div`
  margin-bottom: 24px;
`;

const categories = [
  { value: 'Art', label: 'Art' },
  { value: 'Gaming', label: 'Gaming' },
  { value: 'Music', label: 'Music' },
  { value: 'Real Estate', label: 'Real Estate' },
];

const popularTags = [
  { value: 'collectible', label: 'Collectible' },
  { value: 'rare', label: 'Rare' },
  { value: 'metaverse', label: 'Metaverse' },
  { value: 'digital', label: 'Digital' },
];

export const FilterMobile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { 
    filter,
    updateCategory, 
    addTag, 
    removeTag,
    setSearch,
    clearFilters 
  } = useProductsContext();

  const selectedCategory = filter.category;
  const selectedTags = filter.tags || [];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (e: RadioChangeEvent) => {
    updateCategory(e.target.value);
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      addTag(tag);
    } else {
      removeTag(tag);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <FilterButton 
        type="primary" 
        icon={<FilterOutlined />} 
        onClick={showDrawer}
      >
        Filters
      </FilterButton>
      <Drawer
        title="Filters"
        placement="right"
        onClose={onClose}
        open={open}
        width={300}
        footer={
          <Space>
            <Button 
              onClick={clearFilters}
              disabled={!selectedCategory && selectedTags.length === 0 && !filter.search}
            >
              Clear
            </Button>
            <Button type="primary" onClick={onClose}>
              Apply
            </Button>
          </Space>
        }
      >
        <FilterSection>
          <Title level={5}>Search</Title>
          <Search
            placeholder="Search products..."
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </FilterSection>
        
        <FilterSection>
          <Title level={5}>Categories</Title>
          <Radio.Group 
            value={selectedCategory} 
            onChange={handleCategoryChange}
          >
            <Space direction="vertical">
              {categories.map(category => (
                <Radio key={category.value} value={category.value}>
                  {category.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </FilterSection>
        
        <Divider />
        
        <FilterSection>
          <Title level={5}>Popular Tags</Title>
          <Space direction="vertical">
            {popularTags.map(tag => (
              <Checkbox 
                key={tag.value}
                checked={selectedTags.includes(tag.value)}
                onChange={e => handleTagChange(tag.value, e.target.checked)}
              >
                {tag.label}
              </Checkbox>
            ))}
          </Space>
        </FilterSection>
      </Drawer>
    </>
  );
}; 