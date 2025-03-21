import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
`;

export const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <Spin size="large" />
    </SpinnerContainer>
  );
}; 