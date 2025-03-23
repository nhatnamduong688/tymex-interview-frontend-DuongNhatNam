import React from 'react';
import type { ButtonProps } from 'antd/es/button';
import { StyledButton } from './styles';

export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
}; 