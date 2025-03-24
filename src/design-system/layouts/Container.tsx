import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}

const StyledContainer = styled.div<{ $size: ContainerSize }>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  
  /* Responsive max-widths */
  max-width: ${({ $size }) => {
    switch ($size) {
      case 'sm': return '640px';
      case 'md': return '768px';
      case 'lg': return '1024px';
      case 'xl': return '1280px';
      case 'full': return '100%';
      default: return '1024px';
    }
  }};
  
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

export const Container = ({ 
  children, 
  size = 'lg',
  className,
}: ContainerProps) => {
  return (
    <StyledContainer $size={size} className={className}>
      {children}
    </StyledContainer>
  );
};

export default Container; 