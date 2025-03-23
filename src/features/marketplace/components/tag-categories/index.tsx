import React from 'react';
import { Flex } from "antd";
import styled from 'styled-components';
import { Button } from "../../../../shared/components/Button";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateCategory } from '../../store/filterSlice';
import { ProductCategory } from '../../enums/filter';

// Using styled-components to achieve the same styling as the provided CSS module
const ProductCategoriesContainer = styled.div`
  margin-bottom: 24px;
  
  .ant-btn {
    border: none;
    color: #fff !important;

    span {
      font-size: 16px !important;
    }

    &-lg {
      padding: 10px 16px;
    }

    &-default {
      background: linear-gradient(
        91.47deg,
        rgb(218 69 143 / 40%) -6%,
        rgb(218 52 221 / 40%) 113.05%
      ) !important;
      &:hover {
        opacity: 0.8;
      }
    }
  }
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