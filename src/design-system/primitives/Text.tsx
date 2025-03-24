import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption';
type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right';

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  color?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const getVariantStyles = (variant: TextVariant) => {
  switch (variant) {
    case 'h1':
      return css`
        font-size: 2.25rem; /* 36px */
        line-height: 1.2;
      `;
    case 'h2':
      return css`
        font-size: 1.875rem; /* 30px */
        line-height: 1.25;
      `;
    case 'h3':
      return css`
        font-size: 1.5rem; /* 24px */
        line-height: 1.3;
      `;
    case 'h4':
      return css`
        font-size: 1.25rem; /* 20px */
        line-height: 1.4;
      `;
    case 'h5':
      return css`
        font-size: 1.125rem; /* 18px */
        line-height: 1.5;
      `;
    case 'h6':
      return css`
        font-size: 1rem; /* 16px */
        line-height: 1.5;
      `;
    case 'body':
      return css`
        font-size: 1rem; /* 16px */
        line-height: 1.5;
      `;
    case 'body-sm':
      return css`
        font-size: 0.875rem; /* 14px */
        line-height: 1.5;
      `;
    case 'caption':
      return css`
        font-size: 0.75rem; /* 12px */
        line-height: 1.5;
      `;
    default:
      return '';
  }
};

const getWeightStyles = (weight: TextWeight) => {
  switch (weight) {
    case 'light':
      return css`font-weight: 300;`;
    case 'regular':
      return css`font-weight: 400;`;
    case 'medium':
      return css`font-weight: 500;`;
    case 'semibold':
      return css`font-weight: 600;`;
    case 'bold':
      return css`font-weight: 700;`;
    default:
      return '';
  }
};

const StyledText = styled.span<{
  $variant: TextVariant;
  $weight: TextWeight;
  $align: TextAlign;
  $color: string;
}>`
  margin: 0;
  padding: 0;
  
  ${({ $variant }) => getVariantStyles($variant)};
  ${({ $weight }) => getWeightStyles($weight)};
  
  text-align: ${({ $align }) => $align};
  color: ${({ $color }) => $color};
`;

export const Text = ({
  children,
  variant = 'body',
  weight = 'regular',
  align = 'left',
  color = 'inherit',
  as,
  className,
}: TextProps) => {
  // Default HTML element based on variant
  const getDefaultElement = () => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'body':
      case 'body-sm':
        return 'p';
      case 'caption':
        return 'span';
      default:
        return 'span';
    }
  };

  return (
    <StyledText
      $variant={variant}
      $weight={weight}
      $align={align}
      $color={color}
      as={as || getDefaultElement()}
      className={className}
    >
      {children}
    </StyledText>
  );
};

export default Text; 