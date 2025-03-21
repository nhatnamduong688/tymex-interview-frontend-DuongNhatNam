import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FilterSummary as StyledFilterSummary } from './filter.styled';
import { RootState } from '../../../store';
import { formatPrice } from '../../../helpers/common';

export const FilterSummary: React.FC = memo(() => {
  const { appliedFilters } = useSelector((state: RootState) => state.filter);
  
  // Generate summary from filter state
  const summary = useMemo(() => {
    const items = [];
    
    if (appliedFilters.search) {
      items.push(`Search: "${appliedFilters.search}"`);
    }
    
    if (appliedFilters.priceRange?.length === 2) {
      items.push(`Price Range: ${formatPrice(appliedFilters.priceRange[0])} - ${formatPrice(appliedFilters.priceRange[1])}`);
    }
    
    if (appliedFilters.tier) {
      items.push(`Tier: ${appliedFilters.tier}`);
    }
    
    if (appliedFilters.theme) {
      items.push(`Theme: ${appliedFilters.theme}`);
    }
    
    if (appliedFilters.categories?.length) {
      items.push(`Categories: ${appliedFilters.categories.join(', ')}`);
    }
    
    return items;
  }, [appliedFilters]);
  
  if (summary.length === 0) return null;
  
  return (
    <StyledFilterSummary>
      <h4>Current Filter Settings:</h4>
      <ul>
        {summary.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </StyledFilterSummary>
  );
}); 