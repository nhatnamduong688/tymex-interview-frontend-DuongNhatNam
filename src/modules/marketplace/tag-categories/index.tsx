import React from 'react';
import { Tag, Space, Typography } from 'antd';
import styled from 'styled-components';
import { useProducts } from '../../../contexts/productsContext';

const { Title } = Typography;

const TagContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const StyledTag = styled(Tag)`
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
`;

const tags = [
  { value: 'art', label: 'Art' },
  { value: 'collectible', label: 'Collectible' },
  { value: 'music', label: 'Music' },
  { value: 'game', label: 'Game' },
  { value: 'metaverse', label: 'Metaverse' },
  { value: 'digital', label: 'Digital' },
  { value: 'rare', label: 'Rare' },
  { value: 'property', label: 'Property' },
];

export const TagCategories: React.FC = () => {
  const { selectedTags, addTag, removeTag } = useProducts();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  return (
    <TagContainer>
      <Title level={5} style={{ marginRight: '12px', marginBottom: '0' }}>
        Popular Tags:
      </Title>
      <Space wrap>
        {tags.map(tag => (
          <StyledTag
            key={tag.value}
            color={selectedTags.includes(tag.value) ? 'blue' : 'default'}
            onClick={() => toggleTag(tag.value)}
          >
            {tag.label}
          </StyledTag>
        ))}
      </Space>
    </TagContainer>
  );
}; 