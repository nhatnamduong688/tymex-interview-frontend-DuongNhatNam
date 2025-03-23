import { Button as AntButton } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(AntButton)`
  &.ant-btn-primary {
    background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
    border: none;
    
    &:hover,
    &:focus {
      background: linear-gradient(90deg, #00d2ff 20%, #3a7bd5 100%);
    }
  }
  
  &.ant-btn-large {
    height: 48px;
    padding: 0 24px;
    font-size: 16px;
    border-radius: 8px;
  }
`; 