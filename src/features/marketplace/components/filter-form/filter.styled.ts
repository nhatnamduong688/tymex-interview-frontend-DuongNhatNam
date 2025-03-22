import styled from 'styled-components';
import { Form } from 'antd';
import type { FormProps } from 'antd';
import { TFilterProduct } from '../../types/product';

// Define a type-safe form component
export const StyledForm = styled.div`
  background: #3a384199 !important;
  border-radius: 10px;
  border: none !important;
  padding: 16px !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  .ant-form {
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

export const FilterStatus = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

export const FilterSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);

  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #89888b;
  }

  ul {
    margin: 0;
    padding-left: 16px;
    font-size: 13px;
    color: #d6d6d6;
  }

  li {
    margin-bottom: 2px;
  }
`; 