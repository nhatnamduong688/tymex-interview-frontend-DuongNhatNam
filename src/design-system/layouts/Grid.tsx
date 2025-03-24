import React, { ReactNode } from 'react';
import styled from 'styled-components';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface GridProps {
  children: ReactNode;
  columns?: GridColumns;
  gap?: GridGap;
  className?: string;
}

const StyledGrid = styled.div<{ $columns: GridColumns; $gap: GridGap }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  
  /* Gap sizes */
  gap: ${({ $gap }) => {
    switch ($gap) {
      case 'xs': return '0.5rem'; // 8px
      case 'sm': return '1rem';   // 16px
      case 'md': return '1.5rem'; // 24px
      case 'lg': return '2rem';   // 32px
      case 'xl': return '2.5rem'; // 40px
      default: return '1rem';
    }
  }};
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    grid-template-columns: repeat(
      ${({ $columns }) => ($columns > 2 ? 2 : $columns)}, 
      minmax(0, 1fr)
    );
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Grid = ({ 
  children, 
  columns = 3,
  gap = 'md',
  className,
}: GridProps) => {
  return (
    <StyledGrid $columns={columns} $gap={gap} className={className}>
      {children}
    </StyledGrid>
  );
};

export default Grid; 