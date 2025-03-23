import React from 'react';
import { Button, Tag } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styles from './scss/FilterSummary.module.scss';

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
    <div className={styles.summaryContainer}>
      <Button 
        className={styles.filterButton}
        icon={<FilterOutlined />} 
        onClick={onToggleFilter}
        type={isFilterVisible ? 'primary' : 'default'}
      >
        {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
      </Button>
      
      {filterSummary.length > 0 && (
        <div className={styles.tagsContainer}>
          {filterSummary.map((item, index) => (
            <Tag key={index} color="blue">
              {item}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}; 