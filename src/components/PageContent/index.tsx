import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledPageContent = styled.div`
  padding: 30px 0;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 24px;
  font-weight: 600;
`;

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