import React from 'react';
import { ConfigProvider } from "antd";
import themeFilter from "../../../theme/themeFilterConfig";
import { StyledForm } from './filter.styled';
import { FilterForm } from './FilterForm';
import { FilterSummary } from './FilterSummary';
import { useBreakpoint } from "../../../hooks/useBreakpoint";

export const Filter: React.FC = () => {
  const { isCollapsed } = useBreakpoint();
  
  return (
    <ConfigProvider theme={themeFilter}>
      <StyledForm>
        <FilterForm isCollapsed={isCollapsed} />
        <FilterSummary />
      </StyledForm>
    </ConfigProvider>
  );
}; 