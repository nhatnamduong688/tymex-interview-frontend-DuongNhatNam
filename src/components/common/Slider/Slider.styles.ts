import styled from 'styled-components';
import { Slider as AntdSlider } from 'antd';
import {SliderRangeProps} from "antd/es/slider";

// Container cho toàn bộ slider component
export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Styled component cho Antd Slider
export const StyledSlider = styled(AntdSlider)`
  margin: 0 !important;
  padding: 0 !important;
  
  // Áp dụng các styles từ css cũ
  .ant-slider-rail {
    height: 8px;
    border-radius: 4px;
    background-color: #3a3841;
  }
  
  .ant-slider-track {
    height: 8px !important;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgb(218, 65, 162) 15% 85%,
      rgba(0, 0, 0, 0.7)
    ) !important;
  }
  
  .ant-slider-handle {
    &::after {
      inset-block-start: -4px !important;
      height: 16px !important;
      width: 16px !important;
      background: radial-gradient(circle, #ff54ee 0%, transparent 60%) !important;
      border: 1px solid white !important;
      box-shadow: 0px 0px 16px 3px rgba(218, 64, 163, 0.53) !important;
    }
  }
`;

// Label container cho min/max titles
export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Re-export các types từ file type
export type SliderProps = SliderRangeProps & {
    className?: string;
    title?: string;
    maxTitle?: string;
    minTitle?: string;
};