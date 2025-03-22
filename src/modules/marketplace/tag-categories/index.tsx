import React from 'react';
import { Flex } from "antd";
import styled from 'styled-components';
import { Button } from "../../../components/Button";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateCategory } from '../../../store/slices/filterSlice';
import { ProductCategory } from '../../../enums/filter';

const ProductCategoriesContainer = styled.div`
  margin-bottom: 24px;
`;

export const TagCategories = () => {
  const dispatch = useDispatch();
  const { formValues } = useSelector((state: RootState) => state.filter);

  const valuesCateogry = formValues.categories || [];

  // Create options with "All" and enum categories
  const optionsCategory = [
    { label: "All", value: ProductCategory.All },
    ...Object.values(ProductCategory)
      .filter(category => category !== ProductCategory.All)
      .map(category => ({
        label: category,
        value: category
      }))
  ];

  const onChangeCategory = debounce((value: string) => {
    // Dispatch updateCategory action to Redux
    // URL will be automatically updated by middleware
    dispatch(updateCategory(value));
  }, 300);

  return (
    <>
      <ProductCategoriesContainer>
        <Flex gap={20} wrap>
          {optionsCategory.map(({ label, value }) => (
            <Button
              key={value}
              type={
                valuesCateogry?.includes(value) ||
                (valuesCateogry?.length === 0 && value === ProductCategory.All)
                  ? "primary"
                  : "default"
              }
              onClick={() => onChangeCategory(value)}
              size="large"
            >
              {label}
            </Button>
          ))}
        </Flex>
      </ProductCategoriesContainer>
    </>
  );
}; 