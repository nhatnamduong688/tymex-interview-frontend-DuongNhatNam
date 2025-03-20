import React, { useState } from 'react';
import { Button, Drawer, Space, Radio, Checkbox, Divider, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import type { RadioChangeEvent } from 'antd';
import { useProducts } from '../../../contexts/productsContext';

const { Title } = Typography;

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
    selectedCategory, 
    selectedTags, 
    setSelectedCategory, 
    addTag, 
    removeTag, 
    clearFilters 
  } = useProducts();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (e: RadioChangeEvent) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      addTag(tag);
    } else {
      removeTag(tag);
    }
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
              disabled={!selectedCategory && selectedTags.length === 0}
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