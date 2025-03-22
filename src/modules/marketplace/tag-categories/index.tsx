import React from 'react';
import { Flex } from "antd";
import styled from 'styled-components';
import { Button } from "../../../components/Button";
import debounce from "lodash.debounce";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { updateFormValues, applyFilter } from '../../../store/slices/filterSlice';

// Creating an enum for ProductCategory
export enum ProductCategory {
  ALL = "",
  ART = "Art",
  GAMING = "Gaming",
  MUSIC = "Music",
  REAL_ESTATE = "Real Estate"
}

const ProductCategoriesContainer = styled.div`
  margin-bottom: 24px;
`;

const optionsCategory = Object.values(ProductCategory).map((item) => ({
  label: item === "" ? "All" : item,
  value: item,
}));

export const TagCategories = () => {
  const dispatch = useDispatch();
  const { formValues } = useSelector((state: RootState) => state.filter);
  const { setParams, removeParams } = useQueryParams();

  const valuesCateogry = formValues.categories || [];

  const onChangeCategory = debounce((value: string) => {
    if (value === "") {
      // Cập nhật form values trong Redux
      dispatch(updateFormValues({ categories: [] }));
      // Áp dụng filter để cập nhật appliedFilters
      dispatch(applyFilter());
      // Xóa params khỏi URL
      removeParams(["categories"]);
      return;
    }
    
    const newValues = Array.isArray(valuesCateogry)
      ? valuesCateogry.includes(value)
        ? valuesCateogry.filter((item) => item !== value)
        : [...valuesCateogry, value]
      : [value];

    // Cập nhật form values trong Redux
    dispatch(updateFormValues({ categories: newValues }));
    // Áp dụng filter để cập nhật appliedFilters
    dispatch(applyFilter());
    // Cập nhật URL params
    setParams({ categories: newValues }, { replace: false });
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
                (valuesCateogry?.length === 0 && value === "")
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