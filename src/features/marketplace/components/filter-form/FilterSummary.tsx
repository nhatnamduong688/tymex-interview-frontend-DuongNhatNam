import React from 'react';
import { Button, Tag } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

interface FilterSummaryProps {
  filterSummary: string[];
  onToggleFilter: () => void;
  isFilterVisible: boolean;
}

export const FilterSummary: React.FC<FilterSummaryProps> = ({
  filterSummary,
  onToggleFilter,
  isFilterVisible
}) => {
  return (
    <SummaryContainer>
      <FilterButton 
        icon={<FilterOutlined />} 
        onClick={onToggleFilter}
        type={isFilterVisible ? 'primary' : 'default'}
      >
        {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
      </FilterButton>
      
      {filterSummary.length > 0 && (
        <TagsContainer>
          {filterSummary.map((item, index) => (
            <Tag key={index} color="blue">
              {item}
            </Tag>
          ))}
        </TagsContainer>
      )}
    </SummaryContainer>
  );
}; 