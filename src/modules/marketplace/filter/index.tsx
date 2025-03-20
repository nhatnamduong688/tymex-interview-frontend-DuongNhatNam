import React from 'react';
import { Card, Typography, Divider, Radio, Space, Button, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import styled from 'styled-components';
import { useProducts } from '../../../contexts/productsContext';

const { Title } = Typography;

const FilterCard = styled(Card)`
  position: sticky;
  top: 20px;
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

export const Filter: React.FC = () => {
  const { 
    selectedCategory, 
    selectedTags, 
    setSelectedCategory, 
    addTag, 
    removeTag, 
    clearFilters 
  } = useProducts();

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
    <FilterCard>
      <Title level={4}>Filters</Title>
      <Divider />

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

      <Button 
        type="default" 
        onClick={clearFilters}
        disabled={!selectedCategory && selectedTags.length === 0}
      >
        Clear Filters
      </Button>
    </FilterCard>
  );
}; 