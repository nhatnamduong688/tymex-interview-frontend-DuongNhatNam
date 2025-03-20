import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

export interface ButtonProps extends AntButtonProps {
  // Additional props if needed
}

const StyledButton = styled(AntButton)`
  &.ant-btn-primary {
    background-image: ${props => props.theme.colors.primaryGradient};
    border: none;
    
    &:hover, &:focus {
      background-image: ${props => props.theme.colors.primaryGradient};
      opacity: 0.9;
    }
  }
  
  &.ant-btn-large {
    font-size: 16px;
    height: 44px;
    padding: 0 20px;
  }
`;

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
}; 