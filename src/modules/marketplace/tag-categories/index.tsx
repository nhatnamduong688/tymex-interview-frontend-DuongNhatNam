import React from 'react';
import { Flex } from "antd";
import styled from 'styled-components';
import { Button } from "../../../components/Button";
import { useProductsContext } from "../../../contexts/productsContext";
import debounce from "lodash.debounce";
import { useQueryParams } from "../../../hooks/useQueryParams";

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
  const { filter, setFilter } = useProductsContext();

  const { setParams, removeParams } = useQueryParams();

  const valuesCateogry = filter.categories || [];

  const onChangeCategory = debounce((value: string) => {
    if (value === "") {
      setFilter({ ...filter, categories: [] });
      removeParams(["categories"]);
      return;
    }
    const newValues = Array.isArray(valuesCateogry)
      ? valuesCateogry.includes(value)
        ? valuesCateogry.filter((item) => item !== value)
        : [...valuesCateogry, value]
      : [value];

    setFilter({ ...filter, categories: newValues });
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