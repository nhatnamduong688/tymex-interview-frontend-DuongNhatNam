import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Form, Input, Select, Slider } from "antd";
import type { FormProps } from 'antd';
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import styled from 'styled-components';
import {
  ProductCategory,
  ProductTheme,
  ProductTier,
  SortType,
} from "../../../enums/filter";
import { formatPrice } from "../../../helpers/common";
import themeFilter from "../../../theme/themeFilterConfig";
import { TFilterProduct } from "../../../types/product";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useProductsContext } from '../../../contexts/productsContext';

// Define a type-safe form component
const StyledForm = styled(Form)<FormProps<TFilterProduct>>`
  background: #3a384199 !important;
  border-radius: 10px;
  border: none !important;
  padding: 16px !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  .ant-form-item {
    margin-bottom: 16px;

    &:first-child {
      margin-bottom: 40px;
    }
  }

  .ant-form-item-label {
    padding: 0 0 4px;

    label {
      color: #89888b;
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
    }
  }

  .ant-slider {
    .ant-slider-rail {
      background-color: #3a3841 !important;
    }

    .ant-slider-track {
      background-image: linear-gradient(91.47deg, rgb(218 69 143 / 40%) -6%, rgb(218 52 221 / 40%) 113.05%) !important;
    }

    .ant-slider-mark {
      top: 20px;

      .ant-slider-mark-text {
        color: #d6d6d6 !important;
        font-weight: 500 !important;
        font-size: 16px;
        width: 50%;

        &:first-child {
          text-align: left;
          transform: translateX(0) !important;
        }

        &:last-child {
          text-align: right;
          transform: translateX(-100%) !important;
        }
      }
    }
  }

  .ant-input-outlined {
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }

  .ant-select-multiple {
    .ant-select-selection-item {
      background: linear-gradient(
        91.47deg,
        rgb(218 69 143 / 40%) -6%,
        rgb(218 52 221 / 40%) 113.05%
      ) !important;
      &:hover {
        opacity: 0.8;
      }
    }

    .anticon-close {
      color: #fff !important;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;

    .ant-btn {
      width: 120px;

      .anticon-close-circle {
        color: #fbc625;
      }
    }
  }

  @media (max-width: 576px) {
    padding: 8px !important;
  }
`;

const optionsCategory = Object.values(ProductCategory).map((item) => ({
  label: item === "" ? "All" : item,
  value: item,
}));

export const Filter: React.FC = () => {
  const [form] = Form.useForm<TFilterProduct>();

  const [updateFilter, setUpdateFilter] = useState(false);

  const { getParams, setParams, removeParams } = useQueryParams();

  const params = getParams([
    "keyword",
    "priceRange",
    "tier",
    "theme",
    "sortTime",
    "sortPrice",
    "categories",
  ]);

  const { isCollapsed } = useBreakpoint();

  const { filter, setFilter } = useProductsContext();

  const onSubmit = (value: TFilterProduct) => {
    setUpdateFilter(true);
    setFilter({
      ...value,
    });
    
    // Chuyển đổi các giá trị để phù hợp với kiểu string | string[]
    const paramValues: Record<string, string | string[]> = {};
    
    if (value.keyword) paramValues.keyword = value.keyword;
    if (value.priceRange) paramValues.priceRange = value.priceRange.map(String);
    if (value.tier) paramValues.tier = value.tier;
    if (value.theme) paramValues.theme = value.theme;
    if (value.sortTime) paramValues.sortTime = value.sortTime;
    if (value.sortPrice) paramValues.sortPrice = value.sortPrice;
    
    if (isCollapsed && value.categories) {
      paramValues.categories = value.categories;
    }
    
    setParams(
      {
        ...params,
        ...paramValues
      },
      { replace: false }
    );
  };

  const resetFilter = () => {
    form.resetFields();
    setFilter({ categories: [] });
    removeParams([
      "keyword",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
      ...(isCollapsed ? ["categories"] : []).flat(),
    ]);
  };

  useEffect(() => {
    if (updateFilter) return;
    form.setFieldsValue(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <ConfigProvider theme={themeFilter}>
      <StyledForm
        form={form}
        labelCol={{ span: 24 }}
        onFinish={onSubmit}
      >
        <Form.Item name="keyword">
          <Input placeholder="Quick search" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name="priceRange" label="Price">
          <Slider
            range
            max={200}
            min={0.01}
            marks={{
              0.01: formatPrice(0.01),
              200: formatPrice(200),
            }}
          />
        </Form.Item>
        <Form.Item name="tier" label="Tier">
          <Select
            options={[ProductTier.Basic, ProductTier.Premium].map((tier) => ({
              label: tier,
              value: tier,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item name="theme" label="Theme">
          <Select
            options={[ProductTheme.Dark, ProductTheme.Light].map((theme) => ({
              label: theme,
              value: theme,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item name="sortTime" label="Time">
          <Select
            options={[
              { label: "Latest", value: SortType.Descending },
              { label: "Earliest", value: SortType.Ascending },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item name="sortPrice" label="Price">
          <Select
            options={[
              { label: "Low to high", value: SortType.Ascending },
              { label: "High to low", value: SortType.Descending },
            ]}
            allowClear
          />
        </Form.Item>
        {isCollapsed && (
          <Form.Item name="categories" label="Categories">
            <Select
              mode="multiple"
              options={optionsCategory.map(({ label, value }) => ({
                label,
                value,
              }))}
              allowClear
            />
          </Form.Item>
        )}

        <div className="action-buttons">
          <Button
            type="text"
            icon={<CloseCircleFilled />}
            onClick={resetFilter}
          >
            Reset filter
          </Button>
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </div>
      </StyledForm>
    </ConfigProvider>
  );
}; 