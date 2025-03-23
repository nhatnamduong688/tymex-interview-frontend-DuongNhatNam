import React, { ReactNode } from 'react';
import { StyledPageContent, PageTitle } from './styles';

interface PageContentProps {
  title?: string;
  children: ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ title, children }) => {
  return (
    <StyledPageContent>
      {title && <PageTitle>{title}</PageTitle>}
      {children}
    </StyledPageContent>
  );
}; 