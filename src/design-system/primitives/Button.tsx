import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: #1890ff;
        color: white;
        
        &:hover:not(:disabled) {
          background-color: #40a9ff;
        }
        
        &:active:not(:disabled) {
          background-color: #096dd9;
        }
      `;
    case 'secondary':
      return css`
        background-color: white;
        color: #1890ff;
        border: 1px solid #1890ff;
        
        &:hover:not(:disabled) {
          background-color: #e6f7ff;
        }
        
        &:active:not(:disabled) {
          background-color: #bae7ff;
        }
      `;
    case 'tertiary':
      return css`
        background-color: #f5f5f5;
        color: #262626;
        
        &:hover:not(:disabled) {
          background-color: #e5e5e5;
        }
        
        &:active:not(:disabled) {
          background-color: #d4d4d4;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: #1890ff;
        
        &:hover:not(:disabled) {
          background-color: #e6f7ff;
        }
        
        &:active:not(:disabled) {
          background-color: #bae7ff;
        }
      `;
    case 'danger':
      return css`
        background-color: #ff4d4f;
        color: white;
        
        &:hover:not(:disabled) {
          background-color: #ff7875;
        }
        
        &:active:not(:disabled) {
          background-color: #f5222d;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        height: 32px;
        padding: 0 12px;
        font-size: 14px;
      `;
    case 'md':
      return css`
        height: 40px;
        padding: 0 16px;
        font-size: 16px;
      `;
    case 'lg':
      return css`
        height: 48px;
        padding: 0 20px;
        font-size: 16px;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $isFullWidth: boolean;
  $isLoading: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  
  ${({ $variant }) => getVariantStyles($variant)};
  ${({ $size }) => getSizeStyles($size)};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${({ $isLoading }) => $isLoading && css`
    color: transparent !important;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
  
  ${({ $hasLeftIcon }) => $hasLeftIcon && css`
    & > svg:first-child {
      margin-right: 8px;
    }
  `}
  
  ${({ $hasRightIcon }) => $hasRightIcon && css`
    & > svg:last-child {
      margin-left: 8px;
    }
  `}
`;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isFullWidth={isFullWidth}
      $isLoading={isLoading}
      $hasLeftIcon={!!leftIcon}
      $hasRightIcon={!!rightIcon}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </StyledButton>
  );
};

export default Button; 